<template>
  <li class="order-history-item">
    <div
      class="order-history-item-container"
      @click.prevent="open"
    >
      <span>
        <svg
          class="order-history-arrow"
          :class="{'active': opened}"
        >
          <use xlink:href="@/assets/images/sprites.svg#arrow-down" />
        </svg>
      </span>
      <span class="order-history-number">
        {{ order.id }}
      </span>
      <span class="order-history-date">
        24.04.2024
      </span>
      <span class="order-history-total">
        {{ order.price | numberFormat }} &#8381;
      </span>
      <span class="order-history-status">
        {{ order.status }}
      </span>
    </div>
    <div
      v-show="opened"
      class="order-history-info"
    >
      <ul class="prods">
        <OrderHistoryProduct
          v-for="(product, index) in products"
          :key="index"
          :product="product"
        />
      </ul>
      <div class="info">
        <div class="address">
          Адресс доставки:
          <span>
            {{ order.address }}
          </span>
        </div>
        <div class="status">
          Статус доставки:
          <span
            class="delivery"
          >
            в пути
          </span>
        </div>
      </div>
      <button class="order-info-repeat">
        Повторить заказ
      </button>
    </div>
  </li>
</template>

<script>
import numberFormat from '~/helpers/numberFormat'

export default {
  name: 'OrderHistoryItem',
  filters: {
    numberFormat
  },
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    products () {
      return this.order && this.order.order_product ? this.order.order_product : []
    }
  },
  methods: {
    open () {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.order-history-info {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  column-gap: 15px;
  row-gap: 20px;
  width: 100%;
  padding: 10px 25px;
  border: 1px solid $lightGrey;
  border-top: 1px dashed $lightGrey;
  border-bottom: none;

  .prods {
    display: grid;
    grid-column: span 6;
    grid-template-columns: 1fr;
  }

  .info {
    grid-column: span 6;

    .address {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 300;

      span {
        font-weight: 400;
      }
    }

    .status {
      font-size: 14px;
      font-weight: 300;

      .delivery {
        color: $brick;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }
  }

}

.order-history-item {
  .order-history-item-container {
    svg {
      &.active {
        transform: rotate(180deg);
        fill: $defaultBlue;
      }
    }

    .order-history-arrow {
      width: 20px;
      height: 20px;
      fill: $almostBlack;
    }

    .order-history-number {
      font-size: 14px;
      color: $greyText;
    }

    .order-history-date {
      font-size: 14px;
      letter-spacing: 1px;
    }

    .order-history-total {
      font-weight: 500;
    }

    .order-history-status {
      font-size: 14px;
      font-weight: 600;
      text-transform: lowercase;
      letter-spacing: 1px;
      color: $successDark;
    }
  }
}

.order-info-repeat {
  grid-column: span 4;
  padding: 3px 0;
  background-color: $defaultBlue;
  border: 2px solid $defaultBlue;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  color: $white;
  cursor: pointer;
  transition-property: background-color, box-shadow, color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &:hover {
    color: $white;
    background-color: $almostBlack;
  }

  &:not(:hover):not(:active):focus {
    border-color: $black;
  }

  &:active {
    box-shadow: inset 0 0 8px $defaultBlue;
  }
}

@media (max-width: 500px) {
.order-history-info {
  padding: 8px 10px;

  .status {
    font-size: 10px;

    .delivery {
      font-size: 12px;
    }
  }
}

.order-history-item {
  .order-history-item-container {
    .order-history-arrow {
      width: 15px;
      height: 15px;
    }

    .order-history-number {
      font-size: 10px;
    }

    .order-history-date {
      font-size: 10px;
    }

    .order-history-total {
      font-size: 10px;
    }

    .order-history-status {
      font-size: 10px;
    }
  }
}

.order-info-repeat {
  font-size: 10px;
  grid-column: span 6;
}
}
</style>
