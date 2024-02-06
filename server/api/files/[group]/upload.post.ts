import {FileData} from "~/types/files";
import {mkdir, readFile, writeFile} from "node:fs/promises";

export default defineEventHandler(async event => {
    const group = getRouterParam(event, "group")!;

    let data = await readMultipartFormData(event);

    if (!data) {
        return
    }

    await mkdir(`data/${group}/`, {recursive: true})

    for (let file of data) {
        await writeFile(`data/public/${file.filename}`, file.data)
    }
})