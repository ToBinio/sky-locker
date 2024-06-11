<script setup lang="ts">
import type { Folder } from "~/utils/types/folder";

const props = defineProps<{ folder: Folder }>();

const { data, refresh } = useFetch("/api/folder/", {
	query: {
		folder_id: props.folder.id,
	},
});

const dirname = ref("");

async function onCreateNewDir() {
	await $fetch("/api/folder/", {
		method: "POST",
		body: {
			name: dirname.value,
			parent_id: props.folder.id,
		},
	});

	await refresh();
}
</script>

<template>
  <div>
    {{ folder.name}}

    <div id="sub">
      <div id="line">
      </div>
      <div>
        <FolderEntry v-for="sub_folder in data" :folder="sub_folder"/>
      </div>
    </div>

    <form id="folderInput" @submit.prevent="onCreateNewDir">
      <button class="myIcon" id="icon" type="submit">
        <icon name="basil:folder-plus-outline" size="24" color="var(--white)"/>
      </button>
      <input v-model="dirname" type="text" name="dirName" placeholder="Folder Name">
    </form>
  </div>
</template>

<style scoped>
#sub{
  display: flex;

  #line{
    background-color: black;

    width: 1px;
    margin: 5px;
  }
}

#folderInput{
  display: flex;

  input{
    width: 100%;
  }
}
</style>