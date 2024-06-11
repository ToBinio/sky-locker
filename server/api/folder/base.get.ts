export default defineEventHandler(async (event): Promise<{ name: string, id: string }[]> => {
    const database = useDatabase();

    let result = await database.sql`
        SELECT name, id FROM folder
            WHERE folder.parent_folder is null
    `
    if (!result.rows)
        return []

    return result.rows.map(value => {
        return {
            id: value.id as string,
            name: value.name as string
        }
    });
});
