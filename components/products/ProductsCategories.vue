<template>
  <div class="products-categories">
    <h1 class="products-categories__title">
      {{ category }}
    </h1>
    <ul class="products-categories__list">
      <li
        v-for="item in sub"
        :key="item.id"
        class="products-categories__item"
      >
        <div class="products-categories__item-block">
          <img src="~/assets/images/test-metall.jpg" :alt="item.name" class="products-categories__img">
          <a
            href="#"
            class="products-categories__link"
            @click.prevent="link(`/category/${item.slug}`, parent)"
          >
            {{ item.name }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProductsCategories',
  props: {
    sub: {
      type: Array,
      default () {
        return []
      }
    },
    category: {
      type: String,
      default: ''
    },
    parent: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    ...mapMutations({
      updateCategoryParents: 'updateCategoryParents'
    }),

    link (path, parent) {
      this.updateCategoryParents(parent.concat().reverse())

      this.$router.push({
        path,
        query: {
          parent: parent.concat().reverse().join('|')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.products-categories {
    margin-bottom: 20px;
}

.products-categories__title {
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 500;
}

.products-categories__list {
    display: flex;
    flex-wrap: wrap;
}

.products-categories__item {
    flex: 0 0 16.66667%;
    padding: 15px;
}

.products-categories__item-block {
    position: relative;
    text-align: center;
}

.products-categories__img {
    width: 100%;
    margin-bottom: 8px;
}

.products-categories__link {
    line-height: 1.2;
    color: $darkGrey;
    transition: color 200ms ease;
}

.products-categories__link::after {
    @include fillLink;
}

.products-categories__link:hover {
    color: $black;
}
</style>
