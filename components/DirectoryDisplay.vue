<script setup lang="ts">
import {$fetch} from "ofetch";
import type {DirData, FileData} from "~/utils/files";

const props = defineProps<{ basePath: string }>()

let {data, refresh} = useFetch<{ files: FileData[], dirs: DirData[] }>(`/api/files/${props.basePath}`);

const files = computed(() => {
  return data.value ? data.value.files : [];
});
const uploadingFiles = reactive<FileData[]>([]);

const allFiles = computed(() => {
  let all = files.value!.concat(uploadingFiles);
  all?.sort((a, b) => a.name.localeCompare(b.name))
  return all
})

const dirs = computed(() => data.value?.dirs);

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
    }).finally(() => {
      //todo error message
      uploadingFiles.splice(uploadingFiles.findIndex(value => value.name == file.name), 1)
    })
  }
}

async function onRemoveFile(file: FileData) {
  await $fetch(`/api/file/${props.basePath}/${file.name}`, {
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
  <div id="main">
    <Directory v-for="dir in dirs" :dir="dir" :base-path="basePath" @remove="() => onRemoveDir(dir)"/>
    <form id="folderInput" @submit.prevent="onCreateNewDir">
      <button class="myIcon" id="icon" type="submit">
        <icon name="basil:folder-plus-outline" size="24" color="var(--white)"/>
      </button>
      <input v-model="dirName" type="text" name="dirName" placeholder="Folder Name">
    </form>
    <file v-for="file in allFiles" :key="file.name" :file="file" @remove="() => onRemoveFile(file)"
          :base-path="basePath"/>
    <fileInput @upload="onUploadFile"/>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  #folderInput {
    cursor: pointer;

    height: var(--element-height);
    box-sizing: border-box;

    padding: calc(var(--gap) - 3px);

    background-color: var(--mid-base);

    border: 3px dotted var(--base);
    border-radius: var(--element-radius);

    display: flex;
    align-items: center;
    gap: var(--gap);

    input {
      background: none;
      border: none;
      border-bottom: 2px solid var(--base);

      color: white;
      font-size: 17px;
    }

    #icon {
      background-color: var(--base);
    }
  }
}
</style>