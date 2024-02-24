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
    const onAirTvShows = ref(null);
    const airingTodayTvShows = ref(null);
    const popularTvShows = ref(null);
    const topRatedTvShows = ref(null);
    const featuredItem = ref(null);
    const onAirTvShowsTitle = store.getListItem("tv", "on_air").title;
    const airingTodayTvShowsTitle = store.getListItem("tv", "airing_today").title;
    const popularTvShowsTitle = store.getListItem("tv", "popular").title;
    const topRatedTvShowsTitle = store.getListItem("movie", "top_rated").title;
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
        console.error({ statusCode: error.code, error: error.message });
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
  if ($setup.onAirTvShows && $setup.onAirTvShows.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.onAirTvShowsTitle,
      "view-all-url": $options.onAirTvShowsUrl,
      items: $setup.onAirTvShows
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.airingTodayTvShows && $setup.airingTodayTvShows.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.airingTodayTvShowsTitle,
      "view-all-url": $options.airingTodayUrl,
      items: $setup.airingTodayTvShows
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.popularTvShows && $setup.popularTvShows.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.popularTvShowsTitle,
      "view-all-url": $options.popularTvShowsUrl,
      items: $setup.popularTvShows
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.topRatedTvShows && $setup.topRatedTvShows.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.topRatedTvShowsTitle,
      "view-all-url": $options.topRatedTvShowsUrl,
      items: $setup.topRatedTvShows
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-CVuBUGLy.js.map
