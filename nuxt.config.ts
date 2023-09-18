// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://127.0.0.1:3000",
      siteName: "Nuxt Nova", // Will be displayed on home page
      siteDescription: "Nuxt Nova Blog Template",
      language: "en-US", // prefer more explicit language codes like `en-AU` over `en`, but `en` also works fine.
      titleSeparator: "|", // Best options: | or -

      postFeaturedImagePlaceholder: "/images/posts/example.jpg",

      shareLinks: {
        youtube: "#",
        x: "#",
        facebook: "#",
        instagram: "#",
      },
    },
  },

  routeRules: {
    // All pages on ISR - cached until next build clears it
    "/author/**": { isr: true },

    "/nav/**": { isr: true },

    "/p/**": { isr: true },
  },

  app: {
    head: {
      titleTemplate: "%pageTitle %titleSeparator %siteName",
    },
  },

  css: ["@/assets/scss/main.scss"],

  modules: [
    "@vueuse/nuxt", // source: https://vueuse.org/nuxt/README.html
    // "@nuxtjs/google-adsense", // sourc: https://nuxt.com/modules/google-adsense
    "@nuxtjs/color-mode", // doc: https://color-mode.nuxtjs.org/
    "@nuxt/image-edge",
    "@nuxt/content",
    "nuxt-disqus", // source: https://github.com/modbender/nuxt-disqus
    "nuxt-icon", // icons: https://icones.js.org/, doc: https://nuxt.com/modules/icon
  ],

  extends: ["nuxt-seo-kit"], // doc https://nuxtseo.com/

  devtools: { enabled: true },

  content: {
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "light-plus",
        // Theme used if `html.dark`
        dark: "dark-plus",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },

  image: {
    // doc: https://image.nuxtjs.org/
    // You could try format: ["avif", "webp"] for more compression
    format: ["webp"],
    domains: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://nuxt-nova.netlify.app",
    ],
  },

  // "google-adsense": {
  //   // options: https://nuxt.com/modules/google-adsense
  //   id: "ca-pub-123456789",
  //   test: true, // remove or set to false when having approved adsense account id
  // },

  unhead: {
    ogTitleTemplate: "%pageTitle %titleSeparator %siteName",
  },

  colorMode: {
    // doc: https://color-mode.nuxtjs.org/
    preference: "dark",
    fallback: "light",
    dataValue: "bs-theme",
    classSuffix: "",
  },

  disqus: {
    // get shortname: https://disqus.com/admin/
    shortname: "nuxt-nova",
  },

  linkChecker: {
    failOn404: true,
  },
});
