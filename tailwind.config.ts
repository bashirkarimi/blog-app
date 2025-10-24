// Root Tailwind v4 config for the monorepo.
// Centralizes content scanning so utilities used inside package source
// (e.g. @repo/ui, @repo/modules) are generated for any consuming app.
// Apps can still have their own local tailwind.config to extend/override.
import type { Config } from "tailwindcss";

// Import shared theme/preset tokens (colors, radius, etc.)
// from the tailwind-config package (CommonJS export).
// eslint-disable-next-line @typescript-eslint/no-var-requires
const designSystem = require("./packages/tailwind-config");

const config: Config = {
  // Include all app source plus the raw source of workspace packages that
  // ship uncompiled TS/JS/JSX/TSX for Next to transpile (transpilePackages).
  content: [
    "./apps/**/*.{js,jsx,ts,tsx,mdx}",
    "./packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
    "./packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [designSystem],
};

export default config;
