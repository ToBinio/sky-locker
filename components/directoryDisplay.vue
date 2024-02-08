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

    $fetch(`/api/file/${props.basePath}`, {
      method: "POST",
      body: formData,
    }).then(async () => {
      await refresh()

      uploadingFiles.splice(uploadingFiles.findIndex(value => value.name == file.name), 1)
    })
  }
}

async function onRemoveFile(file: FileData) {
  await $fetch(`/api/files/${props.basePath}/${file.name}`, {
    method: "DELETE",
  })

  await refresh()
}

let dirName = ref("");

async function onCreateNewDir() {
  await $fetch(`/api/dir/${props.basePath}/${dirName.value}`, {
    method: "POST",
  })

  dirName.value = ""

  await refresh()
}

async function onRemoveDir(dir: DirData) {
  await $fetch(`/api/dir/${props.basePath}/${dir.name}`, {
    method: "DELETE",
  })

  await refresh()
}
</script>

<template>
  <div>
    <fileInput @upload="onUploadFile"/>
    <div>
      <h2>Dirs</h2>

      <div>
        <form @submit.prevent="onCreateNewDir">
          <input v-model="dirName" type="text" name="dirName">
          <button type="submit">new</button>
        </form>
      </div>

      <div v-for="dir in dirs">
        <div id="test">
          <button @click="() => onRemoveDir(dir)">
            delete
          </button>
          {{ dir.name }}
          <DirectoryDisplay :base-path="`${props.basePath}/${dir.name}`"/>
        </div>
      </div>
    </div>
    <div>
      <h2>Files</h2>

      <file v-for="file in files" :key="file.name" :file="file" @remove="() => onRemoveFile(file)"/>
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