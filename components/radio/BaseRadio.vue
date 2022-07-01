<template>
  <div class="radio-container" @click.prevent="checkRadio">
    <span>{{ label }}</span>
    <div class="radio">
      <input
        :value="value"
        tabindex="-1"
        type="radio"
        :name="name"
        :checked="checked === value"
      >
      <label :for="name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    name: {
      type: String,
      default: 'radio'
    },
    label: {
      type: String,
      default: 'radio'
    },
    value: {
      type: String,
      default: 'radio'
    },
    error: {
      type: String,
      default: ''
    },
    checked: {
      type: String,
      default: ''
    }
  },
  methods: {
    checkRadio () {
      this.$emit('update:value', this.value)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.radio-container {
  width: 100%;
  padding: 12px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid $lightGrey;
  border-radius: 5px;
  cursor: pointer;
}

.radio-container:not(:last-child) {
  margin-bottom: 10px;
}

.radio-container span {
  order: 1;
}

.radio {
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  pointer-events: none;
}

.radio input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
  pointer-events: none;
}

.radio input + label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: inline-flex;
  border: 1px solid $grey;
  border-radius: 50%;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
  pointer-events: none;
}

.radio input + label::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
    height: 100%;
  transform: translate(-50%, -50%) scale(0);
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: $brandGradient;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.radio-container input:checked + label::before {
  transform: translate(-50%, -50%) scale(1);
}

.radio-container:hover span {
  color: $black;
}

// стили при наведении курсора на radio
.radio-container:hover input:not(:disabled):not(:checked) + label {
  border-color: $black;
}
// стили для активного состояния радио (при нажатии на него)
.radio-container:active input:not(:disabled) + label::before {
  transform: translate(-50%, -50%) scale(0.3);
}
// стили для радио, находящегося в состоянии disabled
.radio-container input:disabled + label {
  background-color: $lightGreyText;
}
</style>
