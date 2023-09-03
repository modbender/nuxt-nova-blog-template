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

  app: {
    head: {
      titleTemplate: "%pageTitle %titleSeparator %siteName",
    },
  },

  css: ["@/assets/scss/main.scss"],

  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/image-edge",
    "@nuxt/content",
    "nuxt-disqus",
    "nuxt-icon",
  ],

  extends: ["nuxt-seo-kit"],

  devtools: { enabled: true },

  image: {
    domains: [
      "https://127.0.0.1:3000",
      "https://localhost:3000",
      "https://nuxt-nova.netlify.app",
    ],
  },

  unhead: {
    ogTitleTemplate: "%pageTitle %titleSeparator %siteName",
  },

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
