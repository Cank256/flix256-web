import { _ as __nuxt_component_0$1 } from './nuxt-link-nfmPRCnn.mjs';
import { defineComponent, ref, createElementBlock, useSSRContext, watch, mergeProps, withCtx, createTextVNode } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/index.mjs';
import { e as defineStore } from '../server.mjs';
import axios from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/axios/index.js';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle } from 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0 } from './flix256-512-23Q_ozP-.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/ufo/dist/index.mjs';
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
import '../../renderer.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/devalue/index.js';
import 'file:///Users/caleb/Dev/ALX/Portifolio%20Project/source/flix256-web/frontend/node_modules/@unhead/ssr/dist/index.mjs';

const __nuxt_component_1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useSearchStore = defineStore("searchStore", {
  state: () => ({
    searchOpen: false,
    fromPage: "/"
  }),
  actions: {
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
    },
    openSearch() {
      this.searchOpen = true;
    },
    closeSearch() {
      this.searchOpen = false;
    },
    setFromPage(page) {
      this.fromPage = page;
    }
  }
});
const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: null,
    username: null,
    email: null,
    lang: null,
    isLoggedInState: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.userId,
    isLoggedIn: (state) => state.isLoggedInState
  },
  actions: {
    async register(user) {
      try {
        const response = await axios.post("/auth/signup", user);
        if (response.status !== 201) {
          throw new Error(`Registration failed: ${response.data}`);
        }
        const userData = response.data;
        const favorites = await axios.get(`/favorite/${userData.user._id}`);
        this.setUserData(userData, favorites.data.results);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async login(username) {
      try {
        const response = await axios.post("/auth/login", { username });
        if (response.status !== 200) {
          throw new Error(`Login failed: ${response.data}`);
        }
        const userData = response.data;
        const favorites = await axios.get(`/favorite/${userData.user._id}`);
        this.setUserData(userData, favorites.data.results);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    async delete(user_id) {
      try {
        const response = await axios.delete(`/users/${user_id}`);
        if (response.status >= 300) {
          throw new Error(`Account deletion failed: ${response.data}`);
        }
        this.resetState();
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    async logout() {
      this.resetState();
    },
    setUserData(user, favorites) {
      this.userId = user.userId;
      this.username = user.username;
      this.email = user.email;
      this.lang = user.lang;
      this.isLoggedInState = true;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
    resetState() {
      this.userId = null;
      this.username = null;
      this.email = null;
      this.lang = null;
      this.isLoggedInState = false;
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("user");
      localStorage.removeItem("favorites");
    }
  }
});
const languages = [
  { iso_639_1: "xx", english_name: "NA" },
  { iso_639_1: "aa", english_name: "Afar" },
  { iso_639_1: "af", english_name: "Afrikaans" },
  { iso_639_1: "ak", english_name: "Akan" },
  { iso_639_1: "an", english_name: "Aragonese" },
  { iso_639_1: "as", english_name: "Assamese" },
  { iso_639_1: "av", english_name: "Avaric" },
  { iso_639_1: "ae", english_name: "Avestan" },
  { iso_639_1: "ay", english_name: "Aymara" },
  { iso_639_1: "az", english_name: "Azerbaijani" },
  { iso_639_1: "ba", english_name: "Bashkir" },
  { iso_639_1: "bm", english_name: "Bambara" },
  { iso_639_1: "bi", english_name: "Bislama" },
  { iso_639_1: "bo", english_name: "Tibetan" },
  { iso_639_1: "br", english_name: "Breton" },
  { iso_639_1: "ca", english_name: "Catalan" },
  { iso_639_1: "cs", english_name: "Czech" },
  { iso_639_1: "ce", english_name: "Chechen" },
  { iso_639_1: "cu", english_name: "Slavic" },
  { iso_639_1: "cv", english_name: "Chuvash" },
  { iso_639_1: "kw", english_name: "Cornish" },
  { iso_639_1: "co", english_name: "Corsican" },
  { iso_639_1: "cr", english_name: "Cree" },
  { iso_639_1: "cy", english_name: "Welsh" },
  { iso_639_1: "da", english_name: "Danish" },
  { iso_639_1: "de", english_name: "German" },
  { iso_639_1: "dv", english_name: "Divehi" },
  { iso_639_1: "dz", english_name: "Dzongkha" },
  { iso_639_1: "eo", english_name: "Esperanto" },
  { iso_639_1: "et", english_name: "Estonian" },
  { iso_639_1: "eu", english_name: "Basque" },
  { iso_639_1: "fo", english_name: "Faroese" },
  { iso_639_1: "fj", english_name: "Fijian" },
  { iso_639_1: "fi", english_name: "Finnish" },
  { iso_639_1: "fr", english_name: "French" },
  { iso_639_1: "fy", english_name: "Frisian" },
  { iso_639_1: "ff", english_name: "Fulah" },
  { iso_639_1: "gd", english_name: "Gaelic" },
  { iso_639_1: "ga", english_name: "Irish" },
  { iso_639_1: "gl", english_name: "Galician" },
  { iso_639_1: "gv", english_name: "Manx" },
  { iso_639_1: "gn", english_name: "Guarani" },
  { iso_639_1: "gu", english_name: "Gujarati" },
  { iso_639_1: "ht", english_name: "Haitian; Haitian Creole" },
  { iso_639_1: "ha", english_name: "Hausa" },
  { iso_639_1: "sh", english_name: "Serbo-Croatian" },
  { iso_639_1: "hz", english_name: "Herero" },
  { iso_639_1: "ho", english_name: "Hiri Motu" },
  { iso_639_1: "hr", english_name: "Croatian" },
  { iso_639_1: "hu", english_name: "Hungarian" },
  { iso_639_1: "ig", english_name: "Igbo" },
  { iso_639_1: "io", english_name: "Ido" },
  { iso_639_1: "ii", english_name: "Yi" },
  { iso_639_1: "iu", english_name: "Inuktitut" },
  { iso_639_1: "ie", english_name: "Interlingue" },
  { iso_639_1: "ia", english_name: "Interlingua" },
  { iso_639_1: "id", english_name: "Indonesian" },
  { iso_639_1: "ik", english_name: "Inupiaq" },
  { iso_639_1: "is", english_name: "Icelandic" },
  { iso_639_1: "it", english_name: "Italian" },
  { iso_639_1: "jv", english_name: "Javanese" },
  { iso_639_1: "ja", english_name: "Japanese" },
  { iso_639_1: "kl", english_name: "Kalaallisut" },
  { iso_639_1: "kn", english_name: "Kannada" },
  { iso_639_1: "ks", english_name: "Kashmiri" },
  { iso_639_1: "kr", english_name: "Kanuri" },
  { iso_639_1: "kk", english_name: "Kazakh" },
  { iso_639_1: "km", english_name: "Khmer" },
  { iso_639_1: "ki", english_name: "Kikuyu" },
  { iso_639_1: "rw", english_name: "Kinyarwanda" },
  { iso_639_1: "ky", english_name: "Kirghiz" },
  { iso_639_1: "kv", english_name: "Komi" },
  { iso_639_1: "kg", english_name: "Kongo" },
  { iso_639_1: "ko", english_name: "Korean" },
  { iso_639_1: "kj", english_name: "Kuanyama" },
  { iso_639_1: "ku", english_name: "Kurdish" },
  { iso_639_1: "lo", english_name: "Lao" },
  { iso_639_1: "la", english_name: "Latin" },
  { iso_639_1: "lv", english_name: "Latvian" },
  { iso_639_1: "li", english_name: "Limburgish" },
  { iso_639_1: "ln", english_name: "Lingala" },
  { iso_639_1: "lt", english_name: "Lithuanian" },
  { iso_639_1: "lb", english_name: "Letzeburgesch" },
  { iso_639_1: "lu", english_name: "Luba-Katanga" },
  { iso_639_1: "lg", english_name: "Ganda" },
  { iso_639_1: "mh", english_name: "Marshall" },
  { iso_639_1: "ml", english_name: "Malayalam" },
  { iso_639_1: "mr", english_name: "Marathi" },
  { iso_639_1: "mg", english_name: "Malagasy" },
  { iso_639_1: "mt", english_name: "Maltese" },
  { iso_639_1: "mo", english_name: "Moldavian" },
  { iso_639_1: "mn", english_name: "Mongolian" },
  { iso_639_1: "mi", english_name: "Maori" },
  { iso_639_1: "ms", english_name: "Malay" },
  { iso_639_1: "my", english_name: "Burmese" },
  { iso_639_1: "na", english_name: "Nauru" },
  { iso_639_1: "nv", english_name: "Navajo" },
  { iso_639_1: "nr", english_name: "Ndebele" },
  { iso_639_1: "nd", english_name: "Ndebele" },
  { iso_639_1: "ng", english_name: "Ndonga" },
  { iso_639_1: "ne", english_name: "Nepali" },
  { iso_639_1: "nl", english_name: "Dutch" },
  { iso_639_1: "nn", english_name: "Norwegian Nynorsk" },
  { iso_639_1: "nb", english_name: "Norwegian Bokm\xE5l" },
  { iso_639_1: "no", english_name: "Norwegian" },
  { iso_639_1: "ny", english_name: "Chichewa; Nyanja" },
  { iso_639_1: "oc", english_name: "Occitan" },
  { iso_639_1: "oj", english_name: "Ojibwa" },
  { iso_639_1: "or", english_name: "Oriya" },
  { iso_639_1: "om", english_name: "Oromo" },
  { iso_639_1: "os", english_name: "Ossetian; Ossetic" },
  { iso_639_1: "pi", english_name: "Pali" },
  { iso_639_1: "pl", english_name: "Polish" },
  { iso_639_1: "pt", english_name: "Portuguese" },
  { iso_639_1: "qu", english_name: "Quechua" },
  { iso_639_1: "rm", english_name: "Raeto-Romance" },
  { iso_639_1: "ro", english_name: "Romanian" },
  { iso_639_1: "rn", english_name: "Rundi" },
  { iso_639_1: "ru", english_name: "Russian" },
  { iso_639_1: "sg", english_name: "Sango" },
  { iso_639_1: "sa", english_name: "Sanskrit" },
  { iso_639_1: "si", english_name: "Sinhalese" },
  { iso_639_1: "sk", english_name: "Slovak" },
  { iso_639_1: "sl", english_name: "Slovenian" },
  { iso_639_1: "se", english_name: "Northern Sami" },
  { iso_639_1: "sm", english_name: "Samoan" },
  { iso_639_1: "sn", english_name: "Shona" },
  { iso_639_1: "sd", english_name: "Sindhi" },
  { iso_639_1: "so", english_name: "Somali" },
  { iso_639_1: "st", english_name: "Sotho" },
  { iso_639_1: "es", english_name: "Spanish" },
  { iso_639_1: "sq", english_name: "Albanian" },
  { iso_639_1: "sc", english_name: "Sardinian" },
  { iso_639_1: "sr", english_name: "Serbian" },
  { iso_639_1: "ss", english_name: "Swati" },
  { iso_639_1: "su", english_name: "Sundanese" },
  { iso_639_1: "sw", english_name: "Swahili" },
  { iso_639_1: "sv", english_name: "Swedish" },
  { iso_639_1: "ty", english_name: "Tahitian" },
  { iso_639_1: "ta", english_name: "Tamil" },
  { iso_639_1: "tt", english_name: "Tatar" },
  { iso_639_1: "te", english_name: "Telugu" },
  { iso_639_1: "tg", english_name: "Tajik" },
  { iso_639_1: "tl", english_name: "Tagalog" },
  { iso_639_1: "th", english_name: "Thai" },
  { iso_639_1: "ti", english_name: "Tigrinya" },
  { iso_639_1: "to", english_name: "Tonga" },
  { iso_639_1: "tn", english_name: "Tswana" },
  { iso_639_1: "ts", english_name: "Tsonga" },
  { iso_639_1: "tk", english_name: "Turkmen" },
  { iso_639_1: "tr", english_name: "Turkish" },
  { iso_639_1: "tw", english_name: "Twi" },
  { iso_639_1: "ug", english_name: "Uighur" },
  { iso_639_1: "uk", english_name: "Ukrainian" },
  { iso_639_1: "ur", english_name: "Urdu" },
  { iso_639_1: "uz", english_name: "Uzbek" },
  { iso_639_1: "ve", english_name: "Venda" },
  { iso_639_1: "vi", english_name: "Vietnamese" },
  { iso_639_1: "vo", english_name: "Volap\xFCk" },
  { iso_639_1: "wa", english_name: "Walloon" },
  { iso_639_1: "wo", english_name: "Wolof" },
  { iso_639_1: "xh", english_name: "Xhosa" },
  { iso_639_1: "yi", english_name: "Yiddish" },
  { iso_639_1: "za", english_name: "Zhuang" },
  { iso_639_1: "zu", english_name: "Zulu" },
  { iso_639_1: "ab", english_name: "Abkhazian" },
  { iso_639_1: "zh", english_name: "Mandarin" },
  { iso_639_1: "ps", english_name: "Pushto" },
  { iso_639_1: "am", english_name: "Amharic" },
  { iso_639_1: "ar", english_name: "Arabic" },
  { iso_639_1: "bg", english_name: "Bulgarian" },
  { iso_639_1: "cn", english_name: "Cantonese" },
  { iso_639_1: "mk", english_name: "Macedonian" },
  { iso_639_1: "el", english_name: "Greek" },
  { iso_639_1: "fa", english_name: "Persian" },
  { iso_639_1: "he", english_name: "Hebrew" },
  { iso_639_1: "hi", english_name: "Hindi" },
  { iso_639_1: "hy", english_name: "Armenian" },
  { iso_639_1: "en", english_name: "English" },
  { iso_639_1: "ee", english_name: "Ewe" },
  { iso_639_1: "ka", english_name: "Georgian" },
  { iso_639_1: "pa", english_name: "Punjabi" },
  { iso_639_1: "bn", english_name: "Bengali" },
  { iso_639_1: "bs", english_name: "Bosnian" },
  { iso_639_1: "ch", english_name: "Chamorro" },
  { iso_639_1: "be", english_name: "Belarusian" },
  { iso_639_1: "yo", english_name: "Yoruba" }
];
const _sfc_main = {
  data() {
    return {
      showDropdown: false,
      showSearch: this.$route.name === "search" ? true : false,
      query: this.$route.query.q ? this.$route.query.q : "",
      fromPage: useSearchStore().fromPage,
      isLoggedIn: false,
      showProfile: false,
      showLogin: false,
      showSignup: false,
      languages: [...languages],
      user: null
    };
  },
  watch: {
    $route(to, from) {
      this.query = to.query.q || "";
    }
  },
  mounted() {
    this.$refs.input.focus();
  },
  setup() {
    const authStore = useAuthStore();
    const userId = ref("");
    const username = ref("");
    const email = ref("");
    const lang = ref("");
    const isLoggedIn = ref(false);
    const user = ref("");
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("isLoggedIn") === "true") {
        isLoggedIn.value = true;
        user.value = JSON.parse(localStorage.getItem("user"));
      }
      watch(
        () => authStore.isLoggedIn,
        (newValue) => {
          isLoggedIn.value = newValue;
          localStorage.setItem("isLoggedIn", newValue);
        },
        () => authStore.user,
        (newValue) => {
          user.value = newValue;
        }
      );
    }
    const signup = async () => {
      if (!username.value || !email.value) {
        console.error("Username and email are required");
        return;
      }
      const userData = {
        userId: userId.value,
        username: username.value,
        email: email.value,
        lang: lang.value
      };
      try {
        await authStore.register(userData);
        closePopup();
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };
    const login = async () => {
      if (!username.value) {
        console.error("Username is required");
        return;
      }
      try {
        await authStore.login(username.value);
        this.closePopup();
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    const deleteAccount = async () => {
      try {
        await authStore.delete(user.value.user._id);
        closePopup();
      } catch (error) {
        console.error("Account deletion failed:", error);
      }
    };
    return {
      username,
      email,
      lang,
      isLoggedIn,
      user,
      signup,
      login,
      deleteAccount
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleDropdownItem(item) {
      const authStore = useAuthStore();
      if (item === "Profile") {
        this.showProfilePopup();
      } else {
        authStore.logout();
        this.$router.push("/");
      }
    },
    handleFavorites() {
      this.$router.push({ name: "favorites" });
    },
    toggleSearchInput() {
      this.showSearch = !this.showSearch;
    },
    toggleSearchState() {
      useSearchStore().toggleSearch();
    },
    goToRoute() {
      if (this.query) {
        if (this.$route.name === "search") {
          this.$router.replace({ query: { q: this.query } });
        } else {
          this.$router.push({ name: "search", query: { q: this.query } });
        }
      } else {
        this.$router.push({ path: this.fromPage });
      }
    },
    goBack() {
      this.query = "";
      this.$router.push({ path: this.fromPage });
    },
    unFocus(e) {
      const searchStore = useSearchStore();
      if (this.$route.name !== "search") {
        const target = e.relatedTarget;
        if (!target || !target.classList.contains("search-toggle")) {
          this.query = "";
          searchStore.closeSearch();
        }
      }
    },
    showProfilePopup() {
      this.showProfile = true;
      this.showLogin = false;
      this.showSignup = false;
    },
    showLoginPopup() {
      this.showLogin = true;
      this.showSignup = false;
    },
    showSignupPopup() {
      this.showSignup = true;
      this.showLogin = false;
    },
    closePopup() {
      this.showProfile = false;
      this.showLogin = false;
      this.showSignup = false;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$1;
  const _component_ClientOnly = __nuxt_component_1;
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "nav-bar" }, _attrs))} data-v-ef17a7cd><div class="logo" data-v-ef17a7cd><img${ssrRenderAttr("src", _imports_0)} alt="Flix256" data-v-ef17a7cd></div><ul class="nav-links" data-v-ef17a7cd><li data-v-ef17a7cd>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    exact: "",
    to: { name: "index" },
    "active-class": "active-link",
    "aria-label": "Home"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-ef17a7cd>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: { name: "movie" },
    "active-class": "active-link",
    "aria-label": "Movies"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Movies`);
      } else {
        return [
          createTextVNode("Movies")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-ef17a7cd>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: { name: "tv" },
    "active-class": "active-link",
    "aria-label": "TV Shows"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`TV Shows`);
      } else {
        return [
          createTextVNode("TV Shows")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-ef17a7cd>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    onClick: ($event) => $setup.isLoggedIn ? $options.handleFavorites() : $options.showLoginPopup(),
    "active-class": "active-link",
    "aria-label": "Favorites"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Favorites`);
      } else {
        return [
          createTextVNode("Favorites")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul><div class="search-user" data-v-ef17a7cd><div class="search-bar" data-v-ef17a7cd><input id="search"${ssrRenderAttr("value", $data.query)} style="${ssrRenderStyle($data.showSearch ? null : { display: "none" })}" name="search" type="text" placeholder="Search for Movies and TV Shows" data-v-ef17a7cd><svg class="search-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-ef17a7cd><path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-ef17a7cd></path></svg></div>`);
  _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
  _push(`</div></nav>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/NavBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ef17a7cd"]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=NavBar-a5FUaGkb.mjs.map
