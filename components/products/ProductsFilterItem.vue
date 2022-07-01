<template>
  <li class="filter-item">
    <span
      class="filter-title"
      :class="{'filter-title_opened': isOpened}"
      @click.prevent="toggle"
    >
      {{ filter.name }}
    </span>
    <transition name="filter-list">
      <div
        v-show="isOpened"
        class="filter-chars"
      >
        <div
          v-for="char in filter.value"
          :key="char.value"
          class="filter-char"
          :class="{'filter-char_load': productsLoad}"
          tabindex="0"
          @click.prevent="check(char.value, !char.checked)"
          @keyup.enter="check(char.value, !char.checked)"
        >
          <div class="checkbox-container" :class="{'checked': char.checked}">
            <span>{{ char.value }}</span>
            <div class="checkbox">
              <input tabindex="-1" type="text" name="filter-check">
              <label for="filter-check" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'
import eventBus from '@/eventBus'
import { API_BASE_URL } from '~/config'

export default {
  name: 'ProductsFilterItem',
  props: {
    filter: {
      type: Object,
      default () {
        return {}
      }
    },
    productsLoad: {
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
  data () {
    return {
      isOpened: true
    }
  },
  computed: {
    isChecked () {
      let checked = false

      if (this.filter.value) {
        const value = this.filter.value.find(value => (value.checked))

        if (value) {
          checked = true
        }
      }

      return checked
    }
  },
  methods: {
    ...mapMutations({
      updateFiltersString: 'filters/UPDATE_FILTERS_STRING_DATA',
      syncFilters: 'filters/SYNC_FILTERS_STRING'
    }),

    toggle () {
      if (this.isOpened && !this.isChecked) {
        this.isOpened = !this.isOpened
      } else if (!this.isOpened) {
        this.isOpened = !this.isOpened
      }
    },
    check (value, checked) {
      eventBus.$emit('products-load', true)

      this.updateFiltersString({
        slug: this.filter.slug,
        checked,
        value
      })

      this.filterProducts()
        .then(() => {
          this.syncFilters()
        })
        .finally(() => {
          eventBus.$emit('products-load', false)
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

        return response.data
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

.filter-title {
    position: relative;
    display: inline-block;
    padding: 12px 35px 12px 15px;
    font-size: 16px;
    font-weight: 500;
    color: $greyText;
    background-color: transparent;
    cursor: pointer;
    transition-property: color, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    overflow: hidden;
    z-index: 2;
}

.filter-title::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, $lightGrey, transparent);
    transform: translate(-100%, 0);
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: ease;
    z-index: -1;
}

.filter-title::before {
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background-image: url('~/assets/images/arrow-down.svg');
    background-repeat: no-repeat;
    background-size: cover;
    transition: transform 300ms ease;
}

.filter-title:hover::after {
    transform: translate(0, 0);
}

.filter-title_opened {
    color: $black;
}

.filter-title_opened::before {
    transform: translate(-50%, -50%) rotate(-180deg);
}

.filter-chars {
    overflow: hidden;
}

.filter-char {
    position: relative;
    padding-left: 5px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: linear-gradient(to right, transparent, $almostWhite, $almostWhite, $almostWhite, transparent);
      transform: translateX(-100%);
      z-index: -1;
      transition-property: transform;
      transition-duration: 500ms;
      transition-timing-function: ease;
    }

    &.filter-char_load {
      pointer-events: none;
    }

    &.filter-char_load::after {
      animation: char-load 500ms ease-in infinite alternate;
    }

    &:focus .checkbox-container {
      background-color: rgba($brandColor, 0.2);
    }
}

.filter-char .checkbox-container {
    padding: 10px 0 10px 15px;
}

.filter-char span {
    margin-right: 15px;
    color: $grey;
    transition: color 300ms ease;
}

.checkbox-container {
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &.checked {
    span {
      color: $black;
    }

    label {
      border-color: $brandColor;

      &::before {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}

.filter-list-enter-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
.filter-list-enter {
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes char-load {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}
</style>
