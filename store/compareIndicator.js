import { API_BASE_URL } from '~/config'

export const state = () => ({
  compareProductsData: []
})

export const mutations = {
  updateCompareProductsData (state, items) {
    state.compareProductsData = items
  },
  compareReset (state) {
    state.compareProductsData = []
  }
}

export const actions = {
  async loadCompare (context, { id, token }) {
    const response = await this.$axios.get(`${API_BASE_URL}/api/V2/comparisonget`, {
      params: {
        id,
        token
      }
    })

    context.commit('updateCompareProductsData', response.data.product_id)

    return response.data.product_id
  },
  async addProductToCompare (context, { id, token, productId, categoryId }) {
    const response = await this.$axios.post(`${API_BASE_URL}/api/V2/comparisonsave`, null, {
      params: {
        id,
        token,
        product_id: productId,
        category_id: categoryId || null
      }
    })

    context.commit('updateCompareProductsData', response.data.product_id)

    return response.data.product_id
  },
  async deleteProductFromCompare (context, { id, token, productId }) {
    const response = await this.$axios.post(`${API_BASE_URL}/api/V2/comparisondelone`, null, {
      params: {
        id,
        token,
        product_id: productId
      }
    })

    context.commit('updateCompareProductsData', response.data.product_id)

    return response.data.product_id
  }
}

export const getters = {
  compareProducts (state) {
    return state.compareProductsData
  }
}
