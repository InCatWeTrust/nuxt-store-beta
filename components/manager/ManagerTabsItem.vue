<template>
  <li class="manager-tabs-item">
    <a
      href="#"
      class="manager-tabs-link"
      :class="{'active': tab.id === activeTab}"
      @click.prevent="changeTab"
    >
      {{ tab.name }}
    </a>
  </li>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'ManagerTabsItem',
  props: {
    tab: {
      type: Object,
      default () {
        return {}
      }
    },
    activeTab: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changeTab () {
      eventBus.$emit('manager-active-tab', this.tab.id)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-tabs-link {
  padding: 10px 20px;
  border: 1px solid $grey;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &.active {
    background-color: $defaultBlue;
  }

  &:hover:not(.active) {
    background-color: rgba($grey, 0.3);
  }
}
</style>
