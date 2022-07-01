<template>
  <BaseFormField :textarea="true" :focused="focused" :value="dataValue" :title="title" :error="error">
    <textarea
      v-model="dataValue"
      class="form__textarea form__input--area"
      :class="{'form__input--error': error}"
      :type="type"
      :placeholder="placeholder"
      @focus="focused = true"
      @focusout="focused = false"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  mixins: [
    formFieldMixin
  ],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      focused: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.form__textarea {
  width: 100%;
  height: 30px;
  padding-bottom: 5px;
  font-size: 18px;
  border: none;
  border: 1px solid $almostBlack;
  background-color: transparent;
  transition-property: border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.form__textarea:focus,
.form__textarea:hover {
  border-color: $brandColor;
}

.form__input--area {
  resize: none;
}
</style>
