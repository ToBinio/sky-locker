<script setup lang="ts">
import { $fetch } from "ofetch";
import DirectoryInput from "~/components/input/DirectoryInput.vue";
import FileInput from "~/components/input/FileInput.vue";
import type { DirData, FileData } from "~/utils/files";

const props = defineProps<{ basePath: string }>();

const { data, refresh } = useFetch<{ files: FileData[]; dirs: DirData[] }>(
	`/api/files/${props.basePath}`,
);

const files = computed(() => {
	return data.value ? data.value.files : [];
});
const uploadingFiles = reactive<FileData[]>([]);

const allFiles = computed(() => {
	const all = files.value.concat(uploadingFiles);
	all?.sort((a, b) => a.name.localeCompare(b.name));
	return all;
});

const dirs = computed(() => data.value?.dirs);

async function onUploadFile(files: FileList) {
	for (const file of files) {
		const formData = new FormData();

		formData.append("file", file);

		uploadingFiles.push({ name: file.name, loading: true });

		$fetch(`/api/file/${props.basePath}`, {
			method: "POST",
			body: formData,
		})
			.then(async () => {
				await refresh();
			})
			.finally(() => {
				//todo error message
				uploadingFiles.splice(
					uploadingFiles.findIndex((value) => value.name === file.name),
					1,
				);
			});
	}
}

async function onRemoveFile(file: FileData) {
	await $fetch(`/api/file/${props.basePath}/${file.name}`, {
		method: "DELETE",
	});

	await refresh();
}

async function onCreateNewDir(name: string) {
	await $fetch(`/api/dir/${props.basePath}/${name}`, {
		method: "POST",
	});

	await refresh();
}

async function onRemoveDir(dir: DirData) {
	await $fetch(`/api/dir/${props.basePath}/${dir.name}`, {
		method: "DELETE",
	});

	await refresh();
}
</script>

<template>
  <div id="main">
    <DirectoryEntry v-for="dir in dirs" :dir="dir" :base-path="basePath" @remove="() => onRemoveDir(dir)"/>
    <DirectoryInput @new="onCreateNewDir"/>
    <FileEntry v-for="file in allFiles" :key="file.name" :file="file" @remove="() => onRemoveFile(file)"
               :base-path="basePath"/>
    <FileInput @upload="onUploadFile"/>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>