<template>
  <section id="product-cart">
    <div v-if="isEmpty" class="container">
      <h1 class="product-cart__title">
        Товары в корзине
      </h1>
      <ul class="product-cart__products">
        <CartItem
          v-for="(product, index) in products"
          :key="index"
          :product-data="product.product"
          :count="index + 1"
          :item-amount="product.quantity"
        />
      </ul>
      <div class="product-cart__delete-all">
        <button
          class="product-cart__delete-all-button"
          @click.prevent="deleteProducts"
        >
          Удалить все товары из корзины
        </button>
      </div>
      <div class="product-cart__ordering-container">
        <div class="product-cart__ordering">
          <span class="product-cart__ordering-text">Всего товаров: <span>{{ products.length }}</span> весом <span>6.60 кг</span> на сумму</span>
          <span class="product-cart__ordering-price">{{ totalPrice | numberFormat }} &#8381;</span>
          <NuxtLink
            tag="button"
            to="/order"
            :disabled="updating || deleting"
            class="product-cart__ordering-button"
          >
            <PreloadersBasePreloader
              v-if="updating || deleting"
              background="#ffd737"
              color="222"
              :size="30"
            />
            Оформить
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="!isEmpty" class="container product-cart__empty">
      <span>
        В корзине пока ничего нет =(
      </span>
      <NuxtLink
        tag="button"
        to="/"
      >
        Перейти к покупкам
      </NuxtLink>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import eventBus from '@/eventBus'

export default {
  name: 'ProductCart',
  filters: {
    numberFormat
  },
  data () {
    return {
      updating: false,
      deleting: false
    }
  },
  computed: {
    ...mapGetters({
      cartTotalPrice: 'cart/cartTotalPrice',
      products: 'cart/cartDetailProducts'
    }),

    totalPrice () {
      return this.cartTotalPrice
    },
    isEmpty () {
      return this.products.length
    }
  },
  created () {
    eventBus.$on('updatingCart', (isUpdating) => { this.updating = isUpdating })
    eventBus.$on('deletingProduct', (isDeleting) => { this.deleting = isDeleting })
  },
  methods: {
    ...mapActions({
      deleteCartProductAll: 'cart/deleteCartProductAll'
    }),

    async deleteProducts () {
      this.deleting = true

      try {
        const response = await this.deleteCartProductAll({
          id: this.$store.state.user.userId,
          token: this.$store.state.user.userToken
        })

        if (response === 500 || response === 404) {
          eventBus.$emit('notify', {
            title: 'Корзина',
            text: 'Не удалось удалить товары из корзины: ошибка сервера',
            type: 'error',
            delay: 5000
          })
        }
      } finally {
        this.deleting = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#product-cart {
    padding: 50px 0;
}

.product-cart__title {
    margin-bottom: 25px;
    font-size: 28px;
    font-weight: 500;
}

.product-cart__products {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 25px;
}

.product-cart__item {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 20px;
    border-bottom: 1px dotted $almostBlack;
}

.product-cart__number {
    position: absolute;
    top: 20px;
    left: 0;
    font-weight: 500;
}

.product-cart__product {
    display: flex;
    width: 50%;
    margin-right: 10px;
}

.product-cart__product-img {
    width: 25%;
    margin-right: 15px;
}

.product-cart__product-description {
    display: flex;
    flex-direction: column;
}

.product-cart__product-article {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 300;
}

.product-cart__product-name {
    margin-bottom: 15px;
    font-weight: 500;
}

.product-cart__services-title {
    margin-bottom: 10px;
    font-weight: 300;
    font-style: italic;
}

.product-cart__services-item {
    font-weight: 500;
}

.product-cart__services-item span {
    color: $lightPurple;
}

.product-cart__item-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: auto;
    text-align: center;
}

.product-cart__price-for-item {
    display: flex;
    flex-direction: column;
    margin-right: 40px;
    font-weight: 300;
}

.product-cart__price-for-item-title {
    margin-bottom: 10px;
}

.product-cart__price-for-item-amount {
    font-size: 24px;
    letter-spacing: 1px;
}

.product-cart__item-info .amount-select {
    width: 20%;
    margin-right: 40px;
}

.product-cart__item-info .amount-select-button {
    width: 20%;
}

.product-cart__item-info .amount-input {
    width: 60%;
}

.product-cart__total {
    display: flex;
    flex-direction: column;
    margin-right: 40px;
    font-weight: 500;
}

.product-cart__total-title {
    margin-bottom: 10px;
}

.product-cart__total-price {
    font-size: 24px;
}

.product-cart__weight {
    display: flex;
    flex-direction: column;
}

.product-cart__weight-title {
    margin-bottom: 10px;
}

.product-cart__weight-total {
    font-size: 20px;
}

.product-cart__delete-button {
    position: relative;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
}

.product-cart__delete-button::before,
.product-cart__delete-button::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    background-color: $black;
    transition: background-color 200ms ease;
}

.product-cart__delete-button::before {
    transform: rotate(45deg);
}

.product-cart__delete-button::after {
    transform: rotate(-45deg);
}

.product-cart__delete-button:hover::after {
    background-color: $darkerBrandColor;
}

.product-cart__delete-button:hover::before {
    background-color: $darkerBrandColor;
}

.product-cart__delete-all {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.product-cart__delete-all-button {
    position: relative;
    padding: 5px 30px 5px 10px;
    margin-bottom: 25px;
    border: 1px dotted $darkGrey;
    border-radius: 5px;
    color: $darkGrey;
    background-color: transparent;
    transition-property: background-color, color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.product-cart__delete-all-button::before,
.product-cart__delete-all-button::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 2px;
    top: 50%;
    right: 5px;
    background-color: $darkGrey;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.product-cart__delete-all-button::before {
    transform: rotate(45deg);
}

.product-cart__delete-all-button::after {
    transform: rotate(-45deg);
}

.product-cart__delete-all-button:hover::before {
    background-color: $black;
}

.product-cart__delete-all-button:hover::after {
    background-color: $black;
}

.product-cart__delete-all-button:hover {
    color: $black;
    background-color: $lightPurple;
}

.product-cart__ordering-container {
    display: flex;
    align-items: flex-start;
}

.product-cart__ordering {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 25px;
    border: 1px solid $grey;
    border-radius: 5px;
    box-shadow: 0 3px 5px $grey;
}

.product-cart__ordering-text {
    margin-bottom: 20px;
}

.product-cart__ordering-text span {
    font-size: 18px;
    font-weight: 500;
}

.product-cart__ordering-price {
    padding-bottom: 20px;
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: 500;
    border-bottom: 1px dotted $lightPurple;
}

.product-cart__ordering-button {
    position: relative;
    padding: 15px 25px;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    background-color: $brandColor;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    overflow: hidden;
}

.product-cart__ordering-button:hover {
    background-color: $darkerBrandColor;
}

.product-cart__empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    margin-bottom: 25px;
    font-size: 28px;
    font-weight: 400;
  }

  button {
    position: relative;
    padding: 10px 30px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    color: $black;
    background-color: $brandColor;
    overflow: hidden;
    transition-property: color, background-color;
    transition-duration: 400ms;
    transition-timing-function: ease;

    &:hover {
      background-color: rgba($purple, 0.8);
      color: $white;
    }

    &:hover::before {
      transform: translateY(-5%) scale(1);
      border-color: $white;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid $black;
      transform: translateY(-100%) scale(0);
      transition-property: transform, border-color;
      transition-duration: 400ms;
      transition-timing-function: ease;
    }
  }
}

@media (max-width: 1024px) {

    .product-cart__product {
        display: flex;
        width: 25%;
        margin-right: 10px;
        flex-direction: column;
    }

    .product-cart__product-img {
        width: 150px;
        height: 150px;
        margin-bottom: 10px;
        margin-right: 0;
    }

    .product-cart__product-name {
        line-height: 1.2;
    }

    .product-cart__item-info {
        padding-top: 30px;
    }

    .product-cart__delete-button {
        margin-top: 30px;
    }

}

@media (max-width: 768px) {

    .product-cart__product {
        width: 35%;
    }

    .product-cart__item-info {
        flex-direction: column;
        width: 60%;
    }

    .product-cart__price-for-item {
        margin-bottom: 10px;
        margin-right: 0;
    }

    .product-cart__item-info .amount-select {
        width: 60%;
        margin-bottom: 10px;
        margin-right: 0;
        font-size: 14px;
    }

    .product-cart__item-info .amount-select-button {
        width: 20%;
        height: 35px;
        font-size: 14px;
    }

    .product-cart__item-info .amount-input {
        height: 35px;
    }

    .product-cart__total {
        margin-right: 0;
        margin-bottom: 20px;
    }

}

@media (max-width: 500px) {

    .product-cart__item {
        flex-direction: column;
    }

    .product-cart__product {
        width: 100%;
        margin-right: 0;
        align-items: center;
    }

    .product-cart__product-description {
        align-items: center;
        text-align: center;
    }

    .product-cart__item-info {
        width: 100%;
        padding-top: 15px;
    }

    .product-cart__delete-button {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        margin-top: 0;
    }

    .product-cart__price-for-item-title {
        font-size: 14px;
    }

    .product-cart__price-for-item-amount {
        font-size: 18px;
    }

    .product-cart__item-info .amount-select-button {
        height: 30px;
    }

    .product-cart__item-info .amount-input {
        height: 30px;
    }

    .product-cart__total-title {
        font-size: 14px;
    }

    .product-cart__total-price {
        font-size: 18px;
    }

    .product-cart__weight-title {
        margin-bottom: 5px;
        font-size: 14px;
    }

    .product-cart__weight-total {
        font-size: 16px;
    }

}
</style>
