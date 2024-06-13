import { mkdir, readFile, writeFile } from "node:fs/promises";

export default defineEventHandler(async (event) => {
	const files = await readMultipartFormData(event);
	const folder = getRouterParam(event, "folder");

	const database = useDatabase();

	if (!files) {
		return;
	}

	await mkdir("data/", { recursive: true });

	for (const file of files) {
		const result = await database.sql`
			INSERT INTO file(name, folder)
			VALUES (${file.filename}, ${folder}) RETURNING id
		`;

		if (result.rows?.length === 1 && result.rows[0].id) {
			const uuid = result.rows[0].id.toString();
			await writeFile(`data/${uuid}`, file.data);
		} else {
			setResponseStatus(event, 500);
			return;
		}
	}
});
