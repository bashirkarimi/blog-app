// App-level Tailwind config extends the root monorepo config. Keeping this file
// (instead of deleting) preserves per-app overrides if needed later.
import type { Config } from "tailwindcss";
import root from "../../tailwind.config";

const config: Config = {
  ...root,
  // Narrow to just what this app actually needs while ensuring package src
  // stays included so utilities (e.g. 'relative' inside @repo/modules) build.
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
};

export default config;
