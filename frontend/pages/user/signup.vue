<template>
	<form @submit.prevent="register">
		<input v-model="username" type="text" placeholder="Username" />
		<input v-model="email" type="email" placeholder="Email" />
		<input v-model="lang" type="text" placeholder="lang" />
		<button type="submit">Register</button>
	</form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";

export default {
	setup() {
		const authStore = useAuthStore();
		const userId = ref("");
		const username = ref("");
		const email = ref("");
		const lang = ref("");

		const register = async () => {
			if (!username.value || !email.value) {
				// Handle missing fields with user-friendly message
				console.error("Username and email are required");
				return;
			}
			const userData = {
				userId: userId.value,
				username: username.value,
				email: email.value,
				lang: lang.value,
			};

			try {
				await authStore.register(userData);
				console.log("Registration successful");
			} catch (error) {
				console.error("Registration failed:", error);
			}

		};
        return { username, email, lang, register };
	},
};
</script>
