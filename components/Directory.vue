<script setup lang="ts">

import type {DirData} from "~/types/files";

defineProps<{ dir: DirData, basePath: String }>();

const emits = defineEmits<{ remove: [] }>()

function onRemove() {
  emits("remove")
}

</script>

<template>
  <button @click="() => onRemove">
    delete
  </button>
  <DirectoryDisplay :base-path="`${basePath}/${dir.name}`"/>
</template>

<style scoped>

</style>