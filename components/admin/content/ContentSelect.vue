<template>
  <div class="admin-content-select">
    <div
      class="top"
      @click.prevent="toggleDropdown"
    >
      <span class="picked">
        {{ picked }}
      </span>
      <span class="arrow">
        ^
      </span>
      <span
        class="close"
        @click.stop="pickOption()"
      />
    </div>
    <div v-show="opened" class="dropdown">
      <input
        v-model="searchText"
        type="text"
        class="search"
        placeholder="Найти..."
      >
      <div class="options">
        <div
          v-for="item in items"
          v-show="item.name.includes(searchText)"
          :key="item.id"
          class="option"
          @click.prevent="pickOption(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'ContentSelect',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    slug: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchText: '',
      pickedOption: '',
      opened: false
    }
  },
  computed: {
    picked () {
      return this.pickedOption
    }
  },
  methods: {
    toggleDropdown () {
      this.opened = !this.opened
    },
    pickOption (item) {
      const picked = item ? item.id : null
      this.pickedOption = item ? item.name : ''
      this.opened = false
      eventBus.$emit('admin-content-select-category', { slug: this.slug, picked })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-select {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 220px;
  padding: 10px;

  .top {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid $grey;

    &:hover {
      background-color: $lightGrey;
    }

    .picked {
      display: inline-block;
      margin-right: auto;
      padding-right: 5px;
    }

    .arrow {
      transform: rotate(180deg);
    }

    .close {
      position: absolute;
      top: 0;
      right: 10px;
      width: 10px;
      height: 10px;
      color: $error;
      border: 1px solid $black;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 80%;
        height: 1px;
        background-color: $error;
        top: 50%;
        left: 50%;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    width: calc(100% - 20px);
    top: calc(100% - 10px);
    z-index: 2;

    .options {
      max-height: 200px;
      border: 1px solid $grey;
      overflow: auto;
      background-color: $white;

      .option {
        padding: 5px;
        cursor: pointer;

        &:hover {
          background-color: $lightGrey;
        }

        &:not(:last-child) {
          border-bottom: 1px solid $grey;
        }
      }
    }
  }
}
</style>
