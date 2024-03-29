import { readFile } from "node:fs/promises";
import { getPathFromGroup } from "~/server/utils/path";

export default defineEventHandler(async (event) => {
	const path = getPathFromGroup(event);
	return await readFile(`${path}`);
});
