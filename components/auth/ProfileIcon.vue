<script setup lang="ts">
import consola from "consola";

function onLogin() {
  let config = useRuntimeConfig();
  let clientId = config.public.githubAppClientId;

  const popup = window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${window.location.origin}/redirectAuth`, "popup", "popup,width=1280,height=720")

  if (popup == null) {
    consola.error("could not open LogIn popup")
    return
  }

  const checkPopup = setInterval(() => {
    try {
      if (popup.window.location.host == location.host) {
        setCode(popup.window.location);

        popup.close()
      }
    } catch (e) {
    }

    if (!popup || !popup.closed) return;

    clearInterval(checkPopup);
  }, 1000);
}

async function setCode(pageLocation: Location) {
  if (!pageLocation.search.startsWith("?code=")) {
    consola.error("no code was Provided from redirect", pageLocation);
    return
  }

  let code = pageLocation.search.split("?code=")[1];

  let data = await $fetch("/api/auth", {query: {code: code}})

  consola.debug(data);
}
</script>

<template>
  <button id="main" @click="onLogin">
    <icon name="basil:user-solid" size="40"/>
  </button>
</template>

<style scoped>
#main {
  background-color: var(--mid-base);
  padding: 5px;

  border: none;
  border-radius: 50%;

  transition: 200ms ease-in-out;

  &:hover {
    scale: 1.1;
  }
}
</style>