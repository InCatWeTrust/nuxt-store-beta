<template>
  <li class="order-history-product">
    <span>
      <span class="bold">{{ product.name }}</span>,
      в количестве
      <span class="bold">{{ product.quantity }}</span> шт.
      на сумму
      <span class="bold">{{ product.total_price | numberFormat }}</span> руб.
    </span>
  </li>
</template>

<script>
import numberFormat from '~/helpers/numberFormat'

export default {
  name: 'OrderHistoryProduct',
  filters: {
    numberFormat
  },
  props: {
    product: {
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

.order-history-product {
  margin-bottom: 5px;

  span {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.2;

    .bold {
      font-size: 16px;
      font-weight: 600;
    }
  }
}

@media (max-width: 500px) {
.order-history-product {
  span {
    font-size: 10px;

    .bold {
      font-size: 12px;
    }
  }
}
}
</style>
