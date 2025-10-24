// Tailwind config for local development of @repo/modules.
// Primary generation for production should occur in consuming apps, but this
// allows running build:styles for preview. Keep globs narrow here.
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
};
