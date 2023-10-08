// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || "https://127.0.0.1:3000",
        name: "Nuxt Nova", // Will be displayed on home page
        description: "Nuxt Nova Blog Template",
      },

      defaultLocale: "en",
      titleSeparator: "|", // Best options: | or -

      identity: {
        type: "Nuxt Nova",
      },

      postFeaturedImagePlaceholder: "/images/placeholder.jpg",

      shareLinks: {
        youtube: "#",
        x: "#",
        facebook: "#",
        instagram: "#",
      },
    },

    nuxtNovaControl: {
      postListStyle: "grid", //either 'grid' or 'list',
    },
  },

  routeRules: {
    // All pages on ISR - cached until next build clears it
    "/author/**": { isr: true },

    "/nav/**": { isr: true },

    "/p/**": { isr: true },
  },

  css: ["@/assets/scss/main.scss"],

  modules: [
    "@nuxtjs/strapi",
    "@nuxtseo/module", // doc https://nuxtseo.com/
    // "@nuxtjs/google-fonts", // doc https://google-fonts.nuxtjs.org/
    // "@nuxtjs/google-adsense", // source: https://nuxt.com/modules/google-adsense
    "@nuxtjs/color-mode", // doc: https://color-mode.nuxtjs.org/
    "@nuxt/image-edge",
    "@nuxt/content",
    "@vueuse/nuxt", // source: https://vueuse.org/nuxt/README.html
    "nuxt-disqus", // source: https://github.com/modbender/nuxt-disqus
    "nuxt-icon", // icons: https://icones.js.org/, doc: https://nuxt.com/modules/icon
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  // googleFonts: {
  //   display: "swap",
  //   families: {
  //     Roboto: true,
  //   },
  // },

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
      process.env.STRAPI_URL as string,
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
        exclude: ["/tag/**", "/author/**"],
      },
      tags: {
        include: ["/tag/**"],
        exclude: ["/p/**", "/author/**"],
      },
      authors: {
        include: ["/author/**"],
        exclude: ["/p/**", "/tag/**"],
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
