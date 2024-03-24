import { mkdir, readFile, writeFile } from "node:fs/promises";
import { getPathFromGroup } from "~/server/utils/path";
import { FileData } from "~/utils/files";

export default defineEventHandler(async (event) => {
	const path = getPathFromGroup(event);

	const data = await readMultipartFormData(event);

	if (!data) {
		return;
	}

	await mkdir(`${path}/`, { recursive: true });

	for (const file of data) {
		await writeFile(`${path}/${file.filename}`, file.data);
	}
});
