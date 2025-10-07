---
title: "Tailwind CSS v4 in a Turborepo / PNPM Monorepo – A From‑Scratch Guide"
description: "Step‑by‑step walkthrough to implement Tailwind CSS v4 with shared design tokens, multiple apps, and component packages in a modern monorepo."
author: "Your Name"
date: "2025-10-07"
tags: ["tailwindcss", "monorepo", "turborepo", "pnpm", "design-tokens", "frontend-architecture"]
---

# Tailwind CSS v4 in a Monorepo (PNPM + Turborepo) – From Scratch

Tailwind v4 simplifies a ton of historical config churn. In a monorepo, the *biggest* wins come from:

1. Declaring **design tokens once** (`@theme`)
2. Generating **utilities only in apps** (not per package)
3. Letting library packages stay **utility-aware** without shipping bloated CSS
4. Centralizing **content scanning + presets** in a root config

This guide builds a working architecture you can transplant into any multi‑package codebase.

---
## ✅ Outcome (What You Get by the End)
You’ll have:
* `packages/design-system` (or `tailwind-config`) exporting `design-tokens.css` + a Tailwind preset
* A root `tailwind.config.(js|ts)` scanning all apps + library source
* One or more Next.js (or other framework) apps consuming tokens + utilities
* UI / Modules packages that use Tailwind utility classes but do **not** prebuild Tailwind themselves
* Predictable dark mode + runtime theming via CSS custom properties

---
## 🧱 0. Prerequisites
| Tool | Version (suggested) |
|------|---------------------|
| Node | >= 18 LTS |
| PNPM | >= 9 / 10 |
| Turborepo | Bundled via `turbo` devDependency |
| Git | Optional but recommended |

```bash
pnpm -v
node -v
```

---
## 🗂 1. Workspace Skeleton
```
my-monorepo/
  apps/
    web/            # primary app (Next.js in this example)
  packages/
    tailwind-config/ # design tokens + preset
    ui/              # component library
    modules/         # feature or content modules
  package.json
  pnpm-workspace.yaml
  turbo.json
  tailwind.config.ts (root)
```

`pnpm-workspace.yaml`:
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Root `package.json` (minimal excerpt):
```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  },
  "devDependencies": {
    "turbo": "^2.5.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/cli": "^4.0.0"
  }
}
```

---
## 🎨 2. Design Tokens Package (`packages/tailwind-config`)
Create `packages/tailwind-config/package.json`:
```json
{
  "name": "@repo/tailwind-config",
  "private": true,
  "version": "0.0.0",
  "files": ["index.js", "design-tokens.css"],
  "main": "index.js",
  "exports": {
    ".": "./index.js",
    "./design-tokens.css": "./design-tokens.css"
  },
  "dependencies": {
    "tailwindcss": "^4.0.0"
  }
}
```

`design-tokens.css` (tokens only – **no** `@import "tailwindcss"`):
```css
@theme {
  /* Brand palette */
  --color-brand-50: #f5f8ff;
  --color-brand-500: #3b82f6;
  --color-brand-700: #1d4ed8;
  --color-accent-500: #e11d48;

  /* Layout fractions */
  --spacing-half: 50%;
  --spacing-third: 33.333333%;
  --spacing-two-thirds: 66.666667%;
  --spacing-quarter: 25%;
  --spacing-three-quarters: 75%;

  /* Extended spacing */
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;

  /* Radii */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.625rem;
  --radius-xl: 1rem;
}
```

`index.js` (Tailwind preset / extension – semantic mapping, optional):
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50)',
          500: 'var(--color-brand-500)',
          700: 'var(--color-brand-700)'
        },
        accent: {
          500: 'var(--color-accent-500)'
        }
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)'
      }
    }
  },
  plugins: []
};
```

> Why split CSS tokens + JS config? Tokens remain framework‑agnostic; the preset adds semantic sugar + future plugins.

---
## 🏛 3. Root Tailwind Config (`/tailwind.config.ts`)
Centralizes content scanning so utilities inside packages generate even if not referenced directly in app code yet.

```ts
import type { Config } from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const designSystem = require('./packages/tailwind-config');

