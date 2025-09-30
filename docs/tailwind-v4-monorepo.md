# Tailwind CSS v4 Monorepo Setup Guide

A concise, repeatable pattern for sharing design tokens and utilities across apps and packages in this (or any similar) Turborepo/PNPM monorepo.

## Goals
- Single source of truth for design tokens (colors, spacing, etc.)
- Zero duplication of Tailwind utility generation across packages
- Component libraries ship lean CSS (or none) and rely on the app build
- Easy to add new tokens / packages without breaking styling

## Layering Model
1. Tokens: design primitives via `@theme` (no Tailwind import here)
2. Utilities: Tailwind generates utility classes from tokens
3. Components: class compositions & minimal custom CSS from libraries
4. App Overrides: per-app variables or layout tweaks

```
@import "@repo/tailwind-config/shared-styles.css"; /* tokens */
@import "tailwindcss";                             /* utilities */
@import "@repo/ui/styles.css";                     /* component styles (optional) */
```

## 1. Design Token Package (`packages/tailwind-config`)
File: `shared-styles.css`
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
}
```
Important: This file does **not** import `tailwindcss`. It only declares tokens.

## 2. App-Level Global CSS (Example: `apps/blog/src/app/globals.css`)
```css
@import "@repo/tailwind-config/shared-styles.css"; /* tokens first */
@import "tailwindcss";                             /* generate utilities */
/* Optional: library component CSS */
@import "@repo/ui/styles.css";
@import "@repo/modules/styles.css";
```
Add any root CSS or variable overrides after these imports.

## 3. Tailwind Config (App)
Example: `apps/blog/tailwind.config.ts`
```ts
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/modules/src/**/*.{js,jsx,ts,tsx}",
  ],
};
```
Why include package paths? So utilities used **only** inside library components (e.g. `bg-blue-1000`) are generated even if not referenced in app source directly.

## 4. Library Styles (Optional)
`packages/ui/src/styles.css`
```css
@import "@repo/tailwind-config/shared-styles.css";
@import "tailwindcss"; /* Only if you want utilities available for local story/dev */
```
For a leaner approach you can omit the Tailwind import here and let the app handle utilities. Then restrict this file to component-specific custom CSS.

## 5. Building vs. Relying on App Build
Recommended: Do **not** prebundle all utilities inside library `dist` CSS. Let apps compile Tailwind once with full content awareness. Use per-package Tailwind builds only for local isolated development or Storybook.

Example package build script (optional):
```json
"build:styles": "tailwindcss -c ./tailwind.config.ts -i ./src/styles.css -o ./dist/index.css"
```

## 6. Adding New Tokens
1. Edit `shared-styles.css`
2. Restart dev (or touch a content file)
3. Use classes (e.g. `bg-blue-1000`, `w-half`) directly.

Tailwind maps:
- `--color-blue-1000` -> `bg-blue-1000`, `text-blue-1000`, `border-blue-1000`
- `--spacing-half` -> `w-half`, `h-half`, `basis-half`, etc.

## 7. Dark Mode / Theming
Override token values using attribute or media queries:
```css
[data-theme="dark"] {
  --color-blue-1000: #1d6dc1;
}
```
Utilities retain the same class names; styles update through variable changes.

## 8. Safelisting (Optional)
If a utility is generated only dynamically (e.g. from CMS values) and not found in static source:
```ts
export default {
  content: [/* globs */],
  safelist: ["bg-blue-1000", "w-half"],
};
```

## 9. Common Pitfalls & Fixes
| Problem | Cause | Fix |
|---------|-------|-----|
| `bg-blue-1000` missing | Tokens defined but Tailwind imported earlier | Ensure tokens file imported before `tailwindcss` OR tokens defined before import if combined |
| Utility appears only after editing file | Content glob didn’t include library path at first | Add package paths to app `content` array |
| Bloated CSS | Libraries prebuilt full utilities | Remove library-level Tailwind builds from production flow |
| Color works in UI lib but not modules | App config scans UI path but not modules path | Add `../../packages/modules/src/**/*` to `content` |
| Runtime theme not switching | Hard-coded colors instead of variables | Use custom properties & override them in theme scopes |

## 10. Recommended Repository Conventions
- Tokens live only in `@repo/tailwind-config/shared-styles.css`
- No other file should define `@theme` (except small `@theme inline` overrides)
- All apps import tokens first, then Tailwind
- All apps include every library source path in `content`
- Libraries do not publish full utility CSS to avoid duplication

## 11. Quick Start (Fresh Project Template)
1. Create token package with `shared-styles.css` + `package.json` exporting it
2. Add app `globals.css` with token + tailwind imports
3. Add `tailwind.config.ts` in app pointing `content` to app + packages
4. Import and use classes like `bg-blue-1000` in a component
5. Run dev server; confirm utility exists in built CSS

## 12. Verification Script (Optional)
Create `scripts/check-tailwind.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
needle="bg-blue-1000"
if ! grep -R "$needle" apps/blog/.next 2>/dev/null; then
  echo "[FAIL] Missing $needle in compiled output" >&2
  exit 1
fi
echo "[OK] Found $needle"
```
Add to CI after build.

## 13. Updating / Refactoring
When adding a new package exporting React components:
- Add its `src` glob to each app’s `tailwind.config.*`
- Do **not** copy tokens or import Tailwind before tokens

## 14. Performance Tips
- Keep `content` globs as specific as practical to reduce scan time
- Avoid building utilities inside every package during CI (build once per app)
- Use Turborepo caching for the Tailwind build step

## 15. Migration Checklist (If Adopting This Pattern Later)
- [ ] Remove `@import "tailwindcss"` from token file if present
- [ ] Ensure tokens appear before Tailwind import in all global styles
- [ ] Centralize or synchronize `content` globs
- [ ] Remove duplicate utility CSS from library bundles
- [ ] Verify key token classes appear (`bg-blue-1000`, `w-half`)

---
**Done.** This file can be copied into any similar monorepo to bootstrap Tailwind v4 with shared tokens. Keep it updated as new design primitives and theming strategies evolve.
