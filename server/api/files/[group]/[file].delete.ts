import {readFile, unlink} from "node:fs/promises";

export default defineEventHandler(async event => {
    const group = getRouterParam(event, "group")!;
    const file = getRouterParam(event, "file")!;

    return await unlink(`data/${group}/${file}`)
})