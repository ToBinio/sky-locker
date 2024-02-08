import {EventHandlerRequest, H3Event} from "h3";

export function getPathFromGroup(event: H3Event<EventHandlerRequest>): string {

    let parts = event.path.split("/");

    let start = parts.findIndex((part) => part == "files" || part == "file" || part == "dir");

    let usedParts = parts.slice(start + 1)

    let dir = usedParts.join("/");

    return `data/${dir}`;
}