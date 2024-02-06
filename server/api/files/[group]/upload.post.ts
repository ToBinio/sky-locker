import {FileData} from "~/types/files";
import {mkdir, readFile, writeFile} from "node:fs/promises";

export default defineEventHandler(async event => {

    let data = await readMultipartFormData(event);

    if (!data) {
        return
    }

    for (let file of data) {

        console.log(file);

        console.log(file.filename);
        await mkdir("data/public/", {recursive: true})
        await writeFile(`data/public/${file.filename}`, file.data)
    }
})