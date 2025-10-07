# Tailwind CSS v4 Monorepo Implementation Guide

Practical, scalable pattern for sharing design tokens and utilities across multiple apps & packages in a PNPM + Turborepo workspace.

---
## Core Goals
1. Single source of truth for design tokens (color, spacing, radii, fractions)
2. Generate utilities **once per app**, not per package
3. Library packages ship only components (zero/lean CSS)
4. Adding a new package or token never breaks existing styling
5. Runtime theming (dark mode, future brands) stays easy via CSS variables

---
## Layering Model (Conceptual Stack)
| Layer | Source | Purpose |
|-------|--------|---------|
| 1. Tokens | `@theme` in `design-tokens.css` | Raw design primitives (variables) |
| 2. Utilities | Tailwind build in app | Class generation from tokens (`bg-blue-1000`, `w-half`) |
| 3. Components | `@repo/ui`, `@repo/modules` | Class composition / minimal custom selectors |
| 4. App Surface | App `globals.css` + layouts | Layout, overrides, theming scopes |

Import order inside an app’s global stylesheet:
```css
@config "../../../../tailwind.config.ts";               /* root config (monorepo) */
@import "@repo/tailwind-config/design-tokens.css";       /* 1. tokens */
@import "tailwindcss";                                   /* 2. utilities from tokens */
@import "@repo/ui/styles.css";                           /* 3. optional lib layer */
@import "@repo/modules/styles.css";                      /* 3. optional lib layer */
/* 4. app overrides follow here */
```

---
## 1. Design Tokens (`packages/tailwind-config/design-tokens.css`)
```css
@theme {
  --color-blue-1000: #2a8af6;
  --color-purple-1000: #a853ba;
  --color-red-1000: #e92a67;
  --spacing-half: 50%;
  --spacing-third: 33.333333%;
  --spacing-two-thirds: 66.666667%;
  --spacing-quarter: 25%;
  --spacing-three-quarters: 75%;
  --spacing-fifth: 20%;
  --spacing-two-fifths: 40%;
  --spacing-three-fifths: 60%;
  --spacing-four-fifths: 80%;
  --spacing-hero: 50%;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.625rem;
  --radius-xl: 1rem;
}
```
▶ This file contains **only** tokens; it does **not** import Tailwind.

**Why CSS file (not JS)?** It stays tool-agnostic, lets designers inspect/override, and enables runtime theming by altering root custom properties.

---
## 2. Root Tailwind Config (Monorepo) – `tailwind.config.ts`
```ts
// Root config centralizes scanning & shared preset wiring.
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
This ensures utilities used **only** inside package source still generate.

---
## 3. App-Level Tailwind Config – `apps/<app>/tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss';
import root from '../../tailwind.config';

const config: Config = {
  ...root,
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}',
    '../../packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
};
export default config;
```
Override here only if you need app-specific safelist/plugins.

---
## 4. Global CSS Structure – Example `apps/blog/src/app/globals.css`
```css
@config "../../../../tailwind.config.ts";
@import "@repo/tailwind-config/design-tokens.css"; /* tokens */
@import "tailwindcss";                             /* utilities */
@import "@repo/ui/styles.css";                     /* (optional) library layer */
@import "@repo/modules/styles.css";                /* (optional) library layer */

