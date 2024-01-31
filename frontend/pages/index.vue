<template>
	<main class="main">
		<Hero v-if="featuredItem" :item="featuredItem" />

		<ListingCarousel
			v-if="nowPlayingMovies && nowPlayingMovies.results.length"
			:title="nowPlayingMoviesTitle"
			:view-all-url="nowPlayingMoviesUrl"
			:items="nowPlayingMovies"
		/>

		<ListingCarousel
			v-if="onTheAirTv && onTheAirTv.results.length"
			:title="onTheAirTvTitle"
			:view-all-url="onTheAirTvUrl"
			:items="onTheAirTv"
		/>
	</main>
</template>

<script>
import {
	getMovies,
	getMovie,
	getTvShows,
	getTvShow,
	getListItem,
} from "~/server/api";
import Hero from "~/components/Hero";
import ListingCarousel from "~/components/ListingCarousel";

export default {
	components: {
		Hero,
		ListingCarousel,
	},

    data() {
        return {
            nowPlayingMovies: null,
            onTheAirTv: null,
            featuredItem: null,
        };
    },

	computed: {
		nowPlayingMoviesTitle() {
			return getListItem("movie", "now_playing").title;
		},

		nowPlayingMoviesUrl() {
			return { name: "movie-category-name", params: { name: "now_playing" } };
		},

		onTheAirTvTitle() {
			return getListItem("tv", "on_the_air").title;
		},

		onTheAirTvUrl() {
			return { name: "tv-category-name", params: { name: "on_the_air" } };
		},
	},

	async asyncData({ error }) {
		try {
			const nowPlayingMovies = await getMovies("movie");
			const onTheAirTv = await getTvShows("tv");

			// Feature a random item from movies or TV
			const items = [...nowPlayingMovies.results, ...onTheAirTv.results];
			const randomItem = items[Math.floor(Math.random() * items.length)];
			const media = randomItem.title ? "movie" : "tv";

            // Fetch details for the featured item
            let featuredItem = featuredItem;
            if (media === "movie") {
            featuredItem = await getMovie(randomItem.id);
            } else {
            featuredItem = await getTvShow(randomItem.id);
            }

            return { nowPlayingMovies, onTheAirTv, featuredItem };
		} catch {
			// Handle errors appropriately, e.g., redirect to an error page
            console.log('There was an error in asyncData in index.vue')
			error({ statusCode: 504, message: "Data not available" });
		}
	},
};
</script>
