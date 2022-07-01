<template>
  <div>
    <transition name="login-background">
      <div v-show="pageLoaded" class="registration__background" />
    </transition>
    <transition name="login-cover">
      <div v-show="pageLoaded" class="registration__cover--left" />
    </transition>
    <transition name="login-cover">
      <div v-show="pageLoaded" class="registration__cover--right" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LoginBackground',
  props: {
    pageLoaded: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.login-background-enter-active {
  transition-property: transform, opacity;
  transition-duration: 700ms;
  transition-timing-function: ease-in-out;
}
.login-background-enter {
  transform: translateX(-100px);
  opacity: 0;
}

.login-cover-enter-active {
  transition-property: opacity;
  transition-duration: 1000ms;
  transition-timing-function: ease-in-out;
}
.login-cover-enter {
  opacity: 0;
}
</style>
