// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      titleSeparator: "|",
      titleTemplate: "%pageTitle %titleSeparator %siteName",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
      siteName: "Nuxt Nova",
      siteDescription: "Nuxt Nova Blog Template",
      language: "en", // prefer more explicit language codes like `en-AU` over `en`
    },
  },

  css: ["@/assets/scss/main.scss"],

  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/mdc",
    "nuxt-disqus",
    "nuxt-icon",
  ],

  extends: ["nuxt-seo-kit"],

  devtools: { enabled: true },

  colorMode: {
    fallback: "dark",
    dataValue: "bs-theme",
  },

  disqus: {
    shortname: "nuxt-nova",
  },

  linkChecker: {
    failOn404: true,
  },
});
