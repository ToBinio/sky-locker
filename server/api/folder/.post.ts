export default defineEventHandler(async (event): Promise<string> => {
	const body: { name: string; parent_id: string } = await readBody(event);
	const database = useDatabase();

	const result = await database.sql`
        INSERT INTO folder(name, parent_folder)
        VALUES (${body.name}, ${body.parent_id}) RETURNING id
    `;

	if (result.rows?.length === 1 && result.rows[0].id) {
		return result.rows[0].id.toString();
	}

	setResponseStatus(event, 500);
	return `something went wrong - ${result.rows}`;
});
