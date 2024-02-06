<script setup lang="ts">
import type {FileData} from "~/types/files";

defineProps<{ file: FileData }>();

const emits = defineEmits<{ remove: [] }>()

function onRemove() {
  emits("remove")
}

</script>

<template>
  <div>
    <button @click="onRemove">
      delete
    </button>
    <a
        :href="`api/files/public/${file.name}`">
      {{ file.name }}
    </a>
  </div>
</template>

<style scoped>

</style>