<script setup lang="ts">
import type {DirData, FileData} from "~/types/files";

type uploadingFile = FileData & { loading: boolean }

const props = defineProps<{ basePath: string }>()

let {data, refresh} = useFetch<{ files: FileData[], dirs: DirData[] }>(`/api/files/${props.basePath}`);

const files = computed(() => data.value?.files);
const dirs = computed(() => data.value?.dirs);

const uploadingFiles = reactive<uploadingFile[]>([]);

async function onUploadFile(files: FileList) {
  for (let file of files) {
    let formData = new FormData();

    formData.append("file", file);

    uploadingFiles.push({name: file.name, loading: true});

    console.log(`/api/file/${props.basePath}`);

    $fetch(`/api/file/${props.basePath}`, {
      method: "POST",
      body: formData,
    }).then(async () => {
      await refresh()

      uploadingFiles.splice(uploadingFiles.findIndex(value => value.name == file.name), 1)
    })
  }
}

async function onRemove(file: FileData) {
  await $fetch(`/api/files/${props.basePath}/${file.name}`, {
    method: "DELETE",
  })

  await refresh()
}
</script>

<template>
  <div>
    {{ basePath }}
    <fileInput @upload="onUploadFile"/>
    <div>
      <h2>Dirs</h2>

      <div v-for="dir in dirs">
        <div id="test">
          {{ dir.name }}
          <DirectoryDisplay :base-path="`${props.basePath}/${dir.name}`"/>
        </div>
      </div>
    </div>
    <div>
      <h2>Files</h2>

      <file v-for="file in files" :key="file.name" :file="file" @remove="() => onRemove(file)"/>
      <div v-for="file in uploadingFiles" :key="file.name">
        uploading...
        <a
            :href="`api/file/public/${file.name}`">
          {{ file.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#test {
  border: red 1px solid;
}
</style>