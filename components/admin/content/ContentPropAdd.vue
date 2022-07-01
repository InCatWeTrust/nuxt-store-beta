<template>
  <div class="admin-content-prop-add">
    <span class="top-title">
      Добавить характеристику
    </span>
    <div
      class="prop-add-box"
    >
      <span class="title">
        Название характеристики:
      </span>
      <input v-model="propData.name" type="text" :disabled="updating">
    </div>
    <div
      class="prop-add-box"
    >
      <span class="title">
        Значение характеристики:
      </span>
      <input v-model="propData.value" type="text" :disabled="updating">
    </div>
    <div
      class="prop-add-box"
    >
      <span class="title">
        Единица измерения характеристики, если есть (м, см, кг...):
      </span>
      <input v-model="propData.unit" type="text" :disabled="updating">
    </div>
    <div
      class="prop-add-box"
    >
      <span class="title">
        ID характеристики (diametr, dlina, shirina...):
      </span>
      <input v-model="propData.slug" type="text" :disabled="updating">
    </div>
    <button
      class="add-btn"
      @click.prevent="addProp"
    >
      Добавить характеристику
    </button>
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ContentPropAdd',
  props: {
    updating: {
      type: Boolean,
      default: false
    },
    productName: {
      type: String,
      default: ''
    },
    productId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      propData: {}
    }
  },
  methods: {
    async addProp () {
      if (confirm(`Добавить характеристику товару ${this.productName}`)) {
        eventBus.$emit('admin-props-edit-updating', true)

        try {
          const response = await this.$axios.post(`${API_BASE_URL}/api/V2/adminsaveprops`, null, {
            params: {
              ...this.propData,
              product_id: this.productId
            }
          })

          eventBus.$emit('admin-content-add-prop', { productId: this.productId, prop: response.data.prop })

          eventBus.$emit('notify', {
            title: 'Добавление характеристики товара',
            text: `характеристика ${response.data.prop.name} успешно добавлена`,
            type: 'success',
            delay: 5000
          })

          return response.data
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Добавление характеристики товара',
            text: `ошибка - ${err.response.data.message}`,
            type: 'error',
            delay: 5000
          })
        } finally {
          eventBus.$emit('admin-props-edit-updating', false)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-prop-add {
  position: relative;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid $darkGrey;
  background-color: $defaultBlue;

  .add-btn {
    padding: 10px 25px;
    font-size: 14px;
    border: 1px solid $purple;
    border-radius: 5px;
    background-color: $purple;
    color: $white;

    &:hover {
      background-color: $lightPurple;
    }
  }

  .top-title {
    display: inline-block;
    margin-bottom: 20px !important;
    font-weight: 500;
  }

  .prop-add-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:last-child {
      margin-bottom: 30px;
    }

    .title {
      position: relative;
      margin-right: 10px;
      font-weight: 500;
      font-size: 14px;
    }

    input {
      margin-bottom: 10px;
      padding: 5px;

      &:hover,
      &:focus {
        background-color: $warmYellow;
      }
    }
  }
}
</style>
