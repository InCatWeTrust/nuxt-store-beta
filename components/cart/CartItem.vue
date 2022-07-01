<template>
  <li class="product-cart__item">
    <div class="product-cart__number">
      {{ count }}.
    </div>
    <div class="product-cart__product">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-cart__product-img"
      >
      <div class="product-cart__product-description">
        <span class="product-cart__product-article">Артикул: {{ product.article }}</span>
        <span class="product-cart__product-name">{{ product.name }}</span>
        <span class="product-cart__services-title">Возможные услуги:</span>
        <ul class="product-cart__services-list">
          <li class="product-cart__services-item">
            - <span>Распил металла</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="product-cart__item-info">
      <div class="product-cart__price-for-item">
        <span class="product-cart__price-for-item-title">Цена за штуку</span>
        <span class="product-cart__price-for-item-amount">{{ product.price | numberFormat }} &#8381;</span>
      </div>
      <div class="amount-select">
        <button
          class="amount-select-button amount-down"
          @click.prevent="decrement"
        >
          -
        </button>
        <input
          v-model.number="amount"
          type="text"
          class="amount-input"
        >
        <button
          class="amount-select-button amount-up"
          @click.prevent="increment"
        >
          +
        </button>
      </div>
      <div class="product-cart__total">
        <span class="product-cart__total-title">Сумма</span>
        <span class="product-cart__total-price">{{ totalPrice | numberFormat }} &#8381;</span>
      </div>
      <div class="product-cart__weight">
        <span class="product-cart__weight-title">Вес</span>
        <span class="product-cart__weight-total">2.20 кг</span>
      </div>
    </div>
    <button
      class="product-cart__delete-button"
      @click.prevent="deleteProduct(product.id)"
    />
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import eventBus from '@/eventBus'

export default {
  name: 'CartItem',
  filters: {
    numberFormat
  },
  props: {
    productData: {
      type: Object,
      default () {
        return {}
      }
    },
    count: {
      type: Number,
      default: 1
    },
    itemAmount: {
      type: Number,
      default: 1
    }
  },
  computed: {
    product () {
      return this.productData ? this.productData : {}
    },
    totalPrice () {
      return this.product.price * this.itemAmount
    },
    amount: {
      get () {
        return this.itemAmount
      },
      async set (value) {
        this.updatingItemAmount(true)

        try {
          await this.updateCartProductAmount({
            productId: this.productData.id,
            amount: value,
            id: this.$store.state.user.userId,
            token: this.$store.state.user.userToken
          })
        } catch (err) {
          if (err.response.status === 500 || err.response.status === 404) {
            eventBus.$emit('notify', {
              title: 'Корзина',
              text: 'Не удалось обновить количество товара: ошибка сервера',
              type: 'error',
              duration: 10000
            })
          }
        } finally {
          this.updatingItemAmount(false)
        }
      }
    }
  },
  methods: {
    ...mapActions({
      updateCartProductAmount: 'cart/updateCartProductAmount',
      deleteCartProduct: 'cart/deleteCartProduct'
    }),

    async increment () {
      this.updatingItemAmount(true)

      try {
        await this.updateCartProductAmount({
          productId: this.productData.id,
          amount: this.itemAmount + 1,
          id: this.$store.state.user.userId,
          token: this.$store.state.user.userToken
        })
      } finally {
        this.updatingItemAmount(false)
      }
    },
    async decrement () {
      this.updatingItemAmount(true)

      try {
        await this.updateCartProductAmount({
          productId: this.productData.id,
          amount: this.itemAmount - 1,
          id: this.$store.state.user.userId,
          token: this.$store.state.user.userToken
        })
      } finally {
        this.updatingItemAmount(false)
      }
    },
    updatingItemAmount (isUpdating) {
      eventBus.$emit('updatingCart', isUpdating)
    },
    async deleteProduct (productId) {
      this.deletingProduct(true)

      try {
        const response = await this.deleteCartProduct({
          productId,
          id: this.$store.state.user.userId,
          token: this.$store.state.user.userToken
        })

        if (response === 500 || response === 404) {
          eventBus.$emit('notify', {
            title: 'Корзина',
            text: 'Не удалось удалить товар из корзины: ошибка сервера',
            type: 'error',
            duration: 10000
          })
        }
      } finally {
        this.deletingProduct(false)
      }
    },

    deletingProduct (isDeleting) {
      eventBus.$emit('deletingProduct', isDeleting)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';
</style>
