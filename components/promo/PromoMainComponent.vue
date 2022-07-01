<template>
  <section
    id="promo-products"
    :class="{'promo-section-height': loading}"
  >
    <PreloadersBasePreloader v-if="loading" color="#ffd737" />
    <div v-if="promoProducts.length > 0" class="container">
      <h2 class="promo-title">
        Акционные товары
      </h2>
      <BaseSwiper
        :items="promoProducts"
        :breakpoints="breakpoints"
        class="promo-swiper"
      >
        <template #default="slotProps">
          <PromoItem :item="slotProps.item" />
        </template>
      </BaseSwiper>
    </div>
  </section>
</template>

<script>
import { API_BASE_URL } from '@/config'
import { mainPromoBreakpoints } from '@/data/swiperBreakpoints'

export default {
  data () {
    return {
      breakpoints: mainPromoBreakpoints,

      promoProductsData: null,

      loading: false
    }
  },
  async fetch () {
    this.loading = true

    try {
      const res = await this.$axios.get(`${API_BASE_URL}/api/V2/promo`)

      this.promoProductsData = res.data.promo.data
    } finally {
      this.loading = false
    }
  },
  computed: {
    promoProducts () {
      return this.promoProductsData ? this.promoProductsData : []
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

#promo-products {
    position: relative;
    padding: 50px 0;
}

.promo-section-height {
  min-height: 500px;
}

.promo-title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 28px;
    font-weight: 500;
}

.promo-swiper {
    position: relative;
    padding: 5px;
    overflow: hidden;
}

.swiper-button-svg {
    width: 25px;
    height: 25px;
    fill: $white;
}

.promo-swiper .swiper-button-disabled {
    display: none;
}

.promo-swiper .swiper-button-prev,
.promo-swiper .swiper-button-next {
    top: 220px;
    width: 35px;
    height: 35px;
    border: 1px solid $white;
    border-radius: 10px;
    background-color: $white;
    box-shadow: 2px 2px 10px $grey;
    transition-property: background-color, color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.promo-swiper .swiper-button-prev {
    left: 10px;
}

.promo-swiper .swiper-button-next {
    right: 10px;
}

.promo-swiper .swiper-button-prev::after,
.promo-swiper .swiper-button-next::after {
    font-size: 18px;
    color: $black;
    transition-property: color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.promo-swiper .swiper-button-prev::after {
    content: '';
}

.promo-swiper .swiper-button-next::after {
    content: '';
}

.promo-swiper .swiper-button-prev:hover,
.promo-swiper .swiper-button-next:hover {
    background-color: $purple;
}

.promo-swiper .swiper-button-prev:hover::after,
.promo-swiper .swiper-button-next:hover::after {
    color: $white;
}

.promo-swiper .swiper-button-prev svg,
.promo-swiper .swiper-button-next svg {
  fill: $grey;
  transition-property: fill;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.promo-swiper .swiper-button-next svg {
  transform: rotate(180deg);
}

.promo-swiper .swiper-button-prev:hover svg,
.promo-swiper .swiper-button-next:hover svg {
  fill: $white;
}
</style>
