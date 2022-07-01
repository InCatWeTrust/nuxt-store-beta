<template>
  <div class="order-accept">
    <span class="order-accept__total">
      Сумма заказа: <span class="sum">{{ total | numberFormat }} &#8381;</span>
    </span>
    <button
      v-if="$auth.loggedIn"
      class="order-accept__accept"
      :class="{
        'term': term,
        'disabled': orderLoad || !total
      }"
      :disabled="!total"
      @click.prevent="acceptOrder"
    >
      <PreloadersBasePreloader
        v-if="orderLoad"
        :size="30"
        background="#ffd737"
        color="222"
      />
      Подтвердить заказ
    </button>
    <div
      v-if="!$auth.loggedIn"
      class="not-auth"
      :class="{'term': term}"
    >
      <p>
        Чтобы подтвердить заказ необходимо
        <a href="#" @click.prevent="togglePopup(true, 'login')">войти</a>
        или
        <a href="#" @click.prevent="togglePopup(true, 'register')">зарегистрироваться</a>.
      </p>
    </div>
    <div v-if="term" class="order-term">
      <p>
        Нажимая на кнопку «Подтвердить заказ», я даю согласие на обработку
        персональных данных в соответствии с «Политикой в области
        обработки и защиты персональных данных».
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'
import numberFormat from '~/helpers/numberFormat'

export default {
  name: 'OrderAccept',
  filters: {
    numberFormat
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    term: {
      type: Boolean,
      default: true
    },
    email: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    orderLoad: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      cartProducts: 'cart/cartDetailProducts',
      userId: 'user/id',
      userToken: 'user/token'
    }),

    products () {
      const products = []

      this.cartProducts.forEach((item) => {
        products.push(item.productId)
      })

      return products.join('|')
    }
  },
  methods: {
    ...mapMutations({
      clearCart: 'cart/cartReset'
    }),

    togglePopup (isOpen, form) {
      eventBus.$emit('order-page-popup', isOpen, form)
    },
    async acceptOrder () {
      eventBus.$emit('order-load', true)
      eventBus.$emit('order-form-errors', null)

      try {
        await this.$axios.post(`${API_BASE_URL}/api/V2/saveorder`, null, {
          params: {
            id: this.userId,
            token: this.userToken,
            email: this.email,
            product: this.products,
            address: this.address,
            comment: this.comment
          }
        })

        eventBus.$emit('order-form-errors', false)

        eventBus.$emit('notify', {
          title: 'Оформление заказа',
          text: 'Заказ оформлен',
          type: 'success',
          duration: 10000
        })

        this.clearCart()
      } catch (err) {
        eventBus.$emit('order-form-errors', err.response.data.errors)

        eventBus.$emit('notify', {
          title: 'Оформление заказа',
          text: `Не удалось оформить заказ: ${err.response.data.message}`,
          type: 'error',
          duration: 10000
        })
      } finally {
        eventBus.$emit('order-load', false)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.order-accept__total {
  margin-bottom: 20px;

  .sum {
    font-weight: 500;
  }
}

.order-accept__accept {
  position: relative;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;
  background-color: $brandColor;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
  overflow: hidden;

  &:hover,
  &:focus {
    background-color: $darkerBrandColor;
  }

  &.term {
    margin-bottom: 30px;
  }

  &.disabled {
    pointer-events: none;
  }
}

.not-auth {
  p {
    font-size: 14px;
    line-height: 1.2;

    a {
      color: $defaultBlue;
      font-weight: 500;

      &:hover {
        color: $darkerBrandColor;
      }
    }
  }

  &.term {
    margin-bottom: 30px;
  }
}

.order-term {
  text-align: center;
  font-size: 12px;
  line-height: 1.2;
}

@media (max-width: 500px) {
.order-accept__accept {
  font-size: 12px;
}

.order-term {
  font-size: 10px;
}
}
</style>
