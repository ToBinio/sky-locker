<script setup lang="ts">
</script>

<template>
  <NuxtPage/>
</template>

<style>
html {
  --base: #222831;
  --mid-base: #393E46;
  --light-base: #474d57;
  --blue: #00ADB5;
  --white: #EEEEEE;

  --element-height: 40px;
  --element-radius: 10px;
  --gap: 5px;

  background-color: var(--light-base);;
}

* {
  font-family: inter, serif;
}

.myIcon {
  cursor: pointer;

  background: var(--mid-base) none;
  border: none;
  border-radius: calc(var(--element-radius) - var(--gap));
  padding: 3px;

  svg {
    transition: 0.1s ease-in-out;
  }

  &:hover {
    svg {
      scale: 1.1;
    }
  }
}
</style>
