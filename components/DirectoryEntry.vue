<script setup lang="ts">
import type { DirData } from "~/utils/files";

defineProps<{ dir: DirData; basePath: string }>();

const emits = defineEmits<{ remove: [] }>();

const open = ref(false);

function onToggle() {
	open.value = !open.value;
}

function onRemove() {
	emits("remove");
}

const folderIcon = computed(() => {
	return open.value ? "basil:folder-open-outline" : "basil:folder-outline";
});
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
      <div id="innerContent">
        <DirectoryDisplay :base-path="`${basePath}/${dir.name}`"/>
      </div>
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

    &:has(+ #content) {
      border-bottom-right-radius: 0;
    }
  }

  #content {
    margin-left: calc(var(--element-height) - var(--gap));

    background: var(--base);


    border: var(--gap) solid var(--base);
    border-top: none;

    border-bottom-left-radius: calc(var(--element-radius) + var(--gap));
    border-bottom-right-radius: calc(var(--element-radius) + var(--gap));

    #innerContent {
      background: var(--light-base);
      padding: var(--gap);

      border-radius: var(--element-radius);
    }
  }
}

</style>