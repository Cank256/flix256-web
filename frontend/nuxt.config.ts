// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    backendUrl: 'http://127.0.0.1:5000',
    tmdbImageUrl: 'https://image.tmdb.org/t/p',
    youtubeApiKey: ''
  },
  
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.scss',
  ],

  modules: ['@nuxtjs/device', '@pinia/nuxt', '@nuxt/image'],
})