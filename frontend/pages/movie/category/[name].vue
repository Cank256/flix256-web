<template>
	<main class="main">
		<TopNav :title="title" />

		<Listing
			v-if="movieData && movieData.results.length"
			:title="title"
			:items="movieData"
			:loading="loading"
			@loadMore="loadMore"
		/>
	</main>
</template>

<script>
import { ref } from "vue";
import { useRoute } from 'vue-router';
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
		const route = useRoute();
		const movieData = ref(null);
		const title = store.getListItem("movie", route.params.name).title;

		async function fetchData() {
			try {
				const items = await store.getMovies(route.params.name);
				movieData.value = items.data;
			} catch(error) {
				console.error("There was an error in fetching data", error);
			}
		}

		fetchData();

		return {
			movieData,
			title,
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

			store.getMovies(this.$route.params.name, {page: this.movieData.page + 1})
				.then((response) => {
					this.movieData.results = this.movieData.results.concat(response.data.results);
					this.movieData.page = response.data.page;
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>
