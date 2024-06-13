import type { File } from "~/utils/types/file";

export default defineEventHandler(async (event): Promise<File[]> => {
	const folder = getRouterParam(event, "folder");
	const database = useDatabase();

	const result = await database.sql`
        SELECT name, id
        FROM file
        WHERE file.folder = ${folder}
    `;

	if (!result.rows) {
		setResponseStatus(event, 400);
		return [];
	}

	return result.rows.map((value) => {
		return {
			id: value.id as string,
			name: value.name as string,
		};
	});
});
