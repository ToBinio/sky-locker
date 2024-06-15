<script setup lang="ts">
import { useFolderRefresherStore } from "~/stores/folderRefresher";

const path = useRouterPath();
const hasPath = computed(() => {
	return path.value !== "";
});
const iconColor = computed(() => {
	return hasPath.value ? "var(--white)" : "var(--very-light-base)";
});

const folderRefresherStore = useFolderRefresherStore();

async function onDelete() {
	await $fetch("/api/folder/", {
		method: "DELETE",
		body: {
			id: path.value,
		},
	});

	folderRefresherStore.refreshParent(path.value);
}

const dirname = ref("");

async function onCreateNewDir() {
	await $fetch("/api/folder/", {
		method: "POST",
		body: {
			name: dirname.value,
			parent_id: path.value,
		},
	});

	folderRefresherStore.refresh(path.value);
}
</script>

<template>
  <button :disabled="!hasPath" class="myIcon" @click="onDelete">
    <icon name="basil:trash-alt-outline" size="24" :color="iconColor"/>
  </button>
  <form :disabled="!hasPath" id="folderInput" @submit.prevent="onCreateNewDir">
    <button class="myIcon" type="submit">
      <icon name="basil:folder-plus-outline" size="24" :color="iconColor"/>
    </button>
    <input v-model="dirname" type="text" name="dirName" placeholder="Folder Name">
  </form>
</template>

<style scoped>
#folderInput{
  display: flex;

  input{
    width: 100%;
  }
}
</style>