import { b as debounce, e as __nuxt_component_0$1, n as name$1, s as stars$1, r as runtime, y as yearStart, g as cert, h as backdrop$1, t as trailer$1, _ as __nuxt_component_0$3 } from "./Functions-sXnlZwJ_.js";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-nfmPRCnn.js";
import { mergeProps, useSSRContext, withCtx, createTextVNode, toDisplayString, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-yVxbj29m.js";
import smoothscroll from "smoothscroll-polyfill";
let focusedElBeforeOpen;
let focusableEls;
let firstFocusableEl;
let lastFocusableEl;
const _sfc_main$2 = {
  props: {
    data: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    type: {
      type: String,
      required: false,
      default: "image"
    },
    modifier: {
      type: String,
      required: false,
      default: ""
    },
    nav: {
      type: Boolean,
      required: false,
      default: false
    },
    startAt: {
      type: Number,
      required: false,
      default: 0
    },
    ariaLabel: {
      type: String,
      required: false,
      default: ""
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: "modal-open"
      }
    };
  },
  data() {
    return {
      selected: null,
      activeItem: null
    };
  },
  computed: {
    modalClass() {
      return {
        "modal--nav": this.showNav,
        [`modal--${this.type}`]: true,
        [this.modifier]: true
      };
    },
    showNav() {
      return this.nav && this.data.length > 1;
    },
    label() {
      if (this.ariaLabel) {
        return this.ariaLabel;
      } else if (this.activeItem && this.activeItem.name) {
        return this.activeItem.name;
      } else {
        return null;
      }
    }
  },
  watch: {
    selected() {
      this.activeItem = this.data[this.selected];
    }
  },
  created() {
    this.selected = this.startAt;
  },
  beforeMount() {
    (void 0).addEventListener("keydown", this.handleKeyDown);
    focusedElBeforeOpen = (void 0).activeElement;
  },
  mounted() {
    focusableEls = this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    focusableEls = Array.prototype.slice.call(focusableEls);
    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length];
    firstFocusableEl.focus();
    if (this.type === "iframe") {
      this.handleIframeSize();
      (void 0).addEventListener("resize", this.resizeIframeSize);
    }
  },
  beforeDestroy() {
    (void 0).removeEventListener("keydown", this.handleKeyDown);
    if (this.type === "iframe") {
      (void 0).removeEventListener("resize", this.resizeIframeSize);
    }
    if (focusedElBeforeOpen) {
      focusedElBeforeOpen.focus();
    }
  },
  methods: {
    previous() {
      this.selected = (this.selected + this.data.length) % this.data.length;
    },
    next() {
      this.selected = (this.selected + 1) % this.data.length;
    },
    close() {
      this.$emit("close");
    },
    handleKeyDown(e) {
      if (e.keyCode === 27) {
        this.close();
      } else if (this.nav && e.keyCode === 39) {
        this.next();
      } else if (this.nav && e.keyCode === 37) {
        this.previous();
      } else if (e.keyCode === 9) {
        if (focusableEls.length === 1) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          this.handleBackwardTab(e);
        } else {
          this.handleForwardTab(e);
        }
      }
    },
    handleForwardTab(e) {
      if ((void 0).activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    },
    handleBackwardTab(e) {
      if ((void 0).activeElement === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    },
    handleIframeSize() {
      const aspectRatio = 16 / 9;
      const styles = getComputedStyle(this.$refs.modal);
      let maxWidth = this.$refs.modal.offsetWidth;
      let maxHeight = this.$refs.modal.offsetHeight;
      let width;
      let height;
      maxWidth -= parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft);
      maxHeight -= parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      width = maxWidth;
      height = maxHeight;
      if (maxHeight > maxWidth / aspectRatio) {
        height = maxWidth / aspectRatio;
      } else if (maxWidth > maxHeight * aspectRatio) {
        width = maxHeight * aspectRatio;
      }
      this.$refs.modal.querySelector(".modal__iframe").style.width = `${width}px`;
      this.$refs.modal.querySelector(".modal__iframe").style.height = `${height}px`;
    },
    resizeIframeSize: debounce(function() {
      this.handleIframeSize();
    }, 600)
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<template><div${ssrRenderAttrs(mergeProps({
    ref: "modal",
    class: ["modal", $options.modalClass],
    tabindex: "-1",
    "aria-hidden": "false",
    "aria-label": $options.label,
    role: "dialog"
  }, _attrs))}><div class="modal__wrap"><div class="modal__body"><button class="modal__close" aria-label="Close" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path></g></svg></button><div class="${ssrRenderClass(`modal__${$props.type}`)}">`);
  if ($props.type === "iframe" && $data.activeItem) {
    _push(`<iframe${ssrRenderAttr("src", $data.activeItem.src)} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.type === "image" && $data.activeItem) {
    _push(ssrRenderComponent(_component_NuxtImg, {
      src: $data.activeItem.src,
      loading: "lazy",
      class: "lazyload",
      alt: _ctx.name
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($options.showNav) {
    _push(`<div class="modal__nav"><button class="modal__arrow modal__arrow--prev" aria-label="Previous" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path></svg></button><div class="modal__count">${ssrInterpolate($data.selected + 1)} / ${ssrInterpolate($props.data.length)}</div><button class="modal__arrow modal__arrow--next" aria-label="Next" type="button" title="Next"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path></svg></button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div></template>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const hero = "_hero_1dk0j_1";
const backdrop = "_backdrop_1dk0j_24";
const play = "_play_1dk0j_59";
const image = "_image_1dk0j_75";
const pane = "_pane_1dk0j_87";
const name = "_name_1dk0j_121";
const meta = "_meta_1dk0j_139";
const rating = "_rating_1dk0j_153";
const stars = "_stars_1dk0j_164";
const info = "_info_1dk0j_185";
const desc = "_desc_1dk0j_193";
const trailer = "_trailer_1dk0j_210";
const style0 = {
  hero,
  backdrop,
  play,
  image,
  pane,
  name,
  meta,
  rating,
  stars,
  info,
  desc,
  trailer
};
const _sfc_main$1 = {
  components: {
    Modal: __nuxt_component_2
  },
  mixins: [
    name$1,
    stars$1,
    runtime,
    yearStart,
    cert,
    backdrop$1,
    trailer$1
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSingle: this.item.id === this.$route.params.id,
      modalVisible: false
    };
  },
  computed: {
    type() {
      return this.item.title ? "movie" : "tv";
    }
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtImg = __nuxt_component_0$1;
  const _component_nuxt_link = __nuxt_component_0$2;
  const _component_Modal = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass(_ctx.$style.hero)}"><div class="${ssrRenderClass(_ctx.$style.backdrop)}"><div>`);
  if (_ctx.trailer) {
    _push(`<button class="${ssrRenderClass(_ctx.$style.play)}" type="button" aria-label="Play Trailer"><svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"></path></svg></button>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.backdrop) {
    _push(ssrRenderComponent(_component_NuxtImg, {
      src: _ctx.backdrop,
      loading: "lazy",
      class: _ctx.$style.image,
      alt: _ctx.name
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="${ssrRenderClass(_ctx.$style.pane)}"><template><div style="${ssrRenderStyle({ "padding-left": "5rem" })}"><h1 class="${ssrRenderClass(_ctx.$style.name)}">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: { name: `${$options.type}-id`, params: { id: $props.item.id } }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.name)}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.name), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</h1><div class="${ssrRenderClass(_ctx.$style.meta)}"><div class="${ssrRenderClass(_ctx.$style.info)}">`);
  if ($props.item.number_of_seasons) {
    _push(`<span>Season ${ssrInterpolate($props.item.number_of_seasons)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.yearStart) {
    _push(`<span>${ssrInterpolate(_ctx.yearStart)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.runtime) {
    _push(`<span>${ssrInterpolate(_ctx.runtime)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.cert) {
    _push(`<span>Rated (${ssrInterpolate(_ctx.cert)})</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="${ssrRenderClass(_ctx.$style.desc)}">${ssrInterpolate($options.truncateText($props.item.overview, 600))}</div>`);
  if (_ctx.trailer) {
    _push(`<button class="${ssrRenderClass([_ctx.$style.trailer, "button button--icon"])}" type="button"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M3 22v-20l18 10-18 10z"></path></svg></span><span class="txt">Watch Trailer</span></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></template></div></div>`);
  if ($data.modalVisible) {
    _push(ssrRenderComponent(_component_Modal, {
      data: _ctx.trailer,
      type: "iframe",
      onClose: $options.closeModal
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const cssModules = {
  "$style": style0
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__cssModules", cssModules]]);
const _sfc_main = {
  components: {
    Card: __nuxt_component_0$3
  },
  mixins: [],
  data() {
    return {
      elementWidth: 0,
      carouselWidth: 0,
      visibleWidth: 0,
      maximumPosition: 0,
      unusableVisibleWidth: 0,
      disableLeftButton: true,
      disableRightButton: false,
      favorites: []
    };
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
    }
  },
  mounted() {
    smoothscroll.polyfill();
    (void 0).addEventListener("resize", this.resizeEvent);
    const count = this.viewAllUrl ? this.items.length + 1 : this.items.length;
    this.calculateState(count);
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
    resizeEvent() {
      const count = this.viewAllUrl ? this.items.length + 1 : this.items.length;
      this.calculateState(count);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  const _component_Card = __nuxt_component_0$3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "listing listing--carousel" }, _attrs))}>`);
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
  _push(`<div class="carousel"><button class="carousel__nav carousel__nav--left" aria-label="Previous" type="button"${ssrIncludeBooleanAttr($data.disableLeftButton) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path></svg></button><div class="carousel__items"><!--[-->`);
  ssrRenderList($props.items, (item) => {
    _push(ssrRenderComponent(_component_Card, {
      key: `card-${item.id}`,
      item
    }, null, _parent));
  });
  _push(`<!--]-->`);
  if ($props.viewAllUrl) {
    _push(`<div class="card">`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      to: $props.viewAllUrl,
      class: "card__link"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="card__img"${_scopeId}><span${_scopeId}>Explore All</span></div>`);
        } else {
          return [
            createVNode("div", { class: "card__img" }, [
              createVNode("span", null, "Explore All")
            ])
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><button class="carousel__nav carousel__nav--right" aria-label="Next" type="button"${ssrIncludeBooleanAttr($data.disableRightButton) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path></svg></button></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ListingCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_0 as _,
  __nuxt_component_1 as a
};
//# sourceMappingURL=ListingCarousel-UA-X3Lo2.js.map
