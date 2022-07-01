<template>
  <ul class="products__list">
    <ProductsListItem
      v-for="product in products"
      :key="product.id"
      :grid="grid"
      :product="product"
      :category-name="categoryName"
    />
    <PreloadersBasePreloader
      v-if="productsLoad"
      color="#ffd737"
      background="rgba(255, 255, 255, 0.7)"
    />
  </ul>
</template>

<script>
export default {
  name: 'ProductsList',
  props: {
    grid: {
      type: String,
      default: 'land'
    },
    products: {
      type: Array,
      default () {
        return []
      }
    },
    productsLoad: {
      type: Boolean,
      default: false
    },
    categoryName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.products__list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    min-height: 200px;
}
</style>
