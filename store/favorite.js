import { API_BASE_URL } from '~/config'

export const state = () => ({
  favoriteProductsData: []
})

export const mutations = {
  updateFavoriteProductsData (state, items) {
    state.favoriteProductsData = items
  },
  favoriteReset (state) {
    state.favoriteProductsData = []
  }
}

export const actions = {
  async loadFavorite (context, { id, token }) {
    const response = await this.$axios.get(`${API_BASE_URL}/api/V2/favourite`, {
      params: {
        id,
        token
      }
    })

    context.commit('updateFavoriteProductsData', response.data.catalog || [])

    return response.data.catalog || []
  },
  async addProductToFavorite (context, { id, token, productId, categoryId }) {
    const response = await this.$axios.post(`${API_BASE_URL}/api/V2/favouritesave`, null, {
      params: {
        id,
        token,
        product_id: productId
      }
    })

    context.commit('updateFavoriteProductsData', response.data.catalog || [])

    return response.data.catalog || []
  },
  async deleteProductFromFavorite (context, { id, token, productId, all = false }) {
    const response = await this.$axios.post(`${API_BASE_URL}/api/V2/favouritedel`, null, {
      params: {
        id,
        token,
        product_id: all ? null : productId,
        all: all ? true : null
      }
    })

    context.commit('updateFavoriteProductsData', response.data.catalog || [])

    return response.data.catalog || []
  }
}

export const getters = {
  favoriteProducts (state) {
    return state.favoriteProductsData
  },
  favoriteProductsAmount (state) {
    return state.favoriteProductsData.length
  },
  favoriteProductsId (state) {
    return state.favoriteProductsData.map(item => item.id)
  }
}
