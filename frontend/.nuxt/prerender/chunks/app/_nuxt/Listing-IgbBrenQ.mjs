import { _ as __nuxt_component_0$1 } from './nuxt-link-nfmPRCnn.mjs';
import { _ as __nuxt_component_0, b as debounce } from './Functions-sXnlZwJ_.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';

const _sfc_main = {
  components: {
    Card: __nuxt_component_0
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    viewAllUrl: {
      type: Object,
      required: false,
      default: function() {
        return null;
      }
    },
    items: {
      type: Object,
      required: true
    },
    show: {
      type: Number,
      required: false,
      default: null
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created() {
    if (this.show) {
      this.items.results = this.items.results.splice(0, this.show);
      this.items.total_pages = 1;
      this.items.total_results = this.show;
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
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$1;
  const _component_Card = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "listing" }, _attrs))}>`);
  if ($props.title || $props.viewAllUrl) {
    _push(`<div class="listing__head">`);
    if ($props.title) {
      _push(`<h2 class="listing__title">${ssrInterpolate($props.title)}</h2>`);
    } else {
      _push(`<!---->`);
    }
    if ($props.viewAllUrl) {
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: $props.viewAllUrl,
        class: "listing__explore"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong${_scopeId}>Explore All</strong>`);
          } else {
            return [
              createVNode("strong", null, "Explore All")
            ];
          }
        }),
        _: 1
      }, _parent));
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Listing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Listing-IgbBrenQ.mjs.map
