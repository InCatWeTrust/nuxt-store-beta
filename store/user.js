export const state = () => ({
  userId: null,
  userToken: null
})

export const mutations = {
  updateUserToken (state, userToken) {
    state.userToken = userToken
  },
  updateUserId (state, userId) {
    state.userId = userId
  }
}

export const getters = {
  id (state) {
    return state.userId
  },
  token (state) {
    return state.userToken
  }
}
