<template>
  <div class="admin-content-categories">
    <PreloadersBasePreloader
      v-if="load"
      :size="50"
      color="blue"
    />
    <AdminContentCategoriesList
      :items="categories"
      :first="true"
    />
  </div>
</template>

<script>
export default {
  name: 'ContentCategories',
  props: {
    categories: {
      type: Array,
      default () {
        return []
      }
    },
    load: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-categories {
  position: relative;
}
</style>
