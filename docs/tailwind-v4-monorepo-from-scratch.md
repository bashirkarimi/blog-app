---
title: "Tailwind CSS v4 in a Turborepo / PNPM Monorepo – A From‑Scratch Guide"
description: "Step‑by‑step walkthrough to implement Tailwind CSS v4 with shared design tokens, multiple apps, and component packages in a modern monorepo."
author: "Your Name"
date: "2025-10-07"
tags:
  [
    "tailwindcss",
    "monorepo",
    "turborepo",
    "pnpm",
    "design-tokens",
    "frontend-architecture",
  ]
---

# Tailwind CSS v4 Monorepo Implementation (Blog-App)

Authoritative, up‑to‑date description of how Tailwind v4 is implemented in this PNPM + Turborepo workspace. This replaces earlier “from scratch” and “implementation” guides — duplication removed.

## 🎯 Core Principles (Current Implementation)

1. Token + utility bootstrap happens once per app via a single global stylesheet import sequence.
2. Design tokens live in `@repo/tailwind-config/design-tokens.css` and (currently) include `@import "tailwindcss"` followed by `@theme { ... }` for simplicity.
3. The Tailwind preset (`packages/tailwind-config/index.js`) maps CSS variables to semantic theme values (e.g. colors, fonts).
4. Packages (`@repo/ui`, `@repo/modules`, etc.) do **not** pre‑generate Tailwind output; they only reference utility classes.
5. Dark mode and future theming use CSS custom properties; overriding variables updates all dependent utilities.
6. Each app controls its own `content` globs (no central root `tailwind.config.*` file at present). This keeps tree‑shaking local and explicit.

> ⚠️ **Warning:** The current codebase diverges from recommended architecture. Earlier docs described a pure token file (without importing Tailwind) plus a shared root `tailwind.config.ts`. **This is the preferred pattern.**
> 
> **Current state is a temporary workaround and a known issue:** `design-tokens.css` imports Tailwind directly, which causes duplicate imports, bloated CSS, and breaks the separation of concerns. This is **not** a valid architectural pattern and should be reverted as soon as feasible.
> 
> **Action item:** Track this as technical debt. When possible, restore the pure token file pattern and update this documentation to reflect the fix.

---

## ✅ What Exists Today

- `packages/tailwind-config/design-tokens.css` – imports Tailwind core then declares all tokens + dark theme overrides.
- `packages/tailwind-config/index.js` – Tailwind preset extending fonts/colors from variables.
- `apps/blog/src/app/globals.css` – minimal bootstrap: `@import "tailwindcss"; @import "@repo/tailwind-config";` (via package export mapping to token file).
- `apps/blog/postcss.config.mjs` – PostCSS configuration with `@tailwindcss/postcss` plugin.
- `apps/docs` currently uses a custom CSS without Tailwind integration (can adopt pattern later).
- **No `tailwind.config.ts` files** – neither at root nor in any app. Tailwind v4's CSS-first approach allows configuration via `@theme` in design tokens. Per-app configs can be added when plugins or custom content globs are needed.

---

## 🧱 0. Prerequisites

| Tool      | Version (suggested)               |
| --------- | --------------------------------- |
| Node      | >= 18 LTS                         |
| PNPM      | >= 9 / 10                         |
| Turborepo | Bundled via `turbo` devDependency |
| Git       | Optional but recommended          |

```bash
pnpm -v
node -v
```

---

