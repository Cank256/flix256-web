import __nuxt_component_0$1 from "./TopNav-KHiANXZu.js";
import { _ as __nuxt_component_0$2, a as __nuxt_component_1 } from "./ListingCarousel-UA-X3Lo2.js";
import { mergeProps, useSSRContext, resolveComponent, ref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-yVxbj29m.js";
import { n as name$1, c as creators, a as apiImgUrl, e as __nuxt_component_0, u as useBackendStore, y as yearStart, f as yearEnd } from "./Functions-sXnlZwJ_.js";
import { _ as __nuxt_component_4 } from "./Credits-WMYsmLQ4.js";
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
import "smoothscroll-polyfill";
import "./axios-uWELa17M.js";
import "axios";
const nav = "_nav_15ate_1";
const button = "_button_15ate_14";
const buttonActive = "_buttonActive_15ate_44";
const style0$3 = {
  nav,
  button,
  buttonActive
};
const _sfc_main$4 = {
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    clicked(index, item2) {
      this.active = index;
      this.$emit("clicked", item2.replace(/\s+/g, "-").toLowerCase());
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.$style.nav
  }, _attrs))}><!--[-->`);
  ssrRenderList($props.menu, (item2, index) => {
    _push(`<button class="${ssrRenderClass([_ctx.$style.button, { [_ctx.$style.buttonActive]: $data.active === index }])}" type="button">${ssrInterpolate(item2)}</button>`);
  });
  _push(`<!--]--></div>`);
}
const cssModules$3 = {
  "$style": style0$3
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MediaNav.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__cssModules", cssModules$3]]);
const info = "_info_uljt1_2";
const left = "_left_uljt1_7";
const right = "_right_uljt1_25";
const poster = "_poster_uljt1_30";
const overview$1 = "_overview_uljt1_51";
const title = "_title_uljt1_63";
const stats = "_stats_uljt1_75";
const label = "_label_uljt1_110";
const value = "_value_uljt1_122";
const external = "_external_uljt1_126";
const style0$2 = {
  info,
  left,
  right,
  poster,
  overview: overview$1,
  title,
  stats,
  label,
  value,
  external
};
const _sfc_main$3 = {
  mixins: [name$1, creators],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    poster() {
      if (this.item.poster_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.item.poster_path}`;
      } else {
        return false;
      }
    }
  },
  methods: {
    formatGenres(genres) {
      return genres.map((genre) => genre.name).join(", ");
    },
    formatRunTime(times) {
      return times.map((time) => `${time}m`).join(", ");
    },
    formatNetworks(networks) {
      return networks.map((network) => network.name).join(", ");
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["spacing", _ctx.$style.info]
  }, _attrs))}><div class="${ssrRenderClass(_ctx.$style.stats)}"><ul class="nolist">`);
  if ($props.item.first_air_date) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">First Aired</div><div class="${ssrRenderClass(_ctx.$style.value)}">${ssrInterpolate($props.item.first_air_date)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.last_air_date) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Last Aired</div><div class="${ssrRenderClass(_ctx.$style.value)}">${ssrInterpolate($props.item.last_air_date)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.episode_run_time && $props.item.episode_run_time.length) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Runtime</div><div class="${ssrRenderClass(_ctx.$style.value)}">${ssrInterpolate($options.formatRunTime($props.item.episode_run_time))}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.creators) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Creator</div><div class="${ssrRenderClass(_ctx.$style.value)}">${_ctx.creators}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.genres && $props.item.genres.length) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Genre</div><div class="${ssrRenderClass(_ctx.$style.value)}">${$options.formatGenres($props.item.genres)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.number_of_seasons) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Seasons</div><div class="${ssrRenderClass(_ctx.$style.value)}">${ssrInterpolate($props.item.number_of_seasons)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.number_of_episodes) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Episodes</div><div class="${ssrRenderClass(_ctx.$style.value)}">${ssrInterpolate($props.item.number_of_episodes)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.status) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Status</div><div class="${ssrRenderClass(_ctx.$style.value)}">${ssrInterpolate($props.item.status)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.networks && $props.item.networks.length) {
    _push(`<li><div class="${ssrRenderClass(_ctx.$style.label)}">Network</div><div class="${ssrRenderClass(_ctx.$style.value)}">${$options.formatNetworks($props.item.networks)}</div></li>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</ul></div></div>`);
}
const cssModules$2 = {
  "$style": style0$2
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tv/TvShowInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__cssModules", cssModules$2]]);
const item = "_item_kuv2t_1";
const image = "_image_kuv2t_34";
const name = "_name_kuv2t_56";
const overview = "_overview_kuv2t_65";
const aired = "_aired_kuv2t_72";
const style0$1 = {
  item,
  image,
  name,
  overview,
  aired
};
const _sfc_main$2 = {
  props: {
    episode: {
      type: Object,
      required: true
    }
  },
  computed: {
    poster() {
      if (this.episode.still_path) {
        return `${apiImgUrl}/w400${this.episode.still_path}`;
      } else {
        return null;
      }
    }
  },
  methods: {
    truncate(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + "...";
      } else {
        return text;
      }
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtImg = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.$style.item
  }, _attrs))}><div class="${ssrRenderClass(_ctx.$style.image)}">`);
  if ($options.poster) {
    _push(ssrRenderComponent(_component_NuxtImg, {
      src: $options.poster,
      loading: "lazy",
      alt: $props.episode.name
    }, null, _parent));
  } else {
    _push(`<span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"></path></svg></span>`);
  }
  _push(`</div><h2 class="${ssrRenderClass(_ctx.$style.name)}"><strong>E${ssrInterpolate($props.episode.episode_number)}</strong> ${ssrInterpolate($props.episode.name)}</h2><div class="${ssrRenderClass(_ctx.$style.overview)}">${ssrInterpolate($options.truncate($props.episode.overview, 300))}</div>`);
  if ($props.episode.air_date) {
    _push(`<div class="${ssrRenderClass(_ctx.$style.aired)}">${ssrInterpolate($props.episode.air_date)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const cssModules$1 = {
  "$style": style0$1
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tv/EpisodesItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const EpisodesItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__cssModules", cssModules$1]]);
const head = "_head_11yay_1";
const count = "_count_11yay_15";
const items = "_items_11yay_26";
const style0 = {
  head,
  count,
  items
};
const _sfc_main$1 = {
  components: {
    EpisodesItem
  },
  props: {
    numberOfSeasons: {
      type: Number,
      required: true
    },
    tvShowId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      activeSeason: this.numberOfSeasons,
      activeEpisodes: null
    };
  },
  computed: {
    episodeCount() {
      return `${this.activeEpisodes.length} ${this.activeEpisodes.length > 1 ? "Episodes" : "Episode"}`;
    },
    seasons() {
      const seasons = [];
      for (let index = 0; index < this.numberOfSeasons; index++) {
        seasons.push({
          season: index + 1,
          episodes: null
        });
      }
      seasons.sort((a, b) => a.season > b.season ? -1 : 1);
      return seasons;
    }
  },
  mounted() {
    this.getEpisodes(this.tvShowId);
  },
  methods: {
    async getEpisodes(tv_show_id) {
      const store = useBackendStore();
      const season = this.seasons.find((season2) => season2.season === this.activeSeason);
      if (season.episodes) {
        this.activeEpisodes = season.episodes;
      } else {
        try {
          const response = await store.getTvShowEpisodes({ tv_show_id, season: this.activeSeason });
          season.episodes = response.data.episodes;
          this.activeEpisodes = season.episodes;
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      }
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_EpisodesItem = resolveComponent("EpisodesItem");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "spacing" }, _attrs))}><div class="${ssrRenderClass(_ctx.$style.head)}">`);
  if ($options.seasons.length > 1) {
    _push(`<select><!--[-->`);
    ssrRenderList($options.seasons, (season) => {
      _push(`<option${ssrRenderAttr("value", season.season)}> Season ${ssrInterpolate(season.season)}</option>`);
    });
    _push(`<!--]--></select>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeEpisodes) {
    _push(`<strong class="${ssrRenderClass(_ctx.$style.count)}">${ssrInterpolate($options.episodeCount)}</strong>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($data.activeEpisodes) {
    _push(`<div class="${ssrRenderClass(_ctx.$style.items)}"><!--[-->`);
    ssrRenderList($data.activeEpisodes, (episode) => {
      _push(ssrRenderComponent(_component_EpisodesItem, {
        key: `episode-${episode.id}`,
        episode
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tv/Episodes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Episodes = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__cssModules", cssModules]]);
const _sfc_main = {
  components: {
    TopNav: __nuxt_component_0$1,
    Hero: __nuxt_component_0$2,
    MediaNav: __nuxt_component_2,
    TvShowInfo: __nuxt_component_3,
    Credits: __nuxt_component_4,
    Episodes,
    ListingCarousel: __nuxt_component_1
  },
  mixins: [name$1, yearStart, yearEnd],
  data() {
    return {
      menu: [],
      activeMenu: "overview",
      recommended: null
    };
  },
  setup() {
    useBackendStore();
    useRoute();
    const item2 = ref(null);
    return { item: item2 };
  },
  computed: {
    metaTitle() {
      if (!this.item)
        return "";
      if (this.item.status === "Ended" && this.yearStart && this.yearEnd) {
        return `${this.name} (TV Series ${this.yearStart}-${this.yearEnd})`;
      } else if (this.yearStart) {
        return `${this.name} (TV Series ${this.yearStart}-)`;
      } else {
        return `${this.name} (TV Series)`;
      }
    },
    metaDescription() {
      if (this.item && this.item.overview) {
        return this.truncate(this.item.overview, 200);
      } else {
        return "";
      }
    },
    metaImage() {
      if (this.item && this.item.poster_path) {
        return `${apiImgUrl}/w500${this.item.poster_path}`;
      } else {
        return "";
      }
    },
    showCredits() {
      const credits = this.item && this.item.credits;
      return credits && credits.cast && credits.cast.length;
    },
    showEpisodes() {
      return this.item && this.item.number_of_seasons > 0;
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
    this.createMenu();
    this.initRecommended();
  },
  methods: {
    truncate(string, length) {
      return this.$options.filters.truncate(string, length);
    },
    createMenu() {
      const menu = [];
      menu.push("Overview");
      if (!this.showEpisodes)
        menu.push("Episodes");
      this.menu = menu;
    },
    navClicked(label2) {
      this.activeMenu = label2;
    },
    initRecommended() {
      if (!this.recommended) {
        const store = useBackendStore();
        store.getTvsShowRecommended({ tv_show_id: this.$route.params.id }).then((response) => {
          this.recommended = response.data;
        });
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TopNav = __nuxt_component_0$1;
  const _component_Hero = __nuxt_component_0$2;
  const _component_MediaNav = __nuxt_component_2;
  const _component_TvShowInfo = __nuxt_component_3;
  const _component_Credits = __nuxt_component_4;
  const _component_Episodes = resolveComponent("Episodes");
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
  _push(ssrRenderComponent(_component_MediaNav, {
    menu: $data.menu,
    onClicked: $options.navClicked
  }, null, _parent));
  if ($data.activeMenu === "overview") {
    _push(`<!--[-->`);
    if ($setup.item) {
      _push(ssrRenderComponent(_component_TvShowInfo, { item: $setup.item }, null, _parent));
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
    _push(`<!--]-->`);
  } else {
    _push(`<!---->`);
  }
  if ($data.activeMenu === "episodes" && $options.showEpisodes) {
    _push(`<!--[-->`);
    if ($setup.item) {
      _push(ssrRenderComponent(_component_Episodes, {
        "tv-show-id": $setup.item.id,
        "number-of-seasons": $setup.item.number_of_seasons
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-YuW5oG1l.js.map
