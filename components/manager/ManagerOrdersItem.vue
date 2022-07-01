<template>
  <li class="manager-orders-item">
    <div
      class="top-head"
      @click.prevent="togglePopup"
    >
      <span class="id">Номер заказа: {{ order.id }}</span>
      <span class="status">Статус заказа: {{ order.status }}</span>
    </div>
    <div
      v-show="popupOpened"
      class="bottom-popup"
    >
      <ul>
        <li class="item status">
          <span class="name">
            Статус заказа:
            {{ order.status }}
          </span>
          <ManagerChangeSelect
            v-show="statuses && statuses.length > 0"
            :current-value="order.status"
            :values="statuses"
            :update="update"
            :order-id="order.id"
            :statuses="filterStatus"
            :pagination="pagination"
          />
        </li>
        <li class="item address">
          <span class="name">
            Адрес:
            {{ order.address }}
          </span>
        </li>
        <li class="item email">
          <span class="name">
            Email:
            {{ order.email }}
          </span>
        </li>
        <li v-if="order.phone" class="item phone">
          <span class="name">
            {{ order.phone }}
          </span>
        </li>
        <li class="item products">
          <span class="name">
            Товары:
          </span>
          <ul>
            <li
              v-for="product in order.order_product"
              :key="product.id"
            >
              {{ product.name }}
              в количестве: {{ product.quantity }} шт.
              на сумму: {{ product.price | numberFormat }} &#8381;
            </li>
          </ul>
          Всего: {{ order.price | numberFormat }} &#8381;
        </li>
        <li v-if="order.comment" class="item status">
          <span class="name">
            {{ order.comment }}
          </span>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import numberFormat from '~/helpers/numberFormat'

export default {
  name: 'ManagerOrdersItem',
  filters: {
    numberFormat
  },
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    },
    statuses: {
      type: Array,
      default () {
        return []
      }
    },
    update: {
      type: Boolean,
      default: false
    },
    filterStatus: {
      type: String,
      default: ''
    },
    pagination: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      popupOpened: false
    }
  },
  methods: {
    togglePopup () {
      this.popupOpened = !this.popupOpened
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-orders-item {
  width: 100%;
  border: 1px solid $grey;

  &:not(:last-child) {
    border-bottom: none;
  }

  .top-head {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 5px 20px;
    cursor: pointer;

    &:hover {
      background-color: rgba($defaultBlue, 0.3);
    }

    .id {
      margin-right: auto;
    }
  }

  .bottom-popup {
    min-height: 200px;
    border-top: 1px dashed $grey;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;

      .item {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        margin-bottom: 10px;

        .name {
          margin-right: 20px;
        }

        &.products {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          ul {
            margin-bottom: 10px;

            li:not(:last-child) {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}

</style>
