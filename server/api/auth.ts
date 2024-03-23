import consola from "consola";

export default defineEventHandler<Promise<string>>(async (event) => {
    const config = useRuntimeConfig(event);
    let params = getQuery<{ code: string }>(event);
    let code = params.code;

    let response = await $fetch<AccessToken>("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: {client_id: config.public.githubAppClientId, client_secret: config.githubAppClientSecret, code: code}
    })

    let user = await $fetch<User>("https://api.github.com/user", {headers: {"Authorization": `Bearer ${response.access_token}`}})

    consola.debug("user login", user)

    let database = useDatabase();

    let row = await database.sql`INSERT INTO session(name, avatar_url, github_id)
                                 VALUES (${user.login}, ${user.avatar_url}, ${user.id})
                                 RETURNING id`;

    return row.rows![0].id!.toString();
})

interface AccessToken {
    access_token: string,
    scope: string,
    token_type: string
}

interface User {
    id: string,
    login: string,
    avatar_url: string
}