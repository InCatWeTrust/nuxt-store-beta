<template>
  <div class="admin-content-props-item">
    <div class="buttons">
      <button
        v-show="propEdited"
        class="apply"
        :disabled="updating"
        @click.prevent="updateProp"
      >
        Сохранить характеристику
      </button>
      <button
        class="delete"
        :disabled="updating"
        @click.prevent="deleteProp"
      >
        Удалить
      </button>
    </div>
    <div
      class="box"
      :class="{
        'edited': propDataEdit.name !== prop.name
      }"
    >
      <span class="title">
        Название характеристики:
      </span>
      <input v-model="propDataEdit.name" type="text" :disabled="updating">
    </div>
    <div
      class="box"
      :class="{
        'edited': propDataEdit.value !== prop.value
      }"
    >
      <span class="title">
        Значение характеристики:
      </span>
      <input v-model="propDataEdit.value" type="text" :disabled="updating">
    </div>
    <div
      v-if="prop.unit"
      class="box"
      :class="{
        'edited': propDataEdit.unit !== prop.unit
      }"
    >
      <span class="title">
        Единица измерения характеристики:
      </span>
      <input v-model="propDataEdit.unit" type="text" :disabled="updating">
    </div>
    <div
      class="box"
      :class="{
        'edited': propDataEdit.slug !== prop.slug
      }"
    >
      <span class="title">
        ID характеристики:
      </span>
      <input v-model="propDataEdit.slug" type="text" :disabled="updating">
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ContentPropsItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    updating: {
      type: Boolean,
      default: false
    },
    productId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      propDataEdit: null
    }
  },
  computed: {
    prop () {
      return this.item
    },
    propEdited () {
      let edited = false

      for (const key in this.propDataEdit) {
        if (this.propDataEdit[key] !== this.prop[key]) {
          edited = true
          break
        }
      }

      return edited
    },
    params () {
      const params = {
        props_id: this.prop.id
      }

      for (const key in this.propDataEdit) {
        if (this.propDataEdit[key] !== this.prop[key]) {
          params[key] = this.propDataEdit[key]
        }
      }

      return params
    }
  },
  watch: {
    prop () {
      this.propDataEdit = Object.assign({}, this.prop)
    }
  },
  created () {
    this.propDataEdit = Object.assign({}, this.prop)
  },
  methods: {
    async deleteProp () {
      if (confirm(`Вы уверены, что хотите удалить характеристику: ${this.prop.name}`)) {
        eventBus.$emit('admin-props-edit-updating', true)

        try {
          const response = await this.$axios.post(`${API_BASE_URL}/api/V2/deleteprop`, null, {
            params: {
              product_id: this.productId,
              prop_id: this.prop.id
            }
          })

          eventBus.$emit('admin-content-delete-prop', { productId: this.productId, prop: this.prop.id })

          eventBus.$emit('notify', {
            title: 'Удаление характеристики товара',
            text: `характеристика ${this.prop.name} успешно удалена`,
            type: 'success',
            delay: 5000
          })

          return response.data
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Удаление характеристики товара',
            text: `ошибка - ${err.response.data.message}`,
            type: 'error',
            delay: 5000
          })
        } finally {
          eventBus.$emit('admin-props-edit-updating', false)
        }
      }
    },
    async updateProp () {
      if (confirm(`Внести изменения в ${this.prop.name}?`)) {
        eventBus.$emit('admin-props-edit-updating', true)

        try {
          const response = await this.$axios.post(`${API_BASE_URL}/api/V2/updateprops`, null, {
            params: this.params
          })

          eventBus.$emit('notify', {
            title: 'Редактирование характеристики товара',
            text: `Характеристика ${this.prop.name} успешно изменена`,
            type: 'success',
            delay: 5000
          })

          eventBus.$emit('admin-content-update-prop', { productId: this.productId, prop: this.propDataEdit })

          return response.data
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Редактирование характеристики товара',
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

.admin-content-props-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 10px;
  border: 1px solid $grey;
  background-color: rgba($purple, 0.3);

  .buttons {
    position: absolute;
    top: 10px;
    right: 10px;

    button {
      padding: 5px 15px;
      font-size: 14px;
      border-radius: 10px;
      color: #fff;
    }

    .apply {
      margin-right: 10px;
      border-radius: 10px;
      color: #fff;
      border: 1px solid $successDark;
      background-color: $successDark;

      &:hover {
        background-color: $blue;
      }
    }

    .delete {
      border: 1px solid $error;
      background-color: $error;

      &:hover {
        background-color: $black;
      }
    }
  }

  .box {
    .title {
      position: relative;
      margin-right: 10px;
      font-weight: 500;
      font-size: 14px;
    }

    input {
      margin-bottom: 10px;
      padding: 5px;
    }

    &.edited {
      input {
        background-color: rgba($warmYellow, 0.7) !important;
      }

      .title {
        &::after {
          content: 'Изменено';
          position: absolute;
          top: 0;
          right: -90px;
          padding: 2px 5px;
          font-size: 14px;
          background-color: $error;
          color: $white;
        }
      }
    }
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
