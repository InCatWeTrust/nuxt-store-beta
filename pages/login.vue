<template>
  <section id="login">
    <LoginBackground :page-loaded="pageLoaded" />
    <div class="container login-container">
      <transition name="login-form">
        <BaseLoginForm v-show="pageLoaded" title="Личный кабинет">
          <LoginForm />
        </BaseLoginForm>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  middleware: 'guest',
  data () {
    return {
      pageLoaded: false
    }
  },
  mounted () {
    this.pageLoaded = true
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#login {
  position: relative;
}

.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

.login__forget {
  font-size: 14px;
  color: $lightGreyText;
  transition-property: color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.login-form-enter-active {
  transition-property: transform, opacity;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
  transition-delay: 300ms;
}
.login-form-enter {
  transform: translateY(50px);
  opacity: 0;
}
</style>
