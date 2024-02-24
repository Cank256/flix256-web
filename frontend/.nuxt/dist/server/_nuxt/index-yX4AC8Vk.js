import { _ as __nuxt_component_0, a as __nuxt_component_1 } from "./ListingCarousel-UA-X3Lo2.js";
import { ref, mergeProps, useSSRContext } from "vue";
import { u as useBackendStore } from "./Functions-sXnlZwJ_.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-yVxbj29m.js";
import "./nuxt-link-nfmPRCnn.js";
import "ufo";
import "../server.mjs";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "defu";
import "klona";
import "@vue/devtools-api";
import "destr";
import "devalue";
import "vuex";
import "smoothscroll-polyfill";
import "./axios-uWELa17M.js";
import "axios";
const _sfc_main = {
  components: {
    Hero: __nuxt_component_0,
    ListingCarousel: __nuxt_component_1
  },
  head() {
    return {
      title: "Movies",
      meta: [
        { hid: "og:title", property: "og:title", content: "Movies" },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.FRONTEND_URL}${this.$route.path}`
        }
      ]
    };
  },
  setup() {
    const store = useBackendStore();
    const upcomingMovies = ref(null);
    const nowPlayingMovies = ref(null);
    const popularMovies = ref(null);
    const topRatedMovies = ref(null);
    const featuredItem = ref(null);
    const upcomingMoviesTitle = store.getListItem("movie", "upcoming").title;
    const nowPlayingMoviesTitle = store.getListItem("movie", "now_playing").title;
    const popularMoviesTitle = store.getListItem("movie", "popular").title;
    const topRatedMoviesTitle = store.getListItem("movie", "top_rated").title;
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
      } catch (error) {
        console.error({ statusCode: error.code, error: error.message });
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
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Hero = __nuxt_component_0;
  const _component_ListingCarousel = __nuxt_component_1;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}>`);
  if ($setup.featuredItem) {
    _push(ssrRenderComponent(_component_Hero, {
      item: $setup.featuredItem,
      id: "hero"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.upcomingMovies && $setup.upcomingMovies.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.upcomingMoviesTitle,
      "view-all-url": $options.upcomingUrl,
      items: $setup.upcomingMovies
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.nowPlayingMovies && $setup.nowPlayingMovies.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.nowPlayingMoviesTitle,
      "view-all-url": $options.nowPlayingUrl,
      items: $setup.nowPlayingMovies
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.popularMovies && $setup.popularMovies.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.popularMoviesTitle,
      "view-all-url": $options.popularUrl,
      items: $setup.popularMovies
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.topRatedMovies && $setup.topRatedMovies.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.topRatedMoviesTitle,
      "view-all-url": $options.topRatedUrl,
      items: $setup.topRatedMovies
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movie/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-yX4AC8Vk.js.map
