# @repo/modules

Shared content modules.

## Tailwind Theme & Custom Spacing

This package relies on the shared design tokens exported from `@repo/tailwind-config`.

The shared theme (`shared-styles.css`) defines percentage spacing / width tokens such as:

```
--spacing-half: 50%;
--spacing-third: 33.333333%;
--spacing-two-thirds: 66.666667%;
--spacing-quarter: 25%;
--spacing-three-quarters: 75%;
```

Tailwind v4 automatically turns these into utility classes:

| Token | Utility examples |
|-------|------------------|
| `--spacing-half` | `w-half`, `h-half`, `basis-half` |
| `--spacing-third` | `w-third`, `basis-third` |
| `--spacing-two-thirds` | `w-two-thirds`, `basis-two-thirds` |
| `--spacing-quarter` | `w-quarter` |
| `--spacing-three-quarters` | `w-three-quarters` |

If you consume `@repo/modules` inside an application and only use a spacing utility *in the app code* (and not inside the module source), be sure the **app's** Tailwind content configuration includes the module source paths so those utilities are generated. Example `tailwind.config.js` in an app:

```js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/modules/src/**/*.{js,jsx,ts,tsx}",
  ]
};
```

Then in the app's global stylesheet:

```css
@config "./tailwind.config.js";
@import "tailwindcss";
@import "@repo/tailwind-config/shared-styles.css";
@import "@repo/modules/styles.css"; /* component styles */
```

This ensures classes like `w-half` or `w-two-thirds` appear in the compiled CSS even if they are only referenced inside application-level layouts.

### Color Tokens

Shared color tokens (e.g. `--color-blue-1000`) become utilities like `bg-blue-1000`, `text-blue-1000`, `border-blue-1000` once the shared theme is imported *before* `@import "tailwindcss"` in the consuming stylesheet. If you don't see a color utility:

1. Confirm the order in your root CSS: shared theme first, then `tailwindcss`.
2. Make sure the class name (e.g. `bg-blue-1000`) appears in a scanned content file.
3. If testing quickly, add the class directly in a component within a scanned path and restart the dev server.
