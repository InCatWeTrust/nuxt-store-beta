<template>
  <form class="admin-content-products-filter">
    <div class="box">
      <span class="title">
        Поиск по имени товара:
      </span>
      <input v-model="searchString" type="text">
    </div>
    <button
      class="filter-btn"
      :disabled="productsLoad"
      @click.prevent="applyFilter"
    >
      Применить
    </button>
  </form>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'ContentFilter',
  props: {
    productsLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    applyFilter () {
      eventBus.$emit('admin-products-filter-apply', {
        search: this.searchString || null
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-products-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;

  .box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 14px;
    }

    input {
      width: 300px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid $blue;
    }
  }

  .filter-btn {
    padding: 10px 25px;
    border: none;
    border-radius: 5px;
    background-color: $purple;
    color: $white;
  }
}
</style>
