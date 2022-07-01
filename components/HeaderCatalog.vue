<template>
  <transition name="catalog-show">
    <div
      v-show="catalogOpened"
      class="header-nav__catalog-menu-container"
      @click.self="toggleCatalog(!catalogOpened)"
    >
      <div class="catalog-menu__menu">
        <ul class="catalog-menu__list">
          <li v-for="category in categories" :key="category.id" class="catalog-menu__item">
            <a
              href="#"
              class="catalog-menu__item-link"
              :class="{'catalog-menu__active': currentCategory === categories.indexOf(category)}"
              @click.prevent="changeCategory(categories.indexOf(category))"
            >
              {{ category.name }}
            </a>
          </li>
        </ul>
        <transition-group
          tag="div"
          name="categories-fade"
          class="catalog-menu__sub-container"
        >
          <div
            v-for="(category, index) in categories"
            v-show="currentCategory === index"
            :key="category.id"
            class="catalog-menu__sub-content"
          >
            <a
              href="#"
              class="catalog-menu__list-title"
              @click.prevent="link(`/category/${category.slug}`, category.parent)"
            >
              {{ category.name }}
            </a>
            <ul class="catalog-menu__sub-list">
              <li
                v-for="sub in category.child"
                :key="sub.name"
                class="catalog-menu__sub-item"
              >
                <div class="catalog-menu__sub-item-container">
                  <a
                    href="#"
                    class="catalog-menu__sub-title"
                    @click.prevent="link(`/category/${sub.slug}`, sub.parent)"
                  >
                    {{ sub.name }}
                  </a>
                  <ul class="catalog-menu__sub-sub-list">
                    <li
                      v-for="subsub in sub.child"
                      :key="subsub.name"
                      class="catalog-menu__sub-sub-item"
                    >
                      <a
                        href="#"
                        class="catalog-menu__sub-sub-link"
                        @click.prevent="link(`/category/${subsub.slug}`, subsub.parent)"
                      >
                        {{ subsub.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </transition-group>
        <button
          id="catalog-close"
          class="catalog-menu__close-button"
          @click.prevent="toggleCatalog(false)"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import eventBus from '~/eventBus'
import convertCategories from '~/helpers/convertCategories'

export default {
  name: 'HeaderCatalog',
  model: {
    prop: 'catalogOpened',
    event: 'toggleCatalog'
  },
  props: {
    catalogOpened: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentCategoryData: 0
    }
  },
  computed: {
    ...mapGetters({
      categoriesData: 'categories'
    }),
    categories () {
      return convertCategories(this.categoriesData)
    },
    currentCategory () {
      return this.currentCategoryData
    }
  },
  methods: {
    ...mapMutations({
      updateCategoryParents: 'updateCategoryParents'
    }),

    changeCategory (value) {
      this.currentCategoryData = value
    },
    toggleCatalog (value) {
      eventBus.$emit('toggleCatalog', value)
    },
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

// Catalog menu

.header-nav__catalog-menu-container {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    padding: 0 50px;
    z-index: 600;
    display: block;
    border-top: 1px solid $darkGrey;
    border-bottom: 1px solid $white;
    background-color: $lightGrey;
    box-shadow: 0 5px 5px rgba($brandColor, 0.3);
}

.catalog-menu__menu {
    position: relative;
    display: flex;
    max-width: calc(1340px - 100px);
    height: calc(100vh - 300px);
    margin: 0 auto;
}

.catalog-menu__list {
    position: relative;
    width: 18%;
    padding: 50px 0;
    border-right: 1px solid $grey;
    overflow: auto;
}

.catalog-menu__item-link {
    display: block;
    padding: 12px 0 12px 20px;
    font-weight: 500;
    font-size: 16px;
    transition-property: background-color, color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.catalog-menu__active {
    background-color: $brandColor;
}

.catalog-menu__item-link:hover {
    background-color: $brandColor;
}

.catalog-menu__list-title {
    display: block;
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid $grey;
    transition-property: color, border-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.catalog-menu__list-title:hover {
  color: $darkerBrandColor;
  border-color: $almostBlack;
}

.catalog-menu__sub-container {
    position: relative;
    width: 82%;
    padding: 50px;
    background-color: $white;
    overflow: auto;
}

.catalog-menu__sub-content {
  position: absolute;
  width: calc(100% - 100px);
}

.catalog-menu__sub-title {
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
    transition-property: color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.catalog-menu__sub-title:hover {
    color: $darkerBrandColor;
}

.catalog-menu__sub-list {
    column-count: 3;
    column-gap: 30px;
}

.catalog-menu__sub-item {
    -moz-column-break-inside: avoid;
    break-inside: avoid;
    page-break-inside: avoid;
}

.catalog-menu__sub-item-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
}

.catalog-menu__sub-sub-item:not(:last-child) {
    margin-bottom: 10px;
}

.catalog-menu__sub-sub-link {
    font-size: 16px;
    line-height: 1.2;
    color: $lightGreyText;
    transition-property: color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.catalog-menu__sub-sub-link:hover {
    color: $darkerBrandColor;
}

.catalog-menu__close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    transform: translateX(-50%);
    width: 25px;
    height: 25px;
    border: 1px solid $almostBlack;
    border-radius: 5px;
    background-color: transparent;
    transition-property: opacity, transform, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    z-index: 501;
}

.catalog-menu__close-button::before,
.catalog-menu__close-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 1px;
    background-color: $black;
    transition-property: opacity, transform, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}

.catalog-menu__close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
}

.catalog-menu__close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
}

.catalog-menu__close-button:hover {
    background-color: $lightPurple;
}

.catalog-menu__close-button:hover::after,
.catalog-menu__close-button:hover::before {
    transform: translate(-50%, -50%) rotate(0);
}

._catalog_opened {
    display: block;
}

._catalog_opened-mobile {
    position: fixed;
    display: block;
}

._catalog_opacity {
    opacity: 1;
    transform: translateX(0);
}

._btn-catalog_opened span {
    transform: rotate(90deg);
    background-color: $brandColor;
}

._btn-catalog_opened span::before {
    transform: rotate(-30deg);
}

._btn-catalog_opened span::after {
    transform: rotate(30deg);
}

.catalog-show-enter-active, .catalog-show-leave-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.catalog-show-enter, .catalog-show-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.categories-fade-enter-active {
  transition: opacity .5s;
}

.categories-fade-enter {
  opacity: 0;
}

@media (max-width: 1200px) {

    .catalog-menu__sub-title {
        margin-bottom: 12px;
        font-size: 14px;
    }

    .catalog-menu__sub-list {
        column-count: 3;
        column-gap: 25px;
    }

    .catalog-menu__sub-item-container {
        margin-bottom: 15px;
    }

    .catalog-menu__sub-sub-item:not(:last-child) {
        margin-bottom: 8px;
    }

    .catalog-menu__sub-sub-link {
        font-size: 14px;
    }

}

@media (max-width: 1024px) {

    .catalog-menu__menu {
        max-height: unset;
        height: 100vh;
    }

    .catalog-menu__list {
        width: 25%;
        padding: 30px 0;
    }

    .catalog-menu__item-link {
        padding: 8px 0 8px 20px;
        font-size: 12px;
    }

    .catalog-menu__sub-container {
        width: 75%;
        padding: 30px;
    }

    .catalog-menu__sub-title {
        margin-bottom: 12px;
        font-size: 14px;
    }

    .catalog-menu__sub-list {
        column-count: 2;
        column-gap: 25px;
    }

    .catalog-menu__sub-sub-item:not(:last-child) {
        margin-bottom: 8px;
    }

    .catalog-menu__sub-sub-link {
        font-size: 14px;
    }

    .header-nav__catalog-menu-container {
        position: fixed;
        top: 0;
        padding: 0;
    }

}

@media (max-width: 768px) {

    .catalog-menu__menu {
        flex-direction: column;
    }

    .catalog-menu__list {
        width: 100%;
        min-height: 100px;
        max-height: 200px;
        padding: 0;
        border-bottom: 1px solid $grey;
        border-right: unset;
    }

    .catalog-menu__sub-container {
        width: 100%;
        height: 100%;
        padding: 15px;
    }

    .catalog-menu__close-button {
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        background-color: $white;
    }

}

@media (max-width: 500px) {

    .catalog-menu__sub-list {
        column-count: 1;
        column-gap: 0;
    }

}
</style>
