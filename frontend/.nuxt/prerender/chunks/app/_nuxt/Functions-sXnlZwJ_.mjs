import { _ as __nuxt_component_0$2 } from './nuxt-link-nfmPRCnn.mjs';
import { u as useHead, e as defineStore, a as useRequestEvent, d as useNuxtApp, b as useRuntimeConfig } from '../server.mjs';
import { defineComponent, ref, computed, h, useSSRContext, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { defu } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/defu/dist/defu.mjs';
import { encodeParam, hasProtocol, withLeadingSlash, joinURL, parseURL, encodePath } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ufo/dist/index.mjs';
import { appendHeader } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/h3/dist/index.mjs';
import axios from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/axios/index.js';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/image-meta/dist/index.mjs').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function prerenderStaticImages(src = "", srcset = "") {
  const paths = [
    src,
    ...srcset.split(", ").map((s) => s.trim().split(" ")[0].trim())
  ].filter((s) => s && s.includes("/_ipx/"));
  if (!paths.length) {
    return;
  }
  appendHeader(
    useRequestEvent(),
    "x-nitro-prerender",
    paths.map((p) => encodeURIComponent(p)).join(", ")
  );
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    {
      prerenderStaticImages(image.url);
    }
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name2) {
  const provider = ctx.options.providers[name2];
  if (!provider) {
    throw new Error("Unknown provider: " + name2);
  }
  return provider;
}
function getPreset(ctx, name2) {
  if (!name2) {
    return {};
  }
  if (!ctx.options.presets[name2]) {
    throw new Error("Unknown preset: " + name2);
  }
  return ctx.options.presets[name2];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxStaticRuntime$SZNfCgWv6s = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipxStatic",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipxStatic"]: { provider: ipxStaticRuntime$SZNfCgWv6s, defaults: {} }
};
const useImage = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    }
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: true },
  // modifiers
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  // options
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  densities: { type: String, default: void 0 },
  preload: { type: Boolean, default: void 0 },
  // <img> attributes
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: {
    type: String,
    default: void 0,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], default: void 0 }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load", "error"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    {
      prerenderStaticImages(src.value, sizes.value.srcset);
    }
    const imgEl = ref();
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return () => h("img", {
      ref: imgEl,
      src: src.value,
      ...{ onerror: "this.setAttribute('data-error', 1)" },
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const lists = {
  movie: [
    { title: "Trending Movies", query: "trending" },
    { title: "Popular Movies", query: "popular" },
    { title: "Top Rated Movies", query: "top_rated" },
    { title: "Upcoming Movies", query: "upcoming" },
    { title: "Now Playing Movies", query: "now_playing" }
  ],
  tv: [
    { title: "Trending TV Shows", query: "trending" },
    { title: "Popular TV Shows", query: "popular" },
    { title: "Top Rated TV Shows", query: "top_rated" },
    { title: "Currently Airing TV Shows", query: "on_air" },
    { title: "TV Shows Airing Today", query: "airing_today" }
  ]
};
const apiImgUrl$1 = process.env.tmdbImageUrl || "https://image.tmdb.org/t/p";
const useBackendStore = defineStore("backendStore", {
  state: () => ({}),
  actions: {
    getListItem(type, query) {
      const list = lists[type];
      return list ? list.find((item) => item.query === query) : void 0;
    },
    getMovies(query, params) {
      return axios.get(`/movies/${query}`, { params });
    },
    getMovie(id) {
      return axios.get(`/movies/${id}`);
    },
    // Function to get recommended movies for a user
    getMoviesRecommended(params) {
      return axios.get(`/movies/recommended`, { params });
    },
    // Function to get TV shows listing
    getTvShows(query, params) {
      return axios.get(`/tv/${query}`, { params });
    },
    // Function to get a single TV show
    getTvShow(id) {
      return axios.get(`/tv/${id}`);
    },
    // Function to get a single TV show episodes
    getTvShowEpisodes(params) {
      return axios.get(`/tv/episodes`, { params });
    },
    // Function to get recommended TV shows for a user
    async addFavorite(favorite) {
      const response = await axios.post(`/favorite`, favorite);
      const favData = await this.getFavorites(favorite.user_id, {});
      localStorage.removeItem("favorites");
      localStorage.setItem("favorites", JSON.stringify(favData.data.results));
      return response;
    },
    // Function to search for movies, TV shows, and people
    getFavorites(query, params) {
      return axios.get(`/favorite/${query}`, { params });
    },
    async deleteFavorite(fav_id, user_id) {
      const response = await axios.delete(`/favorite/${fav_id}/${user_id}`);
      const favData = await this.getFavorites(user_id, {});
      localStorage.removeItem("favorites");
      localStorage.setItem("favorites", JSON.stringify(favData.data.results));
      return response;
    },
    // Function to search for movies, TV shows, and people
    search(params) {
      return axios.get(`/search`, { params });
    }
  }
});
const apiImgUrl = process.env.tmdbImageUrl || "https://image.tmdb.org/t/p";
const name = {
  computed: {
    name() {
      return this.item.title ? this.item.title : this.item.name;
    }
  }
};
const stars = {
  computed: {
    stars() {
      if (this.item.vote_average) {
        return this.item.vote_average * 10;
      }
    }
  }
};
const rating = {
  computed: {
    rating() {
      if (this.item.vote_average) {
        return this.item.vote_average / 2;
      }
    }
  }
};
const runtime = {
  computed: {
    runtime() {
      if (this.item.runtime) {
        const hours = Math.floor(this.item.runtime / 60);
        const minutes = this.item.runtime % 60;
        return `${hours}h ${minutes}m`;
      }
    }
  }
};
const yearStart = {
  computed: {
    yearStart() {
      const date = this.item.release_date ? this.item.release_date : this.item.first_air_date;
      if (date) {
        return date.split("-")[0];
      }
    }
  }
};
const yearEnd = {
  computed: {
    yearEnd() {
      const date = this.item.last_air_date;
      if (date) {
        return date.split("-")[0];
      }
    }
  }
};
const backdrop = {
  computed: {
    backdrop() {
      if (this.item.backdrop_path) {
        return `${apiImgUrl}/original${this.item.backdrop_path}`;
      }
    }
  }
};
const cert = {
  computed: {
    cert() {
      if (this.item.release_dates) {
        const releases = this.item.release_dates.results.find(
          (release) => release.iso_3166_1 === process.env.API_COUNTRY || release.iso_3166_1 === "US"
        );
        if (!releases)
          return null;
        const item = releases.release_dates.find((date) => date.certification !== "");
        if (item)
          return item.certification;
      } else if (this.item.content_ratings) {
        const releases = this.item.content_ratings.results.find(
          (release) => release.iso_3166_1 === process.env.API_COUNTRY || release.iso_3166_1 === "US"
        );
        if (!releases)
          return null;
        return releases.rating;
      }
    }
  }
};
const trailer = {
  computed: {
    trailer() {
      var _a2;
      var _a;
      let videos = (_a2 = (_a = this.item.videos) == null ? void 0 : _a.results) != null ? _a2 : [];
      if (!videos.length)
        return null;
      videos = videos.filter((video) => video.type === "Trailer");
      if (!videos.length)
        return null;
      return [
        {
          name: videos[0].name,
          src: `https://www.youtube.com/embed/${videos[0].key}?rel=0&showinfo=0&autoplay=1`
        }
      ];
    }
  }
};
const directors = {
  computed: {
    directors() {
      var _a2;
      var _a;
      const people = (_a2 = (_a = this.item.credits) == null ? void 0 : _a.crew) != null ? _a2 : [];
      if (people) {
        return people.filter((person) => person.job === "Director").map((person) => person.name).join(", ");
      }
    }
  }
};
const creators = {
  computed: {
    creators() {
      const people = this.item.created_by;
      if (people) {
        return people.map((person) => person.name).join("| ");
      }
    }
  }
};
const _imports_0 = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2%209.1371C2%2014%206.01943%2016.5914%208.96173%2018.9109C10%2019.7294%2011%2020.5%2012%2020.5C13%2020.5%2014%2019.7294%2015.0383%2018.9109C17.9806%2016.5914%2022%2014%2022%209.1371C22%204.27416%2016.4998%200.825464%2012%205.50063C7.50016%200.825464%202%204.27416%202%209.1371Z'%20fill='%23fffc'/%3e%3c/svg%3e";
const _imports_1 = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.96173%2018.9109L9.42605%2018.3219L8.96173%2018.9109ZM12%205.50063L11.4596%206.02073C11.601%206.16763%2011.7961%206.25063%2012%206.25063C12.2039%206.25063%2012.399%206.16763%2012.5404%206.02073L12%205.50063ZM15.0383%2018.9109L15.5026%2019.4999L15.0383%2018.9109ZM9.42605%2018.3219C7.91039%2017.1271%206.25307%2015.9603%204.93829%2014.4798C3.64922%2013.0282%202.75%2011.3345%202.75%209.1371H1.25C1.25%2011.8026%202.3605%2013.8361%203.81672%2015.4758C5.24723%2017.0866%207.07077%2018.3752%208.49742%2019.4999L9.42605%2018.3219ZM2.75%209.1371C2.75%206.98623%203.96537%205.18252%205.62436%204.42419C7.23607%203.68748%209.40166%203.88258%2011.4596%206.02073L12.5404%204.98053C10.0985%202.44352%207.26409%202.02539%205.00076%203.05996C2.78471%204.07292%201.25%206.42503%201.25%209.1371H2.75ZM8.49742%2019.4999C9.00965%2019.9037%209.55954%2020.3343%2010.1168%2020.6599C10.6739%2020.9854%2011.3096%2021.25%2012%2021.25V19.75C11.6904%2019.75%2011.3261%2019.6293%2010.8736%2019.3648C10.4213%2019.1005%209.95208%2018.7366%209.42605%2018.3219L8.49742%2019.4999ZM15.5026%2019.4999C16.9292%2018.3752%2018.7528%2017.0866%2020.1833%2015.4758C21.6395%2013.8361%2022.75%2011.8026%2022.75%209.1371H21.25C21.25%2011.3345%2020.3508%2013.0282%2019.0617%2014.4798C17.7469%2015.9603%2016.0896%2017.1271%2014.574%2018.3219L15.5026%2019.4999ZM22.75%209.1371C22.75%206.42503%2021.2153%204.07292%2018.9992%203.05996C16.7359%202.02539%2013.9015%202.44352%2011.4596%204.98053L12.5404%206.02073C14.5983%203.88258%2016.7639%203.68748%2018.3756%204.42419C20.0346%205.18252%2021.25%206.98623%2021.25%209.1371H22.75ZM14.574%2018.3219C14.0479%2018.7366%2013.5787%2019.1005%2013.1264%2019.3648C12.6739%2019.6293%2012.3096%2019.75%2012%2019.75V21.25C12.6904%2021.25%2013.3261%2020.9854%2013.8832%2020.6599C14.4405%2020.3343%2014.9903%2019.9037%2015.5026%2019.4999L14.574%2018.3219Z'%20fill='%23fffb'/%3e%3c/svg%3e";
const _sfc_main = {
  mixins: [name, stars, rating],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSaved: false,
      isFavorite: false
    };
  },
  mounted() {
    this.isFavorite = this.checkFavorites(this.item.id);
  },
  computed: {
    poster() {
      if (this.item.poster_path) {
        return `${apiImgUrl$1}/w370_and_h556_bestv2${this.item.poster_path}`;
      } else if (this.item.profile_path) {
        return `${apiImgUrl$1}/w370_and_h556_bestv2${this.item.profile_path}`;
      } else {
        return false;
      }
    },
    media() {
      if (this.item.media_type) {
        return this.item.media_type;
      } else if (this.item.name) {
        return "tv";
      } else {
        return "movie";
      }
    }
  },
  methods: {
    getUserId() {
      var _a;
      if (localStorage.getItem("user") !== null) {
        const userData = JSON.parse(localStorage.getItem("user"));
        return (_a = userData.user) == null ? void 0 : _a._id;
      }
    },
    async saveItem() {
      const favoriteData = {
        user_id: this.getUserId(),
        id: this.item.id,
        media_type: this.media,
        title: this.item.title ? this.item.title : this.item.name,
        poster_path: this.item.poster_path
      };
      try {
        const response = await useBackendStore().addFavorite(favoriteData);
        this.item._id = response.data.favorite_id;
        this.isSaved = true;
      } catch (error) {
        console.error("There was an error in saving favorite", error);
      }
    },
    async deleteItem() {
      try {
        await useBackendStore().deleteFavorite(this.item._id, this.getUserId());
        this.isSaved = false;
      } catch (error) {
        console.error("There was an error in deleting favorite", error);
      }
    },
    checkFavorites(item_id) {
      const userFavorites = JSON.parse((void 0).localStorage.getItem("favorites")) || [];
      if (userFavorites) {
        const result = userFavorites.some(
          (favorite) => {
            const check = favorite.id === item_id;
            if (check) {
              this.item._id = favorite._id;
            }
            return check;
          }
        );
        return result;
      } else {
        return false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$2;
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "card__link",
    to: { name: `${$options.media}-id`, params: { id: $props.item.id } }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="card__img"${_scopeId}>`);
        if ($options.poster) {
          _push2(ssrRenderComponent(_component_NuxtImg, {
            src: $options.poster,
            loading: "lazy",
            alt: _ctx.name
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<span${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"${_scopeId}><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"${_scopeId}></path></svg></span>`);
        }
        _push2(`</div><h2 class="card__name"${_scopeId}>${ssrInterpolate(_ctx.name)}</h2>`);
        if ($options.media !== "person" && (_ctx.stars || $props.item.vote_average)) {
          _push2(`<div class="card__rating"${_scopeId}>`);
          if (_ctx.stars) {
            _push2(`<div class="card__stars"${_scopeId}><div style="${ssrRenderStyle({ width: `${_ctx.stars}%` })}"${_scopeId}></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if ($props.item.vote_average) {
            _push2(`<div class="card__vote"${_scopeId}>${ssrInterpolate(_ctx.rating.toFixed(1))}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode("div", { class: "card__img" }, [
            $options.poster ? (openBlock(), createBlock(_component_NuxtImg, {
              key: 0,
              src: $options.poster,
              loading: "lazy",
              alt: _ctx.name
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
          createVNode("h2", { class: "card__name" }, toDisplayString(_ctx.name), 1),
          $options.media !== "person" && (_ctx.stars || $props.item.vote_average) ? (openBlock(), createBlock("div", {
            key: 0,
            class: "card__rating"
          }, [
            _ctx.stars ? (openBlock(), createBlock("div", {
              key: 0,
              class: "card__stars"
            }, [
              createVNode("div", {
                style: { width: `${_ctx.stars}%` }
              }, null, 4)
            ])) : createCommentVNode("", true),
            $props.item.vote_average ? (openBlock(), createBlock("div", {
              key: 1,
              class: "card__vote"
            }, toDisplayString(_ctx.rating.toFixed(1)), 1)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="save-container">`);
  if ($data.isSaved || $data.isFavorite) {
    _push(`<img${ssrRenderAttr("src", _imports_0)} class="heart-icon" alt="Saved">`);
  } else {
    _push(`<img${ssrRenderAttr("src", _imports_1)} class="heart-icon" alt="Not Saved">`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const debounce = (func, delay) => {
  let timeoutID = null;
  return function(...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export { __nuxt_component_0 as _, apiImgUrl$1 as a, debounce as b, yearEnd as c, directors as d, creators as e, __nuxt_component_0$1 as f, cert as g, backdrop as h, name as n, runtime as r, stars as s, trailer as t, useBackendStore as u, yearStart as y };
//# sourceMappingURL=Functions-sXnlZwJ_.mjs.map
