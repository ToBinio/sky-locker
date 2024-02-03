import {FileData} from "~/types/files";

export default defineEventHandler<FileData[]>(event => {
    const group = getRouterParam(event, "group")!;

    return [{name: "test"}, {name: "test2"}]
})