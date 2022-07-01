<template>
  <aside
    id="products-aside"
    :class="{'products-aside_opened': mobileFilterOpened}"
  >
    <div class="products-aside__content">
      <div class="products-aside__categories">
        <ul class="products-aside__categories-list">
          <li
            v-for="parent in parentCategory"
            :key="parent.id"
            class="products-aside__categories-item"
          >
            <a href="#" class="products-aside__categories-link" @click.prevent="parentLink(`/category/${parent.slug}`, parent.id)">
              {{ parent.name }}
            </a>
          </li>
          <li class="products-aside__categories-item">
            <span class="products-aside__categories-title">{{ category }}</span>
          </li>
          <ul class="products-aside__subcategories-list">
            <li
              v-for="(item, index) in child.child"
              :key="item.id"
              class="products-aside__subcategories-item"
            >
              <a href="#" class="products-aside__subcategories-link" @click.prevent="childLink(`/category/${item.slug}`)">
                <span class="products-aside__subcategories-name">{{ item.name }}</span>
                <div class="products-aside__subcategories-amount">{{ child.count[index][item.id] }}</div>
              </a>
            </li>
          </ul>
        </ul>
      </div>
      <ProductsFilter
        :filters="filters"
        :price-from="priceFrom"
        :price-to="priceTo"
        :filter-load="filterLoad"
        :products-load="productsLoad"
      />
      <button
        :disabled="productsLoad"
        class="filters-clear"
        @click.prevent="resetFilters"
      >
        Очистить фильтры
      </button>
    </div>
    <div
      class="products-aside__close"
      @click.prevent="toggleMobileFilter(false)"
    />
  </aside>
</template>

<script>
import { mapMutations } from 'vuex'
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ProductsAside',
  props: {
    mobileFilterOpened: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: ''
    },
    parentCategory: {
      type: Array,
      default () {
        return []
      }
    },
    child: {
      type: Object,
      default () {
        return {}
      }
    },
    subParent: {
      type: Array,
      default () {
        return []
      }
    },
    filters: {
      type: Array,
      default () {
        return []
      }
    },
    priceFrom: {
      type: String,
      default: ''
    },
    priceTo: {
      type: String,
      default: ''
    },
    filterLoad: {
      type: Boolean,
      default: false
    },
    productsLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      updateCategoryParents: 'updateCategoryParents',
      resetFiltersString: 'filters/RESET_FILTERS_STRING'
    }),

    toggleMobileFilter (value) {
      eventBus.$emit('toggleMobileFilter', value)
    },
    parentLink (path, id) {
      const parent = []
      let found = false

      this.parentCategory.forEach((item) => {
        if (item.id === id) {
          found = true
        } else if (item.slug !== id && found === false) {
          parent.push(item.id)
        }
      })

      this.updateCategoryParents(parent.reverse())

      this.$router.push({
        path,
        query: {
          parent: parent.concat().reverse().join('|')
        }
      })
    },
    childLink (path) {
      this.updateCategoryParents(this.subParent.concat().reverse())

      this.$router.push({
        path,
        query: {
          parent: this.subParent.concat().reverse().join('|')
        }
      })
    },
    async filterProducts () {
      eventBus.$emit('products-load', true)

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

        eventBus.$emit('update-products', {
          productsData: response.data,
          page: response.data.product.current_page,
          totalPages: response.data.product.last_page,
          paginationPath: response.data.product.path,
          totalProducts: response.data.product.total,
          productsFilters: response.data.filter
        })
      } catch (err) {
        eventBus.$emit('notify', {
          text: `Ошибка сервера: ${err.response.data.message}`,
          type: 'error'
        })
      } finally {
        eventBus.$emit('products-load', false)
      }
    },
    resetFilters () {
      this.resetFiltersString()

      new Promise((resolve, reject) => {
        eventBus.$emit('update-price-from', '')
        eventBus.$emit('update-price-to', '')
        resolve()
      })
        .then(() => {
          this.filterProducts()
        })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#products-aside {
  width: 250px;
  padding-right: 30px;
}

.products-aside__content {
  padding: 25px 0 15px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #eaeaea;
}

.products-aside__categories {
    margin-bottom: 30px;
    padding: 0 15px;
}

.products-aside__categories-list {
    display: flex;
    flex-direction: column;
    font-size: 14px;
}

.products-aside__categories-item:not(:last-child) {
    margin-bottom: 10px;
}

.products-aside__categories-link {
    color: $greyText;
    transition: color 200ms ease;
}

.products-aside__categories-link:hover {
    color: $purple;
}

.products-aside__categories-title {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #222;
}

.products-aside__subcategories-list {
    display: flex;
    flex-direction: column;
}

.products-aside__subcategories-item {
    padding-left: 10px;
}

.products-aside__subcategories-item:not(:last-child) {
    margin-bottom: 10px;
}

.products-aside__subcategories-link {
    display: inline-flex;
    width: 100%;
}

.products-aside__subcategories-link:hover .products-aside__subcategories-name {
    color: $purple;
}

.products-aside__subcategories-link:hover .products-aside__subcategories-amount {
    color: $purple;
}

.products-aside__subcategories-name {
    padding-right: 10px;
    margin-right: auto;
    line-height: 1.2;
    color: $greyText;
    transition: color 200ms ease;
}

.products-aside__subcategories-amount {
    font-size: 12px;
    color: $greyText;
    transition: color 200ms ease;
}

.filters-clear {
  position: relative;
  display: block;
  padding: 10px 20px;
  margin: 0 auto;
  border: 2px solid transparent;
  border-radius: 5px;
  letter-spacing: 1px;
  font-weight: 500;
  color: $white;
  background: $warmRed;
  overflow: hidden;
  transition-property: background-color, box-shadow, transform, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.filters-clear:hover {
  box-shadow: 0 3px 5px $grey;
  transform: translateY(-4px);
}

.filters-clear:not(:active):not(:hover):focus {
  border-color: $success;
}

.filters-clear:active {
  background-color: $darkWarmRed;
  box-shadow: 0 0 0 transparent;
  transform: translateY(0);
}

@media (max-width: 768px) {

    .products-container {
        position: unset;
    }

    #products-aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        margin-right: 0;
        border: none;
        border-radius: 0;
        box-shadow: none;
        background-color: $white;
        opacity: 0;
        visibility: hidden;
        overflow: auto;
        transition: opacity 300ms ease;
        z-index: 1000;
    }

    .products-aside__content {
      padding: 5px 0;
      box-shadow: none;
      border: none;
    }

    .products-aside__categories {
        align-items: flex-start;
        max-height: 125px;
        padding: 10px 40px 10px 10px;
        margin-bottom: 0;
        overflow: auto;
    }

    .products-aside__categories-title {
        margin-bottom: 10px;
    }

    .products-aside__categories-item {
        position: relative;
    }

    .products-aside__categories-item:not(:last-child) {
        margin-bottom: 10px;
    }

    .products-aside__close {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 25px;
      height: 25px;
      border: 1px solid $almostBlack;
      border-radius: 5px;
      background-color: $white;
    }

    .products-aside__close::before,
    .products-aside__close::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 75%;
      height: 1px;
      background-color: $almostBlack;
    }

    .products-aside__close::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .products-aside__close::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    .products-aside_opened {
      opacity: 1 !important;
      visibility: visible !important;
    }

}
</style>
