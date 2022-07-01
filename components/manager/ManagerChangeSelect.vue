<template>
  <div class="manager-change-select">
    <select
      v-model="newValue"
      class="manager-select"
      :disabled="update"
    >
      <option value="">
        Изменить
      </option>
      <option
        v-for="value in values"
        :key="value"
        :value="value"
      >
        {{ value }}
      </option>
    </select>
    <button
      v-show="newValue && newValue != currentValue"
      :disabled="newValue == currentValue || update"
      @click.prevent="changeValue"
    >
      <PreloadersBasePreloader
        v-if="update"
        :size="20"
        color="#5fbcff"
      />
      Применить
    </button>
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ManagerChangeSelect',
  props: {
    currentValue: {
      type: String,
      default: ''
    },
    values: {
      type: Array,
      default () {
        return []
      }
    },
    update: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: Number,
      default: 0
    },
    statuses: {
      type: String,
      default: ''
    },
    pagination: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      newValue: ''
    }
  },
  methods: {
    async changeValue () {
      eventBus.$emit('manager-update', true)

      try {
        const response = await this.$axios.post(`${API_BASE_URL}/api/V2/managerupdate`, null, {
          params: {
            order_id: this.orderId,
            status: this.newValue,
            statuses: this.statuses || null,
            page: this.pagination.page || 1,
            paginate: this.pagination.paginate || 20
          }
        })

        eventBus.$emit('manager-update-orders', response.data.data.data)
      } catch (err) {
        eventBus.$emit('notify', {
          title: 'Менеджер',
          text: `Не удалось обновить: ${err.response.data.message}`,
          type: 'error',
          duration: 10000
        })
      } finally {
        eventBus.$emit('manager-update', false)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.manager-change-select {
  .manager-select {
    margin-right: 20px;
  }

  button {
    position: relative;
    overflow: hidden;
  }
}

</style>
