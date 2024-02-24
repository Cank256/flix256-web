import { _ as __nuxt_component_0$1 } from './nuxt-link-nfmPRCnn.mjs';
import { b as debounce, a as apiImgUrl$1, f as __nuxt_component_0$1$1 } from './Functions-sXnlZwJ_.mjs';
import { useSSRContext, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import smoothscroll from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/smoothscroll-polyfill/dist/smoothscroll.js';

const _sfc_main$1 = {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    poster() {
      if (this.person.profile_path) {
        return `${apiImgUrl$1}/w370_and_h556_bestv2${this.person.profile_path}`;
      } else {
        return null;
      }
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$1;
  const _component_NuxtImg = __nuxt_component_0$1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "credits-item" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_nuxt_link, { class: "credits-item__link" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="credits-item__img"${_scopeId}>`);
        if ($options.poster) {
          _push2(ssrRenderComponent(_component_NuxtImg, {
            src: $options.poster,
            loading: "lazy",
            alt: $props.person.name,
            width: "100%",
            height: "auto"
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<span${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"${_scopeId}><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"${_scopeId}></path></svg></span>`);
        }
        _push2(`</div><h2 class="credits-item__name"${_scopeId}>${ssrInterpolate($props.person.name)}</h2><div class="credits-item__character"${_scopeId}>${ssrInterpolate($props.person.character)}</div>`);
      } else {
        return [
          createVNode("div", { class: "credits-item__img" }, [
            $options.poster ? (openBlock(), createBlock(_component_NuxtImg, {
              key: 0,
              src: $options.poster,
              loading: "lazy",
              alt: $props.person.name,
              width: "100%",
              height: "auto"
            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "40",
                height: "40",
                viewBox: "0 0 24 24",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                fill: "#999"
              }, [
                createVNode("path", { d: "M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" })
              ]))
            ]))
          ]),
          createVNode("h2", { class: "credits-item__name" }, toDisplayString($props.person.name), 1),
          createVNode("div", { class: "credits-item__character" }, toDisplayString($props.person.character), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreditsItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    CreditsItem: __nuxt_component_0
  },
  data() {
    return {
      elementWidth: 0,
      carouselWidth: 0,
      visibleWidth: 0,
      maximumPosition: 0,
      unusableVisibleWidth: 0,
      disableLeftButton: true,
      disableRightButton: false
    };
  },
  props: {
    people: {
      type: Array,
      required: true
    }
  },
  mounted() {
    smoothscroll.polyfill();
    (void 0).addEventListener("resize", this.resizeEvent);
    this.calculateState(this.people.length);
  },
  beforeDestroy() {
    (void 0).removeEventListener("resize", this.resizeEvent);
  },
  constructor() {
    this.$refs = {
      carouselElement: (void 0).createElement("div")
    };
  },
  methods: {
    calculateState(numberOfItems) {
      if (!(this.$refs.carouselElement instanceof HTMLElement)) {
        return;
      }
      let unusableVisibleWidth = 72;
      const firstChild = this.$refs.carouselElement.querySelector(":first-child");
      const elementWidth = firstChild ? firstChild.getBoundingClientRect().width : 0;
      const carouselWidth = numberOfItems * elementWidth;
      const maximumPosition = this.$refs.carouselElement.scrollWidth;
      if ((void 0).innerWidth >= 1200) {
        unusableVisibleWidth = 92;
      }
      const visibleWidth = this.$refs.carouselElement.offsetWidth - unusableVisibleWidth;
      this.unusableVisibleWidth = unusableVisibleWidth;
      this.elementWidth = elementWidth;
      this.carouselWidth = carouselWidth;
      this.visibleWidth = visibleWidth;
      this.maximumPosition = maximumPosition;
      this.disableLeftButton = !this.$refs.carouselElement.scrollLeft;
      this.disableRightButton = visibleWidth >= carouselWidth;
    },
    moveTo(width) {
      this.$refs.carouselElement.scrollTo({
        left: width,
        behavior: "smooth"
      });
    },
    moveToClickEvent(direction = "left" | "right") {
      const invisible = this.$refs.carouselElement.scrollLeft + (direction === "left" ? -this.visibleWidth + 1 : this.visibleWidth);
      const remainder = invisible - invisible % this.elementWidth;
      this.moveTo(remainder);
    },
    scrollEvent() {
      const scrollLeft = this.$refs.carouselElement.scrollLeft;
      const end = this.maximumPosition - this.visibleWidth - this.elementWidth;
      this.disableLeftButton = scrollLeft < 3;
      this.disableRightButton = scrollLeft > end;
    },
    resizeEvent: debounce(function() {
      this.calculateState(this.people.length);
    }, 100)
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CreditsItem = __nuxt_component_0;
  if ($props.people && $props.people.length) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "listing listing--carousel" }, _attrs))}><div class="listing__head"><h2 class="listing__title">Cast</h2></div><div class="carousel"><button class="carousel__nav carousel__nav--left" aria-label="Previous" type="button"${ssrIncludeBooleanAttr($data.disableLeftButton) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path></svg></button><div class="carousel__items"><!--[-->`);
    ssrRenderList($props.people, (person) => {
      _push(ssrRenderComponent(_component_CreditsItem, {
        key: `credit-${person.id}`,
        person
      }, null, _parent));
    });
    _push(`<!--]--></div><button class="carousel__nav carousel__nav--right" aria-label="Next" type="button"${ssrIncludeBooleanAttr($data.disableRightButton) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path></svg></button></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Credits.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_4 as _ };
//# sourceMappingURL=Credits-WMYsmLQ4.mjs.map
