import {unlink} from "node:fs/promises";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async (event) => {
	const path = getPathFromGroup(event);

	console.log(path);

	return await unlink(`${path}`);
});
