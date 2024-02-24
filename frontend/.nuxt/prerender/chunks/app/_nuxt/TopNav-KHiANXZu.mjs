import { useSSRContext, mergeProps } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';

const nav = "_nav_mijwp_1";
const text = "_text_mijwp_20";
const button = "_button_mijwp_28";
const style1 = {
  nav,
  text,
  button
};
const _sfc_main = {
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({
    class: _ctx.$style.nav
  }, _attrs))}><button type="button" aria-label="Go Back" class="${ssrRenderClass(_ctx.$style.button)}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M16.5 20.5l-9-8.5 9-8.5"></path></svg></button><p class="${ssrRenderClass(_ctx.$style.text)}">${ssrInterpolate($props.title)}</p></nav>`);
}
const cssModules = {
  "$style": style1
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/TopNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__cssModules", cssModules]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=TopNav-KHiANXZu.mjs.map
