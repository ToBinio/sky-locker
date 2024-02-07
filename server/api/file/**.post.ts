import {FileData} from "~/types/files";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async event => {
    let path = getPathFromGroup(event);

    let data = await readMultipartFormData(event);

    if (!data) {
        return
    }

    await mkdir(`${path}/`, {recursive: true})

    for (let file of data) {
        await writeFile(`${path}/${file.filename}`, file.data)
    }
})