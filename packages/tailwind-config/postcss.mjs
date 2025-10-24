// Central PostCSS configuration shared across apps.
// ESM module so that consuming apps can import { postcssConfig } from "@repo/tailwind-config/postcss".
// Keep lightweight: apps own their own content glob + Tailwind config extension.

export const postcssConfig = {
  plugins: {
    // Tailwind v4 requires using the separate PostCSS plugin package.
    "@tailwindcss/postcss": {},
  },
};

export default postcssConfig;
