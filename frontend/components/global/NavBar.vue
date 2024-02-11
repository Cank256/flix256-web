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
			<div class="user-icon" @click="toggleDropdown">
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
			<!-- <div v-else>
                <nuxt-link :to="{ name: 'user.login' }" aria-label="Login">Login</nuxt-link>
                <nuxt-link :to="{ name: 'user.signup' }" aria-label="Login">Signup</nuxt-link>
            </div> -->
		</div>
	</nav>
</template>

<script>
import { useSearchStore } from "~/store/search";

export default {
	data() {
		return {
			showDropdown: false,
			showSearch: this.$route.name === "search" ? true : false,
			query: this.$route.query.q ? this.$route.query.q : "",
			fromPage: useSearchStore().fromPage,
		};
	},

	watch: {
		$route(to, from) {
            this.query = to.query.q || "";
		},
	},

	mounted() {
		this.$refs.input.focus();
	},

	methods: {
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},

		handleDropdownItem(item) {
			if (item === "Profile") {
				this.$router.push("/user");
			} else {
				console.log(`Clicked on ${item}`);
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

		// Check if User is logged in
		// isLoggedIn() {
		//     return this.$store.getters['user/isLoggedIn'];
		// },
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
