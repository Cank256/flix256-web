<template>
	<main class="main">
		<Hero v-if="featuredItem" :item="featuredItem" />
	</main>
</template>

<script>
import { ref } from "vue";
import Hero from "~/components/Hero";
import { useBackendStore } from "~/store/backend";

export default {
	components: {
		Hero,
	},

	setup() {
		const store = useBackendStore();

		const nowPlayingMovies = ref(null);
		const onTheAirTv = ref(null);
		const featuredItem = ref(null);

		async function fetchData() {
			try {
				const nowPlayingMoviesData = await store.getMovies("now_playing");
				const onTheAirTvData = await store.getTvShows("on_air");
				let featured;

				const items = [...nowPlayingMoviesData.data.results, ...onTheAirTvData.data.results];
				const randomItem = items[Math.floor(Math.random() * items.length)];
				const media = randomItem.title ? "movie" : "tv";

				if (media === "movie") {
					featured = await store.getMovie(randomItem.id);
				} else {
					featured = await store.getTvShow(randomItem.id);
				}

				featuredItem.value = featured.data;
				nowPlayingMovies.value = nowPlayingMoviesData.data.results;
				onTheAirTv.value = onTheAirTvData.data.results;
			} catch (error) {
				console.error("There was an error in fetching data", error);
			}
		}

		fetchData();

		return {
			nowPlayingMovies,
			onTheAirTv,
			featuredItem,
		};
	},

	computed: {
		nowPlayingMoviesTitle() {
			return this.nowPlayingMovies.value ? getListItem("movie", "trending").title : "";
		},

		nowPlayingMoviesUrl() {
			return this.nowPlayingMovies.value ? { name: "movie-category-name", params: { name: "trending" } } : "";
		},

		onTheAirTvTitle() {
			return this.onTheAirTv.value ? getListItem("tv", "trending").title : "";
		},

		onTheAirTvUrl() {
			return this.onTheAirTv.value ? { name: "tv-category-name", params: { name: "trending" } } : "";
		},
	},
};
</script>
