<template>
  <div class="logout-preloader">
    <div>В</div>
    <div>ы</div>
    <div>х</div>
    <div>о</div>
    <div>д</div>
    <div>и</div>
    <div>м</div>
  </div>
</template>

<script>
export default {
  name: 'LogoutPreloader'
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.logout-preloader {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $lightGrey;
  z-index: 10000;
  animation: pulse 3000ms ease infinite alternate;
  overflow: hidden;
}

.logout-preloader::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 100px;
  height: 3px;
  border-radius: 10px;
  background-color: $almostBlack;
  animation: cut 3000ms linear infinite;
}

.logout-preloader div:not(:last-child) {
  margin-right: 10px;
}

.logout-preloader div {
  font-size: 32px;
  font-weight: 600;
  transform-origin: bottom left;
}

.logout-preloader div:nth-child(1) {
  animation: falling 3000ms ease infinite;
}

.logout-preloader div:nth-child(2) {
  animation: falling 3000ms 50ms ease infinite;
}

.logout-preloader div:nth-child(3) {
  animation: falling 3000ms 100ms ease infinite;
}

.logout-preloader div:nth-child(4) {
  animation: falling 3000ms 150ms ease infinite;
}

.logout-preloader div:nth-child(5) {
  animation: falling 3000ms 200ms ease infinite;
}

.logout-preloader div:nth-child(6) {
  animation: falling 3000ms 250ms ease infinite;
}

.logout-preloader div:nth-child(7) {
  animation: falling 3000ms 300ms ease infinite;
}

@keyframes falling {
  0% {
    transform: translateY(-40px) rotate(0);
    opacity: 0;
    color: $almostBlack;
  }
  15% {
    transform: translateY(0);
    opacity: 1;
    color: $almostBlack;
  }
  50% {
    transform: translateY(0);
    opacity: 1;
    color: $almostBlack;
  }
  60% {
    transform: translateY(0) rotate(-215deg);
    opacity: 1;
    color: $darkerBrandColor;
  }
  80% {
    transform: translateY(0) rotate(-168deg);
    opacity: 1;
  }
  100% {
    transform: translateY(200px) rotate(-76deg);
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    box-shadow: inset 0 0 0 #c5c5c5;
  }
  100% {
    box-shadow: inset 0 0 200px #c5c5c5;
  }
}

@keyframes cut {
  0% {
    transform: translate(0, -50%);
    opacity: 0;
    background-color: $almostBlack;
  }
  48% {
    transform: translate(10vw, -50%);
    opacity: 1;
    background-color: $almostBlack;
  }
  58% {
    transform: translate(100vw, -50%);
    opacity: 0;
    background-color: $darkerBrandColor;
  }
  100% {
    transform: translate(100vw, -50%);
    opacity: 0;
    background-color: $almostBlack;
  }
}
</style>
