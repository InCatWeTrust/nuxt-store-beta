<template>
  <div
    class="admin-category-edit-text"
    :class="{
      'edited': item !== value
    }"
  >
    <span class="title">
      {{ title }}
    </span>
    <input
      v-model="itemEdited"
      type="text"
      :disabled="updating"
    >
  </div>
</template>

<script>
export default {
  name: 'AdminEditText',
  props: {
    item: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    updating: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemEdited: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-category-edit-text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 100%;
    padding: 5px 10px;
    border: 1px solid $grey;
  }
}
</style>
