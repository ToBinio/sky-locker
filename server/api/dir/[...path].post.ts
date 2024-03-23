import { mkdir, readFile, writeFile } from "node:fs/promises";
import { getPathFromGroup } from "~/server/utils/path";
import { FileData } from "~/utils/files";

export default defineEventHandler(async (event) => {
	const path = getPathFromGroup(event);

	await mkdir(path, { recursive: true });
});
