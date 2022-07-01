import convert from '../helpers/filterStringConvert'

export const state = () => ({
  filtersData: [],
  filtersString: '',
  filtersStringData: ''
})

export const mutations = {
  UPDATE_FILTERS (state, items) {
    state.filtersData = items
  },
  UPDATE_FILTERS_STRING_DATA (state, { slug, checked, value }) {
    state.filtersStringData = convert(state.filtersString, {
      slug,
      checked,
      value
    })
  },
  RESET_FILTERS (state) {
    state.filtersData = []
    state.filtersString = ''
  },
  RESET_FILTERS_STRING (state) {
    state.filtersStringData = ''
    state.filtersString = ''
  },
  SYNC_FILTERS_STRING (state) {
    state.filtersString = state.filtersStringData
  }
}

export const getters = {
  filters (state) {
    return state.filtersData
  },
  filtersStr (state) {
    return state.filtersStringData
  }
}

export const actions = {

}
