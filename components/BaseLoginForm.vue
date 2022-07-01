<template>
  <form class="base-form">
    <div class="base-form__top-image-container">
      Logo
    </div>
    <h1 class="base-form__title">
      {{ title }}
    </h1>
    <slot />
  </form>
</template>

<script>
export default {
  props: {
    pageLoaded: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Регистрация'
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.base-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  padding: 55px 55px 37px 55px;
  border-radius: 10px;
  background: $formDarkGradient;
}

.base-form__top-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 500;
  color: $black;
  background: linear-gradient(to bottom, rgb(155, 155, 155), grey);
}

.base-form__title {
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 24px;
  color: $white;
}
</style>
