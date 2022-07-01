<template>
  <div class="section-buy">
    <h2 class="section-buy__title">
      Цена за штуку
    </h2>
    <span class="section-buy__old-price">
      248 &#8381;
    </span>
    <span class="section-buy__price"><span class="section-buy__new-price">{{ price | numberFormat }} &#8381;</span></span>
    <div class="section-buy__amount">
      <BaseCounter :product-name="productName" :product-id="productId" />
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  filters: {
    numberFormat
  },
  props: {
    productId: {
      type: Number,
      default: 0
    },
    productName: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.section-buy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px 10px 0 10px;
    border: 1px solid $lightGrey;
    box-shadow: 0 2px 3px $grey;
}

.section-buy__title {
    display: block;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 300;
    border-bottom: 1px solid $lightGrey;
}

.section-buy__old-price {
    display: block;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 300;
}

.section-buy__price {
    display: block;
    margin-bottom: 20px;
    padding-left: 10px;
    font-size: 26px;
    font-weight: 500;
}

.section-buy__amount {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    border-top: 1px solid $lightGrey;
}

.section-buy__one-click {
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: $lightPurple;
    transition-property: background-color, box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.section-buy__one-click:hover {
    background-color: $white;
    box-shadow: 0 5px 10px $grey;
}

.section-buy__additional {
    display: flex;
    padding: 4px 8px;
    margin-bottom: 10px;
    border: 1px solid $grey;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 300ms ease;
}

.section-buy__additional:hover {
    background-color: $almostBlack;
}

.section-buy__additional:hover .section-buy__additional-text {
    color: $white;
}

.section-buy__additional:hover .section-buy__additional-svg {
    fill: $white;
}

.section-buy__additional-text {
    margin-right: 10px;
    font-size: 14px;
    font-weight: 500;
    transition: color 300ms ease;
}

.section-buy__additional-svg {
    width: 16px;
    height: 16px;
    transition: fill 300ms ease;
}
</style>
