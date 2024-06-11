<script setup lang="ts">
import FolderEntry from "~/components/folder/FolderEntry.vue";

const { data } = useFetch("/api/folder/base");
</script>

<template>
  <FolderEntry v-for="folder in data" :folder="folder" />
</template>

<style scoped>

</style>