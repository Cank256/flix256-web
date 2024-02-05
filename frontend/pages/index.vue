<template>
	<main class="main">
		<Hero v-if="featuredItem" :item="featuredItem" id="hero" />

		<ListingCarousel
			v-if="trendingMovies && trendingMovies.length"
			:title="trendingMoviesTitle"
			:view-all-url="trendingMoviesUrl"
			:items="trendingMovies"
		/>

		<ListingCarousel
			v-if="trendingTv && trendingTv.length"
			:title="trendingTvTitle"
			:view-all-url="trendingTvUrl"
			:items="trendingTv"
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

		const trendingMovies = ref(null);
		const trendingTv = ref(null);
		const featuredItem = ref(null);
		const trendingMoviesTitle = store.getListItem('movie', 'trending').title;
		const trendingTvTitle = store.getListItem('tv', 'trending').title;

		async function fetchData() {
			try {
				const trendingMoviesData = await store.getMovies("trending");
				const trendingTvData = await store.getTvShows("trending");
				let featured;

				const items = [...trendingMoviesData.data.results, ...trendingTvData.data.results];
				const randomItem = items[Math.floor(Math.random() * items.length)];
				const media = randomItem.title ? "movie" : "tv";

				if (media === "movie") {
					featured = await store.getMovie(randomItem.id);
				} else {
					featured = await store.getTvShow(randomItem.id);
				}

				featuredItem.value = featured.data;
				trendingMovies.value = trendingMoviesData.data.results;
				trendingTv.value = trendingTvData.data.results;
			} catch (error) {
				console.error("There was an error in fetching data", error);
			}
		}

		fetchData();

		return {
			trendingMovies,
			trendingTv,
			featuredItem,
			trendingMoviesTitle,
			trendingTvTitle
		};
	},

	computed: {
		trendingMoviesUrl() {
			return this.trendingMovies ? { name: "movie" } : "";
		},
		
		trendingTvUrl() {
			return this.trendingTv ? { name: "tv" } : "";
		},
	},
};
</script>
