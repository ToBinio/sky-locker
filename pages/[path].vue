<script setup lang="ts">
const route = useRoute();

const path = computed(() => {
	if (typeof route.params.path === "string") {
		return route.params.path;
	}
	return route.params.path[0];
});
</script>

<template>
  <directoryDisplay :base-path="path"/>
</template>

<style scoped>
</style>