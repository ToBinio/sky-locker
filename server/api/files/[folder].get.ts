import type { File } from "~/utils/types/file";

export default defineEventHandler(async (event): Promise<File[]> => {
	const folder = getRouterParam(event, "folder");
	const database = useDatabase();

	if (
		!folder ||
		folder.match(
			"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
		) === null
	) {
		setResponseStatus(event, 400, "not a uuid");
		return [];
	}

	const existResult = await database.sql`
		SELECT EXISTS(SELECT 1 FROM folder WHERE folder.id = ${folder})
	`;

	if (!existResult.rows || !existResult.rows[0].exists) {
		setResponseStatus(event, 404, "not found");
		return [];
	}

	const filesResult = await database.sql`
        SELECT name, id
        FROM file
        WHERE file.folder = ${folder}
    `;

	if (!filesResult.rows) {
		setResponseStatus(event, 500, "something went wrong");
		return [];
	}

	return filesResult.rows.map((value) => {
		return {
			id: value.id as string,
			name: value.name as string,
		};
	});
});
