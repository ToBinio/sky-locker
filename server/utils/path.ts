import type { EventHandlerRequest, H3Event } from "h3";

export function getPathFromGroup(event: H3Event<EventHandlerRequest>): string {
	let path = getRouterParam(event, "path");

	if (!path) {
		path = "";
	}

	return `data/${decodeURI(path)}`;
}
