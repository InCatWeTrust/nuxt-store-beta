<template>
  <div class="manager-orders-filters">
    <h2>
      Отфильтровать по:
    </h2>
    <ul>
      <li>
        <ManagerFiltersStatus
          :statuses="statuses"
          :orders-load="ordersLoad"
        />
      </li>
    </ul>
    <button
      :disabled="ordersLoad"
      @click.prevent="acceptFilters"
    >
      <PreloadersBasePreloader
        v-if="ordersLoad"
        :size="20"
        color="#5fbcff"
      />
      Применить фильтры
    </button>
  </div>
</template>

<script>
import eventBus from '~/eventBus'
export default {
  name: 'ManagerOrdersFilters',
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
  methods: {
    acceptFilters () {
      eventBus.$emit('manager-accept-filters')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-orders-filters {
  h2 {
    margin-bottom: 15px;
  }

  ul {
    margin-bottom: 20px;
  }

  button {
    position: relative;
    overflow: hidden;
  }
}
</style>
