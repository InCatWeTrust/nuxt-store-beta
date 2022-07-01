<template>
  <div class="admin-content-props-list">
    <AdminContentPropAdd
      v-show="addPropShow"
      :updating="updating"
      :product-id="productId"
      :product-name="productName"
    />
    <div
      class="title-box"
      @click.stop="togglePopup"
    >
      <div :class="{'opened': popupOpened}">
        ^
      </div>
      <span>
        Характеристики товара
      </span>
      <button
        class="add-btn"
        :disabled="updating"
        @click.stop="toggleAddProp"
      >
        Добавить характеристику
      </button>
    </div>
    <div
      v-show="popupOpened"
      class="content-box"
    >
      <AdminContentPropsItem
        v-for="item, index in items"
        :key="index"
        :item="item"
        :updating="updating"
        :product-id="productId"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentPropsList',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    updating: {
      type: Boolean,
      default: false
    },
    productId: {
      type: Number,
      default: 0
    },
    productName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      popupOpened: false,
      addPropShow: false
    }
  },
  methods: {
    togglePopup () {
      this.popupOpened = !this.popupOpened
    },
    toggleAddProp () {
      this.addPropShow = !this.addPropShow
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-props-list {
  .title-box {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid $black;
    background-color: $purple;
    cursor: pointer;

    &:hover {
      background-color: $lightPurple;
    }

    span {
      margin-right: auto;
      font-weight: 500;
      color: $white;
    }

    div {
      margin-right: 20px;
      font-weight: 500;
      color: $white;
      transform: rotate(180deg);

      &.opened {
        transform: rotate(0);
      }
    }

    .add-btn {
      padding: 5px 15px;
      font-size: 14px;
      border: 1px solid $grey;
      border-radius: 5px;
      background-color: $blue;
      color: $white;

      &:hover {
        background-color: $defaultBlue;
      }
    }
  }

  .content-box {
    padding: 10px 15px;
  }
}
</style>
