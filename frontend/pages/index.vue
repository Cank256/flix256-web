<template>
	<main class="main">
		<Hero v-if="featuredItem" :item="featuredItem" id="hero" />

		<ListingCarousel
			v-if="nowPlayingMovies && nowPlayingMovies.length"
			:title="nowPlayingMoviesTitle"
			:view-all-url="nowPlayingMoviesUrl"
			:items="nowPlayingMovies"
		/>

		<ListingCarousel
			v-if="onTheAirTv && onTheAirTv.length"
			:title="onTheAirTvTitle"
			:view-all-url="onTheAirTvUrl"
			:items="onTheAirTv"
		/>
	</main>
</template>

<script>
import { ref } from "vue";
import Hero from "~/components/Hero";
import ListingCarousel from "~/components/ListingCarousel";
import { useBackendStore } from "~/store/backend";

export default {
	components: {
		Hero,
		ListingCarousel,
	},

	setup() {
		const store = useBackendStore();

		const nowPlayingMovies = ref(null);
		const onTheAirTv = ref(null);
		const featuredItem = ref(null);
		const nowPlayingMoviesTitle = store.getListItem('movie', 'now_playing').title;
		const onTheAirTvTitle = store.getListItem('tv', 'on_the_air').title;

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
			nowPlayingMoviesTitle,
			onTheAirTvTitle
		};
	},

	computed: {
		nowPlayingMoviesUrl() {
			return this.nowPlayingMovies ? { name: "movie" } : "";
		},
		
		onTheAirTvUrl() {
			return this.onTheAirTv ? { name: "tv" } : "";
		},
	},
};
</script>
