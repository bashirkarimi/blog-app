// PostCSS config required by Next.js: must export an object with a `plugins` key.
// Keep minimal: Tailwind v4 via @tailwindcss/postcss (includes nesting & autoprefixer internally).
export default {
	plugins: {
		"@tailwindcss/postcss": {},
	},
};