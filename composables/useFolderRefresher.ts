import { useFolderRefresherStore } from "~/stores/folderRefresher";
import type { Folder } from "~/utils/types/folder";
import type { Ref } from "vue";

export default function (
	id: string | undefined,
	folders: Ref<Folder[] | null>,
	refreshFn: () => void,
) {
	const folderRefresherStore = useFolderRefresherStore();

	onMounted(() => {
		if (id) {
			folderRefresherStore.setSelf(id, refreshFn);
		}

		watch(
			folders,
			(value, oldValue) => {
				if (oldValue)
					for (const folder of oldValue) {
						folderRefresherStore.remove(folder.id);
					}

				if (value)
					for (const folder of value) {
						folderRefresherStore.setParent(folder.id, refreshFn);
					}
			},
			{ immediate: true },
		);
	});

	onUnmounted(() => {
		if (folders.value)
			for (const folder of folders.value) {
				folderRefresherStore.remove(folder.id);
			}
	});
}
