<template>
  <section id="manager-tabs">
    <ul class="manager-tabs-list">
      <ManagerTabsItem
        v-for="tab in tabs"
        :key="tab.id"
        :tab="tab"
        :active-tab="activeTab"
      />
    </ul>
  </section>
</template>

<script>
export default {
  name: 'ManagerTabs',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    activeTab: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-tabs-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
