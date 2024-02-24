import { _ as __nuxt_component_0$1, b as debounce, u as useBackendStore } from "./Functions-sXnlZwJ_.js";
import { mergeProps, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-yVxbj29m.js";
import { useRoute } from "vue-router";
import "./nuxt-link-nfmPRCnn.js";
import "ufo";
import "../server.mjs";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "unhead";
import "@unhead/shared";
import "h3";
import "defu";
import "klona";
import "@vue/devtools-api";
import "destr";
import "devalue";
import "vuex";
import "./axios-uWELa17M.js";
import "axios";
const _sfc_main$1 = {
  components: {
    Card: __nuxt_component_0$1
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    items: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    (void 0).addEventListener("scroll", this.getScrollPosition);
  },
  beforeDestroy() {
    (void 0).removeEventListener("scroll", this.getScrollPosition);
  },
  methods: {
    getScrollPosition: debounce(function() {
      if (this.items.page < this.items.total_pages) {
        const bottomOfWindow = (void 0).innerHeight + (void 0).pageYOffset >= (void 0).body.offsetHeight - 600;
        if (bottomOfWindow && !this.loading)
          this.loadMore();
      } else {
        (void 0).removeEventListener("scroll", this.getScrollPosition);
      }
    }, 50),
    loadMore() {
      this.$emit("loadMore");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Card = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "listing" }, _attrs))}>`);
  if ($props.title) {
    _push(`<div class="listing__head">`);
    if ($props.title) {
      _push(`<h2 class="listing__title">${ssrInterpolate($props.title)}</h2>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="listing__items"><!--[-->`);
  ssrRenderList($props.items.results, (item) => {
    _push(ssrRenderComponent(_component_Card, {
      key: `card-${item.id}`,
      item
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if ($props.items.page < $props.items.total_pages) {
    _push(`<div class="listing__nav">`);
    if ($props.loading) {
      _push(`<div><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#2196f3"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g></svg></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchResults.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    SearchResults: __nuxt_component_0
  },
  data() {
    return {
      loading: false
    };
  },
  head() {
    return {
      title: "Search",
      meta: [
        { hid: "og:title", property: "og:title", content: "Search" },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.FRONTEND_URL}${this.$route.path}`
        }
      ],
      bodyAttrs: {
        class: "page page-search"
      }
    };
  },
  computed: {
    query() {
      return this.$route.query.q ? this.$route.query.q : "";
    },
    title() {
      return this.query ? `Results For: ${this.query}` : "";
    }
  },
  setup() {
    useBackendStore();
    useRoute();
    const items = ref(null);
    return { items };
  },
  beforeRouteEnter(to, from, next) {
    from.path;
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getResults();
  },
  beforeRouteLeave(to, from, next) {
    const search = (void 0).getElementById("search");
    next();
    if (search && search.value.length) {
      this.$store.commit("search/closeSearch");
    }
  },
  methods: {
    async getResults() {
      if (!this.query.length) {
        this.items = null;
        return;
      }
      const response = await useBackendStore().search({ query: this.query });
      if (!response.data.total_results) {
        this.items = null;
        return;
      }
      this.items = response.data;
    },
    loadMore() {
      this.loading = true;
      useBackendStore().search({ query: this.query, page: this.items.page + 1 }).then((response) => {
        this.items.results = this.items.results.concat(response.data.results);
        this.items.page = response.data.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SearchResults = __nuxt_component_0;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}>`);
  if ($setup.items && $setup.items.results.length) {
    _push(ssrRenderComponent(_component_SearchResults, {
      title: $options.title,
      items: $setup.items,
      loading: $data.loading,
      onLoadMore: $options.loadMore
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-k4olhZ62.js.map
