# @repo/tailwind-config

Shared Tailwind CSS configuration and design system tokens for the blog-app monorepo.

## 📦 Package Structure

```
@repo/tailwind-config/
├── index.js            # Tailwind config object (includes inline typography plugin)
├── design-tokens.css   # CSS custom properties (tokens only)
```

## 🎨 Design Tokens vs Styles

This package follows best practices by **separating design tokens from CSS styles**:

### Design Tokens (`design-tokens.css`)

- **Pure CSS custom properties** (variables)
- No actual CSS rules or selectors
- Defines colors, spacing, typography scales, breakpoints
- Imported **BEFORE** `@import "tailwindcss"`
- Can be used by any styling system

### Typography (Inline Plugin)

Headings (h1–h6 / .h1–.h6) and utilities (`.heading-display`, `.heading-muted`, `.heading-gradient`, `.heading-balance`, `.heading-no-margin`) are injected automatically via the plugin defined in `index.js`. No separate import required.

## 🚀 Usage

```css
/* apps/blog/src/app/globals.css */
@import "@repo/tailwind-config/design-tokens.css"; /* tokens first */
@import "tailwindcss"; /* Tailwind core */
/* Your custom styles here */
```

In `tailwind.config.ts`:

```ts
import shared from "@repo/tailwind-config";

export default {
  ...shared,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};
```

### In Your Tailwind Config

```js
// tailwind.config.ts
import baseConfig from "@repo/tailwind-config";

export default {
  ...baseConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
```

## 📐 Available Design Tokens

### Colors

- `--color-astral-{50-950}`: Astral color palette
- `--primary`, `--secondary`, `--accent`: Semantic colors
- `--background`, `--foreground`: Base colors
- `--muted`, `--card`, `--border`, etc.: UI elements

### Typography

- `--font-size-h1` through `--font-size-h6`: Responsive heading sizes
- `--line-height-h1` through `--line-height-h6`: Heading line heights
- `--font-weight-h1` through `--font-weight-h6`: Heading weights
- `--letter-spacing-h1` through `--letter-spacing-h6`: Heading spacing

### Layout

- `--layout-max-page`: 1940px (page maximum width)
- `--layout-max-content`: 1024px (content width)
- `--layout-max-panel`: 1040px (panel width)
- `--layout-max-reading`: 65ch (prose width)

### Breakpoints

- `--breakpoint-xs` through `--breakpoint-3xl`

## ✨ Typography Styles

Provided automatically by the inline plugin:

### Semantic HTML Elements

```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<!-- h3, h4, h5, h6 -->
```

### Utility Classes

```html
<!-- Apply heading styles to any element -->
<p class="h1">Styled like h1</p>
<div class="h3">Styled like h3</div>
```

### Modifier Classes

```html
<!-- Extra large display heading -->
<h1 class="heading-display">Hero Title</h1>

<!-- Muted color -->
<h2 class="heading-muted">Subtitle</h2>

<!-- Gradient text -->
<h1 class="heading-gradient">Gradient Heading</h1>

<!-- Better text wrapping -->
<h1 class="heading-balance">Multi-line Heading</h1>

<!-- Remove bottom margin -->
<h2 class="heading-no-margin">No Margin</h2>
```

## 🎯 Why This Structure?

### ✅ Benefits

- **Separation of Concerns**: Tokens vs implementations
- **Reusability**: Tokens can be used in JS, CSS-in-JS, etc.
- **Portability**: Easy to export tokens to design tools
- **Flexibility**: Import only what you need
- **Maintainability**: Easy to find and update tokens or styles
- **Build Safety**: Correct import order guaranteed

### ❌ Avoid Mixing

Don't put CSS rules in `design-tokens.css` - it breaks:

- Import order (tokens must come before Tailwind)
- Reusability (can't use in other contexts)
- Portability (design tools can't parse CSS rules)

## 🔄 Migration Guide

Remove any of these legacy imports if present:

```css
@import "@repo/tailwind-config/base.css";
@import "@repo/tailwind-config/typography.css";
```

Only keep:

```css
@import "@repo/tailwind-config/design-tokens.css";
@import "tailwindcss";
```

## 🤔 Customization

You can override heading styles by adding rules after the Tailwind import or by extending the plugin locally.

## 📚 Further Reading

- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
