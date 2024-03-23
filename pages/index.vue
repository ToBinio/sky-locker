<script setup lang="ts">
import ProfileIcon from "~/components/auth/ProfileIcon.vue";
</script>

<template>
  <div id="header">
    <span>
      <icon name="basil:unlock-outline" size="40"/>
      SkyLocker
    </span>
    <ProfileIcon/>
  </div>

  <directoryDisplay base-path="public"/>
</template>

<style scoped>
#header{
  display: flex;
  justify-content: space-between;

  span {
    font-size: xx-large;
    font-weight: bold;

    display: flex;
    align-items: center;
  }

  margin: 20px;
}
</style>