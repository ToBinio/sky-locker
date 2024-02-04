<script setup lang="ts">

import type {FileData} from "~/types/files";
import type {AsyncData} from "#app";
import {FetchError} from "ofetch";

let {data, pending, error, refresh} = useFetch<FileData[]>("/api/files/public") as AsyncData<FileData[], FetchError>;
</script>

<template>
  <h1>SkyLocker</h1>

  <div>
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