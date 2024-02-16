<template>
	<main class="main">
		<TopNav title="Favorites" />

		<Listing
			v-if="favoritesData && favoritesData.results.length"
			title="Favorites"
			:items="favoritesData"
			:loading="loading"
			@loadMore="loadMore"
		/>
	</main>
</template>

<script>
import { ref, onMounted } from "vue";
import { useBackendStore } from "~/store/backend";
import TopNav from "~/components/global/TopNav";
import Listing from "~/components/Listing";

export default {
	components: {
		TopNav,
		Listing,
	},

	data() {
		return {
			loading: false,
		};
	},

	setup() {
		const store = useBackendStore();
		const favoritesData = ref('');
		const userData = ref('');

        onMounted(() => {
            userData.value = JSON.parse(localStorage.getItem("user"));
            const user_id = userData.value?.user?._id || '';

            async function fetchData() {
                try {
                    const items = await store.getFavorites(user_id, { page: 1 });
                    return favoritesData.value = items.data;
                } catch (error) {
                    console.error("There was an error in fetching data", error);
                }
            }

            fetchData();
        });

		return {
			favoritesData,
            userData
		};
	},

	head() {
		return {
			title: this.title,
			meta: [
				{ hid: "og:title", property: "og:title", content: this.title },
				{
					hid: "og:url",
					property: "og:url",
					content: `${process.env.FRONTEND_URL}${this.$route.path}`,
				},
			],
			bodyAttrs: {
				class: "topnav-active",
			},
		};
	},

	methods: {
		loadMore() {
			const store = useBackendStore();
			this.loading = true;

			store
				.getFavorites(this.userData._id, {
					page: this.favoritesData.page + 1,
				})
				.then((response) => {
					this.favoritesData.results = this.favoritesData.results.concat(
						response.data.results
					);
					this.favoritesData.page = response.data.page;
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>
