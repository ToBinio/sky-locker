import { defineStore } from "pinia";

export const useFolderRefresherStore = defineStore("folderRefresher", {
	state() {
		return {
			data: new Map<
				string,
				{
					parent?: () => void;
					self?: () => void;
				}
			>(),
		};
	},
	actions: {
		setParent(id: string, parent: () => void) {
			let data = this.data.get(id);

			if (!data) {
				data = {};
			}

			data.parent = parent;
			this.data.set(id, data);
		},
		setSelf(id: string, self: () => void) {
			let data = this.data.get(id);

			if (!data) {
				data = {};
			}

			data.self = self;
			this.data.set(id, data);
		},
		remove(id: string) {
			this.data.delete(id);
		},
		refreshParent(id: string) {
			const refreshFn = this.data.get(id);
			if (refreshFn && refreshFn.parent) refreshFn.parent();
		},
		refresh(id: string) {
			const refreshFn = this.data.get(id);
			if (refreshFn && refreshFn.self) refreshFn.self();
		},
	},
});
