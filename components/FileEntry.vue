<script setup lang="ts">
import type { FileData } from "~/utils/files";

defineProps<{ file: FileData; basePath: string }>();

const emits = defineEmits<{ remove: [] }>();

function onRemove() {
	emits("remove");
}
</script>

<template>
  <div id="file">
    <button class="myIcon" @click="onRemove" v-if="!file.loading">
      <icon name="basil:trash-alt-outline" size="24" color="var(--white)"/>
    </button>
    <div class="myIcon" v-if="file.loading">
      <icon name="line-md:uploading-loop" size="24" color="var(--white)"/>
    </div>
    <icon name="basil:file-outline" size="24" color="var(--white)"/>
    <a
        :href="`api/file/${basePath}/${file.name}`" target="_blank">
      {{ file.name }}
    </a>
  </div>
</template>

<style scoped>
#file {
  height: var(--element-height);
  box-sizing: border-box;

  background: var(--base);
  padding: var(--gap);

  border-radius: var(--element-radius);

  display: flex;
  align-items: center;

  gap: var(--gap);

  a {
    color: var(--white);
    text-decoration: none;
  }
}
</style>