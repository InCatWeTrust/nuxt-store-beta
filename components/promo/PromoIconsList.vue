<template>
  <div class="promo-list">
    <div
      v-if="isPromo"
      class="promo-list__item promo-list__promo"
    >
      Акция!
      <img src="@/assets/images/promo-save.svg" alt="">
    </div>
    <div
      v-if="isNew"
      class="promo-list__item promo-list__new"
    >
      Новинка!
      <img src="@/assets/images/promo-new.svg" alt="">
    </div>
    <div
      v-if="isHot"
      class="promo-list__item promo-list__hot"
    >
      Горячее!
      <img src="@/assets/images/promo-hot.svg" alt="">
    </div>
    <div class="promo-list__corner" />
  </div>
</template>

<script>
export default {
  props: {
    isPromo: {
      type: Number,
      default: 0
    },
    isNew: {
      type: Number,
      default: 0
    },
    isHot: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.promo-list {
    position: absolute;
    top: 20px;
    left: -5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 5px;
    padding-right: 5px;
    overflow: hidden;
}

.promo-list__item {
    position: relative;
    display: flex;
    align-items: center;
    height: 26px;
    padding-right: 30px;
    padding-left: 20px;
    font-size: 10px;
    font-style: italic;
    font-weight: 600;
    text-transform: uppercase;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transform: translateX(-10px);
    cursor: pointer;
    transition-property: transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: 2;
}

.promo-list__promo {
    background: linear-gradient(to right, rgb(217, 248, 255), rgb(188, 243, 255));
}

.promo-list__new {
    color: $white;
    background: linear-gradient(to right, rgb(40, 40, 40), rgb(72, 72, 72));
}

.promo-list__hot {
    background: linear-gradient(to right, rgb(255, 206, 12), rgb(252, 153, 24));
}

.promo-list__item:hover {
    transform: translateX(0);
    z-index: 5;
}

.promo-list__item img {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%) rotate(-20deg);
    width: 20px;
    height: 20px;
}

.promo-list__corner {
    position: absolute;
    top: calc(100% - 5px);
    left: 0;
    border: 2.5px solid transparent;
    border-top: 2.5px solid grey;
    border-right: 2.5px solid grey;
}
</style>
