import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './ListingCarousel-UA-X3Lo2.mjs';
import { ref, mergeProps, useSSRContext } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { u as useBackendStore } from './Functions-sXnlZwJ_.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import './nuxt-link-nfmPRCnn.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ufo/dist/index.mjs';
import '../server.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unhead/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue-devtools-stub/dist/index.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unstorage/drivers/memory.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/smoothscroll-polyfill/dist/smoothscroll.js';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/axios/index.js';

const _sfc_main = {
  components: {
    Hero: __nuxt_component_0,
    ListingCarousel: __nuxt_component_1
  },
  setup() {
    const store = useBackendStore();
    const trendingMovies = ref(null);
    const trendingTv = ref(null);
    const featuredItem = ref(null);
    const trendingMoviesTitle = store.getListItem("movie", "trending").title;
    const trendingTvTitle = store.getListItem("tv", "trending").title;
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
      return this.trendingMovies ? { name: "movie-category-name", params: { name: "trending" } } : "";
    },
    trendingTvUrl() {
      return this.trendingTv ? { name: "tv-category-name", params: { name: "trending" } } : "";
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
  if ($setup.trendingMovies && $setup.trendingMovies.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.trendingMoviesTitle,
      "view-all-url": $options.trendingMoviesUrl,
      items: $setup.trendingMovies
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.trendingTv && $setup.trendingTv.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: $setup.trendingTvTitle,
      "view-all-url": $options.trendingTvUrl,
      items: $setup.trendingTv
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-VU57ixJX.mjs.map
