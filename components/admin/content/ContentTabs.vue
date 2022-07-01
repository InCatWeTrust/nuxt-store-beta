<template>
  <div class="admin-content-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{'active': activeTab === tab.id}"
      @click.prevent="changeTab(tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
import { adminContentTabs } from '@/data/admin'
import eventBus from '~/eventBus'

export default {
  name: 'ContentTabs',
  props: {
    activeTab: {
      type: Number,
      default: 1
    }
  },
  computed: {
    tabs () {
      return adminContentTabs
    }
  },
  methods: {
    changeTab (tabId) {
      eventBus.$emit('admin-content-tab', tabId)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-tabs {
  display: flex;
  margin-bottom: 40px;

  .tab {
    padding: 8px 15px;
    border: 1px solid $grey;
    cursor: pointer;

    &:hover {
      background-color: $purple;
    }

    &.active {
      background-color: $purple;
      color: $white;
    }
  }
}
</style>
