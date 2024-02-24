import __nuxt_component_0 from './NavBar-a5FUaGkb.mjs';
import __nuxt_component_1 from './MobileTopNav-vOpzzKxZ.mjs';
import __nuxt_component_2 from './MobileNav-iMh3ObFn.mjs';
import __nuxt_component_3 from './Footer-qSdJApEB.mjs';
import { mergeProps, useSSRContext } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
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
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/axios/index.js';
import './flix256-512-23Q_ozP-.mjs';
import '../../renderer.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/devalue/index.js';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/@unhead/ssr/dist/index.mjs';

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

export { _default as default };
//# sourceMappingURL=default-ix4tAyEI.mjs.map
