// Tailwind v4 uses the @config directive, but we still provide this file so the
// CLI invoked via Next.js (or manual scripts) knows which content globs to scan.
// This expands scanning to the modules package so spacing utilities like w-half
// are emitted even if only used in app code.

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/modules/src/**/*.{js,jsx,ts,tsx}",
    // If you author shared UI components elsewhere add them here:
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"
  ]
};
