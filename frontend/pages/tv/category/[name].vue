<template>
	<main class="main">
		<TopNav :title="title" />

		<Listing
			v-if="tvShowData && tvShowData.results.length"
			:title="title"
			:items="tvShowData"
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
		const tvShowData = ref(null);
		const title = store.getListItem("movie", route.params.name).title;

		async function fetchData() {
			try {
				const items = await store.getTvShows(route.params.name);
				tvShowData.value = items.data;
			} catch(error) {
				console.error("There was an error in fetching data", error);
			}
		}

		fetchData();

		return {
			tvShowData,
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

			store.getTvShows(this.$route.params.name, {page: this.tvShowData.page + 1})
				.then((response) => {
					this.tvShowData.results = this.tvShowData.results.concat(response.data.results);
					this.tvShowData.page = response.data.page;
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>
