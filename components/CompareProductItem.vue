<template>
  <div class="compare-card">
    <div class="compare-card__product">
      <div class="compare-card__buttons">
        <button
          v-tooltip="{ content: 'Убрать из сравнения' }"
          class="compare-card__button compare-card__delete"
          :disabled="deleteLoad"
          @click.prevent="deleteCompareProduct()"
        />
        <FavoriteIndicator
          class="compare-card__button"
          :product-id="product.id"
          :product-name="product.name"
        />
      </div>
      <NuxtLink
        :to="`/product/${product.url}`"
        class="compare-card__link"
      >
        <GallerySwiper
          :images="images"
        />
        <!-- <img
          :src="product.image"
          :alt="product.name"
          class="compare-card__img"
        > -->
      </NuxtLink>
      <div class="compare-card__description">
        <NuxtLink
          :to="`/product/${product.url}`"
          class="compare-card__article"
        >
          Артикул: {{ product.article }}
        </NuxtLink>
        <AvailableComponent />
        <NuxtLink
          :to="`/product/${product.url}`"
          class="compare-card__title-link"
        >
          <span class="compare-card__title lines-3">{{ product.name }}</span>
        </NuxtLink>
        <span class="compare-card__price">
          {{ product.price | numberFormat }}  &#8381;
        </span>
        <span class="compare-card__old-price">
          654 &#8381;
        </span>
        <div class="compare-card__amount">
          <BaseCounter />
        </div>
      </div>
    </div>
    <div class="compare-card__props">
      <div class="compare-card__props-diff">
        <div
          v-for="prop in props"
          :key="prop.id"
          class="compare-card__prop"
        >
          <span class="compare-card__prop-title">
            {{ prop.name }}
          </span>
          <span class="compare-card__prop-name">
            {{ (prop.value && prop.value.value) || '-' }}{{ prop.value.unit || '' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'
import numberFormat from '~/helpers/numberFormat'

const imgList = [
  'images/test/test1.webp',
  'images/test/test2.webp',
  'images/test/test3.webp',
  'images/test/test4.webp',
  'images/test/test5.jpg',
  'images/test/test6.jpg',
  'images/test/test7.jpg',
  'images/test/test8.png',
  'images/test/test9.jpg',
  'images/test/test10.jpg'
]

export default {
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
    props: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      deleteLoad: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/id',
      userToken: 'user/token'
    }),

    product () {
      return {
        ...this.productData,
        image: this.productData.image && require(`~/assets${this.productData.image}`)
      }
    },
    images () {
      return imgList
    }
  },
  methods: {
    async deleteCompareProduct () {
      this.deleteLoad = true

      try {
        const response = await this.$axios.post(`${API_BASE_URL}/api/V2/comparisondel`, null, {
          params: {
            id: this.userId,
            token: this.userToken,
            product_id: this.product.id
          }
        })

        // this.productsData = response.data.groups
        // this.categoriesData = response.data.catalog

        eventBus.$emit('notify', {
          title: 'Сравнение',
          text: `Товар ${this.product.name} успешно удален из сравнения`,
          type: 'success'
        })

        return response.data
      } catch (err) {
        eventBus.$emit('notify', {
          title: 'Сравнение',
          text: `Ошибка удаления товара ${this.product.name} из сравнения: ${err.response.message}`,
          type: 'error'
        })
      } finally {
        this.deleteLoad = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.compare-card {
    display: flex;
    flex-direction: column;
    border: 1px solid $lightGrey;
    border-radius: 5px;
    background-color: $white;
    box-shadow: 0 0 25px $lightGrey;
    overflow: hidden;
}

.compare-card__product {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid $grey;
}

.compare-card__buttons {
    display: flex;
    justify-content: center;
    padding: 5px;
    border-bottom: 1px solid $grey;
}

.compare-card__button {
    position: relative;
    width: 18px;
    height: 18px;
    margin: 0;
    padding: 0;
}

.compare-card__button:not(:last-child) {
    margin-right: 10px;
}

.compare-card__delete {
    border: none;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    transition-property: color, background-color, border-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.compare-card__delete::after,
.compare-card__delete::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: $black;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.compare-card__delete::after {
    transform: translate(-50%, -50%) rotate(-45deg);
}

.compare-card__delete::before {
    transform: translate(-50%, -50%) rotate(45deg);
}

.compare-card__delete:hover {
    border-color: $white;
    background-color: $black;
    transform: rotate(180deg);
}

.compare-card__delete:hover::after,
.compare-card__delete:hover::before {
    background-color: $white;
}

.compare-card__favorite svg {
    width: 100%;
    height: 100%;
    fill: $almostBlack;
    transition-property: fill;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.compare-card__favorite:hover svg {
    fill: $black;
}

.compare-card__link {
    height: 200px;
    padding: 15px;
}

.compare-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.compare-card__description {
    display: flex;
    flex-direction: column;
    padding: 5px;
}

.compare-card__article {
    margin-bottom: 5px;
    font-size: 14px;
    color: $grey;
}

.compare-card .available {
    align-self: flex-start;
    margin-bottom: 7px;
}

.compare-card__title-link {
    min-height: 60px;
    max-height: 60px;
    margin-bottom: 5px;
}

.compare-card__title {
    overflow: hidden;
    color: $black;
    line-height: 1.1;
}

.compare-card__price {
    margin-bottom: 3px;
    font-weight: 600;
    font-size: 18px;
}

.compare-card__old-price {
    font-size: 14px;
    color: $grey;
}

.compare-card__amount {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}

.compare-card__amount .amount-select {
  flex-wrap: wrap;
}

.compare-card__amount .cart-button {
  width: 100%;
  order: -1;
}

.compare-card__amount .amount-select-button {
  width: 15%;
  border: 1px solid transparent;
}

.compare-card__amount .amount-select-button:hover {
  background-color: transparent;
}

.compare-card__amount .amount-input {
  width: 70%;
  border-top: unset;
  border-bottom: unset;
}

.compare-card__prop {
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    color: $black;
    border-bottom: 1px solid $grey;
}

.compare-card__prop-title {
    opacity: 0;
    margin-bottom: 5px;
    transition: opacity 200ms ease;
}

.compare-card__prop-name {
    color: $grey;
}

@media (max-width: 768px) {

.compare-card__article {
    font-size: 12px;
}

.compare-card .available {
    font-size: 9px;
}

.compare-card__title-link {
    min-height: 50px;
    max-height: 50px;
}

.compare-card__title {
    font-size: 14px;
}

.compare-card__to-cart {
    font-size: 12px;
}

.compare-card__prop-title {
    font-size: 14px;
}

.compare-card__prop-name {
    font-size: 12px;
}

}
</style>
