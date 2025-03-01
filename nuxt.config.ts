// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	alias: {
		assets: "/<rootDir>/assets",
	},
	css: ["~/assets/css/main.css"],
	vite: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		plugins: [tailwindcss() as any, svgLoader()],
	},
});
