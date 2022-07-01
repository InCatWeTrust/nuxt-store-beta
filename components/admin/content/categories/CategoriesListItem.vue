<template>
  <li class="categories-list-item">
    <div
      class="item"
      :class="{'first': first}"
    >
      <AdminContentCategoriesSingleCategory
        :item="item"
      />
      <div v-if="items" class="sub-flag">
        Подкатегории
      </div>
    </div>
    <div v-if="items" class="sub">
      <div class="line" />
      <AdminContentCategoriesList
        v-if="items"
        :items="items"
      />
    </div>
  </li>
</template>

<script>
export default {
  name: 'RecursiveListItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    first: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      return this.item.children && this.item.children.length > 0 ? this.item.children : null
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.categories-list-item {
  width: 100%;

  ul {
    width: 100%;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .item {
    position: relative;
    width: 100%;
    padding: 20px 20px 30px;
    border: 1px solid $darkGrey;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: -20px;
      width: 20px;
      height: 5px;
      background-color: $darkGrey;
    }

    &.first::after {
      content: unset;
    }

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    .sub-flag {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 12px;
      padding: 2px 5px;
      color: $white;
      background-color: $darkGrey;
    }
  }

  .sub {
    position: relative;
    display: flex;

    .line {
      width: 20px;
      height: 100%;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        top: -15px;
        width: 5px;
        background-color: $darkGrey;
      }
    }
  }

  div {
    .title {
      position: relative;
      display: inline-block;
      margin-bottom: 10px;
    }

    &.edited {
      input,
      textarea,
      select {
        background-color: rgba($warmYellow, 0.7) !important;
      }

      .title {
        &::after {
          content: 'Изменено';
          position: absolute;
          top: 0;
          right: -90px;
          padding: 2px 5px;
          font-size: 14px;
          background-color: $error;
          color: $white;
        }
      }
    }
  }
}
</style>
