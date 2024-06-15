<script setup lang="ts">
import useFolderRefresher from "~/composables/useFolderRefresher";
import type { Folder } from "~/utils/types/folder";

const props = defineProps<{ folder: Folder }>();

const path = useRouterPath();

const { data, refresh } = await useFetch("/api/folder/", {
	query: {
		folder_id: props.folder.id,
	},
});
const showSubFolders = ref(false);

useFolderRefresher(props.folder.id, data, refresh);
</script>

<template>
  <div id="main">
    <div id="header">
      <NuxtLink :href="folder.id" :class="{current:folder.id == path}">
        {{ folder.name}}
      </NuxtLink>
      <div>
      <button v-if="data?.length !== 0" @click="() => {showSubFolders = !showSubFolders}" id="toggle" :class="{'open': showSubFolders}">
        <icon name="basil:caret-right-solid" size="24" color="black"/>
      </button>
      </div>
    </div>
    <div id="sub" v-if="showSubFolders">
        <FolderEntry v-for="sub_folder in data" :key="sub_folder.id" :folder="sub_folder"/>
    </div>
  </div>
</template>

<style scoped>
#main {
  margin-top: 5px;
  margin-bottom: 5px;

  #header {
    height: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: black;
      text-decoration: none;

      &.current{
        color: var(--blue);;
      }

      &:hover, &.current{
        --width: 2px;
        position: relative;

        &::after{
          position: absolute;
          top: 0;
          left: calc(var(--gap) * -1 - var(--width) / 2);

          display: block;

          content: "";
          height: 20px;
          width: var(--width);
          background: var(--blue);
        }
      }
    }

    #toggle{
      background: none;
      border: none;

      svg{
        transition: 0.1s rotate ease-out;
      }

      &.open{
        svg{
          rotate: 90deg;
        }
      }
    }
  }

  #sub{
    margin-left: var(--gap);
    border-left: 1px solid black;
    padding-left: var(--gap);
  }
}
</style>