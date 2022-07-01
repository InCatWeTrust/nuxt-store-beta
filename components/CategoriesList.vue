<template>
  <section id="categories-list">
    <div class="container">
      <h2 class="categories-title">
        Каталог продукции
      </h2>
      <ul class="categories-list" style="">
        <li
          v-for="category in categories"
          :key="category.id"
          class="categories-list__item"
        >
          <h3 class="categories-list__title">
            <a
              href="#"
              class="categories-list__title-link"
              @click.prevent="link(`/category/${category.slug}`, category.parent)"
            >
              {{ category.name }}
            </a>
          </h3>
          <ul class="sub-categories__list">
            <li
              v-for="sub in category.child"
              :key="sub.id"
              class="sub-categories__item"
            >
              <a
                href="#"
                class="sub-categories__link"
                @click.prevent="link(`/category/${sub.slug}`, sub.parent)"
              >
                {{ sub.name }}
              </a>
            </li>
          </ul>
          <div class="categories-list__cover" />
          <img class="categories-list__img" alt="category" :src="require(`~/assets/images/test-metall.jpg`)">
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import convertCategories from '~/helpers/convertCategories'

export default {
  name: 'CategoriesList',
  computed: {
    ...mapGetters({
      categoriesData: 'categories'
    }),
    categories () {
      return convertCategories(this.categoriesData)
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
@import '@/assets/css/_variables.scss';

#categories-list {
    padding: 50px 0;
}

.categories-title {
  margin-bottom: 25px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
}

.categories-list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 30px;
}

.categories-list__item {
    min-height: 209px;
    position: relative;
    border-radius: 5px;
    background-color: $white;
    overflow: hidden;
    transition-property: background-color, box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: 1;
}

.categories-list__item:hover {
    box-shadow: 0 5px 10px $grey;
}

.categories-list__title-link {
    display: block;
    padding: 15px 20px;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    background-color: $brandColor;
    transition-property: color, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.categories-list__title-link:hover {
    color: $white;
    background-color: $almostBlack;
}

.sub-categories__list {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.sub-categories__item {
    position: relative;
    padding: 10px 5px 10px 30px;
    font-size: 16px;
    border-left: 2px solid $black;
    border-bottom: 1px dashed $white;
    background-color: rgba($almostBlack, 0.6);
    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.sub-categories__link {
    line-height: 1.2;
    color: $white;
    transition-property: color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.sub-categories__link::after {
    @include fillLink;
}

.sub-categories__item:hover {
    background-color: $brandColor;
    transform: translateX(8px);
}

.sub-categories__item:hover .sub-categories__link {
    color: $black;
}

.categories-list__img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    z-index: -1;
}

.categories-list__cover {
    height: 100%;
    border-left: 2px solid $black;
    background-color: rgba($almostBlack, 0.6);
}
</style>
