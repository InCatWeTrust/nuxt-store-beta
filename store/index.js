import { API_BASE_URL } from '~/config'

export const state = () => ({
  categoriesData: [],
  categoryParents: [],

  isMobile: true,

  page: 1,
  perPage: 20
})

export const mutations = {
  updateCategoriesData (state, items) {
    state.categoriesData = items
  },
  updateCategoryParents (state, items) {
    state.categoryParents = items
  },
  UPDATE_IS_MOBILE (state, payload) {
    state.isMobile = payload
  }
}

export const getters = {
  categories (state) {
    return state.categoriesData
  },
  mobile (state) {
    return state.isMobile
  }
}

export const actions = {
  loadCategoriesData (context) {
    return this.$axios.get(`${API_BASE_URL}/api/V2/header`)
      .then((res) => {
        context.commit('updateCategoriesData', res.data.data)
        return res.data.data
      })
  }
}
