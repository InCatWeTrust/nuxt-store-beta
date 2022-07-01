<template>
  <ul>
    <AdminContentCategoriesListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :first="first"
    />
  </ul>
</template>

<script>
export default {
  name: 'RecursiveList',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    first: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

</style>
