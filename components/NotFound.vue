<template>
  <div class="container error-container">
    <div class="error-left" :class="{'page-load': pageLoad}" />
    <div class="error-right" :class="{'page-load': pageLoad}">
      <h1 class="error-page__title">
        404
      </h1>
      <h2 class="error-page__subtitle">
        Страница не найдена
      </h2>
      <ul class="error-list">
        <li class="error-list__item">
          Адрес страницы мог измениться
        </li>
        <li class="error-list__item">
          Она могла быть удалена
        </li>
        <li class="error-list__item">
          Может быть страница была перемещена в карантин
        </li>
        <li class="error-list__item">
          Либо её вообще не существует =(
        </li>
      </ul>
      <NuxtLink tag="button" to="/" class="error-page-btn">
        На главную
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      pageLoad: false
    }
  },
  mounted () {
    this.pageLoad = true
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.error-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow: hidden;
}

.error-left {
  position: absolute;
  width: 40%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to right, $white, $grey);
  filter: drop-shadow(15px 0px 5px $lightGrey);
  z-index: -1;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 500ms;
  transition-timing-function: ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -200px;
    border: 100px solid $warmRed;
    border-right-color: transparent;
    border-bottom-color: transparent;
    transform: translateY(100%);
    transition-property: transform;
    transition-duration: 500ms;
    transition-timing-function: ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    border: 90px solid $greyText;
    border-left-color: transparent;
    border-top-color: transparent;
    transform: translateY(-100%);
    transition-property: transform;
    transition-duration: 500ms;
    transition-timing-function: ease;
  }

  &.page-load {
    opacity: 1;
  }

  &.page-load::before,
  &.page-load::after {
    transform: translateY(0);
  }
}

.error-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  padding: 100px 50px;
  opacity: 0;
  transform: translateX(100px);
  transition-property: opacity, transform;
  transition-duration: 500ms;
  transition-timing-function: ease;

  &.page-load {
    opacity: 1;
    transform: translateX(0);
  }
}

.error-page__title {
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 2px;
  text-shadow: 2px 1px $almostBlack;
  color: $warmRed;
}

.error-page__subtitle {
  margin-bottom: 30px;
  font-size: 28px;
  color: $black;
}

.error-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
}

.error-list__item {
  position: relative;
  padding: 10px 10px 10px 30px;
  font-style: italic;
  color: $warmYellow;
  background-color: $warmRed;
  filter: drop-shadow(-10px 7px 4px $lightGrey);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: -36px;
    border: 18px solid $darkWarmRed;
    border-right-color: transparent;
  }
}

.error-list__item:not(:last-child) {
  margin-bottom: 15px;
}

.error-page-btn {
  position: relative;
  padding: 12px 50px;
  font-weight: 500;
  letter-spacing: 1px;
  background: transparent;
  color: $warmRed;
  border: none;
  border-top: 2px solid $warmRed;
  border-bottom: 2px solid $warmRed;
  transition-property: color;
  transition-duration: 300ms;
  transition-timing-function: ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    color: $warmYellow;
  }

  &:hover::before {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $warmRed;
    transform: translateY(-100%);
    transition-property: transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: -1;
  }
}
</style>
