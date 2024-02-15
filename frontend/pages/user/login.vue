<template>
	<form @submit.prevent="login">
		<input v-model="username" type="text" placeholder="Username" />
		<button type="submit">Login</button>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "~/store/auth";

export default defineComponent({
	setup() {
		const authStore = useAuthStore();
		const username = ref("");

		const login = async () => {
			const response = await authStore.login(username.value);
			console.log(response)
		};

		return { username, login };
	},
});
</script>
