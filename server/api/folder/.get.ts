import type { Folder } from "~/utils/types/folder";

export default defineEventHandler(async (event): Promise<Folder[]> => {
	const query = getQuery<{ folder_id: string }>(event);
	const database = useDatabase();

	const result = await database.sql`
        SELECT name, id
        FROM folder
        WHERE folder.parent_folder = ${query.folder_id}
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
