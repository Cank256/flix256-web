<template>
	<nav class="nav-bar">
		<!-- Logo -->
		<div class="logo">
			<img src="~/assets/img/icons/flix256-512.png" alt="Flix256" />
		</div>

		<!-- Navigation Links -->
		<ul class="nav-links">
			<li>
				<nuxt-link
					exact
					:to="{ name: 'index' }"
					active-class="active-link"
					aria-label="Home"
					>Home</nuxt-link
				>
			</li>
			<li>
				<nuxt-link
					:to="{ name: 'movie' }"
					active-class="active-link"
					aria-label="Movies"
					>Movies</nuxt-link
				>
			</li>
			<li>
				<nuxt-link
					:to="{ name: 'tv' }"
					active-class="active-link"
					aria-label="TV Shows"
					>TV Shows</nuxt-link
				>
			</li>
			<li>
				<nuxt-link
					:to="{ name: 'favorites' }"
					active-class="active-link"
					aria-label="Favorites"
					>Favorites</nuxt-link
				>
			</li>
		</ul>

		<div class="search-user">
			<!-- Search Bar -->
			<div class="search-bar">
				<input
					id="search"
					ref="input"
					v-model.trim="query"
					v-show="showSearch"
					name="search"
					type="text"
					placeholder="Search for Movies and TV Shows"
					@keyup="goToRoute"
				/>
				<svg
					class="search-icon"
					width="30"
					height="30"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					@click="toggleSearchInput"
				>
					<path
						d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
						stroke="#fff"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>

			<!-- User Icon -->
			<div v-if="isLoggedIn" class="user-icon" @click="toggleDropdown">
				<svg
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g
						fill="none"
						stroke="#fff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-miterlimit="10"
						stroke-linejoin="round"
					>
						<path
							d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
						/>
						<path
							d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
						/>
					</g>
				</svg>

				<!-- Dropdown -->
				<div v-show="showDropdown" class="dropdown">
					<button @click="handleDropdownItem('Profile')">Profile</button>
					<button @click="handleDropdownItem('Logout')">Logout</button>
				</div>
			</div>
			<div v-else class="login-signup-links">
				<a @click="showLoginPopup" aria-label="Login">Login</a>
				<span class="separator">|</span>
				<a @click="showSignupPopup" aria-label="Signup">Signup</a>

				<!-- Login Popup -->
				<div v-if="showLogin" class="popup">
					<h2>Login to Your Account</h2>
					<form @submit.prevent="login">
						<!-- Login form fields -->
						<input type="username" placeholder="Username" v-model="username" />
						<button type="submit">Login</button>
					</form>
				</div>

				<!-- Signup Popup -->
				<div v-if="showSignup" class="popup">
					<h2>Create an Account</h2>
					<form @submit.prevent="signup">
						<!-- Signup form fields -->
						<input type="text" placeholder="Username" v-model="username" />
						<input type="email" placeholder="Email" v-model="email" />
						<input type="text" placeholder="Language" v-model="lang" />
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { useSearchStore } from "~/store/search";
import { useAuthStore } from "~/store/auth";

