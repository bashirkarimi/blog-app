// Tailwind v4 config for the blog app.
// IMPORTANT: We must scan shared package source so utilities referenced only
// inside packages (e.g. @repo/modules, @repo/ui) are generated. Otherwise
// classes used in a library component won't appear because
// they never show up in the app's own source glob.
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/modules/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
