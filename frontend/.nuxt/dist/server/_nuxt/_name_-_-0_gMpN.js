import __nuxt_component_0 from "./TopNav-KHiANXZu.js";
import { _ as __nuxt_component_1 } from "./Listing-IgbBrenQ.js";
import { ref, mergeProps, useSSRContext } from "vue";
import { useRoute } from "vue-router";
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
import "h3";
import "defu";
import "klona";
import "@vue/devtools-api";
import "destr";
import "devalue";
import "vuex";
import "./axios-uWELa17M.js";
import "axios";
const _sfc_main = {
  components: {
    TopNav: __nuxt_component_0,
    Listing: __nuxt_component_1
  },
  data() {
    return {
      loading: false
    };
  },
  setup() {
    const store = useBackendStore();
    const route = useRoute();
    const tvShowData = ref(null);
    const title = store.getListItem("tv", route.params.name).title;
    async function fetchData() {
      try {
        const items = await store.getTvShows(route.params.name);
        tvShowData.value = items.data;
      } catch (error) {
        console.error("There was an error in fetching data", error);
      }
    }
    fetchData();
    return {
      tvShowData,
      title
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "og:title", property: "og:title", content: this.title },
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
  methods: {
    loadMore() {
      const store = useBackendStore();
      this.loading = true;
      store.getTvShows(this.$route.params.name, { page: this.tvShowData.page + 1 }).then((response) => {
        this.tvShowData.results = this.tvShowData.results.concat(response.data.results);
        this.tvShowData.page = response.data.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TopNav = __nuxt_component_0;
  const _component_Listing = __nuxt_component_1;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_TopNav, { title: $setup.title }, null, _parent));
  if ($setup.tvShowData && $setup.tvShowData.results.length) {
    _push(ssrRenderComponent(_component_Listing, {
      title: $setup.title,
      items: $setup.tvShowData,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/category/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _name_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _name_ as default
};
//# sourceMappingURL=_name_-_-0_gMpN.js.map
