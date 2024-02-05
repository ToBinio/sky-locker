<script setup lang="ts">

import type {FileData} from "~/types/files";
import type {AsyncData} from "#app";
import {$fetch, FetchError} from "ofetch";

let {data, pending, error, refresh} = useFetch<FileData[]>("/api/files/public") as AsyncData<FileData[], FetchError>;

async function onUploadFile(event: { target: HTMLInputElement }) {
  for (let file of event.target.files) {
    let formData = new FormData();

    formData.append("file", file);

    await $fetch(`/api/files/public/upload`, {
      method: "POST",
      body: formData,
      // headers: {'Content-Disposition': formData}
    })
  }
}

</script>

<template>
  <h1>SkyLocker</h1>

  <div>
    <input type="file" @input="onUploadFile" multiple/>
    <div v-for="file in data">
      <a
          :href="`api/files/public/${file.name}`">
        {{ file.name }}
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>