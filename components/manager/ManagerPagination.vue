<template>
  <div class="manager-pagination">
    <div
      v-if="page !== 1"
      class="manager-pagination-prev"
      :class="{'manager-pagination-disabled': load}"
      @click.prevent="paginate(page - 1)"
    />
    <div
      v-if="totalItems > 0"
      class="manager-pagination-page"
      :class="{
        'manager-pagination_active': page === 1,
        'manager-pagination-disabled': load
      }"
      @click.prevent="paginate(1)"
    >
      1
    </div>
    <div
      v-if="start"
      class="manager-pagination-dot"
    >
      ...
    </div>
    <div
      v-for="item in count"
      :key="item"
      class="manager-pagination-page"
      :class="{
        'manager-pagination_active': page === item,
        'manager-pagination-disabled': load
      }"
      @click.prevent="paginate(item)"
    >
      {{ item }}
    </div>
    <div
      v-if="end"
      class="manager-pagination-dot"
    >
      ...
    </div>
    <div
      v-if="totalPages > 1"
      class="manager-pagination-page"
      :class="{
        'manager-pagination_active': page === totalPages,
        'manager-pagination-disabled': load
      }"
      @click.prevent="paginate(totalPages)"
    >
      {{ totalPages }}
    </div>
    <div
      v-if="page !== totalPages"
      class="manager-pagination-next"
      :class="{'manager-pagination-disabled': load}"
      @click.prevent="paginate(page + 1)"
    />
  </div>
</template>

<script>
import eventBus from '~/eventBus'
export default {
  name: 'ManagerPagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    totalItems: {
      type: Number,
      default: 0
    },
    load: {
      type: Boolean,
      default: false
    },
    componentName: {
      type: String,
      default: 'manager'
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
    paginate (page) {
      eventBus.$emit(`${this.componentName}-pagination`, page)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-pagination {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 0 0;
}

.manager-pagination-prev,
.manager-pagination-next,
.manager-pagination-page,
.manager-pagination-dot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid $lightGrey;
    border-radius: 10px;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.manager-pagination-prev:hover,
.manager-pagination-next:hover,
.manager-pagination-page:hover {
    background-color: $defaultBlue;
}

.manager-pagination-next,
.manager-pagination-prev {
    background-image: url('~/assets/images/arrow-down.svg');
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
}

.manager-pagination-prev {
    transform: rotate(90deg);
}

.manager-pagination-next {
    margin-right: 0;
    transform: rotate(-90deg);
}

.manager-pagination-dot {
    align-items: flex-end;
    border: none;
    cursor: unset;
}

.manager-pagination_active {
    background-color: $defaultBlue;
    pointer-events: none;
}

.manager-pagination-disabled {
  pointer-events: none;
  cursor: auto;
  animation: pagshadow 500ms ease infinite alternate;
}

@keyframes pagshadow {
  0% {
    box-shadow: 0 0 0 transparent;
  }
  100% {
    box-shadow: 0 0 10px rgba($defaultBlue, 0.7);
  }
}

@media (max-width: 768px) {

    .manager-pagination {
        justify-content: center;
    }

    .manager-pagination-prev,
    .manager-pagination-next,
    .manager-pagination-page,
    .manager-pagination-dot {
        margin-bottom: 10px;
    }
}
</style>
