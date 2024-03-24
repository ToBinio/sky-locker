import consola from "consola";

export default defineEventHandler<Promise<string>>(async (event) => {
	const config = useRuntimeConfig(event);
	const params = getQuery<{ code: string }>(event);
	const code = params.code;

	const response = await $fetch<AccessToken>(
		"https://github.com/login/oauth/access_token",
		{
			method: "POST",
			body: {
				client_id: config.public.githubAppClientId,
				client_secret: config.githubAppClientSecret,
				code: code,
			},
		},
	);

	const user = await $fetch<User>("https://api.github.com/user", {
		headers: { Authorization: `Bearer ${response.access_token}` },
	});

	const database = useDatabase();

	const row = await database.sql`INSERT INTO session(name, avatar_url, github_id)
                                 VALUES (${user.login}, ${user.avatar_url}, ${user.id})
                                 RETURNING id`;

	let session = "";

	if (row.rows?.length === 1 && row.rows[0].id) {
		session = row.rows[0].id.toString();
	}

	consola.info("user login", session);

	return session;
});

interface AccessToken {
	access_token: string;
	scope: string;
	token_type: string;
}

interface User {
	id: string;
	login: string;
	avatar_url: string;
}
