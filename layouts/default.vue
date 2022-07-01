<template>
  <div>
    <NotificationsBaseNotifyList />
    <transition name="preloader">
      <PreloadersLogoutPreloader v-if="logoutLoading" />
    </transition>
    <HeaderComponent
      :menu-opened="menuOpened"
      :catalog-opened="catalogOpened"
      :logout-loading="logoutLoading"
    />
    <Nuxt />
    <FooterComponent />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import eventBus from '~/eventBus'
import convertCategories from '~/helpers/convertCategories'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      categoriesData: null,
      catalogOpened: false,
      menuOpened: false,

      logoutLoading: false
    }
  },
  async fetch () {
    if (!this.categoriesData) {
      try {
        const response = await this.$store.dispatch('loadCategoriesData')

        this.categoriesData = response
      } catch (err) {
        this.categoriesData = []
      }
    }
  },
  computed: {
    categories () {
      if (this.categoriesData) {
        return convertCategories(this.categoriesData)
      } else {
        return []
      }
    }
  },
  watch: {
    $route () {
      this.catalogOpened = false
      this.menuOpened = false
    }
  },
  created () {
    eventBus.$on('toggleCatalog', (value) => { this.catalogOpened = value })
    eventBus.$on('toggleMenu', (value) => { this.menuOpened = value })
    eventBus.$on('logoutLoading', (value) => { this.logoutLoading = value })
  },
  mounted () {
    const context = this

    this.$nextTick(function () {
      this.setMobile()
    })

    this.$el.addEventListener('click', (e) => {
      if (e.target.classList.contains('catalog-menu__item-link') ||
      e.target.classList.contains('header-nav__catalog')) {
        return false
      } else {
        context.catalogOpened = false
      }
    })

    if (!this.$auth.loggedIn) {
      localStorage.removeItem('token')
      localStorage.removeItem('cartId')
    }

    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('cartId')

    this.updateUserToken(userToken)
    this.updateUserId(userId)

    this.loadCart({
      id: this.$store.state.user.userId,
      token: this.$store.state.user.userToken
    })

    this.loadCompare({
      id: this.$store.state.user.userId,
      token: this.$store.state.user.userToken
    })

    this.loadFavorite({
      id: this.$store.state.user.userId,
      token: this.$store.state.user.userToken
    })
  },
  methods: {
    ...mapMutations({
      updateUserToken: 'user/updateUserToken',
      updateUserId: 'user/updateUserId',
      updateIsMobile: 'UPDATE_IS_MOBILE'
    }),
    ...mapActions({
      loadCart: 'cart/loadCart',
      loadCompare: 'compareIndicator/loadCompare',
      loadFavorite: 'favorite/loadFavorite'
    }),

    setMobile () {
      if (window.innerWidth > 768) {
        this.updateIsMobile(false)
      }

      window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
          this.updateIsMobile(true)
        } else {
          this.updateIsMobile(false)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.preloader-enter-active, .preloader-leave-active {
  transition: opacity .3s;
}
.preloader-enter, .preloader-leave-to {
  opacity: 0;
}
</style>
