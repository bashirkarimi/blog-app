import type { Config } from "tailwindcss"
const config: Pick<Config, "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  presets: [require("@repo/tailwind-config/postcss")],
}

export default config