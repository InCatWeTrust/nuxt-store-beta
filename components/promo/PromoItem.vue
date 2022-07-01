<template>
  <div class="promo-card">
    <div class="promo__card-top">
      <span class="promo__card-article">Артикул: {{ item.article }}</span>
      <div class="promo__card-top-btns">
        <CompareIndicator
          :product-id="item.id"
          :product-name="item.name"
        />
        <FavoriteIndicator
          :product-id="item.id"
          :product-name="item.name"
        />
      </div>
    </div>
    <div class="promo__card-bottom">
      <div class="promo__card-product">
        <PromoIconsList
          :is-promo="item.is_promo"
          :is-new="item.is_new"
          :is-hot="item.is_hot"
        />
        <NuxtLink
          :to="`/product/${item.url}`"
          class="promo__card-product-link"
        >
          <GallerySwiper
            :images="item.images"
          />
        </NuxtLink>
        <div class="promo__card-about">
          <NuxtLink
            :to="`/product/${item.url}`"
            class="promo__card-name lines-3"
          >
            {{ item.name }}
          </NuxtLink>
          <AvailableComponent />
        </div>
      </div>
      <div class="promo__card-buy">
        <CartBuyComponent :product-id="item.id" :product-name="item.name" :price="+item.price" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.promo-card {
    display: flex;
    flex-direction: column;
    height: 550px;
    border-radius: 5px;
    background-color: $white;
    box-shadow: 0 0 10px $lightGrey;
}

.promo__card-top {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    border-bottom: 1px solid $lightGrey;
}

.promo__card-article {
    margin-right: auto;
    font-weight: 300;
    font-size: 12px;
}

.promo__card-top-btns {
    display: flex;
}

.promo-card .promo__card-bottom {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.promo__card-product {
    position: relative;
    margin-bottom: auto;
}

.promo__card-product-link {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 230px;
    padding: 10px 20px;
}

.promo__card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.promo__card-about {
    flex: 1;
    padding: 0 10px;
}

.promo__card-name {
    margin-bottom: 5px;
    font-weight: 500;
    line-height: 1.2;
    overflow: hidden;
}

.promo-card .promo__card-services {
    display: none;
}

.promo__card-buy .section-buy {
    padding: 4px 10px;
    border: none;
    box-shadow: none;
}

.promo-card .section-buy__old-price {
    margin-bottom: 3px;
    font-size: 16px;
    color: grey;
}

.promo-card .section-buy__price {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 600;
}

.promo-card .available {
    margin-bottom: 5px;
}

.promo__card-buy .section-buy__one-click {
    display: none;
}

.promo__card-buy .section-buy__additional {
    display: none;
}

.promo__card-buy .cart-button {
    width: 100%;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    order: -1;
}

.promo__card-buy .amount-up {
    margin-right: unset;
}

.promo__card-buy .amount-select {
    flex-wrap: wrap;
    justify-content: space-between;
}

.promo__card-buy .section-buy__amount {
    padding: 10px 0 0;
}

.promo__card-buy .amount-select-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    font-size: 18px;
    font-weight: 500;
    background-color: transparent;
    border: none;
}

.promo__card-buy .amount-input {
    text-align: center;
    width: 65%;
    padding-left: 5px;
    font-size: 14px;
    border: none;
}
</style>
