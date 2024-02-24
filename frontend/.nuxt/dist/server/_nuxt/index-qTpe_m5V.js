import __nuxt_component_0 from "./TopNav-KHiANXZu.js";
import { _ as __nuxt_component_1 } from "./Listing-IgbBrenQ.js";
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
    useBackendStore();
    const favoritesData = ref("");
    const userData = ref("");
    return {
      favoritesData,
      userData
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
      store.getFavorites(this.userData._id, {
        page: this.favoritesData.page + 1
      }).then((response) => {
        this.favoritesData.results = this.favoritesData.results.concat(
          response.data.results
        );
        this.favoritesData.page = response.data.page;
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
  _push(ssrRenderComponent(_component_TopNav, { title: "Favorites" }, null, _parent));
  if ($setup.favoritesData && $setup.favoritesData.results.length) {
    _push(ssrRenderComponent(_component_Listing, {
      title: "Favorites",
      items: $setup.favoritesData,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-qTpe_m5V.js.map