## 🗂 1. Workspace Skeleton (Simplified)

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
```

> **Note:** No root `tailwind.config.ts` is used in the current implementation. Tailwind v4's CSS-first approach allows all configuration via `@theme` in the design tokens file.

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

`design-tokens.css` (current state – includes Tailwind import + tokens):

```css
@import "tailwindcss";
@theme {
  /* Radii */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.625rem;
  --radius-xl: 1rem;

  /* Breakpoints */
  --breakpoint-xs: 320px;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1600px;
  --breakpoint-3xl: 1940px;

  /* Layout widths */
  --layout-max-page: var(--breakpoint-3xl);
  --layout-max-content: var(--breakpoint-lg);
  --layout-max-panel: 1040px;
  --layout-max-reading: 65ch;

  /* Heading typography (fluid clamp sizes) */
  --font-family-sans: var(--font-inter, "Inter"), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --font-size-h1: clamp(2.25rem, 5vw, 3.75rem);
  --font-size-h2: clamp(1.875rem, 4vw, 3rem);
  --font-size-h3: clamp(1.5rem, 3vw, 2.25rem);
  --font-size-h4: clamp(1.25rem, 2.5vw, 1.875rem);
  --font-size-h5: clamp(1.125rem, 2vw, 1.5rem);
  --font-size-h6: clamp(1rem, 1.5vw, 1.25rem);
  --line-height-h1: 1.1;
  --line-height-h2: 1.2;
  --line-height-h3: 1.25;
  --line-height-h4: 1.3;
  --line-height-h5: 1.35;
  --line-height-h6: 1.4;
  --font-weight-h1: 800;
  --font-weight-h2: 700;
  --font-weight-h3: 600;
  --font-weight-h4: 500;
  --font-weight-h5: 500;
  --font-weight-h6: 500;
  --letter-spacing-h1: -0.02em;
  --letter-spacing-h2: -0.015em;
  --letter-spacing-h3: -0.01em;
  --letter-spacing-h4: -0.005em;
  --letter-spacing-h5: 0;
  --letter-spacing-h6: 0;

  /* Astral palette subset */
  --color-astral-50: #f3f8fc;
  --color-astral-100: #e5f0f9;
  --color-astral-200: #c6e1f1;
  --color-astral-300: #94c9e5;
  --color-astral-400: #5badd5;
  --color-astral-500: #3186b1;
  --color-astral-600: #2676a3;
  --color-astral-700: #205e84;
  --color-astral-800: #1e506e;
  --color-astral-900: #1e435c;
  --color-astral-950: #142c3d;

  /* Semantic surfaces (light) */
  --background: var(--color-astral-50);
  --foreground: var(--color-astral-950);
  --card: #ffffff;
  --card-foreground: var(--color-astral-950);
  --popover: #ffffff;
  --popover-foreground: var(--color-astral-950);
  --primary: var(--color-astral-600);
  --primary-foreground: #ffffff;
  --secondary: var(--color-astral-200);
  --secondary-foreground: var(--color-astral-900);
  --muted: var(--color-astral-100);
  --muted-foreground: var(--color-astral-700);
  --accent: var(--color-astral-500);
  --accent-foreground: #ffffff;
  --success: #16a34a;
  --success-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: var(--color-astral-200);
  --input: var(--color-astral-200);
  --ring: var(--color-astral-500);
}

.dark {
  --background: var(--color-astral-950);
  --foreground: var(--color-astral-50);
  --card: var(--color-astral-900);
  --card-foreground: var(--color-astral-50);
  --popover: var(--color-astral-900);
  --popover-foreground: var(--color-astral-50);
  --primary: var(--color-astral-400);
  --primary-foreground: var(--color-astral-950);
  --secondary: var(--color-astral-800);
  --secondary-foreground: var(--color-astral-100);
  --muted: var(--color-astral-900);
  --muted-foreground: var(--color-astral-400);
  --accent: var(--color-astral-500);
  --accent-foreground: #ffffff;
  --success: #22c55e;
  --success-foreground: var(--color-astral-950);
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: var(--color-astral-800);
  --input: var(--color-astral-800);
  --ring: var(--color-astral-400);
}
```

`index.js` (preset excerpt – maps variables):

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--color-brand-50)",
          500: "var(--color-brand-500)",
          700: "var(--color-brand-700)",
        },
        accent: {
          500: "var(--color-accent-500)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [],
};
```

> Why keep tokens + preset separate? Tokens remain declarative; preset adds semantics/plugins. Import path simplicity currently exposes token file directly as default export (`"."` maps to `design-tokens.css`).

---

