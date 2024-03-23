<script setup lang="ts">
const emits = defineEmits<{ upload: [files: FileList] }>();

let id = useId();

function onDrop(e: DragEvent) {

  if (!e.dataTransfer) {
    return
  }

  emits("upload", e.dataTransfer.files);
}

function onFileInput(e: Event) {

  let target = e.target as HTMLInputElement;

  if (!target || !target.files) {
    return
  }

  emits("upload", target.files);
}

</script>

<template>
  <div>
    <input :id="`fileInput-${id}`" type="file" @input="onFileInput" multiple/>
    <label :for="`fileInput-${id}`" id="dropzone" @drop.prevent="onDrop" @dragover.prevent>
    <span class="myIcon" id="icon">
      <icon name="basil:upload-outline" size="24" color="var(--white)"/>
    </span>
      Upload File
    </label>
  </div>
</template>

<style scoped>
input {
  display: none;
}

#dropzone {
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

  color: white;

  #icon {
    background-color: var(--base);
  }
}
</style>