const config: Config = {
  content: [
    './apps/**/*.{js,jsx,ts,tsx,mdx}',
    './packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}',
    './packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  presets: [designSystem],
};
export default config;
```

---
## 🧪 4. Create an App (`apps/web`)
Example with Next.js (adjust commands if using another framework):
```bash
pnpm dlx create-next-app@latest apps/web --ts --eslint --app --tailwind false
```

Remove the generated Tailwind setup (since we’ll wire v4 manually) and add a minimal `postcss.config.mjs`:
```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

App `package.json` excerpt:
```json
{
  "name": "web",
  "private": true,
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@repo/tailwind-config": "workspace:*",
    "@repo/ui": "workspace:*"
  }
}
```

App-level Tailwind config (optional override) `apps/web/tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss';
import root from '../../tailwind.config';

const config: Config = {
  ...root,
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}'
  ],
};
export default config;
```

### Global stylesheet `apps/web/src/app/globals.css` (order matters!)
```css
@config "../../../../tailwind.config.ts"; /* root config */
@import "@repo/tailwind-config/design-tokens.css";      /* tokens */
@import "tailwindcss";                                  /* utilities */
/* Optional component layer(s) */
@import "@repo/ui/styles.css";
@import "@repo/modules/styles.css";

/* App semantic or runtime vars */
:root { }
.dark { }
```

In your root layout/component just import `./globals.css` once.

---
## 🧩 5. UI Component Package (`packages/ui`)
`package.json` excerpt:
```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "exports": { "./button": "./src/components/button.tsx", "./styles.css": "./src/styles.css" },
  "sideEffects": ["**/*.css"],
  "peerDependencies": { "react": "^19.0.0" }
}
```

`src/styles.css`:
```css
@import "@repo/tailwind-config/design-tokens.css"; /* local custom CSS may follow */
```

> Do **not** import `tailwindcss` here; you want to avoid re‑generating utilities.

Component file example:
```tsx
export const Button = ({ children, variant = 'primary' }) => (
  <button className="inline-flex items-center rounded-md px-4 py-2 bg-brand-500 text-white hover:bg-brand-700 transition">
    {children}
  </button>
);
```

---
## 🧱 6. Feature / Modules Package (Pattern Reuse)
Exactly the same approach: import tokens in a local optional stylesheet, export raw components referencing utilities.

---
## 🌗 7. Dark Mode / Theming
Add or override CSS variables in scopes; utilities stay stable:
```css
:root { --color-brand-500: #3b82f6; }
[data-theme="ocean"] { --color-brand-500: #0284c7; }
.dark { --color-brand-500: #2563eb; }
```

If you map semantic colors in the preset (e.g. `brand.500`), updates flow automatically.

---
## ♻️ 8. Adding / Changing Tokens
1. Edit `design-tokens.css`
2. Touch a scanned file or restart dev
3. Use the new utility immediately (e.g. `bg-brand-700`)

> If a class relies on dynamic runtime data (CMS, user themes) and never appears in static source, add it to a `safelist` in root config.

---
## 🔍 9. Verifying Utilities Exist
Quick script (optional):
```bash
needle="bg-brand-500"
grep -R "$needle" apps/web/.next || echo "(warn) utility not found yet"
```

Or open DevTools → Sources → compiled CSS and search.

---
## ⚠️ 10. Common Pitfalls
| Issue | Cause | Fix |
|-------|-------|-----|
| Missing utility | Tokens imported after `tailwindcss` | Ensure token import precedes utilities |
| Library classes unstyled | Package path absent from `content` | Add `packages/<name>/src/**/*` to root config |
| Huge CSS bundle | Each package ran Tailwind | Generate utilities only in apps |
| Theme not updating | Hard-coded hex vs. CSS vars | Use custom properties & override scopes |
| Token change ignored | Cache / dev server stale | Restart or modify a scanned file |

---
## 🚀 11. Performance & Scale Notes
* Keep `content` globs tight (`src/**/*`) – avoid scanning build outputs
* Use Turborepo caching; splitting tasks (`build`, `lint`, `typecheck`) speeds CI
* Avoid per‑package Tailwind builds in production pipelines
* Prefer CSS variable theming over regenerating multiple theme bundles

---
## 🧾 12. CI Integration (Example)
Add a step post‑build verifying a couple of critical utilities:
```bash
#!/usr/bin/env bash
set -e
for cls in bg-brand-500 w-half; do
  if ! grep -R "$cls" apps/web/.next >/dev/null 2>&1; then
    echo "[FAIL] Missing utility: $cls" >&2
    exit 1
  fi
done
echo "[OK] Core utilities present"
```

---
## 🧪 13. Optional Enhancements
| Enhancement | Idea |
|-------------|------|
| Storybook tokens panel | Import `design-tokens.css` & surface vars in a custom addon |
| Visual regression | Track color scale changes in Percy / Loki |
| Theming runtime UI | Let users toggle `data-theme` attributes | 
| Token docs generation | Parse `design-tokens.css` & build a docs table automatically |

---
## 🧹 14. Change Management Strategy
| Change Type | Action | Risk Mitigation |
|-------------|--------|-----------------|
| Add token | Append to `design-tokens.css` | Commit + screenshot review |
| Rename token | Add new + deprecate old comment | Search usages before removal |
| Delete token | Provide migration note | Run grep in repo & fix prior |
| Add library | Add its glob to root `content` | Build + verify utilities |

---
## 🗺 15. Quick Copy Templates
**Root import block (globals.css)**:
```css
@config "../../../../tailwind.config.ts";
@import "@repo/tailwind-config/design-tokens.css";
@import "tailwindcss";
```

**Package styles.css skeleton**:
```css
@import "@repo/tailwind-config/design-tokens.css"; /* tokens only */
/* package-specific selectors here */
```

**Dark theme override**:
```css
.dark { --color-brand-500: #2563eb; }
```

---
## 🧠 16. Mental Model Recap
Tokens → Utilities → Components → App Surface.

If something is missing ask: “Which layer failed?”
* Utility absent? → Was the token imported before Tailwind & path scanned?
* Style missing in component? → Did the app build include that package path?
* Theme not changing? → Are you overriding the underlying CSS variable?

---
## 🏁 17. Final Checklist
| Step | Verified |
|------|----------|
| Root config scans all source |  |
| Token file imported before Tailwind |  |
| No package ships compiled utilities |  |
| New tokens produce utilities instantly |  |
| Dark mode overrides only vars |  |
| CI script validates critical utilities |  |

---
## 🎯 Conclusion
You now have a **future‑proof, low‑duplication Tailwind v4 monorepo architecture**. Scaling to more apps or themes means: add a token, import once, ship. No purge battles. No duplicated CSS. Clear layering.

If you want a condensed TL;DR, component scaffolder script, or Storybook token explorer next—build on this foundation.

Happy shipping.
