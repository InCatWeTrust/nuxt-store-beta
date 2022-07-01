<template>
  <no-ssr>
    <section id="compare-section">
      <div class="container">
        <h1 class="compare-title">
          Товары для сравнения
        </h1>
        <div id="compare-products">
          <div
            v-if="!compareNotEmpty"
            class="empty"
          >
            Здесь пусто...
          </div>
          <div
            v-if="compareNotEmpty"
            class="compare-categories"
          >
            <h2 class="compare-categories__title">
              Категории
            </h2>
            <div class="compare-categories__list">
              <a
                v-for="category in categories"
                :key="category.id"
                href="#"
                class="compare-categories__item"
                :class="{
                  'compare-categories_active': category.id === currentCategoryId,
                  'disabled': compareProductsLoad
                }"
                @click.prevent="changeCategory(category.id)"
              >
                {{ category.name }}
              </a>
            </div>
            <button
              v-if="!compareProductsLoad && compareNotEmpty"
              class="delete-all"
              :disabled="compareProductsLoad"
              @click.prevent="deleteCompareProducts()"
            >
              Убрать всё из сравнения
            </button>
          </div>
          <div class="compare-products">
            <!-- <div class="compare-checkbox check">
              <input
                id="compare-checkbox"
                v-model="hideMatch"
                class="compare-checkbox__input"
                type="checkbox"
              >
              <label for="compare-checkbox" class="compare-checkbox__label">
                Показать только отличающиеся характеристики
              </label>
            </div> -->
            <PreloadersBasePreloader
              v-if="compareProductsLoad"
              :size="50"
              color="#ffd737"
            />
            <div
              v-for="item in products"
              v-show="currentCategoryId === item.catalog.id"
              :key="item.catalog.id"
              class="compare-products__list"
              :class="{'loading': compareProductsLoad}"
            >
              <BaseSwiper
                :items="item.product"
                :breakpoints="breakpoints"
                :mobile-slides-amount="2"
                :mobile-space-between="10"
                class="compareSwiper"
              >
                <template #default="slotProps">
                  <CompareProductItem
                    :product-data="slotProps.item.product"
                    :props="slotProps.item.props"
                    :loading="compareProductsLoad"
                  />
                </template>
              </BaseSwiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  </no-ssr>
</template>

<script>
import { mapGetters } from 'vuex'
import { compareBreakpoints } from '@/data/swiperBreakpoints'
import { API_BASE_URL } from '~/config'

