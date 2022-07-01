<template>
  <div
    class="admin-category-edit-image"
    :class="{
      'edited': img
    }"
  >
    <span class="title">
      {{ title }}
    </span>
    <div>
      <img
        :src="imgUrl || image"
        alt=""
      >
    </div>
    <input
      :id="eventName"
      type="file"
      @change="listener"
    >
    <label :for="eventName">
      Выбрать изображение
    </label>
  </div>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'AdminEditImage',
  props: {
    title: {
      type: String,
      default: 'Изображение'
    },
    image: {
      type: String,
      default: ''
    },
    eventName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgUrl: null,
      img: null
    }
  },
  methods: {
    listener (event) {
      this.img = event.target.files[0]

      if (this.img) {
        this.imgUrl = URL.createObjectURL(this.img)
        eventBus.$emit(`${this.eventName}`, this.img)
      } else {
        this.imgUrl = null
        eventBus.$emit(`${this.eventName}`, this.image)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-category-edit-image {
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  input {
    padding: 0;
    border: none;
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  label {
    display: inline-block;
    padding: 5px 15px;
    border: 1px solid $grey;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: rgba($black, 0.1);

    &:hover {
      background-color: rgba($black, 0.2);
    }
  }
}
</style>
