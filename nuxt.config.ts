// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	nitro: {
		experimental: {
			database: true,
			tasks: true,
		},
		database: {
			default: {
				connector: "postgresql",
				options: {
					url: "postgres://admin:admin@127.0.0.1/sky_locker",
				},
			},
		},
		scheduledTasks: {
			"* * * * *": ["db:deleteSessions"],
		},
	},
	modules: [
		"nuxt-icon",
		[
			"@nuxtjs/google-fonts",
			{
				families: {
					Inter: true,
				},
			},
		],
	],
	runtimeConfig: {
		jwtToken: "please set in .env",
		githubAppClientSecret: "please set in .env",
		public: {
			githubAppClientId: "please set in .env",
		},
	},
});
