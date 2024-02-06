<script setup lang="ts">

import type {FileData} from "~/types/files";

type uploadingFile = FileData & { loading: boolean }

let {data, refresh} = useFetch<{ files: FileData[] }>("/api/files/public");
const files = computed(() => data.value?.files);
const uploadingFiles = reactive<uploadingFile[]>([]);

async function onUploadFile(files: FileList) {
  for (let file of files) {
    let formData = new FormData();

    formData.append("file", file);

    uploadingFiles.push({name: file.name, loading: true})

    $fetch(`/api/files/public/upload`, {
      method: "POST",
      body: formData,
    }).then(async () => {
      await refresh()

      uploadingFiles.splice(uploadingFiles.findIndex(value => value.name == file.name), 1)
    })
  }

}

async function onRemove(file: FileData) {

  await $fetch(`/api/files/public/${file.name}`, {
    method: "DELETE",
  })

  await refresh()
}
</script>

<template>
  <h1>SkyLocker</h1>

  <div>
    <fileInput @upload="onUploadFile"/>
    <file v-for="file in files" :key="file.name" :file="file" @remove="() => onRemove(file)"/>
    <div v-for="file in uploadingFiles" :key="file.name">
      uploading...
      <a
          :href="`api/files/public/${file.name}`">
        {{ file.name }}
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>