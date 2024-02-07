import {access, mkdir, readdir, stat} from "node:fs/promises";
import {FileData, DirData} from "~/types/files";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async event => {
    let path = getPathFromGroup(event);

    try {
        await access(path)
    } catch {
        setResponseStatus(event, 404);
        return
    }

    let files: FileData[] = []
    let dirs = []

    for (let name of await readdir(path)) {

        if ((await stat(`${path}/${name}`)).isFile()) {
            files.push({
                name: name
            } as FileData)
        } else {
            dirs.push({
                name: name
            } as DirData)
        }
    }

    return {
        files: files,
        dirs: dirs
    }
})