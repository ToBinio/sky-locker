<script setup lang="ts">
import ProfileIcon from "~/components/auth/ProfileIcon.vue";
import FolderContainer from "~/components/folder/FolderContainer.vue";
</script>

<template>
  <div id="header">
    <span>
      <icon name="basil:unlock-outline" size="40"/>
      SkyLocker
    </span>
    <ProfileIcon/>
  </div>
  <div id="body">
    <div id="side-bar">
      <FolderContainer/>
    </div>

    <main>
      <slot/>
    </main>
  </div>
</template>

<style scoped>

#header {
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

#body{
  display: flex;

  #side-bar{
    width: 200px;
  }

  main{
    flex: 1
  }
}
</style>