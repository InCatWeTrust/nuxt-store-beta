<template>
  <section id="manager-orders">
    <ul
      class="manager-orders-list"
      :class="{'load': ordersLoad}"
    >
      <PreloadersBasePreloader
        v-if="ordersLoad"
        background="rgba(255, 255, 255, 0.5)"
        color="#5fbcff"
      />
      <ManagerOrdersItem
        v-for="order in orders"
        :key="order.id"
        :order="order"
        :statuses="statuses"
        :update="update"
        :filter-status="filterStatus"
        :pagination="pagination"
      />
    </ul>
    <ManagerPagination
      :page="pagination.page"
      :total-pages="pagination.totalPages"
      :total-items="pagination.totalItems"
      :load="ordersLoad"
    />
  </section>
</template>

<script>
export default {
  name: 'ManagerOrders',
  props: {
    orders: {
      type: Array,
      default () {
        return []
      }
    },
    ordersLoad: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    statuses: {
      type: Array,
      default () {
        return []
      }
    },
    pagination: {
      type: Object,
      default () {
        return {}
      }
    },
    filterStatus: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#manager-orders {
  position: relative;
}

.manager-orders-list {
  position: relative;
  display: flex;
  flex-direction: column;

  &.load {
    min-height: 100px;
  }
}
</style>
