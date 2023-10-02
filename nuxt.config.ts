// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://127.0.0.1:3000",
      siteName: "Nuxt Nova", // Will be displayed on home page
      siteDescription: "Nuxt Nova Blog Template",
      language: "en-US", // prefer more explicit language codes like `en-AU` over `en`, but `en` also works fine.
      titleSeparator: "|", // Best options: | or -

      postFeaturedImagePlaceholder: "/images/placeholder.jpg",

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
    "/api/**": { isr: true },

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
    "@nuxtjs/strapi",
    "@nuxtseo/module", // doc https://nuxtseo.com/
    // "@nuxtjs/google-adsense", // source: https://nuxt.com/modules/google-adsense
    "@nuxtjs/color-mode", // doc: https://color-mode.nuxtjs.org/
    "@nuxt/image-edge",
    "@nuxt/content",
    "@vueuse/nuxt", // source: https://vueuse.org/nuxt/README.html
    "nuxt-disqus", // source: https://github.com/modbender/nuxt-disqus
    "nuxt-icon", // icons: https://icones.js.org/, doc: https://nuxt.com/modules/icon
  ],

  devtools: { enabled: true },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  strapi: {
    prefix: "/api",
    version: "v4",
  },

  content: {
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
      "http://127.0.0.1:1337",
      "http://localhost:1337",
      "https://nuxt-nova.netlify.app",
    ],
  },

  // "google-adsense": {
  //   // options: https://nuxt.com/modules/google-adsense
  //   id: "ca-pub-123456789",
  //   test: true, // remove or set to false when having approved adsense account id
  // },

  sitemap: {
    // manually chunk into multiple sitemaps
    sitemaps: {
      posts: {
        include: ["/p/**"],
        // give blog posts slightly higher priority (this is optional)
        defaults: { priority: 0.9 },
      },
      tags: {
        include: ["/tag/**"],
      },
      authors: {
        include: ["/author/**"],
      },
      pages: {
        exclude: ["/p/**", "/tag/**", "/author/**"],
      },
    },
  },

  colorMode: {
    // doc: https://color-mode.nuxtjs.org/
    preference: "dark",
    dataValue: "bs-theme",
    fallback: "light",
    classSuffix: "",
  },

  disqus: {
    // get shortname: https://disqus.com/admin/
    shortname: "nuxt-nova",
  },
});
