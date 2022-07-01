<template>
  <div class="manager-orders-filter-status">
    <select
      v-model="currentStatus"
      :class="{'picked': currentStatus}"
    >
      <option value="">
        Статус заказа
      </option>
      <option
        v-for="status in statuses"
        :key="status"
        :value="status"
      >
        {{ status }}
      </option>
    </select>
  </div>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'ManagerFilterStatus',
  props: {
    ordersLoad: {
      type: Boolean,
      default: false
    },
    statuses: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentStatus: ''
    }
  },
  watch: {
    currentStatus () {
      eventBus.$emit('manager-filter-status', this.currentStatus)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-orders-filter-status {
  select {
    &.picked {
      background-color: rgba($success, 0.5);
    }
  }
}
</style>