/* App-specific variables / overrides */
:root { /* ... */ }
.dark { /* theme overrides */ }
```

---
## 5. Library Packages (`@repo/ui`, `@repo/modules`)
Each exposes components & (optionally) a lightweight `styles.css` that **only imports tokens**:
```css
@import "@repo/tailwind-config/design-tokens.css";
/* Add component-scoped custom rules here if needed (avoid full utility import). */
```
Avoid importing `tailwindcss` here to prevent shipping duplicated utilities.

---
## 6. Adding a New Package
1. Create package with `src/` components
2. (Optional) Add `src/styles.css` importing tokens
3. Add its source glob to root `tailwind.config.ts` `content` if components use unique utilities internally
4. Add its source glob to each app’s app-level `content` override if not relying solely on root inclusion
5. Import and use components; rebuild – utilities appear automatically

---
## 7. Adding New Tokens
1. Edit `design-tokens.css`
2. Restart dev or touch any file to invalidate cache
3. Use the new class (e.g. `bg-blue-1000`, `w-two-fifths`)

Tailwind automatically derives utilities from the naming pattern: `--color-*` → color utilities, `--spacing-*` → width/height/basis/flex utilities.

---
## 8. Theming / Dark Mode
Define semantic runtime vars (e.g. `--background`, `--foreground`) in the app’s `:root` / `.dark` scopes; tokens can reference them or you can map them in the Tailwind preset (`index.js`).

```css
.dark {
  --color-blue-1000: #1d6dc1; /* Updates all related utilities */
}
```

---
## 9. Safelisting Edge Cases
Dynamic / CMS-driven class names absent from static scan:
```ts
// tailwind.config.ts
export default {
  // ...
  safelist: ['bg-blue-1000', 'w-half'],
};
```

Prefer instead: ensure the dynamic set is small & render all potential classes somewhere in a scanned file.

---
## 10. Common Pitfalls
| Problem | Cause | Fix |
|---------|-------|-----|
| Missing utility | Tokens imported after Tailwind | Import tokens first (or keep tokens file token-only) |
| Library styles unstyled | Package path not in `content` | Add package `src` to root/app config |
| Bloated CSS | Multiple per-package builds emitting utilities | Rely on app-only Tailwind build |
| Theme not switching | Hard-coded colors in components | Use CSS vars & override them in theme scopes |
| Token edit ignored | Dev cache retained | Touch a scanned file / restart dev |

---
## 11. Conventions (Adopt & Enforce)
* Only `design-tokens.css` declares `@theme`
* All apps: tokens → tailwindcss → optional library CSS
* Root config owns the canonical `content` set
* Packages never ship full utility CSS to consumers
* Use runtime CSS custom properties for semantic theming

---
## 12. Quick Start Checklist
| Step | Action | Done? |
|------|--------|-------|
| 1 | Create `design-tokens.css` tokens file |  |
| 2 | Root `tailwind.config.ts` with all content globs |  |
| 3 | App `globals.css` import order correct |  |
| 4 | Library `styles.css` (tokens only) optional |  |
| 5 | Run dev & verify a token utility (e.g. `w-half`) compiles |  |
| 6 | Add new token & confirm new utility appears |  |

---
## 13. Verification Script (Optional CI)
```bash
#!/usr/bin/env bash
set -euo pipefail
needle="w-half"
if ! grep -R "$needle" apps/blog/.next 2>/dev/null; then
  echo "[FAIL] Missing $needle in compiled output" >&2
  exit 1
fi
echo "[OK] Found $needle"
```

---
## 14. Performance Tips
* Keep globs tight (`src/**/*` not the entire repo)
* Avoid duplicate builds (only apps run Tailwind)
* Leverage Turborepo caching for `next build`
* Remove unused token experiments promptly

---
## 15. Optional Token File Rename Strategy
Current name: `design-tokens.css`. (Earlier docs used `shared-styles.css`). Alternate shorter options: `tokens.css`, `theme-tokens.css`.
Safe migration pattern:
1. Add new file (e.g. `design-tokens.css`) with same content
2. Replace imports across repo
3. (If renaming again) Temporarily leave old filename containing `@import "./design-tokens.css";`
4. Remove old file after stabilization

---
## 16. Migration Audit (Adopting Pattern Later)
| Task | Status |
|------|--------|
| Remove Tailwind import from token file |  |
| Centralize root config with all globs |  |
| Update global CSS import order |  |
| Stop shipping utilities from packages |  |
| Add new tokens & verify sample utilities |  |

---
**Complete.** This guide reflects the current working implementation. Update it whenever token strategy, theming, or build layering changes.
