<script setup lang="ts">
import FolderHeader from "~/components/folder/FolderHeader.vue";

const { data, refresh } = useFetch("/api/folder/base");
</script>

<template>
  <FolderHeader @delete="refresh"/>
  <FolderEntry v-for="folder in data" :key="folder.id" :folder="folder" />
</template>

<style scoped>

</style>