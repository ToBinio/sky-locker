<script setup lang="ts">
import { useFolderRefresherStore } from "~/stores/folderRefresher";
import type { Folder } from "~/utils/types/folder";
import useFolderRefresher from "~/composables/useFolderRefresher";

const props = defineProps<{ folder: Folder }>();

const path = useRouterPath();

const { data, refresh } = useFetch("/api/folder/", {
	query: {
		folder_id: props.folder.id,
	},
});
const showSubFolders = ref(false);

//todo - fix type & use in folderContainer
useFolderRefresher(props.folder.id, data, refresh);
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
  }
}
</style>