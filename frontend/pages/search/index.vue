<template>
	<main class="main">
		<SearchResults
			v-if="items && items.results.length"
			:title="title"
			:items="items"
			:loading="loading"
			@loadMore="loadMore"
		/>
	</main>
</template>

<script>
import { useRoute } from "vue-router";
import { useBackendStore } from "~/store/backend";
import SearchResults from "~/components/search/SearchResults";
let fromPage = "/";

export default {
	components: {
		SearchResults,
	},

	data() {
		return {
			loading: false,
		};
	},

	head() {
		return {
			title: "Search",
			meta: [
				{ hid: "og:title", property: "og:title", content: "Search" },
				{
					hid: "og:url",
					property: "og:url",
					content: `${process.env.FRONTEND_URL}${this.$route.path}`,
				},
			],
			bodyAttrs: {
				class: "page page-search",
			},
		};
	},

	computed: {
		query() {
			return this.$route.query.q ? this.$route.query.q : "";
		},

		title() {
			return this.query ? `Results For: ${this.query}` : "";
		},
	},

	setup() {
		const store = useBackendStore();
        const route = useRoute();
		const items = ref(null);

		onMounted(async () => {
			try {
                if (route.query.q) {
                    const itemData = await store.search({query:  route.query.q, page: 1});
                    items.value = itemData.data;
                } else {
                    redirect("/");
                }
			} catch (error) {
				console.error({ status: error.code, error: error.message });
			}
		});

		return { items };
	},

	beforeRouteEnter(to, from, next) {
		fromPage = from.path;
		next();
	},

	beforeRouteUpdate(to, from, next) {
		next();
		this.getResults();
	},

	beforeRouteLeave(to, from, next) {
		const search = document.getElementById("search");

		next();

		if (search && search.value.length) {
			this.$store.commit("search/closeSearch");
		}
	},

	methods: {
		async getResults() {
			// if no search query
			if (!this.query.length) {
				this.items = null;
				return;
			}

			// trigger ajax call;
			const response = await useBackendStore().search({query: this.query});

			// if no results, do nothing
			if (!response.data.total_results) {
				this.items = null;
				return;
			}

			// update the items
			this.items = response.data;
		},

		loadMore() {
			this.loading = true;

			useBackendStore().search({query: this.query, page: this.items.page + 1})
				.then((response) => {
					this.items.results = this.items.results.concat(response.data.results);
					this.items.page = response.data.page;
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style lang="scss">
@import "~/assets/css/utilities/_variables.scss";

.page-search .main {
	padding-top: 6rem;

	@media (min-width: $breakpoint-large) {
		padding-top: 8rem;
	}
}
</style>
