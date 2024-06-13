import { readFile } from "node:fs/promises";

export default defineEventHandler(async (event) => {
	const query = getQuery<{ id: string }>(event);
	return await readFile(`./data/${query.id}`);
});
