<script setup lang="ts">
import FolderHeader from "~/components/folder/FolderHeader.vue";
import useFolderRefresher from "~/composables/useFolderRefresher";

const { data, refresh } = useFetch("/api/folder/base");

useFolderRefresher(undefined, data, refresh);
</script>

<template>
  <div id="sideBar">
    <FolderHeader/>
    <FolderEntry v-for="folder in data" :key="folder.id" :folder="folder" />
  </div>
</template>

<style scoped>
#sideBar{
  height: 100%;

  box-sizing: border-box;
  padding: var(--big-gap);

  border-right: 1px solid var(--base);
}
</style>