## 🏛 3. Tailwind Config Strategy

### Current Implementation

**No per-app or root `tailwind.config.ts` exists.** The current implementation relies entirely on:

1. CSS-based configuration via `@theme` in `design-tokens.css`
2. The Tailwind preset in `packages/tailwind-config/index.js`
3. PostCSS with `@tailwindcss/postcss` plugin

This means `apps/blog` does **not** have a `tailwind.config.ts` file. Tailwind v4's CSS-first approach handles configuration through the design tokens CSS file.

### When to Add a Per-App Config (Optional)

You may optionally create a per-app Tailwind config if you need to:

- Add Tailwind plugins
- Extend theme with app-specific values (safelist, etc.)
- Customize `content` globs beyond defaults

**Example** (only create if needed, e.g., `apps/your-app/tailwind.config.ts`):

```ts
import type { Config } from "tailwindcss";
// Use preset from package
// eslint-disable-next-line @typescript-eslint/no-var-requires
const preset = require("@repo/tailwind-config/index.js");

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
};
export default config;
```

> **Note:** The example above is for reference only. Currently, no app in this monorepo uses a `tailwind.config.ts` file.

### Future Improvements

Consider reintroducing a shared root config to reduce duplication across apps. When doing so, remove the `@import "tailwindcss"` from `design-tokens.css` and import tokens first in `globals.css`.

---

## 🧪 4. App Bootstrap (`apps/blog` example)

Example with Next.js (adjust commands if using another framework):

```bash
pnpm dlx create-next-app@latest apps/web --ts --eslint --app --tailwind false
```

Add (if missing) a `postcss.config.mjs` or `postcss.config.js` with Tailwind v4 PostCSS plugin:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

App `package.json` excerpt (ensure workspace deps):

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

App-level Tailwind config is optional. See Section 3 for when to add one and example configuration.

### Global stylesheet `apps/blog/src/app/globals.css`

Current minimal implementation:

```css
@import "tailwindcss"; /* Tailwind core */
@import "@repo/tailwind-config"; /* tokens + variables (design-tokens.css) */
```

If we switch back to token‑first pattern later it would become:

```css
@import "@repo/tailwind-config/design-tokens.css"; /* tokens */
@import "tailwindcss"; /* utilities built from tokens */
```

In your root layout/component just import `./globals.css` once.

---

## 🧩 5. UI Component Package (`packages/ui`)

