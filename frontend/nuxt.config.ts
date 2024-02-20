// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    backendUrl: 'https://flix256-3989cf42b7a0.herokuapp.com/',
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