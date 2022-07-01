<template>
  <div class="admin-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{
        'active': activeTab === tab.id,
        'disabled': tab.role > userRole
      }"
      @click.prevent="changeTab(tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
import { adminTabs } from '@/data/admin'
import eventBus from '~/eventBus'

export default {
  name: 'AdminTabs',
  props: {
    activeTab: {
      type: Number,
      default: 1
    }
  },
  computed: {
    tabs () {
      return adminTabs
    },
    userRole () {
      return this.$auth.user ? this.$auth.user.role : 0
    }
  },
  methods: {
    changeTab (tabId) {
      eventBus.$emit('admin-tab', tabId)
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/css/_variables.scss";

.admin-tabs {
  display: flex;
  margin-bottom: 40px;

  .tab {
    padding: 10px 25px;
    border: 1px solid $grey;
    cursor: pointer;

    &:hover {
      background-color: $defaultBlue;
    }

    &.active {
      background-color: $defaultBlue;
      color: $white;
    }

    &.disabled {
      background-color: $grey;
      color: $darkGrey;
      pointer-events: none;
    }
  }
}
</style>
