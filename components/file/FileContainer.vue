<script setup lang="ts">
import type { File, LoadingFile } from "~/utils/types/file";

const props = defineProps<{ path: string }>();

const { data, refresh, error } = await useFetch<LoadingFile[]>(
	`/api/files/${props.path}`,
);

if (error.value) {
	navigateTo("/");
}

const files = computed(() => {
	return data.value ? data.value : [];
});
const uploadingFiles = reactive<LoadingFile[]>([]);

const allFiles = computed(() => {
	const all = files.value.concat(uploadingFiles);
	all?.sort((a, b) => a.name.localeCompare(b.name));
	return all;
});

async function onUploadFile(files: FileList) {
	for (const file of files) {
		const uuid = crypto.randomUUID();
		const formData = new FormData();

		formData.append("file", file);

		uploadingFiles.push({ id: uuid, name: file.name, loading: true });

		$fetch(`/api/files/${props.path}`, {
			method: "POST",
			body: formData,
		})
			.then(async () => {
				await refresh();
			})
			.finally(() => {
				//todo error message
				uploadingFiles.splice(
					uploadingFiles.findIndex((value) => value.id === uuid),
					1,
				);
			});
	}
}

async function onRemoveFile(file: File) {
	await $fetch(`/api/file/${file.id}`, {
		method: "DELETE",
	});

	await refresh();
}
</script>

<template>
  <div id="main">
    <FileEntry v-for="file in allFiles" :key="file.id" :file="file" @remove="() => onRemoveFile(file)"
               :base-path="path"/>
    <FileInput @upload="onUploadFile"/>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  margin: var(--big-gap);
}
</style>