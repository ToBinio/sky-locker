import {EventHandlerRequest, H3Event} from "h3";

export function getPathFromGroup(event: H3Event<EventHandlerRequest>): string {

    console.log(event.path);

    let parts = event.path.split("/");

    let start = parts.findIndex((part) => part == "files" || part == "file");

    let usedParts = parts.slice(start + 1)

    let dir = usedParts.join("/");

    console.log(dir);

    return `data/${dir}`;
}