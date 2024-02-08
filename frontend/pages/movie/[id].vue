<template>
    <main class="main">
        <TopNav v-if="item" :title="metaTitle" />

        <Hero v-if="item" :item="item" />

        <MovieInfo v-if="item" :item="item" />

        <Credits v-if="item && showCredits" :people="item.credits.cast" />

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
import { useBackendStore } from "~/store/backend";
import { name, yearStart } from "~/mixins/Details";
import TopNav from "~/components/global/TopNav";
import Hero from "~/components/Hero";
import MovieInfo from "~/components/movie/MovieInfo";
import Credits from "~/components/Credits";
import ListingCarousel from "~/components/ListingCarousel";

export default {
    components: {
        TopNav,
        Hero,
        MovieInfo,
        Credits,
        ListingCarousel,
    },

    mixins: [name, yearStart],

    data() {
        return {
            recommended: null,
        };
    },

    setup() {
        const store = useBackendStore();
        const route = useRoute();
        const item = ref(null);

        onMounted(async () => {
            try {
                const itemData = await store.getMovie(route.params.id);
                item.value = itemData.data;
            } catch (error) {
                console.error({ status: error.code, error: error.message });
            }
        });

        return { item };
    },

    computed: {
        metaTitle() {
            if (this.yearStart) {
                return `${this.name} (${this.yearStart})`;
            } else {
                return `${this.name}`;
            }
        },

        metaDescription() {
            if (this.item.overview) {
                return this.truncate(this.item.overview, 200);
            } else {
                return "";
            }
        },

        metaImage() {
            if (this.item.poster_path) {
                return `${apiImgUrl}/w500${this.item.poster_path}`;
            } else {
                return "";
            }
        },

        showCredits() {
            const credits = this.item.credits;
            return credits && credits.cast && credits.cast.length;
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
        this.initRecommended();
    },

    methods: {
        truncate(string, length) {
            return this.$options.filters.truncate(string, length);
        },

        initRecommended() {
            const store = useBackendStore();
            const route = useRoute();
            // if recommended don't exist, retrieve them
            if (this.recommended !== null) return;

            store
                .getMoviesRecommended({ movie_id: route.params.id })
                .then((response) => {
                    this.recommended = response.data;
                });
        },
    },
};
</script>
