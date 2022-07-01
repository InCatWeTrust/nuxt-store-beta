<template>
  <div class="admin-content-products">
    <PreloadersBasePreloader
      v-if="productsLoad"
      :size="60"
      background="rgba(255, 255, 255, 0.7)"
    />
    <AdminContentProductsFilter
      :products-load="productsLoad"
    />
    <AdminContentProductsItem
      v-for="product in products"
      :key="product.id"
      :products-load="productsLoad"
      :product-data="product"
    />
    <ManagerPagination
      :page="pagination.page"
      :total-pages="pagination.totalPages"
      :total-items="pagination.totalItems"
      :load="productsLoad"
      component-name="admin-products"
    />
  </div>
</template>

<script>
export default {
  name: 'ContentProductsList',
  props: {
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
    pagination: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/css/_variables.scss";

.admin-content-products {
  position: relative;
}
</style>
