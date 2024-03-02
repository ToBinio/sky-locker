<script setup lang="ts">

const emits = defineEmits<{ new: [name: string] }>();

let dirName = ref("");

function onCreateNewDir() {
  emits("new", dirName.value)
  dirName.value = ""
}

</script>
<template>
  <form id="folderInput" @submit.prevent="onCreateNewDir">
    <button class="myIcon" id="icon" type="submit">
      <icon name="basil:folder-plus-outline" size="24" color="var(--white)"/>
    </button>
    <input v-model="dirName" type="text" name="dirName" placeholder="Folder Name">
  </form>
</template>

<style scoped>
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
</style>
