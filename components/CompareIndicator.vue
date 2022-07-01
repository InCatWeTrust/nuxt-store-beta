<template>
  <button
    v-tooltip="{ content: content }"
    class="compare-indicator"
    :class="{'added': added}"
    :disabled="processing"
    @click.prevent="add"
  >
    <svg>
      <use xlink:href="@/assets/images/sprites.svg#compare" />
    </svg>
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import eventBus from '~/eventBus'

export default {
  name: 'CompareIndicator',
  props: {
    productId: {
      type: Number,
      default: 0
    },
    categoryName: {
      type: String,
      default: ''
    },
    productName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      processing: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/id',
      userToken: 'user/token',
      compareProducts: 'compareIndicator/compareProducts'
    }),

    added () {
      return this.compareProducts.includes(this.productId)
    },
    content () {
      return this.added ? 'Удалить из сравнения' : 'В сравнение'
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'compareIndicator/addProductToCompare',
      deleteProduct: 'compareIndicator/deleteProductFromCompare'
    }),

    async add () {
      if (this.added) {
        this.processing = true

        try {
          await this.deleteProduct({
            id: this.userId,
            token: this.userToken,
            productId: this.productId
          })

          eventBus.$emit('notify', {
            title: 'Сравнение',
            text: `Товар ${this.productName} успешно удален из сравнения`,
            type: 'success'
          })
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Сравнение',
            text: `Не удалось удалить товар ${this.productName} из сравнения: ${err.response.data.message}`,
            type: 'error'
          })
        } finally {
          this.processing = false
        }
      } else {
        this.processing = true

        try {
          await this.addProduct({
            id: this.userId,
            token: this.userToken,
            productId: this.productId,
            categoryId: this.categoryName || null
          })

          eventBus.$emit('notify', {
            title: 'Сравнение',
            text: `Товар ${this.productName} успешно добавлен в сравнение`,
            type: 'success',
            link: '/compare'
          })
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Сравнение',
            text: `Не удалось добавить товар ${this.productName} в сравнение: ${err.response.data.message}`,
            type: 'error'
          })
        } finally {
          this.processing = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.compare-indicator {
  border: none;
  background-color: transparent;
  margin: 0 5px;

  &:disabled {
    background: transparent;
    cursor: auto;
  }

  &:hover {
    svg {
      fill: $black;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    fill: $almostBlack;
    transition-property: fill;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }
}
</style>
