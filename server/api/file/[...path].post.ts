import {FileData} from "~/utils/files";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async event => {
    let path = `data/${decodeURI(getRouterParam(event, "path")!)}`;;

    let data = await readMultipartFormData(event);

    if (!data) {
        return
    }

    await mkdir(`${path}/`, {recursive: true})

    for (let file of data) {
        await writeFile(`${path}/${file.filename}`, file.data)
    }
})