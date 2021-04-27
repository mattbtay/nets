export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Are there any nets today?",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Are there any nets today? See a list of ham radio nets in the dallas/fort worth area each day."
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "nuxt-social-meta",
    {
      url: "http://arethereanynetstoday.com",
      title: "Are There Any Nets Today",
      site_name: "Are There Any Nets Today",
      description: "Are there any nets today? View a list of the current days ham radio nets.",
      img: "tw-card.png",
      locale: "en_US",
      twitter_card: "summary_large_image",
      themeColor: "#theme-color",
    },
  ],

  axios: {
    proxy: true
  },
  proxy: {
    "/api/": { target: "http://localhost:8888/", pathRewrite: { "^/api/": "" } }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
