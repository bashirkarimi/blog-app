const path = require("node:path");
const sharedConfig = require("@repo/tailwind-config");

const withAbsoluteGlobs = (patterns) =>
  patterns.map((pattern) =>
    path.join(__dirname, pattern).replace(/\\/g, "/")
  );

const contentGlobs = withAbsoluteGlobs([
  "./src/**/*.{js,jsx,ts,tsx,mdx}",
  "../../packages/modules/src/**/*.{js,jsx,ts,tsx,mdx}",
  "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
]);
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: contentGlobs,
};

console.log("[tailwind] loaded config with content globs", contentGlobs);
