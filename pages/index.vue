<script setup lang="ts">

import type {FileData} from "~/types/files";

let {data, pending, error, refresh} = useFetch<FileData[]>("/api/files/public");
</script>

<template>
  <h1>SkyLocker</h1>

  <div>
    <div v-for="file in data">
      {{ file.name }}
    </div>
  </div>
</template>

<style scoped>

</style>