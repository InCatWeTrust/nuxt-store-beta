<template>
  <main>
    <div class="container">
      <form v-if="!isAdmin" class="admin-login">
        <LoginForm
          :forgot="false"
          :bottom-info="false"
          :redirect="false"
          class="login"
        />
      </form>
      <div v-if="isAdmin" class="admin-container">
        <AdminTabs
          :active-tab="activeTab"
        />
        <AdminContentComponent
          v-if="activeTab === 1"
          :products-load="productsLoad"
        />
      </div>
    </div>
  </main>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'AdminPage',
  layout: 'admin',
  data () {
    return {
      activeTabId: 1,
      productsLoad: false
    }
  },
  computed: {
    isAdmin () {
      if (this.$auth.user && this.$auth.user.role >= 3) {
        return true
      } else {
        return false
      }
    },
    activeTab () {
      return this.activeTabId || 1
    }
  },
  created () {
    eventBus.$on('admin-tab', (tabId) => { this.activeTabId = tabId })
    eventBus.$on('admin-products-load', (isLoad) => { this.productsLoad = isLoad })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-login {
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

.admin-container {
  padding: 50px 0;
}
</style>
