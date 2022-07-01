<template>
  <section id="order-section">
    <div class="container">
      <h1 class="order-title">
        Оформление заказа
      </h1>
      <div class="order-main-block">
        <div class="order-tabs-container">
          <ul class="order-tabs-list">
            <li
              class="order-tab"
              :class="{'active-tab': activeTab === 0}"
              @click.prevent="changeTab(0)"
            >
              Доставка
            </li>
            <li
              class="order-tab"
              :class="{'active-tab': activeTab === 1}"
              @click.prevent="changeTab(1)"
            >
              Самовывоз
            </li>
          </ul>
        </div>
        <div class="order-content">
          <div
            v-show="activeTab === 0"
            class="order-delivery"
          >
            <OrderDeliveryForm
              :cart-total-price="cartTotalPrice"
            />
          </div>
          <div
            v-show="activeTab === 1"
            class="order-self"
          >
            <OrderSelfForm
              :cart-total-price="cartTotalPrice"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="popup"
      class="order-popup"
      @mousedown.self="togglePopup(false)"
    >
      <div class="order-popup__content">
        <h3 v-if="loginForm" class="title">
          Войти
        </h3>
        <h3 v-if="registerForm" class="title">
          Регистрация
        </h3>
        <form>
          <LoginForm
            v-if="loginForm"
            :bottom-info="false"
            :redirect="false"
          />
          <RegisterForm
            v-if="registerForm"
            :bottom-info="false"
            :redirect="false"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '~/eventBus'

export default {
  name: 'OrderPage',
  data () {
    return {
      activeTab: 0,
      popup: false,
      loginForm: false,
      registerForm: false,
      logged: false
    }
  },
  computed: {
    ...mapGetters({
      cartTotalPrice: 'cart/cartTotalPrice',
      cartTotalAmount: 'cart/cartTotalAmount'
    }),

    loggedIn () {
      return this.$auth.loggedIn
    }
  },
  watch: {
    loggedIn () {
      if (this.loggedIn) {
        this.popup = false
      }
    }
  },
  created () {
    eventBus.$on('order-page-popup', (isOpen, form) => {
      this.popup = isOpen

      if (form === 'login') {
        this.loginForm = true
        this.registerForm = false
      } else if (form === 'register') {
        this.registerForm = true
        this.loginForm = false
      } else {
        this.registerForm = false
        this.loginForm = false
      }
    })

    if (!this.cartTotalAmount) {
      if (!this.$auth.loggedIn) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    changeTab (tab) {
      this.activeTab = tab
    },
    togglePopup (isOpen, form) {
      this.popup = isOpen

      if (form === 'login') {
        this.loginForm = true
        this.registerForm = false
      } else if (form === 'register') {
        this.registerForm = true
        this.loginForm = false
      } else {
        this.registerForm = false
        this.loginForm = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#order-section {
  padding: 50px 0;
}

.order-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
}

.order-tabs-container {
  .order-tabs-list {
    display: flex;
    align-items: flex-start;

    .order-tab {
      padding: 10px 20px;
      border: 1px solid $lightGrey;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: $greyText;
      cursor: pointer;
      transition-property: background-color, border-color, color;
      transition-duration: 200ms;
      transition-timing-function: ease;

      &:hover,
      &:focus {
        background-color: $lightGrey;
      }

      &.active-tab {
        color: $black;
        border-color: $brandColor;
        background-color: $brandColor;

        &:hover {
          background-color: $brandColor;
        }
      }
    }
  }
}

.order-content {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;

  .order-delivery,
  .order-self {
    width: 100%;
  }

  .order-total-right {
    width: 30%;
    padding: 0 15px;
    position: sticky;
    top: 60px;

    .order-accept {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .order-total-bottom {
    width: 100%;
    padding: 50px 50px 15px;
    border-top: 1px dashed $lightGrey;

    .order-accept {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}

.order-popup {
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($grey, 0.7);
  overflow: auto;
  z-index: 1001;

  .order-popup__content {
    position: relative;
    top: 100px;
    width: 400px;
    padding: 20px;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0 0 14px $black;
    background: linear-gradient(60deg, $black, $almostBlack);
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;
    color: $lightGrey;
  }
}

@media (max-width: 1024px) {
.order-content {
  .order-total-right {
    display: none;
  }

  .order-total-bottom {
    width: 100%;
    padding: 40px 40px 15px;
  }
}
}

@media (max-width: 500px) {
#order-section {
  padding: 25px 0;
}

.order-title {
  font-size: 20px;
}

.order-content {
  .order-total-bottom {
    padding: 20px 20px 10px;
  }
}

.order-popup {
  .order-popup__content {
    top: 30px;
    width: 280px;
    padding: 15px;
  }
}
}
</style>
