import {FileData} from "~/types/files";
import {readFile} from "node:fs/promises";

export default defineEventHandler(async event => {
    const group = getRouterParam(event, "group")!;
    const file = getRouterParam(event, "file")!;

    return await readFile("data/" + group + "/" + file)
})