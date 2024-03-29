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
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || "https://127.0.0.1:3000",
        name: process.env.NUXT_PUBLIC_SITE_NAME, // Will be displayed on home page
        description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
      },

      favicon: {
        url: process.env.NUXT_PUBLIC_SITE_FAVICON_URL,
        width: process.env.NUXT_PUBLIC_SITE_FAVICON_WIDTH,
        height: process.env.NUXT_PUBLIC_SITE_FAVICON_HEIGHT,
      },

      defaultLocale: process.env.NUXT_PUBLIC_SITE_LOCALE,
      titleSeparator: process.env.NUXT_PUBLIC_TITLE_SEPARATOR, // Best options: | or -
      siteIcons: siteLogoIcons,

      featuredImagePlaceholder: "/images/featuredImagePlaceholder.jpg",

      socialLinks: {
        youtube: process.env.NUXT_PUBLIC_SOCIAL_YOUTUBE_URL,
        x: process.env.NUXT_PUBLIC_SOCIAL_X_URL,
        facebook: process.env.NUXT_PUBLIC_SOCIAL_FACEBOOK_URL,
        instagram: process.env.NUXT_PUBLIC_SOCIAL_INSTAGRAM_URL,
      },

      gtagId: process.env.NUXT_PUBLIC_GOOGLE_TAG_ID,

      nuxtNovaControl: {
        postListStyle: process.env.NUXT_PUBLIC_POST_LIST_STYLE, //either 'grid' or 'list',
      },
    },
  },

  nitro: {
    prerender: {
      concurrency: 6,
      interval: 2 * 1000, // uses setTimeout, 1000 milliseconds = 1 second
      crawlLinks: true,
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
    "/**": { prerender: true },
  },

  css: ["@/assets/scss/main.scss"],

  modules: [
    "@formkit/auto-animate/nuxt", // Nothing to do for this
    "@nuxtjs/strapi",
    // doc https://nuxtseo.com/
    "@nuxtseo/module",
    // doc https://google-fonts.nuxtjs.org/
    "@nuxtjs/google-fonts",
    // "@nuxtjs/google-adsense", // source: https://nuxt.com/modules/google-adsense
    // doc: https://color-mode.nuxtjs.org/
    "@nuxtjs/color-mode",
    "@nuxt/content",
    // source: https://vueuse.org/nuxt/README.html
    "@vueuse/nuxt",
    "@nuxt/image",
    // source: https://github.com/modbender/nuxt-disqus
    "nuxt-disqus",
    // icons: https://icones.js.org/, doc: https://nuxt.com/modules/icon
    "nuxt-icon",
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

  googleFonts: {
    display: "optional",
    families: {
      Roboto: true,
    },
  },

  strapi: {
    prefix: "/api",
    version: "v4",
  },

  content: {
    markdown: {
      remarkPlugins: {
        "remark-oembed": { syncWidget: true },
      },
    },
    highlight: {
      theme: "dracula",
    },
  },

  image: {
    // doc: https://image.nuxtjs.org/
    // You could try format: ["avif", "webp"] for more compression
    format: ["webp"],
    domains: [
      process.env.NUXT_PUBLIC_SITE_URL as string,
      process.env.STRAPI_URL as string,
    ],
    alias: {
      backend: process.env.STRAPI_URL as string,
    },
  },

  // googleAdsense: {
  //   // options: https://nuxt.com/modules/google-adsense
  //   // id: "ca-pub-123456789",
  //   onPageLoad: true,
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
    shortname: process.env.NUXT_PUBLIC_DISQUS_SHORTNAME,
  },
});
