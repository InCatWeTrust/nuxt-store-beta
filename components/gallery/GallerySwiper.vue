<template>
  <BaseSwiper
    :items="images"
    :pagination="true"
    :mobile-slides-amount="1"
    :observe-parents="false"
    :touch-move="isMobile"
    class="galleryMainSwiper"
  >
    <template #default="slotProps">
      <div class="img">
        <img :src="slotProps.item.url" :alt="slotProps.item.article">
      </div>
    </template>
  </BaseSwiper>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GallerySwiper',
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'mobile'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.galleryMainSwiper {
  position: relative;
  height: 100%;
  overflow: hidden;
  z-index: 1;

  .img {
    overflow: hidden;
    position: relative;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }

  .swiper-pagination {
    bottom: 0;
    width: 100%;
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    &.desktop {
      height: 100%;
      flex-wrap: nowrap;
      justify-content: space-between;

      .bullet {
        width: 100%;
        height: 100%;
        margin-right: 0 !important;
        border: none;
        border-radius: 0;
        border-bottom: 3px solid $lightGrey;
        background-color: transparent !important;
        transform: scale(1) !important;

        &.active-bullet {
          border-color: $brandColor;
        }
      }
    }

    .bullet {
      border-radius: 50%;
      width: 12px;
      height: 12px;
      border: 1px solid $grey;
      transform: scale(0.6);
      transform-origin: bottom;
      transition-property: background-color, border-color, transform;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;

      &.active-bullet {
        background-color: $brandColor;
        border-color: $brandColor;
        transform: scale(1);
      }

      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }
}
</style>
