<template>
	<main class="main">
		<Hero v-if="featuredItem" :item="featuredItem" id="hero" />

		<ListingCarousel
			v-if="upcomingMovies && upcomingMovies.length"
			:title="upcomingMoviesTitle"
			:view-all-url="upcomingUrl"
			:items="upcomingMovies"
		/>

		<ListingCarousel
			v-if="nowPlayingMovies && nowPlayingMovies.length"
			:title="nowPlayingMoviesTitle"
			:view-all-url="nowPlayingUrl"
			:items="nowPlayingMovies"
		/>

        <ListingCarousel
            v-if="popularMovies && popularMovies.length"
            :title="popularMoviesTitle"
            :view-all-url="popularUrl"
            :items="popularMovies"
        />

        <ListingCarousel
            v-if="topRatedMovies && topRatedMovies.length"
            :title="topRatedMoviesTitle"
            :view-all-url="topRatedUrl"
            :items="topRatedMovies"
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

	head() {
		return {
			title: "Movies",
			meta: [
				{ hid: "og:title", property: "og:title", content: "Movies" },
				{
					hid: "og:url",
					property: "og:url",
					content: `${process.env.FRONTEND_URL}${this.$route.path}`,
				},
			],
		};
	},

	setup() {
		const store = useBackendStore();

		const upcomingMovies = ref(null);
		const nowPlayingMovies = ref(null);
		const popularMovies = ref(null);
		const topRatedMovies = ref(null);
		const featuredItem = ref(null);

		const upcomingMoviesTitle = store.getListItem('movie', 'upcoming').title;
		const nowPlayingMoviesTitle = store.getListItem('movie', 'now_playing').title;
		const popularMoviesTitle = store.getListItem('movie', 'popular').title;
		const topRatedMoviesTitle = store.getListItem('movie', 'top_rated').title;

		async function fetchData() {
			try {
                const upcoming = await store.getMovies("upcoming");
                const nowPlaying = await store.getMovies("now_playing");
                const popular = await store.getMovies("popular");
                const topRated = await store.getMovies("top_rated");
                
                const items = [...upcoming.data.results, ...nowPlaying.data.results];
                const randomItem = items[Math.floor(Math.random() * items.length)];
                const featured = await store.getMovie(randomItem.id);

                upcomingMovies.value = upcoming.data.results;
                nowPlayingMovies.value = nowPlaying.data.results;
                popularMovies.value = popular.data.results;
                topRatedMovies.value = topRated.data.results;
                featuredItem.value = featured.data;

            } catch(error) {
                console.error({ statusCode: 504, error: error.message });
            }
		}

		fetchData();

        return { 
            upcomingMovies,
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            featuredItem,
            upcomingMoviesTitle,
            nowPlayingMoviesTitle,
            popularMoviesTitle,
            topRatedMoviesTitle
        };
	},

	computed: {

        upcomingUrl() {
            return { name: "movie-category-name", params: { name: "upcoming" } };
		},
        
		nowPlayingUrl() {
            return { name: "movie-category-name", params: { name: "now_playing" } };
		},

        popularUrl() {
        	return { name: "movie-category-name", params: { name: "popular" } };
        },

        topRatedUrl() {
        	return { name: "movie-category-name", params: { name: "top_rated" } };
        },
	},
};
</script>
