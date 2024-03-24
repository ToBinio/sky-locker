import { access, mkdir, readdir, stat } from "node:fs/promises";
import { getPathFromGroup } from "~/server/utils/path";
import type { DirData, FileData } from "~/utils/files";

export default defineEventHandler(async (event) => {
	const path = getPathFromGroup(event);

	try {
		await access(path);
	} catch {
		setResponseStatus(event, 404);
		return;
	}

	const files: FileData[] = [];
	const dirs = [];

	for (const name of await readdir(path)) {
		if ((await stat(`${path}/${name}`)).isFile()) {
			files.push({
				name: name,
			} as FileData);
		} else {
			dirs.push({
				name: name,
			} as DirData);
		}
	}

	return {
		files: files,
		dirs: dirs,
	};
});
