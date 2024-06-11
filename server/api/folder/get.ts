export default defineEventHandler(async (event): Promise<string> => {
    const query = getQuery<{ parent_id: string }>(event)
    const database = useDatabase();

    let result = await database.sql`
        SELECT name, id FROM folder
            WHERE folder.parent_folder = ${query.parent_id}
        `
    if (result.rows?.length === 1 && result.rows[0].id) {
        return result.rows[0].id.toString();
    }

    setResponseStatus(event, 500);
    return `something went wrong - ${result.rows}`;
});
