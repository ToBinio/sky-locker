import {mkdir, readdir} from "node:fs/promises";
import {FileData} from "~/types/files";

export default defineEventHandler(async event => {
    const group = getRouterParam(event, "group")!;

    await mkdir("data/" + group, {recursive: true})
    let filesNames = await readdir("data/" + group);

    let files = filesNames.map(value => {
        return {
            name: value
        } as FileData
    });

    return {
        files: files
    }
})