`package.json` excerpt:

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "exports": {
    "./button": "./src/components/button.tsx",
    "./styles.css": "./src/styles.css"
  },
  "sideEffects": ["**/*.css"],
  "peerDependencies": { "react": "^19.0.0" }
}
```

Guideline: Components use utility classes directly; avoid importing `tailwindcss` inside the package to prevent duplicate builds. If package‑level custom selectors are needed, create a `styles.css` that imports only tokens.

Component file example:

```tsx
export const Button = ({ children, variant = "primary" }) => (
  <button className="bg-brand-500 hover:bg-brand-700 inline-flex items-center rounded-md px-4 py-2 text-white transition">
    {children}
  </button>
);
```

---

## 🧱 6. Modules Package Pattern

Exactly the same approach: import tokens in a local optional stylesheet, export raw components referencing utilities.

---

## 🌗 7. Dark Mode / Theming

Override variables in `.dark` or `[data-theme=...]` scopes; utilities referencing semantic colors update automatically:

```css
:root {
  --color-brand-500: #3b82f6;
}
[data-theme="ocean"] {
  --color-brand-500: #0284c7;
}
.dark {
  --color-brand-500: #2563eb;
}
```

If you map semantic colors in the preset (e.g. `brand.500`), updates flow automatically.

---

## ♻️ 8. Adding / Changing Tokens

1. Edit `design-tokens.css`
2. Touch a scanned file or restart dev
3. Use the new utility immediately (e.g. `bg-brand-700`)

If a future per‑app Tailwind config is added and you rely on dynamic class names (from CMS), introduce a `safelist` there.

---

## 🔍 9. Verifying Utilities Exist

Quick script (optional):

```bash
needle="bg-brand-500"
grep -R "$needle" apps/web/.next || echo "(warn) utility not found yet"
```

Or open DevTools → Sources → compiled CSS and search.

---

## ⚠️ 10. Common Pitfalls (Current State)

| Issue | Cause | Fix |
|-------|-------|-----|
| Variables not applied | Missing token import in app | Import `@repo/tailwind-config` in `globals.css` |
| Utility class missing | Content globs too narrow in app config | Add package/component paths to `content` array |
| Duplicate CSS | Imported `tailwindcss` inside a package | Restrict Tailwind import to app global stylesheet |
| Theme not switching | Hard-coded hex values instead of vars | Use semantic CSS variables and override them |
| Stale design change | Dev server cache | Touch a watched file or restart dev |


---

## 🚀 11. Performance & Scale Notes

- Keep `content` globs tight (`src/**/*`) – avoid scanning build outputs
- Use Turborepo caching; splitting tasks (`build`, `lint`, `typecheck`) speeds CI
- Avoid per‑package Tailwind builds in production pipelines
- Prefer CSS variable theming over regenerating multiple theme bundles

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

| Enhancement            | Idea                                                         |
| ---------------------- | ------------------------------------------------------------ |
| Storybook tokens panel | Import `design-tokens.css` & surface vars in a custom addon  |
| Visual regression      | Track color scale changes in Percy / Loki                    |
| Theming runtime UI     | Let users toggle `data-theme` attributes                     |
| Token docs generation  | Parse `design-tokens.css` & build a docs table automatically |

---

## 🧹 14. Change Management Strategy

| Change Type  | Action                          | Risk Mitigation              |
| ------------ | ------------------------------- | ---------------------------- |
| Add token    | Append to `design-tokens.css`   | Commit + screenshot review   |
| Rename token | Add new + deprecate old comment | Search usages before removal |
| Delete token | Provide migration note          | Run grep in repo & fix prior |
| Add library  | Add its glob to root `content`  | Build + verify utilities     |

---

## 🗺 15. Quick Copy Templates

**Current import block (globals.css)**:

```css
@import "tailwindcss";
@import "@repo/tailwind-config";
```

**Package styles.css skeleton (optional)**:

```css
@import "@repo/tailwind-config/design-tokens.css"; /* tokens only */
/* package-specific selectors here */
```

**Dark theme override**:

```css
.dark {
  --color-brand-500: #2563eb;
}
```

---

## 🧠 16. Mental Model Recap

Tokens → Utilities → Components → App Surface.

If something is missing ask: “Which layer failed?”

- Utility absent? → Was the token imported before Tailwind & path scanned?
- Style missing in component? → Did the app build include that package path?
- Theme not changing? → Are you overriding the underlying CSS variable?

---

## 🏁 17. Final Checklist

| Step                                              | Verified |
| ------------------------------------------------- | -------- |
| Design tokens defined in `design-tokens.css`      |          |
| Token file imported in app's `globals.css`        |          |
| PostCSS config uses `@tailwindcss/postcss`        |          |
| No package ships compiled Tailwind utilities      |          |
| New tokens produce utilities instantly            |          |
| Dark mode overrides only CSS variables            |          |
| (Optional) Per-app config added if plugins needed |          |

---

## 🎯 Conclusion

This consolidated guide matches the current implementation (token file imports Tailwind directly; no root shared config). Future refactors can revert to the purist layering (tokens → Tailwind import in app) to improve portability. Keep this document updated whenever the strategy changes rather than adding new overlapping guides.

For exhaustive token lists and typography utilities, see `packages/tailwind-config/README.md` (avoid duplicating that content here).

You now have a **future‑proof, low‑duplication Tailwind v4 monorepo architecture**. Scaling to more apps or themes means: add a token, import once, ship. No purge battles. No duplicated CSS. Clear layering.

If you want a condensed TL;DR, component scaffolder script, or Storybook token explorer next—build on this foundation.

Happy shipping.
