import consola from "consola";

export default defineTask({
	meta: {
		name: "db:deleteSessions",
		description: "delete old sessions",
	},
	async run() {
		const database = useDatabase();

		consola.info("running db cleanup");

		//todo: get time from .env
		await database.sql`DELETE
                           FROM session
                           WHERE creation_date < now() - Interval '5 MINUTES'`;

		return { result: "SUCCESS" };
	},
});
