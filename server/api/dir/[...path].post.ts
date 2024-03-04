import {FileData} from "~/utils/files";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async event => {
    let path = getPathFromGroup(event);

    await mkdir(path, {recursive: true})
})