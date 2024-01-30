// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    backendUrl: 'http://127.0.0.1:5000',
    tmdbImageUrl: 'https://image.tmdb.org/t/p/original',
    youtubeApiKey: ''
  },
  
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.scss',
  ],

  plugins: [],

  modules: [
    '@nuxtjs/device',
  ],
})