export default {
  name: 'ComparePage',
  data () {
    return {
      productsData: null,
      breakpoints: compareBreakpoints,

      hideMatch: true,
      compareProductsLoad: false,
      currentCategoryId: null
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/id',
      userToken: 'user/token',
      compareProducts: 'compareIndicator/compareProducts'
    }),

    products () {
      return this.productsData ? this.productsData : []
    },
    categories () {
      if (this.productsData) {
        return this.productsData.map(item => item.catalog)
      } else {
        return []
      }
    },
    compareNotEmpty () {
      return this.compareProducts.length > 0
    }
  },
  watch: {
    compareProducts () {
      if (this.compareNotEmpty) {
        this.getCompareProducts()
      }
    }
  },
  created () {
    if (this.compareNotEmpty) {
      this.getCompareProducts()
    }
  },
  methods: {
    changeCategory (categoryId) {
      this.productsData = []

      this.currentCategoryId = categoryId
    },
    async getCompareProducts (categoryId) {
      this.compareProductsLoad = true

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/comparisontwo`, {
          params: {
            id: this.userId,
            token: this.userToken
          }
        })

        this.productsData = response.data.groups

        return response.data
      } finally {
        this.compareProductsLoad = false
      }
    },
    async deleteCompareProducts () {
      const response = await this.$axios.post(`${API_BASE_URL}/api/V2/comparisondel`, null, {
        params: {
          id: this.userId,
          token: this.userToken,
          all: true
        }
      })

      // this.productsData = response.data.groups
      // this.categoriesData = response.data.catalog

      return response.data
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.compare-title {
    margin: 25px 0;
    font-size: 24px;
    font-weight: 500;
}

#compare-products {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;

    .delete-all {
      margin-bottom: 10px;
      padding: 10px 25px;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 1px;
      border: 1px solid $lightGrey;
      border-radius: 5px;
      color: $white;
      background-color: $defaultBlue;
      transition-property: background-color;
      transition-duration: 200ms;
      transition-timing-function: ease;

      &:hover {
        background-color: $warning;
      }

      &:disabled {
        cursor: auto;
      }
    }

    .empty {
      font-size: 24px;
      font-weight: 500;
      color: $purple;
      letter-spacing: 1px;
    }
}

.compare-categories {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    border-bottom: 1px solid $black;
}

.compare-categories__title {
    width: 100%;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 400;
}

.compare-categories__list {
    display: flex;
    flex-wrap: wrap;
    margin-right: auto;
    padding-right: 20px;
}

.compare-categories__item {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 7px 20px;
    margin-bottom: 15px;
    border: 1px solid $black;
    border-radius: 5px;
    color: $black;
    overflow: hidden;
    transition-property: color, box-shadow, border-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: 1;

    &.disabled {
      pointer-events: none;
      cursor: auto;
    }
}

.compare-categories_active {
    color: $white;
    background: $purpleGradient;
    box-shadow: 0 3px 10px $purple;
    border-color: transparent;
}

.compare-categories__item:not(:last-child) {
    margin-right: 20px;
}

.compare-categories__item:hover {
    color: #fff;
    box-shadow: 0 3px 10px $purple;
    border-color: $purple;
}

.compare-categories__item:hover::after {
    opacity: 1;
}

.compare-categories__item::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: $purpleGradient;
    opacity: 0;
    transition: opacity 300ms ease;
    z-index: -1;
}

.compare-products {
  position: relative;
}

.compare-products__list {
  &.loading {
    min-height: 100px;
  }
}

.compareSwiper {
  position: relative;
  overflow: hidden;
}

.compareSwiper .swiper-button-disabled {
    opacity: 0 !important;
}

.compareSwiper .swiper-button-prev,
.compareSwiper .swiper-button-next {
    top: 170px;
    width: 35px;
    height: 35px;
    border: 1px solid $white;
    border-radius: 10px;
    background-color: $white;
    box-shadow: 2px 2px 10px $grey;
    transition-property: background-color, color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.compareSwiper .swiper-button-prev {
    left: 10px;
}

.compareSwiper .swiper-button-next {
    right: 10px;
}

.compareSwiper .swiper-button-prev::after,
.compareSwiper .swiper-button-next::after {
    font-size: 18px;
    color: $black;
    transition-property: color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.compareSwiper .swiper-button-prev::after {
    content: '';
}

.compareSwiper .swiper-button-next::after {
    content: '';
}

.compareSwiper .swiper-button-prev svg,
.compareSwiper .swiper-button-next svg {
  fill: $grey;
  transition-property: fill;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.compareSwiper .swiper-button-next svg {
  transform: rotate(180deg);
}

.compareSwiper .swiper-button-prev:hover svg,
.compareSwiper .swiper-button-next:hover svg {
  fill: $white;
}

.compareSwiper .swiper-button-prev:hover,
.compareSwiper .swiper-button-next:hover {
    background-color: $purple;
}

.compareSwiper .swiper-button-prev:hover::after,
.compareSwiper .swiper-button-next:hover::after {
    color: $white;
}

.compareSwiper .swiper-slide-active .compare-card__prop-title {
    opacity: 1;
}

.compare-checkbox {
    display: flex;
    align-items: center;
    height: 30px;
    margin-bottom: 15px;
    z-index: 1;
}

.compare-checkbox label {
    right: unset !important;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    text-align: center;
}

.compare-checkbox input + label::before {
    width: unset;
    height: unset;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: unset;
    background-color: unset;
    background: $purpleGradient;
    opacity: 0;
    z-index: -1;
    transition-property: transform, border-color, opacity;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.compare-checkbox input:checked + label::before {
    opacity: 1;
    transform: unset;
}

.compare-checkbox input:checked + label {
    color: white;
}

.compare_hidden {
    display: none;
}

@media (max-width: 768px) {

    .compare-categories__list {
      padding-right: 0;
      margin-right: 0;
      margin-bottom: 20px;
      width: 100%;
    }

    .compare-categories__item:not(:last-child) {
        margin-right: 10px;

    }
    .compare-categories__item {
        padding: 8px 14px;
        margin-bottom: 5px;
        font-size: 12px;
    }

    .compare-categories_active {
        box-shadow: 0 2px 5px $purple;
    }

    .compare-checkbox {
        height: 34px;
    }

    .compare-checkbox label {
        font-size: 12px;
    }
}
</style>
