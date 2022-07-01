<template>
  <section id="favorite-products">
    <div class="container favorite-container">
      <h1 class="favorite-title">
        Избранные товары
      </h1>
      <button
        v-if="favoriteProducts.length > 0"
        class="delete-all"
        :disabled="updating || loading"
        @click.prevent="deleteAll"
      >
        <PreloadersBasePreloader
          v-if="updating"
          :size="20"
          color="#fff"
          background="#5fbcff"
        />
        Удалить всё из избранного
      </button>
      <span v-if="favoriteProducts.length <= 0">
        Не густо...
      </span>
      <div class="list">
        <PreloadersBasePreloader
          v-if="loading"
          :size="50"
          color="#ffd737"
          background="rgba(255, 255, 255, 0.7)"
        />
        <FavoriteList
          :items="products"
        />
      </div>
    </div>
    <img class="anime" src="~/assets/images/test/anime.png" alt="">
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FavoritePage',
  data () {
    return {
      loading: false,
      updating: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/id',
      userToken: 'user/token',
      favoriteProducts: 'favorite/favoriteProducts'
    }),

    products () {
      return this.favoriteProducts ? this.favoriteProducts : []
    }
  },
  methods: {
    ...mapActions({
      deleteAllProducts: 'favorite/deleteProductFromFavorite'
    }),

    async deleteAll () {
      this.loading = true
      this.updating = true

      try {
        await this.deleteAllProducts({
          id: this.userId,
          token: this.userToken,
          all: true
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
        this.updating = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#favorite-products {
  .favorite-container {
    position: relative;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .favorite-title {
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: 500;
  }

  .favorite-none {
    min-height: 0;
  }

  .delete-all {
    position: absolute;
    top: 50px;
    right: 50px;
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

  .list {
    position: relative;
  }

  .anime {
    position: sticky;
    bottom: 0;
    left: 50px;
    z-index: -1;
    width: 200px;
  }
}

@media (max-width: 768px) {
#favorite-products {
  .delete-all {
    position: relative;
    top: unset;
    right: unset;
    margin-bottom: 20px;
    font-size: 12px;
    padding: 8px 15px;
  }
}
}
</style>
