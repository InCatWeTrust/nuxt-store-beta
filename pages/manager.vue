<template>
  <main>
    <div class="container">
      <form v-if="!isManager" class="manager-login">
        <LoginForm
          :forgot="false"
          :bottom-info="false"
          :redirect="false"
          class="login"
        />
      </form>
      <div v-if="isManager" class="manager-container">
        <div class="manager-tabs-container">
          <ManagerTabs
            :tabs="tabs"
            :active-tab="activeTab"
          />
        </div>
        <div
          v-show="activeTab === 1"
          class="manager-filters-container"
        >
          <ManagerOrdersFilters
            :orders-load="ordersLoad"
            :statuses="statuses"
          />
        </div>
        <div
          v-show="activeTab === 1"
          class="manager-content-container"
        >
          <ManagerOrders
            :orders="orders"
            :orders-load="ordersLoad"
            :update="update"
            :statuses="statuses"
            :pagination="pagination"
            :filter-status="status"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import managerTabs from '@/helpers/manager'
import eventBus from '~/eventBus'
import { API_BASE_URL } from '~/config'

export default {
  name: 'ManagerPage',
  layout: 'manager',
  data () {
    return {
      tabs: managerTabs,
      activeTabId: 1,

      ordersData: null,
      ordersLoad: false,
      ordersLoaded: false,
      statusesData: null,
      status: null,

      update: false,

      perPage: 5,
      page: 1,
      totalPages: 1,
      totalItems: 0
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`${API_BASE_URL}/api/V2/statuses`)

      this.statusesData = response.data
    } catch (err) {
      eventBus.$emit('notify', {
        title: 'Менеджер',
        text: `Не удалось получить данные о статусах заказов: ${err.response.data.message}`,
        type: 'error',
        duration: 10000
      })
    }
  },
  computed: {
    isManager () {
      if (this.$auth.user && this.$auth.user.role >= 2) {
        return true
      } else {
        return false
      }
    },
    activeTab () {
      return this.activeTabId || 1
    },
    orders () {
      return this.ordersData ? this.ordersData : []
    },
    statuses () {
      return this.statusesData ? this.statusesData : []
    },
    pagination () {
      return {
        page: this.page,
        totalPages: this.totalPages,
        totalItems: this.totalItems,
        paginate: this.perPage
      }
    }
  },
  watch: {
    isManager () {
      if (this.isManager && !this.ordersLoaded) {
        this.loadOrders()
      }
    }
  },
  created () {
    eventBus.$on('manager-active-tab', (id) => { this.activeTabId = id })
    eventBus.$on('manager-update', (isUpdate) => { this.update = isUpdate })
    eventBus.$on('manager-update-orders', (orders) => { this.ordersData = orders })
    eventBus.$on('manager-filter-status', (status) => { this.status = status })
    eventBus.$on('manager-accept-filters', () => { this.loadOrders() })
    eventBus.$on('manager-pagination', (page) => {
      this.page = page

      this.loadOrders()
    })

    if (this.isManager) {
      this.loadOrders()
    }
  },
  methods: {
    async loadOrders () {
      this.ordersLoad = true

      try {
        const response = await this.$axios.get(`${API_BASE_URL}/api/V2/managerpanel`, {
          params: {
            page: this.page,
            paginate: this.perPage,
            statuses: this.status || null
          }
        })

        this.ordersData = response.data.data.data
        this.totalPages = response.data.data.last_page
        this.totalItems = response.data.data.total
        this.ordersLoaded = true
      } catch (err) {
        eventBus.$emit('notify', {
          title: 'Менеджер',
          text: `Не удалось получить данные о заказах: ${err.response.data.message}`,
          type: 'error',
          duration: 10000
        })
      } finally {
        this.ordersLoad = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-login {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;

  .login {
    max-width: 400px;
  }

  .form__input {
    border: 1px solid $grey;
    border-radius: 10px;
    padding-top: 10px;
    height: 50px;
    color: $black;
  }

  .form__value {
    padding: 3px 10px;
    background-color: $white;
    top: 28px;
  }

  .login__label {
    margin-bottom: 10px;
  }

  .login__button {
    margin-top: 30px;
    filter: brightness(0.8);

    &:hover {
      filter: brightness(1);
    }
  }
}

.manager-container {
  padding: 50px 0;
}

.manager-tabs-container {
  margin-bottom: 50px;
}

.manager-content-container {
  min-height: 200px;
}

.manager-filters-container {
  margin-bottom: 30px;
}
</style>
