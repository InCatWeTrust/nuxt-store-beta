<template>
  <section id="account-data">
    <div class="container">
      <h1 class="account__title">
        Личный кабинет
      </h1>
      <div class="account-data-container">
        <div class="account__tabs">
          <ul class="account__tabs-list">
            <li>
              <a
                href="#"
                class="account__tabs-btn account__tabs-item account__tab"
                :class="{'account_active-tab': activeTabIndex === 0}"
                @click.prevent="cahngeActiveTab(0)"
              >
                Профиль
              </a>
            </li>
            <li>
              <a
                href="#"
                class="account__tabs-btn account__tabs-item account__tab"
                :class="{'account_active-tab': activeTabIndex === 1}"
                @click.prevent="cahngeActiveTab(1)"
              >
                История заказов
              </a>
            </li>
            <li>
              <a
                href="#"
                class="account__tabs-btn account__tabs-item account__tab"
                :class="{'account_active-tab': activeTabIndex === 2}"
                @click.prevent="cahngeActiveTab(2)"
              >
                Смена пароля
              </a>
            </li>
            <li>
              <NuxtLink
                to="/compare"
                class="account__tabs-btn account__tabs-item"
              >
                Сравнение товаров
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/favorite"
                class="account__tabs-btn account__tabs-item"
              >
                Избранное
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="account__tabs-btn account__tabs-item"
              >
                Корзина
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="account__content">
          <div
            v-show="activeTabIndex === 0"
            class="account__profile"
            :class="{'account-hidden': activeTabIndex !== 0}"
          >
            <form action="#" class="account__profile-form">
              <BaseFormText
                v-model="formData.name"
                title="Имя"
                :error="formErrors.name"
              />
              <BaseFormText
                v-model="formData.surname"
                title="Фамилия"
                :error="formErrors.surname"
              />
              <BaseFormText
                v-model="formData.email"
                title="Email"
                :error="formErrors.email"
                type="email"
              />
              <BaseFormText
                v-model="formData.tel"
                title="Телефон"
                :error="formErrors.tel"
                type="tel"
              />
              <button class="account__profile-btn">
                Сохранить
              </button>
            </form>
          </div>

          <div
            v-show="activeTabIndex === 1"
            class="account__history"
            :class="{
              'account-hidden': activeTabIndex !== 1,
              'history-load': ordersLoad
            }"
          >
            <PreloadersBasePreloader
              v-if="ordersLoad"
              :size="60"
              color="#ffd737"
            />
            <h2 class="account__history-title">
              История заказов
            </h2>
            <div
              v-if="orders.length <= 0"
              class="account__history-none"
            >
              <p class="account__history-description">
                Вы пока ещё не покупали в магазине
              </p>
              <a href="#" class="account__history-btn">Перейти в каталог</a>
            </div>
            <OrderHistory
              v-if="orders.length > 0"
              :orders="orders"
            />
          </div>
          <div
            v-show="activeTabIndex === 2"
            class="account__change"
            :class="{'account-hidden': activeTabIndex !== 2}"
          >
            <form action="#" class="account__change-form">
              <BaseFormText
                v-model="changePasswordFormData.password"
                title="Новый пароль"
                :error="changePasswordFormErrors.password"
                type="password"
              />
              <BaseFormText
                v-model="changePasswordFormData.passwordRepeat"
                title="Новый пароль ещё раз"
                :error="changePasswordFormErrors.passwordRepeat"
                type="password"
              />
              <button class="account__profile-btn">
                Сменить пароль
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { API_BASE_URL } from '~/config'

