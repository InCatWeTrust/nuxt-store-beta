<template>
  <section id="registration">
    <LoginBackground :page-loaded="pageLoaded" />
    <div class="container registration-container">
      <transition name="registration-form">
        <BaseLoginForm
          v-show="pageLoaded"
          @submit.prevent="register"
        >
          <RegisterForm />
        </BaseLoginForm>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegistrationPage',
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

#registration {
  position: relative;
}

.registration__background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('~/assets/images/login-background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}

.registration__cover--left {
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 100%;
  background: linear-gradient(to left, transparent, #6e6e6e, #2e2e2e);
  z-index: -1;
}

.registration__cover--right {
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background: linear-gradient(to right, transparent, #6e6e6e, #2e2e2e);
  z-index: -1;
}

.registration-container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

.registration-form-enter-active {
  transition-property: transform, opacity;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
  transition-delay: 300ms;
}
.registration-form-enter {
  transform: translateX(50px);
  opacity: 0;
}
</style>
