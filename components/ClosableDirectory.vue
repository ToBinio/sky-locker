<script setup lang="ts">
import type {DirData} from "~/types/files";

defineProps<{ dir: DirData, basePath: String }>();

const emits = defineEmits<{ remove: [] }>()

let open = ref(false);

function onToggle() {
  open.value = !open.value;
}

</script>

<template>
  <div id="dir">
    {{ dir.name }}
    <button @click="onToggle">toggle</button>

    <Directory v-if="open" :base-path="basePath" :dir="dir" @remove="emits('remove')"/>
  </div>
</template>

<style scoped>
#dir {
  border: 1px solid black;
}
</style>