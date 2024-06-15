<script setup lang="ts">
import ProfileIcon from "~/components/auth/ProfileIcon.vue";
import FolderContainer from "~/components/folder/FolderContainer.vue";
</script>

<template>
  <div id="page">
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
  </div>
</template>

<style scoped>
#page{
  height: 100vh;
  display: flex;
  flex-direction: column;

  #header {
    display: flex;
    justify-content: space-between;

    span {
      font-size: xx-large;
      font-weight: bold;

      display: flex;
      align-items: center;
    }

    padding: 20px;
  }

  #body{
    display: flex;
    overflow: hidden;
    flex: 1;

    #side-bar{
      width: 200px;
      height: 100%;
      overflow: scroll;
    }

    main{
      flex: 1;
      overflow: scroll;
    }
  }
}
</style>