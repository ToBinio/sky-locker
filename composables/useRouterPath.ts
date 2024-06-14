export default function () {
	const route = useRoute();

	const path = computed(() => {
		if (!route.params || !route.params.path) {
			return "";
		}

		if (typeof route.params.path === "string") {
			return route.params.path;
		}

		return route.params.path[0];
	});

	return path;
}
