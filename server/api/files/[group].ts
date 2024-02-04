import {readdir} from "node:fs/promises";
import {FileData} from "~/types/files";

export default defineEventHandler(async event => {
    const group = getRouterParam(event, "group")!;

    let filesNames = await readdir("data/" + group);

    return filesNames.map(value => {
        return {
            name: value
        } as FileData
    })
})