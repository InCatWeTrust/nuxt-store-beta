<template>
  <ul class="favorite-list">
    <Card
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </ul>
</template>

<script>
export default {
  name: 'FavoriteList',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.favorite-list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;

  .card {
    grid-column: span 3;
  }
}

@media (max-width: 1024px) {
.favorite-list {
  .card {
    grid-column: span 4;
  }
}
}

@media (max-width: 768px) {
.favorite-list {
  .card {
    grid-column: span 6;
  }
}
}

@media (max-width: 500px) {
.favorite-list {
  .card {
    grid-column: span 12;
  }
}
}
</style>
