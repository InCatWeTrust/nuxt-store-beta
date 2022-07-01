<template>
  <div class="available">
    <svg class="available-svg"><use xlink:href="@/assets/images/sprites.svg#checkbox" /></svg>
    <span class="available-text">В наличии</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.available {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 5px 15px 5px 25px;
    margin-bottom: 15px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    background: $brandGradient;
}

.available-svg {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
    width: 10px;
    height: 10px;
}
</style>
