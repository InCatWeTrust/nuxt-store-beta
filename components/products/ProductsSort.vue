<template>
  <div class="sort-block">
    <span class="sort-block__title">Сортировать по:</span>
    <a href="#" class="sort-block__item">
      Цене
      <svg class="sort-block__svg sort-up">
        <use xlink:href="~/assets/images/sprites.svg#sort-arrow-up" />
      </svg>
      <svg class="sort-block__svg sort-down">
        <use xlink:href="~/assets/images/sprites.svg#sort-arrow-down" />
      </svg>
    </a>
    <a href="#" class="sort-block__item">
      Популярности
      <svg class="sort-block__svg sort-up">
        <use xlink:href="~/assets/images/sprites.svg#sort-arrow-up" />
      </svg>
      <svg class="sort-block__svg sort-down">
        <use xlink:href="~/assets/images/sprites.svg#sort-arrow-down" />
      </svg>
    </a>
    <a href="#" class="sort-block__item sort-default sort-active">
      По-умолчанию
    </a>
  </div>
</template>

<script>
export default {
  name: 'ProductsSort'
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.sort-block {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: auto;
}

.sort-block__title {
    margin-right: 20px;
    font-weight: 500;
}

.sort-block__item {
    position: relative;
    margin-right: 20px;
    padding: 4px 24px 4px 10px;
    border: 1px solid $black;
    border-radius: 5px;
    color: $black;
    overflow: hidden;
    transition-property: border-color, color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.sort-block__item::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    transition-property: opacity, background;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: -1;
}

.sort-block__item:hover {
    color: $white;
    border-color: transparent;
}

.sort-block__item:hover::after {
    opacity: 1;
    background: $grey;
}

.sort-block__svg {
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translate(0, -50%);
  width: 18px;
  height: 18px;
  fill: $white;
}

.sort-default {
  padding: 4px 10px;
}

.sort-active {
  border: 1px solid $white;
  border-radius: 5px;
  color: $white;
}

.sort-active::after {
  background: $purpleGradient;
}

.sort-active:hover::after {
  background: $purpleGradient;
}

@media (max-width: 768px) {

.sort-block {
    margin-right: 0;
}

.sort-block__title {
    width: 100%;
    margin-right: 0;
    margin-bottom: 8px;
}

.sort-block__item {
  margin-bottom: 5px;
}

}
</style>
