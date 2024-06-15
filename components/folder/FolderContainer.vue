<script setup lang="ts">
import FolderHeader from "~/components/folder/FolderHeader.vue";
import useFolderRefresher from "~/composables/useFolderRefresher";

const { data, refresh } = useFetch("/api/folder/base");

useFolderRefresher(undefined, data, refresh);
</script>

<template>
  <FolderHeader/>
  <FolderEntry v-for="folder in data" :key="folder.id" :folder="folder" />
</template>

<style scoped>

</style>