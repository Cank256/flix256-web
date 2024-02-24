import __nuxt_component_0 from './TopNav-KHiANXZu.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './ListingCarousel-UA-X3Lo2.mjs';
import { n as name, y as yearStart, u as useBackendStore, d as directors, r as runtime, a as apiImgUrl$1 } from './Functions-sXnlZwJ_.mjs';
import { useSSRContext, ref, mergeProps } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import { _ as __nuxt_component_4 } from './Credits-WMYsmLQ4.mjs';
import { useRoute } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import './nuxt-link-nfmPRCnn.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ufo/dist/index.mjs';
import '../server.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/unhead/dist/index.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/@unhead/shared/dist/index.mjs';
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

const stats = "_stats_1gmx9_1";
const label = "_label_1gmx9_40";
const value = "_value_1gmx9_52";
const external = "_external_1gmx9_56";
const style0 = {
  stats,
  label,
  value,
  external
};
const _sfc_main$1 = {
  mixins: [name, directors, runtime],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    poster() {
      if (this.item.poster_path) {
        return `${apiImgUrl$1}/w370_and_h556_bestv2${this.item.poster_path}`;
      } else {
        return false;
      }
    }
  },
  methods: {
    formatGenres(genres) {
      return genres.map((genre) => genre.name).join(", ");
    },
    formatProductionCompanies(production_companies) {
      return production_companies.map((production_company) => production_company.name).join(", ");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["spacing", _ctx.$style.info]
  }, _attrs))}><div class="${ssrRenderClass(_ctx.$style.stats)}"><ul class="nolist">`);
  if ($props.item.budget) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}"><div><svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div>Budget</div></div><div class="${ssrRenderClass(_ctx.$style.value)}" style="${ssrRenderStyle({ "font-size": "x-large" })}">$ ${ssrInterpolate($props.item.budget.toLocaleString())}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.revenue) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}"><div><svg width="80px" height="80px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"></rect></g><g id="Q3_icons" data-name="Q3 icons"><path d="M44,7.1V14a2,2,0,0,1-2,2H35a2,2,0,0,1-2-2.3A2.1,2.1,0,0,1,35.1,12h2.3A18,18,0,0,0,6.1,22.2a2,2,0,0,1-2,1.8h0a2,2,0,0,1-2-2.2A22,22,0,0,1,40,8.9V7a2,2,0,0,1,2.3-2A2.1,2.1,0,0,1,44,7.1Z" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4,40.9V34a2,2,0,0,1,2-2h7a2,2,0,0,1,2,2.3A2.1,2.1,0,0,1,12.9,36H10.6A18,18,0,0,0,41.9,25.8a2,2,0,0,1,2-1.8h0a2,2,0,0,1,2,2.2A22,22,0,0,1,8,39.1V41a2,2,0,0,1-2.3,2A2.1,2.1,0,0,1,4,40.9Z" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24.7,22c-3.5-.7-3.5-1.3-3.5-1.8s.2-.6.5-.9a3.4,3.4,0,0,1,1.8-.4,6.3,6.3,0,0,1,3.3.9,1.8,1.8,0,0,0,2.7-.5,1.9,1.9,0,0,0-.4-2.8A9.1,9.1,0,0,0,26,15.3V13a2,2,0,0,0-4,0v2.2c-3,.5-5,2.5-5,5.2s3.3,4.9,6.5,5.5,3.3,1.3,3.3,1.8-1.1,1.4-2.5,1.4h0a6.7,6.7,0,0,1-4.1-1.3,2,2,0,0,0-2.8.6,1.8,1.8,0,0,0,.3,2.6A10.9,10.9,0,0,0,22,32.8V35a2,2,0,0,0,4,0V32.8a6.3,6.3,0,0,0,3-1.3,4.9,4.9,0,0,0,2-4h0C31,23.8,27.6,22.6,24.7,22Z" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g></svg></div><div>Revenue</div></div><div class="${ssrRenderClass(_ctx.$style.value)}" style="${ssrRenderStyle({ "font-size": "x-large" })}">$ ${ssrInterpolate($props.item.revenue.toLocaleString())}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.genres && $props.item.genres.length) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}"><div><svg fill="#fff5" width="80px" height="80px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"></path></svg></div><div>Genre</div></div><div class="${ssrRenderClass(_ctx.$style.value)}">${$options.formatGenres($props.item.genres)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.production_companies && $props.item.production_companies.length) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}"><div><svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z" fill="#fff5"></path></svg></div><div>Production</div></div><div class="${ssrRenderClass(_ctx.$style.value)}">${$options.formatProductionCompanies($props.item.production_companies)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</ul></div></div>`);
}
const cssModules = {
  "$style": style0
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/movie/MovieInfo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__cssModules", cssModules]]);
const _sfc_main = {
  components: {
    TopNav: __nuxt_component_0,
    Hero: __nuxt_component_0$1,
    MovieInfo: __nuxt_component_2,
    Credits: __nuxt_component_4,
    ListingCarousel: __nuxt_component_1
  },
  mixins: [name, yearStart],
  data() {
    return {
      recommended: null
    };
  },
  setup() {
    useBackendStore();
    useRoute();
    const item = ref(null);
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
    }
  },
  head() {
    return {
      title: this.metaTitle,
      meta: [
        { hid: "og:title", property: "og:title", content: this.metaTitle },
        {
          hid: "og:description",
          property: "og:description",
          content: this.metaDescription
        },
        {
          hid: "description",
          name: "description",
          content: this.metaDescription
        },
        { hid: "og:image", property: "og:image", content: this.metaImage },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.FRONTEND_URL}${this.$route.path}`
        }
      ],
      bodyAttrs: {
        class: "topnav-active"
      }
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
      if (this.recommended !== null)
        return;
      store.getMoviesRecommended({ movie_id: route.params.id }).then((response) => {
        this.recommended = response.data;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TopNav = __nuxt_component_0;
  const _component_Hero = __nuxt_component_0$1;
  const _component_MovieInfo = __nuxt_component_2;
  const _component_Credits = __nuxt_component_4;
  const _component_ListingCarousel = __nuxt_component_1;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}>`);
  if ($setup.item) {
    _push(ssrRenderComponent(_component_TopNav, { title: $options.metaTitle }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.item) {
    _push(ssrRenderComponent(_component_Hero, { item: $setup.item }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.item) {
    _push(ssrRenderComponent(_component_MovieInfo, { item: $setup.item }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.item && $options.showCredits) {
    _push(ssrRenderComponent(_component_Credits, {
      people: $setup.item.credits.cast
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($data.recommended && $data.recommended.length) {
    _push(ssrRenderComponent(_component_ListingCarousel, {
      title: "More Like This",
      items: $data.recommended
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movie/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _id_ as default };
//# sourceMappingURL=_id_-rdexL4-B.mjs.map
