<template>
  <div class="pagination">
    <div
      v-if="page !== 1"
      class="pagination-prev"
      :class="{'pagination-disabled': paginationLoad}"
      @click.prevent="paginate(page - 1)"
    />
    <div
      v-if="totalProducts > 0"
      class="pagination-page"
      :class="{
        'pagination_active': page === 1,
        'pagination-disabled': paginationLoad
      }"
      @click.prevent="paginate(1)"
    >
      1
    </div>
    <div
      v-if="start"
      class="pagination-dot"
    >
      ...
    </div>
    <div
      v-for="item in count"
      :key="item"
      class="pagination-page"
      :class="{
        'pagination_active': page === item,
        'pagination-disabled': paginationLoad
      }"
      @click.prevent="paginate(item)"
    >
      {{ item }}
    </div>
    <div
      v-if="end"
      class="pagination-dot"
    >
      ...
    </div>
    <div
      v-if="totalPages > 1"
      class="pagination-page"
      :class="{
        'pagination_active': page === totalPages,
        'pagination-disabled': paginationLoad
      }"
      @click.prevent="paginate(totalPages)"
    >
      {{ totalPages }}
    </div>
    <div
      v-if="page !== totalPages"
      class="pagination-next"
      :class="{'pagination-disabled': paginationLoad}"
      @click.prevent="paginate(page + 1)"
    />
  </div>
</template>

<script>
import eventBus from '~/eventBus'
import { API_BASE_URL } from '~/config'

export default {
  name: 'BasePagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    paginationPath: {
      type: String,
      default: ''
    },
    totalProducts: {
      type: Number,
      default: 0
    },
    paginationLoad: {
      type: Boolean,
      default: false
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
    }
  },
  computed: {
    start () {
      return this.page - 3 > 1
    },
    end () {
      return this.page + 3 < this.totalPages
    },
    count () {
      const arr = []
      const diff = this.totalPages - 2

      if (diff > 0) {
        for (let i = -2; i <= 2; i++) {
          if (this.page + i > 1 && this.page + i < this.totalPages) {
            arr.push(this.page + i)
          }
        }
      }

      return arr
    }
  },
  methods: {
    async paginate (page) {
      eventBus.$emit('products-load', true)

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/category`, {
          params: {
            slug: this.$route.params.id,
            parent: this.$store.state.categoryParents.join('|') || null,
            paginate: this.$store.state.perPage,
            page,
            price_from: this.priceFrom || null,
            price_to: this.priceTo || null,
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

.pagination {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 0 0;
}

.pagination-prev,
.pagination-next,
.pagination-page,
.pagination-dot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid $lightGrey;
    border-radius: 50%;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.pagination-prev:hover,
.pagination-next:hover,
.pagination-page:hover {
    background-color: $brandColor;
}

.pagination-next,
.pagination-prev {
    background-image: url('~/assets/images/arrow-down.svg');
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
}

.pagination-prev {
    transform: rotate(90deg);
}

.pagination-next {
    margin-right: 0;
    transform: rotate(-90deg);
}

.pagination-dot {
    align-items: flex-end;
    border: none;
    cursor: unset;
}

.pagination_active {
    background-color: $brandColor;
    pointer-events: none;
}

.pagination-disabled {
  pointer-events: none;
  cursor: auto;
  animation: pagshadow 500ms ease infinite alternate;
}

@keyframes pagshadow {
  0% {
    box-shadow: 0 0 0 transparent;
  }
  100% {
    box-shadow: 0 0 10px rgba($brandColor, 0.7);
  }
}

@media (max-width: 768px) {

    .pagination {
        justify-content: center;
    }

    pagination-prev,
    .pagination-next,
    .pagination-page,
    .pagination-dot {
        margin-bottom: 10px;
    }

}
</style>
