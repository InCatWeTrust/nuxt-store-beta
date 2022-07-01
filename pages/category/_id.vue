<template>
  <div class="container products-container">
    <ProductsAside
      :mobile-filter-opened="mobileFilterOpened"
      :category="products.category && products.category.name"
      :parent-category="products.parent && products.parent.concat().reverse()"
      :child="products.child"
      :sub-parent="subParent"
      :filters="filters"
      :price-from="priceFrom"
      :price-to="priceTo"
      :products-load="productsLoad"
    />
    <section id="products-section">
      <ProductsCategories
        :sub="products.child && products.child.child"
        :category="products.category && products.category.name"
        :parent="subParent"
      />
      <div v-if="totalProducts > 0" class="grid-view-block">
        <ProductsSort />
        <div class="grid-change">
          <a
            href="#"
            class="grid-change__btn"
            :class="{'grid-change__btn_active': grid === 'land'}"
            @click.prevent="changeGrid('land')"
          >
            <svg class="grid-change__svg">
              <use xlink:href="~/assets/images/sprites.svg#list-land" />
            </svg>
          </a>
          <a
            href="#"
            class="grid-change__btn"
            :class="{'grid-change__btn_active': grid === 'square'}"
            @click.prevent="changeGrid('square')"
          >
            <svg class="grid-change__svg">
              <use xlink:href="~/assets/images/sprites.svg#list-square" />
            </svg>
          </a>
        </div>
      </div>
      <div v-if="totalProducts <= 0 && !productsLoad" class="products-not-found">
        Товары не найдены
      </div>
      <ProductsList
        :grid="grid"
        :products="products.product && products.product.data"
        :products-load="productsLoad"
        :pagination-path="paginationPath"
        :category-name="(products.category && String(products.category.id)) || null"
      />
      <BasePagination
        :page="page"
        :total-pages="totalPages"
        :total-products="totalProducts"
        :pagination-load="productsLoad"
        :price-from="priceFrom"
        :price-to="priceTo"
      />
      <div
        class="products-section__filter-button"
        @click.prevent="mobileFilterOpened = !mobileFilterOpened"
      >
        <svg class="products-section__filter-svg">
          <use xlink:href="~/assets/images/sprites.svg#filter" />
        </svg>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ProductsPage',
  async asyncData (context) {
    context.store.commit('filters/RESET_FILTERS_STRING')

    try {
      const response = await context.$axios.get(`${API_BASE_URL}/api/V2/category`, {
        params: {
          slug: context.params.id,
          parent: context.query.parent || null,
          paginate: context.store.state.perPage,
          page: context.store.state.page,
          filter: context.query.filter || null
        }
      })

      return {
        productsData: response.data,
        page: response.data.product.current_page,
        totalPages: response.data.product.last_page,
        paginationPath: response.data.product.path,
        totalProducts: response.data.product.total,
        productsFilters: response.data.filter
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        context.error({ statusCode: 404 })
      } else if (err.response && err.response.status >= 500) {
        eventBus.$emit('notify', {
          text: `Ошибка сервера: ${err.response.data.message}`,
          type: 'error'
        })
      }
    }
  },
  data () {
    return {
      productsData: null,
      productsFilters: null,

      grid: 'land',
      mobileFilterOpened: false,
      page: 1,
      totalPages: 1,
      totalProducts: 0,
      paginationPath: '',

      productsLoad: false,

      priceFrom: '',
      priceTo: ''
    }
  },
  computed: {
    ...mapGetters({
      filtersData: 'filters/filters'
    }),

    products () {
      return this.productsData ? this.productsData : {}
    },
    subParent () {
      const parent = []

      if (this.products.parent) {
        for (const item of this.products.parent) {
          parent.unshift(item.id)
        }
        parent.push(this.products.category.id)
      }

      return parent
    },
    filters () {
      return this.filtersData
    }
  },
  watch: {
    productsFilters () {
      this.updateFilters(this.productsFilters)
    }
  },
  created () {
    eventBus.$on('toggleMobileFilter', (value) => { this.mobileFilterOpened = value })
    eventBus.$on('products-load', (isLoad) => { this.productsLoad = isLoad })
    eventBus.$on('update-products', (data) => {
      this.productsData = data.productsData
      this.page = data.page
      this.totalPages = data.totalPages
      this.paginationPath = data.paginationPath
      this.totalProducts = data.totalProducts
      this.productsFilters = data.productsFilters
    })
    eventBus.$on('update-price-from', (value) => { this.priceFrom = value })
    eventBus.$on('update-price-to', (value) => { this.priceTo = value })
  },
  mounted () {
    const grid = localStorage.products_grid

    if (grid !== 'land' && grid !== 'square') {
      localStorage.setItem('products_grid', 'land')
      this.grid = 'land'
    } else if (grid === 'land') {
      this.grid = grid
    } else if (grid === 'square') {
      this.grid = grid
    }

    this.updateFilters(this.productsFilters)
  },
  methods: {
    ...mapMutations({
      updateFilters: 'filters/UPDATE_FILTERS'
    }),

    changeGrid (gridName) {
      this.grid = gridName
      localStorage.setItem('products_grid', gridName)
    },
    async filterProducts () {
      this.productsLoad = true

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/category`, {
          params: {
            slug: this.$route.params.id,
            parent: this.$store.state.categoryParents.join('|') || null,
            price_from: this.priceFrom || null,
            price_to: this.priceTo || null,
            paginate: this.$store.state.perPage,
            page: this.$store.state.page,
            filter: this.$store.state.filters.filtersStringData || null
          }
        })

        this.productsData = response.data
        this.page = response.data.product.current_page
        this.totalPages = response.data.product.last_page
        this.paginationPath = response.data.product.path
        this.totalProducts = response.data.product.total
      } catch (err) {
        eventBus.$emit('notify', {
          text: `Ошибка сервера: ${err.response.data.message}`,
          type: 'error'
        })
      } finally {
        this.productsLoad = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.products-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

#products-section {
  width: calc(100% - 250px);
}

.grid-view-block {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.grid-change {
    display: flex;
}

.grid-change__btn {
    cursor: pointer;
}

.grid-change__btn:not(:last-child) {
    margin-right: 10px;
}

.grid-change__svg {
    width: 25px;
    height: 25px;
    fill: $almostBlack;
    transition-property: fill;
    transition-duration: 300ms;
    transition-timing-function: ease;
    pointer-events: none;
}

.grid-change__btn:hover .grid-change__svg {
    fill: $brandColor;
}

.grid-change__btn_active svg {
    fill: $brandColor;
}

.products-section__filter-button {
  display: none;
}

.products-not-found {
  font-size: 24px;
  font-weight: 500;
}

@media (max-width: 768px) {

#products-section {
  width: 100%;
}

.products-container {
  width: 100%;
}

.grid-view-block {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 30px;
}

.grid-change {
    margin-bottom: 15px;
    order: -1;
}

.products-section__filter-button {
  display: block;
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border: 1px dashed $almostBlack;
  border-radius: 50%;
  background-color: rgba($white, 0.8);
  box-shadow: 5px 5px 20px $grey;
}

.products-section__filter-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  fill: $almostBlack;
}

}
</style>
