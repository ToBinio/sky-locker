<script setup lang="ts">
const path = useRouterPath();
const emit = defineEmits<{
	delete: [];
}>();

async function onDelete() {
	await $fetch("/api/folder/", {
		method: "DELETE",
		body: {
			id: path.value,
		},
	});

	emit("delete");
}
</script>

<template>
  <button v-if="path != ''" class="myIcon" @click="onDelete">
    <icon name="basil:trash-alt-outline" size="24" color="var(--white)"/>
  </button>
</template>

<style scoped>

</style>