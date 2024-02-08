<template>
	<main class="main">
		<TopNav v-if="item" :title="metaTitle" />

		<Hero v-if="item" :item="item" />

		<MediaNav :menu="menu" @clicked="navClicked" />

		<template v-if="activeMenu === 'overview'">
			<TvShowInfo v-if="item" :item="item" />

			<Credits v-if="item && showCredits" :people="item.credits.cast" />
		</template>

		<template v-if="activeMenu === 'episodes' && showEpisodes">
			<Episodes v-if="item" :number-of-seasons="item.number_of_seasons" />
		</template>

		<ListingCarousel
			v-if="recommended && recommended.length"
			title="More Like This"
			:items="recommended"
		/>
	</main>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { apiImgUrl, useBackendStore } from "~/store/backend";
import { name, yearStart, yearEnd } from "~/mixins/Details";
import TopNav from "~/components/global/TopNav";
import Hero from "~/components/Hero";
import MediaNav from "~/components/MediaNav";
import TvShowInfo from "~/components/tv/TvShowInfo";
import Credits from "~/components/Credits";
import Episodes from "~/components/tv/Episodes";
import ListingCarousel from "~/components/ListingCarousel";

export default {
	components: {
		TopNav,
		Hero,
		MediaNav,
		TvShowInfo,
		Credits,
		Episodes,
		ListingCarousel,
	},

	mixins: [name, yearStart, yearEnd],

	data() {
		return {
			menu: [],
			activeMenu: "overview",
			recommended: null,
		};
	},

	setup() {
		const store = useBackendStore();
		const route = useRoute();
		const item = ref(null);

		onMounted(async () => {
			try {
				const itemData = await store.getTvShow(route.params.id);
				item.value = itemData.data;
			} catch (error) {
				console.error({ status: error.code, error: error.message });
			}
		});

		return { item };
	},

	computed: {
		metaTitle() {
			if (!this.item) return "";

			if (this.item.status === "Ended" && this.yearStart && this.yearEnd) {
				return `${this.name} (TV Series ${this.yearStart}-${this.yearEnd})`;
			} else if (this.yearStart) {
				return `${this.name} (TV Series ${this.yearStart}-)`;
			} else {
				return `${this.name} (TV Series)`;
			}
		},

		metaDescription() {
			if (this.item && this.item.overview) {
				return this.truncate(this.item.overview, 200);
			} else {
				return "";
			}
		},

		metaImage() {
			if (this.item && this.item.poster_path) {
				return `${apiImgUrl}/w500${this.item.poster_path}`;
			} else {
				return "";
			}
		},

		showCredits() {
			const credits = this.item && this.item.credits;
			return credits && credits.cast && credits.cast.length;
		},

		showEpisodes() {
			return this.item && this.item.number_of_seasons > 0;
		},
	},

	head() {
		return {
			title: this.metaTitle,
			meta: [
				{ hid: "og:title", property: "og:title", content: this.metaTitle },
				{
					hid: "og:description",
					property: "og:description",
					content: this.metaDescription,
				},
				{
					hid: "description",
					name: "description",
					content: this.metaDescription,
				},
				{ hid: "og:image", property: "og:image", content: this.metaImage },
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

	created() {
		this.createMenu();
		this.initRecommended();
	},

	methods: {
		truncate(string, length) {
			return this.$options.filters.truncate(string, length);
		},

		createMenu() {
			const menu = [];

			// overview
			menu.push("Overview");

			// episodes
			if (this.showEpisodes) menu.push("Episodes");

			this.menu = menu;
		},

		navClicked(label) {
			this.activeMenu = label;
		},

		initRecommended() {
			// If recommended doesn't exist, retrieve it
			if (!this.recommended) {
				const store = useBackendStore(); // Moved inside the function
				store
					.getTvsShowRecommended({ tv_show_id: this.$route.params.id })
					.then((response) => {
						this.recommended = response.data;
					});
			}
		},
	},
};
</script>
