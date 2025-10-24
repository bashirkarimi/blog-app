/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  // Content is defined in each consuming app for proper tree-shaking.
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-family-sans)",
        mono: "var(--font-family-mono)",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents }) {
      addBase({
        body: {
          fontFamily: "var(--font-family-sans)",
          fontFeatureSettings: '"kern"',
          fontOpticalSizing: "auto",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "code, pre, kbd, samp": {
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.95em",
        },
        "h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6": {
          scrollMarginTop: "2rem",
          color: "var(--foreground)",
        },
        "h1, .h1": {
          fontSize: "var(--font-size-h1)",
          lineHeight: "var(--line-height-h1)",
          fontWeight: "var(--font-weight-h1)",
          letterSpacing: "var(--letter-spacing-h1)",
          marginBottom: "var(--spacing-h1-mb)",
        },
        "h2, .h2": {
          fontSize: "var(--font-size-h2)",
          lineHeight: "var(--line-height-h2)",
          fontWeight: "var(--font-weight-h2)",
          letterSpacing: "var(--letter-spacing-h2)",
          marginBottom: "var(--spacing-h2-mb)",
        },
        "h3, .h3": {
          fontSize: "var(--font-size-h3)",
          lineHeight: "var(--line-height-h3)",
          fontWeight: "var(--font-weight-h3)",
          letterSpacing: "var(--letter-spacing-h3)",
          marginBottom: "var(--spacing-h3-mb)",
        },
        "h4, .h4": {
          fontSize: "var(--font-size-h4)",
          lineHeight: "var(--line-height-h4)",
          fontWeight: "var(--font-weight-h4)",
          letterSpacing: "var(--letter-spacing-h4)",
          marginBottom: "var(--spacing-h4-mb)",
        },
        "h5, .h5": {
          fontSize: "var(--font-size-h5)",
          lineHeight: "var(--line-height-h5)",
          fontWeight: "var(--font-weight-h5)",
          letterSpacing: "var(--letter-spacing-h5)",
          marginBottom: "var(--spacing-h5-mb)",
        },
        "h6, .h6": {
          fontSize: "var(--font-size-h6)",
          lineHeight: "var(--line-height-h6)",
          fontWeight: "var(--font-weight-h6)",
          letterSpacing: "var(--letter-spacing-h6)",
          marginBottom: "var(--spacing-h6-mb)",
        },
      });
      addComponents({
        ".heading-display": {
          fontSize: "clamp(3rem, 8vw, 5rem)",
          lineHeight: "1",
          fontWeight: "900",
          letterSpacing: "-0.03em",
        },
        ".heading-muted": {
          color: "var(--muted-foreground)",
        },
        ".heading-gradient": {
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        ".heading-balance": {
          textWrap: "balance",
        },
        ".heading-no-margin": {
          marginBottom: "0",
        },
      });
    }),
  ],
};
