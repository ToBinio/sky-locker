<script setup lang="ts">
import type { Folder } from "~/utils/types/folder";

const props = defineProps<{ folder: Folder }>();

const path = useRouterPath();

const { data, refresh } = useFetch("/api/folder/", {
	query: {
		folder_id: props.folder.id,
	},
});
const showSubFolders = ref(false);

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
  <div id="main">
    <div id="header">
      <NuxtLink :href="folder.id" :class="{current:folder.id == path}">
        {{ folder.name}}
      </NuxtLink>
      <div>
      <button @click="() => {showSubFolders = !showSubFolders}" class="myIcon">
        <icon v-if="showSubFolders" name="basil:caret-up-solid" size="24" color="var(--white)"/>
        <icon v-else name="basil:caret-down-solid" size="24" color="var(--white)"/>
      </button>
      </div>
    </div>
    <div id="sub" v-if="showSubFolders">
      <div id="line">
      </div>
      <div>
        <FolderEntry v-for="sub_folder in data" :key="sub_folder.id" :folder="sub_folder"/>
        <form id="folderInput" @submit.prevent="onCreateNewDir">
          <button class="myIcon" type="submit">
            <icon name="basil:folder-plus-outline" size="24" color="var(--white)"/>
          </button>
          <input v-model="dirname" type="text" name="dirName" placeholder="Folder Name">
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  margin-top: 5px;
  margin-bottom: 5px;

  #header {
    display: flex;
    justify-content: space-between;

    a {
      color: black;
      text-decoration: none;

      &.current{
        color: red;
      }
    }
  }

  #sub{
    display: flex;

    #line{
      background-color: black;

      width: 1px;
      margin: 5px;
    }

    #folderInput{
      display: flex;

      input{
        width: 100%;
      }
    }
  }
}
</style>