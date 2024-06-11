export default defineEventHandler(async (event) => {
	const body: { id: string } = await readBody(event);
	const database = useDatabase();

	const result = await database.sql`
        DELETE FROM folder
        	WHERE folder.id = ${body.id}
	`;
});
