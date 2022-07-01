<template>
  <button
    v-tooltip="{ content: content }"
    class="favorite-indicator"
    :class="{'added': added}"
    :disabled="processing"
    @click.prevent="add"
  >
    <svg>
      <use xlink:href="@/assets/images/sprites.svg#favorite" />
    </svg>
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import eventBus from '~/eventBus'

export default {
  name: 'FavoriteIndicator',
  props: {
    productId: {
      type: Number,
      default: 0
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
      favoriteProductsId: 'favorite/favoriteProductsId'
    }),

    content () {
      return this.added ? 'Удалить из избранного' : 'В избранное'
    },
    added () {
      return this.favoriteProductsId.includes(this.productId)
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'favorite/addProductToFavorite',
      deleteProduct: 'favorite/deleteProductFromFavorite'
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
            title: 'Избранное',
            text: `Товар ${this.productName} был успешно удален из избранного`,
            type: 'success'
          })
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Избранное',
            text: `Товар не был удален из избранного: ${err.response.data.message}`,
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
            productId: this.productId
          })

          eventBus.$emit('notify', {
            title: 'Избранное',
            text: `Товар ${this.productName} был успешно добавлен в избранное`,
            type: 'success',
            link: '/favorite'
          })
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Избранное',
            text: `Товар не был бавлен в избранное: ${err.response.data.message}`,
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

.favorite-indicator {
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
