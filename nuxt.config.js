export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'metall-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-awesome-swiper' },
    { src: '@/plugins/vue-tooltips.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost',
        endpoints: {
          login: {
            url: '/api/V2/login'
          },
          user: {
            url: '/api/V2/user'
          },
          logout: {
            url: '/api/V2/logout'
          }
        }
      }
    },
    redirect: {
      logout: false,
      home: false
    }
  },

  // auth: {
  //   strategies: {
  //     cookie: {
  //       endpoints: {
  //         csrf: {
  //           url: 'sanctum/csrf-cookie'
  //         },
  //         login: {
  //           url: '/api/V2/login'
  //         },
  //         user: {
  //           url: '/api/V2/user'
  //         },
  //         logout: {
  //           url: '/api/V2/logout'
  //         }
  //       }
  //     }
  //   }
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost',
    credentials: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Loading bar
  loading: {
    color: '#ffd737',
    height: '3px',
    duration: 8000
  }
}
