import {FileData} from "~/types/files";
import {mkdir, readFile, rmdir, writeFile} from "node:fs/promises";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async event => {
    let path = getPathFromGroup(event);

    await rmdir(path)
})