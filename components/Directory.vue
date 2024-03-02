<script setup lang="ts">
import type {DirData} from "~/utils/files";

defineProps<{ dir: DirData, basePath: String }>();

const emits = defineEmits<{ remove: [] }>()

let open = ref(false);

function onToggle() {
  open.value = !open.value;
}

function onRemove() {
  emits("remove");
}

const folderIcon = computed(() => {
  return open.value ? "basil:folder-open-outline" : "basil:folder-outline";
})

</script>

<template>
  <div id="dir">
    <div id="element">
      <button class="myIcon" @click="onRemove">
        <icon name="basil:trash-alt-outline" size="24" color="var(--white)"/>
      </button>

      <button class="myIcon" @click="onToggle">
        <icon :name="folderIcon" size="24" color="var(--white)"/>
      </button>

      {{ dir.name }}
    </div>

    <div v-if="open" id="content">
      <DirectoryDisplay :base-path="`${basePath}/${dir.name}`"/>
    </div>
  </div>
</template>

<style scoped>
#dir {
  #element {

    height: var(--element-height);
    box-sizing: border-box;

    background: var(--base);
    padding: var(--gap);

    border-radius: var(--element-radius);

    display: flex;
    align-items: center;

    gap: var(--gap);

    color: var(--white);

  }

  #content {
    margin-left: 25px;
    margin-top: var(--gap);

    padding: var(--gap);

    border: 3px solid var(--base);
    border-radius: calc(var(--element-radius) + var(--gap));
  }
}

</style>