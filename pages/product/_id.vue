<template>
  <div class="container">
    <ProductItem :product-data="product" :product-loading="productLoading" />
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'

export default {
  name: 'ProductPage',
  async asyncData (context) {
    return await context.$axios.get(`${API_BASE_URL}/api/V1/product/${context.params.id}`)
      .then((res) => {
        return { productData: res.data.product }
      })
      .catch(() => {
        context.error({ statusCode: 404 })
      })
  },
  data () {
    return {
      productData: null,

      productLoading: false
    }
  },
  computed: {
    product () {
      return this.productData ? this.productData : {}
    }
  }
}
</script>

<style lang="scss">

</style>
