import { API_BASE_URL } from '~/config'

export const state = () => ({
  cartProducts: [],
  cartProductsData: []
})

export const mutations = {
  updateCartProductsData (state, items) {
    state.cartProductsData = items
  },
  cartReset (state) {
    state.cartProducts = []
    state.cartProductsData = []
  },
  updateCartProductAmount (state, { productId, amount }) {
    const item = state.cartProducts.find(product => product.productId === productId)
    let productAmount = amount

    if (productAmount <= 0 || typeof productAmount !== 'number') {
      productAmount = 1
    }

    if (item) {
      item.quantity = productAmount
    }
  },
  syncCartProducts (state) {
    state.cartProducts = state.cartProductsData.map((item) => {
      return {
        productId: +item.product.id,
        quantity: +item.quantity
      }
    })
  },
  deleteCartProduct (state, productId) {
    state.cartProducts = state.cartProducts.filter(product => product.productId !== productId)
  },
  deleteCartProductAll (state) {
    state.cartProducts = []
  }
}

export const actions = {
  async loadCart (context, { id, token }) {
    const response = await this.$axios.get(`${API_BASE_URL}/api/V2/carts`, {
      params: {
        id,
        token
      }
    })

    context.commit('updateCartProductsData', response.data.data)
    context.commit('syncCartProducts')
  },
  async addProductToCart (context, { id, token, productId, quantity }) {
    const response = await this.$axios.post(`${API_BASE_URL}/api/V2/cart`, null, {
      params: {
        id,
        token,
        product_id: productId,
        quantity
      }
    })

    context.commit('updateCartProductsData', response.data.data)
    context.commit('syncCartProducts')
  },
  updateCartProductAmount (context, { productId, amount, token, id }) {
    clearTimeout(this.updateTimer)

    context.commit('updateCartProductAmount', { productId, amount })

    return (new Promise((resolve) => {
      this.updateTimer = setTimeout(resolve, 300)
    }))
      .then(() => {
        if (amount < 1) {
          return false
        }

        return this.$axios.post(`${API_BASE_URL}/api/V2/cart/update`, null, {
          params: {
            product_id: productId,
            quantity: amount,
            id,
            token
          }
        })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.data)

            return response.status
          })
          .catch((err) => {
            context.commit('syncCartProducts')
            return err
          })
      })
  },
  async deleteCartProduct (context, { productId, id, token }) {
    context.commit('deleteCartProduct', productId)

    try {
      const response = await this.$axios.post(`${API_BASE_URL}/api/V2/delete`, null, {
        params: {
          product_id: productId,
          id,
          token
        }
      })

      context.commit('updateCartProductsData', response.data.data)
    } catch (err) {
      context.commit('syncCartProducts')
      return err.response.status
    }
  },
  async deleteCartProductAll (context, { id, token }) {
    context.commit('deleteCartProductAll')

    try {
      const response = await this.$axios.post(`${API_BASE_URL}/api/V2/delete`, null, {
        params: {
          all: true,
          id,
          token
        }
      })

      context.commit('updateCartProductsData', response.data.data)
    } catch (err) {
      context.commit('syncCartProducts')
      return err.response.status
    }
  }
}

export const getters = {
  cartDetailProducts (state) {
    return state.cartProducts.map((item) => {
      const { product } = state.cartProductsData.find(prod => prod.product.id === item.productId)

      return {
        ...item,
        product
      }
    })
  },
  cartTotalPrice (state, getters) {
    return getters.cartDetailProducts.reduce((acc, item) => {
      return +item.product.price * item.quantity + acc
    }, 0)
  },
  cartTotalAmount (state, getters) {
    return getters.cartDetailProducts.length
  }
}
