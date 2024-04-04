import consola from "consola";

export default defineEventHandler<Promise<string>>(async (event) => {
	const authorizationHeader = getHeader(event, "Authorization");

	if (!authorizationHeader) {
		setResponseStatus(event, 401);
		return "no Authorization set";
	}

	const authorization = authorizationHeader.split(" ");

	if (authorization.length !== 2 || authorization[0] !== "Bearer") {
		setResponseStatus(event, 401);
		return "no Bearer Token set";
	}

	const token = authorization[1];

	const database = useDatabase();

	const result = await database.sql`Select avatar_url
				 FROM session
				 where id = ${token}`;

	if (!result.rows || result.rows.length !== 1 || !result.rows[0].avatar_url) {
		setResponseStatus(event, 404);
		return "user not found";
	}

	return result.rows[0].avatar_url.toString();
});
