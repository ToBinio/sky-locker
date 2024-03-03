import {FileData} from "~/utils/files";
import {mkdir, readFile, rmdir, writeFile} from "node:fs/promises";

export default defineEventHandler(async event => {
    let path = `data/${decodeURI(getRouterParam(event, "path")!)}`;;

    await rmdir(path)
})