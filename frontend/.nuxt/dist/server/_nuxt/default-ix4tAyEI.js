import __nuxt_component_0 from "./NavBar-a5FUaGkb.js";
import __nuxt_component_1 from "./MobileTopNav-vOpzzKxZ.js";
import __nuxt_component_2 from "./MobileNav-iMh3ObFn.js";
import __nuxt_component_3 from "./Footer-qSdJApEB.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
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
import "./flix256-512-23Q_ozP-.js";
const _sfc_main = {
  components: {
    NavBar: __nuxt_component_0,
    MobileTopNav: __nuxt_component_1,
    MobileNav: __nuxt_component_2,
    Footer: __nuxt_component_3
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NavBar = __nuxt_component_0;
  const _component_MobileTopNav = __nuxt_component_1;
  const _component_MobileNav = __nuxt_component_2;
  const _component_Footer = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
  if (!_ctx.$device.isMobileOrTablet) {
    _push(ssrRenderComponent(_component_NavBar, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if (_ctx.$device.isMobileOrTablet) {
    _push(ssrRenderComponent(_component_MobileTopNav, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if (_ctx.$device.isMobileOrTablet) {
    _push(ssrRenderComponent(_component_MobileNav, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-ix4tAyEI.js.map
