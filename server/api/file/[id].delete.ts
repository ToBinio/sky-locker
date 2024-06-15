import { unlink } from "node:fs/promises";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, "id");
	const database = useDatabase();

	await database.sql`
		DELETE
		FROM file
		WHERE id = ${id}
	`;

	return await unlink(`./data/${id}`);
});
