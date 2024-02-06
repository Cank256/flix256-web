<template>
	<main class="main">
		<Hero v-if="featuredItem" :item="featuredItem" id="hero" />

		<ListingCarousel
			v-if="onAirTvShows && onAirTvShows.length"
			:title="onAirTvShowsTitle"
			:view-all-url="onAirTvShowsUrl"
			:items="onAirTvShows"
		/>

		<ListingCarousel
			v-if="airingTodayTvShows && airingTodayTvShows.length"
			:title="airingTodayTvShowsTitle"
			:view-all-url="airingTodayUrl"
			:items="airingTodayTvShows"
		/>

        <ListingCarousel
            v-if="popularTvShows && popularTvShows.length"
            :title="popularTvShowsTitle"
            :view-all-url="popularTvShowsUrl"
            :items="popularTvShows"
        />

        <ListingCarousel
            v-if="topRatedTvShows && topRatedTvShows.length"
            :title="topRatedTvShowsTitle"
            :view-all-url="topRatedTvShowsUrl"
            :items="topRatedTvShows"
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

		const onAirTvShows = ref(null);
		const airingTodayTvShows = ref(null);
		const popularTvShows = ref(null);
		const topRatedTvShows = ref(null);
		const featuredItem = ref(null);

		const onAirTvShowsTitle = store.getListItem('tv', 'on_air').title;
		const airingTodayTvShowsTitle = store.getListItem('tv', 'airing_today').title;
		const popularTvShowsTitle = store.getListItem('tv', 'popular').title;
		const topRatedTvShowsTitle = store.getListItem('movie', 'top_rated').title;

		async function fetchData() {
			try {
                const onAir = await store.getTvShows("on_air");
                const airingToday = await store.getTvShows("airing_today");
                const popular = await store.getTvShows("popular");
                const topRated = await store.getTvShows("top_rated");
                
                const items = [...onAir.data.results, ...airingToday.data.results];
                const randomItem = items[Math.floor(Math.random() * items.length)];
                const featured = await store.getTvShows(randomItem.id);

                onAirTvShows.value = onAir.data.results;
                airingTodayTvShows.value = airingToday.data.results;
                popularTvShows.value = popular.data.results;
                topRatedTvShows.value = topRated.data.results;
                featuredItem.value = featured.data;

            } catch (error) {
                console.error({ statusCode: 504, error: error.message });
            }
		}

		fetchData();

        return { 
            onAirTvShows,
            airingTodayTvShows,
            popularTvShows,
            topRatedTvShows,
            featuredItem,
            onAirTvShowsTitle,
            airingTodayTvShowsTitle,
            popularTvShowsTitle,
            topRatedTvShowsTitle
        };
	},

	computed: {

        onAirTvShowsUrl() {
            return { name: "tv-category-name", params: { name: "on_air" } };
		},
        
		airingTodayUrl() {
            return { name: "tv-category-name", params: { name: "now_playing" } };
		},

        popularTvShowsUrl() {
        	return { name: "tv-category-name", params: { name: "popular" } };
        },

        topRatedTvShowsUrl() {
        	return { name: "tv-category-name", params: { name: "top_rated" } };
        },
	},
};
</script>
