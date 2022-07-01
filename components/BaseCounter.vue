<template>
  <form class="amount-select">
    <button
      class="amount-select-button amount-down"
      @click.prevent="countDown"
    >
      -
    </button>
    <input
      :value="valueValidate"
      type="text"
      class="amount-input"
      @focusout="countChange"
      @input="validate"
    >
    <button
      class="amount-select-button amount-up"
      @click.prevent="countUp"
    >
      +
    </button>
    <button
      :disabled="cartLoading"
      type="submit"
      class="cart-button"
      @click.prevent="addToCart"
    >
      <PreloadersBasePreloader
        v-if="cartLoading"
        :size="30"
        background="#ffd737"
        color="222"
      />
      В корзину
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import eventBus from '~/eventBus'

export default {
  name: 'BaseCounter',
  props: {
    productId: {
      type: Number,
      default: 0
    },
    productName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: 1,

      cartLoading: false
    }
  },
  computed: {
    valueValidate () {
      return this.value
    }
  },
  methods: {
    ...mapActions({
      addProductToCart: 'cart/addProductToCart'
    }),

    countUp () {
      if (this.value <= 0) {
        this.value = 1
      } else {
        this.value += 1
      }
    },
    countDown () {
      if (this.value <= 1) {
        this.value = 1
      } else {
        this.value -= 1
      }
    },
    countChange () {
      if (!this.value || this.value <= 0 || typeof this.value !== 'number') {
        this.value = 1
      }
    },
    validate (event) {
      this.value = Number(event.target.value.replace(/\D+/g, ''))
      this.$forceUpdate()
    },
    async addToCart () {
      this.cartLoading = true

      const token = this.$store.state.user.userToken
      const id = this.$store.state.user.userId

      try {
        await this.addProductToCart({
          productId: this.productId,
          quantity: this.value,
          token,
          id
        })

        eventBus.$emit('notify', {
          title: 'Корзина',
          text: `Товар ${this.productName} успешно добавлен в корзину`,
          link: '/cart',
          type: 'success',
          delay: 10000
        })
      } catch (err) {
        if (err.response.status === 500) {
          eventBus.$emit('notify', {
            title: 'Корзина',
            text: 'Не удалось добавить товар в корзину: ошибка сервера',
            type: 'error',
            delay: 10000
          })
        }
      } finally {
        this.cartLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.amount-select {
    display: flex;
    align-items: flex-start;
    width: 100%;
}

.amount-input {
    text-align: center;
    width: 25%;
    height: 40px;
    padding-left: 0;
    border-top: 1px solid $grey;
    border-bottom: 1px solid $grey;
    border-left: unset;
    border-right: unset;
    border-radius: unset;
}

.amount-select-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 40px;
    border: 1px solid $grey;
    font-size: 18px;
    font-weight: 500;
    background-color: transparent;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.amount-select-button:hover {
    background-color: $brandColor;
}

.amount-down {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: none;
}

.amount-up {
    margin-right: auto;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: none;
}

.cart-button {
    position: relative;
    width: 50%;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: $brandColor;
    border: none;
    border-radius: 5px;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    overflow: hidden;
}

.cart-button:hover {
    background-color: $darkerBrandColor;
}
</style>
