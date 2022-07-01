<template>
  <div class="edit-images">
    <span class="title">
      Главная картинка:
    </span>
    <div class="main-img">
      <div class="preview">
        <img :src="imagesUrl[0] || require('~/assets/images/no-image.png')">
      </div>
    </div>
    <span class="title">
      Картинки:
    </span>
    <div class="images">
      <input
        id="content-images"
        type="file"
        multiple
        @change="imagesListener"
      >
      <div
        v-if="images.length > 0"
        class="preview"
      >
        <div
          v-for="image, index in imagesUrl"
          :key="image"
          class="img"
        >
          <img
            :src="image"
            :class="{
              'main-img': mainImg === image
            }"
            @click.prevent="pickMainImg(index)"
          >
          <div
            class="delete"
            @click.stop="deleteImg(index)"
          />
        </div>
      </div>
      <label
        for="content-images"
        class="add-img"
      />
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '~/eventBus'
export default {
  name: 'AdminEditImages',
  props: {
    updating: {
      type: Boolean,
      default: false
    },
    eventName: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mainImg: '',
      images: [],
      imagesUrl: []
    }
  },
  watch: {
    images: {
      handler () {
        const images = this.images.length > 0 ? this.images : null
        eventBus.$emit(`${this.eventName}`, images)
      },
      deep: true
    }
  },
  methods: {
    imagesListener (event) {
      const dt = new ClipboardEvent('').clipboardData || new DataTransfer()
      const images = event.target.files

      for (const image of this.images) {
        dt.items.add(image)
      }

      for (const image of images) {
        dt.items.add(image)
      }

      const items = dt.files

      this.images = items

      this.getImgsUrl()

      this.mainImg = this.imagesUrl[0]
    },
    getImgsUrl () {
      this.imagesUrl = []
      for (const img of this.images) {
        this.imagesUrl.push(URL.createObjectURL(img))
      }
    },
    pickMainImg (index) {
      const dt = new ClipboardEvent('').clipboardData || new DataTransfer()

      for (let i = 0; i < this.images.length; i++) {
        if (i === 0) {
          dt.items.add(this.images[index])
        } else if (i === index) {
          dt.items.add(this.images[0])
        } else {
          dt.items.add(this.images[i])
        }
      }

      const items = dt.files

      this.images = items

      this.getImgsUrl()

      this.mainImg = this.imagesUrl[0]
    },
    deleteImg (index) {
      const dt = new ClipboardEvent('').clipboardData || new DataTransfer()

      for (let i = 0; i < this.images.length; i++) {
        if (i !== index) {
          dt.items.add(this.images[i])
        }
      }

      const items = dt.files

      this.images = items

      this.getImgsUrl()

      this.mainImg = this.imagesUrl[0]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.edit-images {
  width: 100%;

  .add-img {
    display: block;
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid $grey;
    cursor: pointer;

    &:hover {
      background-color: rgba($grey, 0.3);

      &::before {
        opacity: 0;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 2px);
      height: 105px;
      background-color: $white;
    }

    &::after {
      content: '+';
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      font-size: 26px;
      font-weight: 300;
      border-radius: 50%;
      border: 1px solid $grey;
    }
  }

  .title {
    display: inline-block;
    margin-bottom: 15px;
    font-weight: 500;
    font-size: 14px;
  }

  .main-img {
    display: flex;
    margin-bottom: 15px;

    .preview {
      width: 200px;
      height: 200px;
      margin-right: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    input {
      width: 1px;
      height: 1px;
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
  }

  .images {
    .add-img {
      width: 120px;
      height: 120px;

      &::before {
        height: 70px;
      }
    }

    .preview {
      display: flex;
      flex-wrap: wrap;

      .img {
        position: relative;

        img {
          width: 120px;
          height: 120px;
          margin-bottom: 20px;
          margin-right: 20px;
          border: 2px solid transparent;
          object-fit: contain;
          cursor: pointer;

          &:hover {
            border-color: $grey;
          }

          &.main-img {
            border: 2px solid $blue;
          }
        }

        .delete {
          @include deleteCross;
          right: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }

    }

    input {
      width: 1px;
      height: 1px;
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
  }

  .error {
    font-size: 14px;
    color: $error;
  }
}
</style>
