<script setup lang="ts">
const emits = defineEmits<{ upload: [files: FileList] }>();


function onDrop(e: DragEvent) {

  if (!e.dataTransfer) {
    return
  }

  emits("upload", e.dataTransfer.files);
}

function onFileInput(e: { target: HTMLInputElement }) {

  if (!e.target || !e.target.files) {
    return
  }

  emits("upload", e.target.files);
}

</script>

<template>
  <input id="fileInput" type="file" @input="onFileInput" multiple/>
  <label for="fileInput" id="dropzone" @drop.prevent="onDrop" @dragover.prevent>upload File</label>
</template>

<style scoped>
input {
  display: none;
}
#dropzone {
  height: 80px;
  aspect-ratio: 3/1;

  border: 1px solid gray;

  display: flex;
  align-items: center;
  justify-content: center;

}
</style>