import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import tailwind from "eslint-plugin-tailwindcss";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  // Tailwind CSS class linting & ordering
  {
    plugins: { tailwind },
    rules: {
      ...tailwind.configs.recommended.rules,
      // Enforce consistent class sorting (tailwind plugin v3 supports this via suggested rule name)
      "tailwindcss/classnames-order": "warn",
      // Flag arbitrary values without brackets or invalid tokens
      "tailwindcss/no-custom-classname": "off", // Keep off if using design system custom utilities
    },
    settings: {
      tailwindcss: {
        callees: ["clsx", "cn", "cva"],
        whitelist: [],
      },
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