export default {
  name: 'UserAccount',
  middleware: 'auth',
  data () {
    return {
      formData: {
        name: this.$auth.user.name || '',
        surname: this.$auth.user.surname || '',
        email: this.$auth.user.email || '',
        let: this.$auth.user.tel || ''
      },
      formErrors: {},

      changePasswordFormData: {},
      changePasswordFormErrors: {},

      gotInfo: false,

      activeTabIndex: 0,
      ordersData: null,
      ordersLoad: false,
      ordersLoaded: false
    }
  },
  fetch () {
    if (this.userId && this.userToken && !this.ordersLoaded) {
      this.loadOrders()
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/id',
      userToken: 'user/token'
    }),

    orders () {
      return this.ordersData ? this.ordersData : []
    }
  },
  watch: {
    userId () {
      if (this.userId && this.userToken && !this.ordersLoaded) {
        this.loadOrders()
      }
    }
  },
  mounted () {
    if (window.innerWidth <= 660) {
      const context = this
      const list = this.$el.querySelector('.account__tabs-list')

      list.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.classList.contains('account__tab')) {
          window.scrollTo({
            top: context.$el.querySelector('.account__content').offsetTop - 100,
            left: 0,
            behavior: 'smooth'
          })
        }
      })
    }
  },
  methods: {
    cahngeActiveTab (index) {
      this.activeTabIndex = index
    },
    async loadOrders () {
      this.ordersLoad = true

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/order`, {
          params: {
            id: this.userId,
            token: this.userToken
          }
        })

        this.ordersData = response.data.data
      } catch (err) {
        console.log(err.response.data)
      } finally {
        this.ordersLoad = false
        this.ordersLoaded = true
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#account-data {
    padding: 50px 0 100px;
}

.account__title {
    margin-bottom: 50px;
    font-size: 28px;
}

.account-data-container {
    display: flex;
    align-items: flex-start;
}

.account__tabs {
    width: 20%;
    margin-right: auto;
    border-radius: 5px;
    background-color: $white;
    box-shadow: -1px 1px 10px $lightGrey;
}

.account__content {
    width: 78%;
    border-radius: 5px;
    background-color: $white;
    box-shadow: -1px 1px 10px $lightGrey;
}

.account__tabs-list {
    padding: 20px 0;
}

.account__tabs-item {
    display: block;
    position: relative;
    padding: 12px 0 12px 20px;
    border-left: 5px solid transparent;
    transition-property: background-color, border-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.account__tabs-btn {
    font-weight: 500;
}

.account__tabs-btn::after {
    @include fillLink;
}

.account__tabs-item:hover {
    background-color: $lightGrey;
}

.account_active-tab {
    border-left-color: $brandColor;
}

.account__content {
    position: relative;
    padding: 50px;
}

.account__profile-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.account__profile-form label {
  max-width: 400px;
  width: 60%;
  margin-bottom: 30px;
}

.account__profile-btn {
    padding: 14px 28px;
    margin-top: 30px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    background-color: $brandColor;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.account__profile-btn:hover {
    background-color: $darkerBrandColor;
}

.account__history {
  &.history-load {
    min-height: 200px;
  }
}

.account__history-none {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.account__history-title {
    margin-bottom: 20px;
    font-size: 24px;
}

.account__history-description {
    margin-bottom: 20px;
    font-size: 18px;
}

.account__history-btn {
    display: block;
    padding: 6px 12px 7px;
    border-radius: 5px;
    background-color: $brandColor;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.account__history-btn:hover {
    background-color: $darkerBrandColor;
}

.account__change-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.account__change-form label {
  max-width: 400px;
  width: 60%;
  margin-bottom: 10px;
}

.account-hidden {
  position: absolute;
}

@media (max-width: 1024px) {

.account__tabs {
    width: 25%;
}

.account__content {
    width: 72%;
    padding: 25px;
}

.account__tabs-item {
    padding: 10px 0 10px 10px;
}

}

@media (max-width: 660px) {

.account-data-container {
  flex-direction: column;
}

.account__tabs {
    width: 100%;
    padding: 0 0 20px;
    box-shadow: none;
}

.account__content {
    width: 100%;
    padding: 0;
    box-shadow: none;
}

.account__profile-form input {
  font-size: 16px;
}

.account__profile-form label {
  width: 100%;
  max-width: unset;
}

.account__profile-form .form__value {
  font-size: 12px;
}

.account__change-form input {
  font-size: 16px;
}

.account__change-form label {
  width: 100%;
  max-width: unset;
}

.account__change-form .form__value {
  font-size: 12px;
}

.account__profile-btn {
    margin-top: 20px;
    padding: 7px 12px;
    font-size: 12px;
}

.account__tabs-item {
    padding: 10px 0 10px 5px;
    font-size: 12px;
}

.account__history-title {
    margin-bottom: 15px;
    font-size: 18px;
}

.account__history-description {
    margin-bottom: 20px;
    font-size: 14px;
}

.account__history-btn {
    padding: 3px 8px 4px;
    font-size: 12px;
}

}
</style>
