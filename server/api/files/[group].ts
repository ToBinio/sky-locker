import {mkdir, readdir} from "node:fs/promises";
import {FileData} from "~/types/files";

export default defineEventHandler(async event => {
    const group = getRouterParam(event, "group")!;

    let path = `data/${group}`;
    await mkdir(path, {recursive: true})

    let files = (await readdir(path)).map(value => {
        return {
            name: value
        } as FileData
    });

    return {
        files: files
    }
})