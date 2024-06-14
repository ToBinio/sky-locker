<script setup lang="ts">
const { data } = useFetch("/api/folder/base");
</script>

<template>
  <FolderEntry v-for="folder in data" :key="folder.id" :folder="folder" />
</template>

<style scoped>

</style>