<template>
  <div>
    <NotificationsBaseNotifyList />
    <transition name="preloader">
      <PreloadersLogoutPreloader v-if="logoutLoading" />
    </transition>
    <Nuxt />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import eventBus from '@/eventBus'

export default {
  name: 'ManagerLayout',
  data () {
    return {
      logoutLoading: false
    }
  },
  created () {
    eventBus.$on('logoutLoading', (value) => { this.logoutLoading = value })
  },
  mounted () {
    if (!this.$auth.loggedIn) {
      localStorage.removeItem('token')
      localStorage.removeItem('cartId')
    }

    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('cartId')

    this.updateUserToken(userToken)
    this.updateUserId(userId)
  },
  methods: {
    ...mapMutations({
      updateUserToken: 'user/updateUserToken',
      updateUserId: 'user/updateUserId'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';
</style>
