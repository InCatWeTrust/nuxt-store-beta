<template>
  <div class="registration__slot">
    <BaseFormText
      v-model="formData.name"
      title="Имя"
      :error="formErrors.name"
      class="registration__label"
    />
    <BaseFormText
      v-model="formData.email"
      title="Email"
      :error="formErrors.email"
      type="email"
      class="registration__label"
    />
    <BaseFormText
      v-model="formData.password"
      title="Пароль"
      :error="formErrors.password"
      type="password"
      class="registration__label"
    />
    <BaseFormText
      v-model="formData.passwordConfirm"
      title="Пароль повторно"
      :error="formErrors.passwordConfirm"
      type="password"
      class="registration__label"
    />
    <button
      :disabled="formLoading"
      class="registration__button registration__register-button"
      @click.prevent="register"
    >
      <PreloadersBasePreloader
        v-if="formLoading"
        :size="30"
        color="#ffd737"
        background="#6b6b6b"
      />
      Зарегистрироваться
    </button>
    <span v-if="bottomInfo" class="registration__question">
      Уже есть учётная запись?
    </span>
    <NuxtLink
      v-if="bottomInfo"
      to="/login"
      class="registration__button registration__login-button"
    >
      Авторизоваться
    </NuxtLink>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'RegisterForm',
  props: {
    bottomInfo: {
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

    async register () {
      this.formErrors = {}

      if (this.validate()) {
        this.formLoading = true

        try {
          const email = this.formData.email
          const password = this.formData.password

          await this.$axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`)

          const response = await this.$axios.post(`${API_BASE_URL}/api/V2/register`, {
            name: this.formData.name,
            email: this.formData.email,
            password: this.formData.password
          })

          this.updateUserToken(response.data.token.token)
          this.updateUserId(response.data.token.id)

          localStorage.setItem('token', response.data.token.token)
          localStorage.setItem('cartId', response.data.token.id)

          await this.$auth.loginWith('laravelSanctum', {
            data: {
              email,
              password
            }
          })

          eventBus.$emit('notify', {
            title: 'Регистрация',
            text: 'Вы успешно зарегистрировались!',
            type: 'success',
            delay: 10000
          })

          if (this.redirect) {
            this.$router.push('/')
          }
        } catch (err) {
          const status = err.response.status
          let message = ''

          if (status === 500) {
            message = 'сервер не отвечает'
          }

          eventBus.$emit('notify', {
            title: 'Регистрация',
            text: `Неудачная регистрация: ${message}`,
            type: 'error',
            delay: 10000
          })
        } finally {
          this.formLoading = false
        }
      }
    },
    validate () {
      const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let errors = 0

      if (!this.formData.name) {
        this.formErrors.name = 'Поле "Имя" обязательно для заполнения'
        errors += 1
      }

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
      } else if (this.formData.password && this.formData.password.length < 8) {
        this.formErrors.password = 'Минимальная длина пароля - 8 символа'
        errors += 1
      } else if (this.formData.password !== this.formData.passwordConfirm) {
        this.formErrors.passwordConfirm = 'Пароли не совпадают'
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

.registration__slot {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.registration__label {
  width: 100%;
  margin-bottom: 30px;
}

.registration__label .form__value {
  color: $lightGreyText;
}

.registration__label input {
  color: $white;
}

.registration__button {
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

.registration__button:not(:disabled):hover,
.registration__button:not(:disabled):focus {
  filter: brightness(1.1);
}

.registration__register-button {
  background: linear-gradient(to bottom, rgb(238, 238, 238), rgb(209, 209, 209));
}

.registration__question {
  margin-bottom: 15px;
  font-size: 14px;
  color: $lightGreyText;
}

.registration__login-button {
  padding: 10px 15px;
  border: 2px solid $lightGreyText;
  color: $lightGreyText;
  background: transparent;
}
</style>
