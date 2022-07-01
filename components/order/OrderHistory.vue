<template>
  <div>
    <div class="order-history-container">
      <ul class="order-history-list">
        <li class="order-history-item">
          <div class="order-history-item-container head">
            <span />
            <span>
              Номер
            </span>
            <span>
              Дата заказа
            </span>
            <span>
              Итого
            </span>
            <span>
              Статус
            </span>
          </div>
        </li>

        <OrderHistoryItem
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
        />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  props: {
    orders: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.order-history-list {
  display: flex;
  flex-direction: column;
}

.order-history-item {
  &:not(:first-child) {
    border-bottom: 3px solid $lightGrey;
  }

  .order-history-item-container {
    display: grid;
    grid-auto-rows: 50px;
    grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr;
    border-right: 1px solid $lightGrey;
    border-left: 1px solid $lightGrey;
    transition-property: background-color;
    transition-duration: 200ms;
    transition-timing-function: ease;

    &.head {
      border-top: 1px solid $lightGrey;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: $brandColor;
    }

    &:not(.head) {
      cursor: pointer;

      &:hover {
        background-color: $warmYellow;
      }
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media (max-width: 500px) {
.order-history-item {
  .order-history-item-container {
    &.head {
      text-align: center;
      grid-auto-rows: 36px;

      span {
        font-size: 12px;
      }
    }
  }
}
}
</style>
