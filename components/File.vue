<script setup lang="ts">
import type {FileData} from "~/types/files";

defineProps<{ file: FileData & { loading: boolean } }>();

const emits = defineEmits<{ remove: [] }>()

function onRemove() {
  emits("remove")
}

</script>

<template>
  <div>
    <button @click="onRemove" v-if="!file.loading">
      delete
    </button>
    <div v-if="file.loading">
      loading...
    </div>
    <a
        :href="`api/files/public/${file.name}`">
      {{ file.name }}
    </a>
  </div>
</template>

<style scoped>

</style>