<script setup lang="ts">

import type {FileData} from "~/types/files";

let {data, refresh} = useFetch<{ files: FileData[] }>("/api/files/public");
const files = computed(() => data.value?.files);

async function onUploadFile(event: { target: HTMLInputElement }) {

  if (!event.target.files) {
    return
  }

  for (let file of event.target.files) {
    let formData = new FormData();

    formData.append("file", file);

    await $fetch(`/api/files/public/upload`, {
      method: "POST",
      body: formData,
    })

    await refresh()
  }
}

async function onDrop(event: { dataTransfer: HTMLInputElement }) {

  if (!event.dataTransfer.files) {
    return
  }

  for (let file of event.dataTransfer.files) {
    let formData = new FormData();

    formData.append("file", file);

    await $fetch(`/api/files/public/upload`, {
      method: "POST",
      body: formData,
    })

    await refresh()
  }
}

</script>

<template>
  <h1>SkyLocker</h1>

  <div>
    <div id="dropzone" @drop.prevent="onDrop" @dragover.prevent>
      upload
    </div>
    <input type="file" @input="onUploadFile" multiple/>
    <div v-for="file in files">
      <a
          :href="`api/files/public/${file.name}`">
        {{ file.name }}
      </a>
    </div>
  </div>
</template>

<style scoped>

#dropzone {
  background-color: gray;
  height: 100px;
}
</style>