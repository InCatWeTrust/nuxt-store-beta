<template>
  <label class="form__label">
    <slot />
    <span
      class="form__value"
      :class="{
        'form__value--top': (!textarea && value) || (!textarea && focused),
        '_textarea': textarea,
        'form__value--toparea': (textarea && value) || (textarea && focused)
      }"
    >
      {{ title }}
    </span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    focused: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.form__label {
  position: relative;
  padding: 15px 0 0;
  margin-bottom: 20px;
}

.form__value {
  position: absolute;
  top: 15px;
  left: 10px;
  font-size: 16px;
  color: $greyText;
  transition-property: transform, font-size;
  transition-duration: 100ms;
  transition-timing-function: linear;
  pointer-events: none;

  &._textarea {
    top: 25px;
  }
}

.form__error {
  position: relative;
  bottom: 0;
  left: 10px;
  font-size: 14px;
  color: $error;
}

.form__input--error {
  border-bottom-color: $error !important;
}

.form__value--top {
  transform: translate(-5px, -15px);
  font-size: 10px;
}

.form__value--toparea {
  transform: translate(-5px, -20px);
  font-size: 10px;
}
</style>
