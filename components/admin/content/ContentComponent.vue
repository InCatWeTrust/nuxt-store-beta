<template>
  <div>
    <AdminContentTabs
      :active-tab="activeTab"
    />
    <div class="admin-content-container">
      <AdminContentCategories
        v-show="activeTab === 1"
        :categories="categories"
        :load="categoriesLoad"
      />
      <AdminContentProductsList
        v-show="activeTab === 2"
        :products-load="productsLoad"
        :products="products"
        :pagination="pagination"
      />
      <AdminContentProductAdd
        v-show="activeTab === 3"
        :categories="allCategoriesArray"
      />
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ContentComponent',
  props: {
    productsLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      productsData: null,
      productsParams: {},
      perPage: 20,
      page: 1,
      totalPages: 1,
      totalItems: 0,

      activeTab: 1,

      categoriesData: null,
      categoriesLoad: false
    }
  },
  computed: {
    products () {
      return this.productsData ? this.productsData : []
    },
    pagination () {
      return {
        page: this.page,
        totalPages: this.totalPages,
        totalItems: this.totalItems,
        paginate: this.perPage
      }
    },
    categories () {
      return this.categoriesData ? this.categoriesData : []
    },
    allCategoriesArray () {
      const arr = []

      function getCategories (categories) {
        for (const item of categories) {
          arr.push(item)

          if (item.children && item.children.length > 0) {
            getCategories(item.children)
          }
        }
      }

      getCategories(this.categories)

      return arr
    }
  },
  created () {
    eventBus.$on('admin-content-tab', (tabId) => { this.activeTab = tabId })
    eventBus.$on('admin-products-filter-apply', (params) => {
      this.productsParams = params
      this.page = 1
      this.loadProducts()
    })
    eventBus.$on('admin-products-pagination', (page) => {
      this.page = page

      this.loadProducts()
    })
    eventBus.$on('admin-update-products', (prod) => {
      const newArr = this.productsData.map((item) => {
        if (item.id === prod.id) {
          return Object.assign({}, prod)
        }

        return item
      })

      this.productsData = newArr
    })
    eventBus.$on('admin-content-delete-product', () => { this.loadProducts() })
    eventBus.$on('admin-content-update-prop', ({ productId, prop }) => {
      for (const product of this.productsData) {
        if (product.id === productId) {
          const newProps = []

          for (const item of product.props) {
            let newItem = Object.assign({}, item)

            if (item.id === prop.id) {
              newItem = Object.assign({}, prop)
            }

            newProps.push(newItem)
          }

          product.props = newProps

          break
        }
      }
    })
    eventBus.$on('admin-content-delete-prop', ({ productId, prop }) => {
      for (const product of this.productsData) {
        if (product.id === productId) {
          const newProps = []

          for (const item of product.props) {
            const newItem = Object.assign({}, item)

            if (item.id !== prop) {
              newProps.push(newItem)
            }
          }

          product.props = newProps

          break
        }
      }
    })
    eventBus.$on('admin-content-add-prop', ({ productId, prop }) => {
      for (const product of this.productsData) {
        if (product.id === productId) {
          const newProps = [...product.props, prop]

          product.props = newProps

          break
        }
      }
    })

    this.loadCategories()
    this.loadProducts()
  },
  methods: {
    async loadProducts () {
      this.productsData = []
      eventBus.$emit('admin-products-load', true)

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/receive`, {
          params: {
            ...this.productsParams,
            page: this.page,
            paginate: this.perPage
          }
        })

        this.totalPages = response.data.product.last_page
        this.totalItems = response.data.product.total
        this.productsData = response.data.product.data
      } finally {
        eventBus.$emit('admin-products-load', false)
      }
    },
    async loadCategories () {
      this.categoriesData = []
      this.categoriesLoad = true

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/adminsubcategories`)

        this.categoriesData = response.data

        return response.data
      } catch (err) {
        console.log(err.response.data)
      } finally {
        this.categoriesLoad = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';
</style>
