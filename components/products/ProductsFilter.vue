<template>
  <ul class="filter">
    <li class="filter-item">
      <span class="filter-price__title">Цена:</span>
      <form class="filter-price">
        <input
          v-model="priceFromData"
          type="text"
          placeholder="От"
          class="filter-price__amount price-from"
          @keypress="validatePrice($event)"
        >
        <input
          v-model="priceToData"
          type="text"
          placeholder="До"
          class="filter-price__amount price-to"
          @keypress="validatePrice($event)"
        >
        <button
          :disabled="productsLoad"
          class="filter-price__confirm"
          @click.prevent="filterProducts"
        >
          <PreloadersBasePreloader v-if="productsLoad" :size="20" background="#ff9e4c" color="#fff" />
          Применить фильтр
        </button>
      </form>
    </li>
    <ProductsFilterItem
      v-for="filter in filters"
      :key="filter.slug"
      :filter="filter"
      :products-load="productsLoad"
      :price-from="priceFrom"
      :price-to="priceTo"
    />
  </ul>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ProductsFilter',
  props: {
    filters: {
      type: Array,
      default () {
        return []
      }
    },
    priceFrom: {
      type: String,
      default () {
        return ''
      }
    },
    priceTo: {
      type: String,
      default () {
        return ''
      }
    },
    productsLoad: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    priceFromData: {
      get () {
        return this.priceFrom
      },
      set (value) {
        eventBus.$emit('update-price-from', value)
      }
    },
    priceToData: {
      get () {
        return this.priceTo
      },
      set (value) {
        eventBus.$emit('update-price-to', value)
      }
    }
  },
  methods: {
    validatePrice (event) {
      if (!event.code.toLowerCase().includes('digit')) {
        event.preventDefault()
      }
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
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.filter {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-bottom: 30px;
}

.filter-item {
    display: flex;
    flex-direction: column;
}

.filter-item:first-child {
    padding: 0 15px;
    border-top: 1px solid $lightGrey;
}

/* Price */

.filter-price__title {
    position: relative;
    display: inline-block;
    padding: 10px 0;
    font-size: 18px;
    font-weight: 500;
    color: $black;
    background-color: transparent;
    overflow: hidden;
}

.filter-price {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
}

.filter-price__amount {
    width: 45%;
    padding: 3px 3px 3px 8px;
    border: 1px solid transparent;
    border-bottom-color: $grey;
    border-radius: 4px;
    font-size: 14px;
    color: $purple;
    background: transparent;
    transition-property: border-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.filter-price__amount::placeholder {
    font-size: 12px;
    color: $grey;
}

.filter-price__amount:not(:focus):hover {
    border-bottom-color: $black;
}

.filter-price__amount:focus {
    border-color: $purple;
}

.price-from {
    margin-right: auto;
}

.filter-price__confirm {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 10px;
    margin: 10px;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    color: $black;
    background-color: $brick;
    cursor: pointer;
    overflow: hidden;
    transition-property: background-color, color;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.filter-price__confirm:hover {
    color: $white;
    background-color: $purple;
}
</style>
