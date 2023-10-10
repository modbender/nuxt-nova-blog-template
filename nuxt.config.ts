// https://v3.nuxtjs.org/api/configuration/nuxt.config

const siteLogoIcons = [
  {
    src: "images/logo/nuxt-48.png",
    sizes: "48x48",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-72.png",
    sizes: "72x72",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-96.png",
    sizes: "96x96",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-144.png",
    sizes: "144x144",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-168.png",
    sizes: "168x168",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-256.png",
    sizes: "256x256",
    type: "image/png",
  },
  {
    src: "images/logo/nuxt-512.png",
    sizes: "512x512",
    type: "image/png",
  },
];

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
      siteIcons: siteLogoIcons,

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

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
    publicAssets: [
      {
        baseURL: "images",
        dir: "public/images",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    ],
  },

  // Required for Netlify deployment
  routeRules: {
    "/**": { isr: true },
  },

  css: ["@/assets/scss/main.scss"],

  modules: [
    "@vite-pwa/nuxt",
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
  },

  colorMode: {
    // doc: https://color-mode.nuxtjs.org/
    preference: "dark",
    dataValue: "bs-theme",
    fallback: "light",
    classSuffix: "",
  },

  // googleFonts: {
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
      // preload: ["java"],
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
    format: ["webp", "jpg"],
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

  disqus: {
    // get shortname: https://disqus.com/admin/
    shortname: "nuxt-nova",
  },

  pwa: {
    registerType: "autoUpdate",
    manifestFilename: "manifest.json",
    manifest: {
      name: "Nuxt Nova",
      short_name: "NuxtNova",
      display: "standalone",
      theme_color: "#212529",
      background_color: "#212529",
      orientation: "portrait-primary",
      description: "Nuxt Nova Blog Template",
      icons: siteLogoIcons,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    // devOptions: {
    //   enabled: true,
    //   suppressWarnings: true,
    //   navigateFallbackAllowlist: [/^\/$/],
    //   type: "module",
    // },
  },
});