export default {
	data() {
		return {
			showDropdown: false,
			showSearch: this.$route.name === "search" ? true : false,
			query: this.$route.query.q ? this.$route.query.q : "",
			fromPage: useSearchStore().fromPage,
			isLoggedIn: false,
			showLogin: false,
			showSignup: false,
		};
	},

	watch: {
		$route(to, from) {
			this.query = to.query.q || "";
		},
	},

	mounted() {
		this.$refs.input.focus();
        // Check if localStorage is available
        if (typeof localStorage !== 'undefined') {
            // Set isLoggedIn based on localStorage value
            this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        }
	},

	setup() {
		const authStore = useAuthStore();
		const userId = ref("");
		const username = ref("");
		const email = ref("");
		const lang = ref("");

		const signup = async () => {
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
			} catch (error) {
				console.error("Registration failed:", error);
			}

		};

		const login = async () => {
			if (!username.value) {
				// Handle missing fields with user-friendly message
				console.error("Username is required");
				return;
			}

			try {
				await authStore.login(username.value);
			} catch (error) {
				console.error("Login failed:", error);
			}

		};

		return { username, email, lang, signup, login };
	},

	methods: {
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},

		handleDropdownItem(item) {
			if (item === "Profile") {
				this.$router.push("/user");
			} else {
				const authStore = useAuthStore();

				const isLoggedIn = authStore.isLoggedIn;
				const getUser = authStore.getUser;

				const logout = () => {
					authStore.logoutUser();
					// Redirect to home page
					this.$router.push("/");
				};

				return { isLoggedIn, getUser, logout };
			}
		},

		toggleSearchInput() {
			this.showSearch = !this.showSearch;
		},

		toggleSearchState() {
			// Toggle search state
			useSearchStore().toggleSearch();
		},

		goToRoute() {
			if (this.query) {
				if (this.$route.name === "search") {
					// If already on search page, update query parameter
					this.$router.replace({ query: { q: this.query } });
				} else {
					// Navigate to search page with query parameter
					this.$router.push({ name: "search", query: { q: this.query } });
				}
			} else {
				// If query is empty, go back to previous page
				this.$router.push({ path: this.fromPage });
			}
		},

		goBack() {
			// Reset query and navigate back
			this.query = "";
			this.$router.push({ path: this.fromPage });
		},

		unFocus(e) {
			const searchStore = useSearchStore();
			if (this.$route.name !== "search") {
				const target = e.relatedTarget;
				if (!target || !target.classList.contains("search-toggle")) {
					this.query = "";
					searchStore.closeSearch();
				}
			}
		},

		showLoginPopup() {
			this.showLogin = true;
			this.showSignup = false;
		},
		showSignupPopup() {
			this.showSignup = true;
			this.showLogin = false;
		},
	},
};
</script>

<style scoped>
.nav-bar {
	position: relative;
	display: flex;
	align-items: center;
	padding: 1rem;
	background-color: rgba(0, 0, 0, 0);
	color: #fff;
	z-index: 999;
}

.logo img {
	height: 40px;
	margin-left: 60px;
}

.nav-links {
	margin-left: 60px;
	list-style: none;
	display: flex;
	gap: 6rem;
}

.nav-links li {
	font-size: 2rem;
}

.search-user {
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-right: 100px;
}

.search-bar {
	position: relative;
	margin-right: 8rem;
}

.search-bar input {
	padding: 1.5rem;
	border: none;
	border-radius: 30px;
	outline: groove;
	outline-color: #fff;
	outline-width: thin;
	width: 50vh;
	background: rgba(255, 255, 255, 0.26);
	color: white;
	font-size: 1.4rem;
}

.search-icon {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
}

::placeholder {
	color: #fff;
}

.user-icon {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.user-icon svg {
	margin-right: 0.5rem;
}

.dropdown {
	display: flex;
	flex-direction: column;
	position: absolute;
	background-color: #000;
	padding: 1rem;
	margin-top: 4rem;
	margin-right: 8rem;
	border-radius: 5px;
	top: 2rem;
	right: 0;
	width: 6%;
}

.dropdown button {
	background: none;
	color: #fff;
	border: none;
	cursor: pointer;
	padding: 0.5rem;
	text-align: left;
	font-size: 1.5rem;
	letter-spacing: 0.1rem;
	line-height: 2.5rem;
}

.dropdown button:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

.login-signup-links {
	display: flex;
	align-items: center;
	font-size: 2rem;
	font-weight: 500;
}

.separator {
	margin: 0 1.5rem;
}

.popup {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	z-index: 999;
	width: 300px;
}
</style>

<style lang="scss" scoped>
@import "~/assets/css/utilities/_variables.scss";

a:hover {
	color: rgba(232, 228, 228, 0.606);
}

a.active-link {
	color: $primary-color;
}
</style>
