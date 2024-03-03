import {readFile, unlink} from "node:fs/promises";
import {getPathFromGroup} from "~/server/utils/path";

export default defineEventHandler(async event => {
    let path = `data/${decodeURI(getRouterParam(event, "path")!)}`;;

    console.log(path);

    return await unlink(`${path}`)
})