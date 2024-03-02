import {EventHandlerRequest, H3Event} from "h3";

export function getPathFromGroup(event: H3Event<EventHandlerRequest>): string {
    let path = getRouterParam(event, "path")!;

    return `data/${decodeURI(path)}`;
}