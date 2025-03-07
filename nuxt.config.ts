// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
	app: {
		head: {
			title: "DitDah",
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					name: "description",
					content: "Morse encoder and decoder",
				},
			],
		},
	},
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	alias: {
		assets: "/<rootDir>/assets",
	},
	modules: ["@vueuse/nuxt", "@pinia/nuxt"],
	css: ["~/assets/css/main.css"],
	imports: {
		autoImport: true,
	},
	components: true,
	vite: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		plugins: [tailwindcss() as any, svgLoader()],
	},
});
