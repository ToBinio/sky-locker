<script setup lang="ts">
import { asyncComputed } from "@vueuse/core";
import consola from "consola";
import { $fetch } from "ofetch";

const session = useCookie("session");

const avatar = asyncComputed(async () => {
	if (!session.value) {
		return undefined;
	}

	try {
		return await $fetch("/api/user/avatar", {
			headers: { Authorization: `Bearer ${session.value}` },
		});
	} catch (e) {
		consola.error(e);
		session.value = undefined;
	}
}, undefined);

function onLogin() {
	const config = useRuntimeConfig();
	const clientId = config.public.githubAppClientId;

	const popup = window.open(
		`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${window.location.origin}/redirectAuth`,
		"popup",
		"popup,width=1280,height=720",
	);

	if (popup == null) {
		consola.error("could not open LogIn popup");
		return;
	}

	const checkPopup = setInterval(() => {
		try {
			if (popup.window.location.host === location.host) {
				setCode(popup.window.location);

				popup.close();
			}
		} catch (e) {}

		if (!popup || !popup.closed) return;

		clearInterval(checkPopup);
	}, 1000);
}

async function setCode(pageLocation: Location) {
	if (!pageLocation.search.startsWith("?code=")) {
		consola.error("no code was Provided from redirect", pageLocation);
		return;
	}

	const code = pageLocation.search.split("?code=")[1];

	const newSession = await $fetch("/api/user/auth", { query: { code: code } });
	consola.info("login", newSession);

	session.value = newSession;
}
</script>

<template>
  <button id="main" @click="onLogin">
    <img v-if="avatar" :src="avatar" alt="avatar">
    <icon v-else name="basil:user-solid"/>
  </button>
</template>

<style scoped>
#main {
  background-color: var(--mid-base);
  padding: 5px;
  height: 50px;
  aspect-ratio: 1/1;

  border: none;
  border-radius: 50%;

  transition: 200ms ease-in-out;

  &:hover {
    scale: 1.1;
  }

  svg, img{
    width: 100%;
    height: 100%;
  }
}
</style>