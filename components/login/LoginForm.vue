<template>
  <div class="login__slot">
    <BaseFormText
      v-model="formData.email"
      title="Email"
      :error="formErrors.email"
      type="email"
      class="login__label"
    />
    <BaseFormText
      v-model="formData.password"
      title="Пароль"
      :error="formErrors.password"
      type="password"
      class="login__label"
    />
    <button
      :disabled="formLoading"
      class="login__button login__sign-in-button"
      @click.prevent="login"
    >
      <PreloadersBasePreloader
        v-if="formLoading"
        :size="30"
        color="#ffd737"
        background="#6b6b6b"
      />
      Войти
    </button>
    <span v-if="bottomInfo" class="login__question">
      Нет учётной записи?
    </span>
    <NuxtLink
      v-if="bottomInfo"
      to="/registration"
      class="login__button login__register-button"
    >
      Зарегистрироваться
    </NuxtLink>
    <a v-if="forgot" href="#" class="login__forget">
      Забыли пароль? Восстановить
    </a>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import eventBus from '@/eventBus'

export default {
  name: 'LoginForm',
  props: {
    bottomInfo: {
      type: Boolean,
      default: true
    },
    forgot: {
      type: Boolean,
      default: true
    },
    redirect: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      formData: {},
      formErrors: {},

      formLoading: false
    }
  },
  methods: {
    ...mapMutations({
      updateUserToken: 'user/updateUserToken',
      updateUserId: 'user/updateUserId'
    }),
    ...mapActions({
      loadCart: 'cart/loadCart',
      loadCompare: 'compareIndicator/loadCompare',
      loadFavorite: 'favorite/loadFavorite'
    }),

    async login () {
      this.formErrors = {}

      if (this.validate()) {
        this.formLoading = true

        try {
          const response = await this.$auth.loginWith('laravelSanctum', {
            data: {
              email: this.formData.email,
              password: this.formData.password
            }
          })

          this.updateUserToken(response.data.token)
          this.updateUserId(response.data.id)

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('cartId', response.data.id)

          this.loadCart({
            id: response.data.id,
            token: response.data.token
          })

          this.loadCompare({
            id: response.data.id,
            token: response.data.token
          })

          this.loadFavorite({
            id: response.data.id,
            token: response.data.token
          })

          if (this.redirect) {
            this.$router.push('/')
          }
        } catch (err) {
          this.formErrors = err.response.data

          eventBus.$emit('notify', {
            title: 'Авторизация',
            text: 'Не удалось авторизоваться: сервер не отвечает',
            type: 'error',
            duration: 10000
          })
        } finally {
          this.formLoading = false
        }
      }
    },
    validate () {
      const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let errors = 0

      if (!this.formData.email) {
        this.formErrors.email = 'Поле "Email" обязательно для заполнения'
        errors += 1
      } else if (!this.formData.email.match(regexp)) {
        this.formErrors.email = 'Неверный формат электронной почты'
        errors += 1
      }

      if (!this.formData.password) {
        this.formErrors.password = 'Введите пароль'
        errors += 1
      }

      if (errors > 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.login__slot {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.login__label {
  width: 100%;
  margin-bottom: 30px;
}

.login__label .form__value {
  color: $lightGreyText;
}

.login__label input {
  color: $white;
}

.login__button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 3px;
  padding: 15px 12px;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  transform: translateY(-5px);
  transition-property: filter, transform;
  transition-duration: 200ms;
  transition-timing-function: ease;
  overflow: hidden;
}

.login__button:not(:disabled):hover,
.login__button:not(:disabled):focus {
  filter: brightness(1.1);
}

.login__sign-in-button {
  background: linear-gradient(to bottom, rgb(238, 238, 238), rgb(209, 209, 209));
}

.login__question {
  margin-bottom: 15px;
  font-size: 14px;
  color: $lightGreyText;
}

.login__register-button {
  margin-bottom: 30px;
  padding: 10px 15px;
  border: 2px solid $lightGreyText;
  color: $lightGreyText;
  background: transparent;
}

.login__forget:not(:focus):hover {
  color: $almostWhite;
}

.login__forget:focus {
  color: $brandColor;
}
</style>
