<template>
  <div class="admin-signle-category">
    <div class="btns">
      <button
        v-if="edited"
        class="save-btn"
      >
        Сохранить
      </button>
      <button
        class="delete-btn"
      >
        Удалить
      </button>
    </div>
    <AdminEditImage
      :image="item.image"
      :event-name="imgEditEventName"
      class="edit-block"
    />
    <AdminEditText
      v-model="itemDataEdited.name"
      :item="item.name"
      title="Наименование категории:"
      class="edit-block"
    />
    <AdminEditTextarea
      v-model="itemDataEdited.description"
      :item="item.description"
      title="Описание:"
      class="edit-block"
    />
    <AdminEditText
      v-model="itemDataEdited.h1"
      :item="item.h1"
      title="Заголовок h1:"
      class="edit-block"
    />
    <AdminEditTextarea
      v-model="itemDataEdited.title"
      :item="item.title"
      title="Title:"
      class="edit-block"
    />
    <AdminEditText
      v-model="itemDataEdited.slug"
      :item="item.slug"
      title="Slug (ID) категории:"
      class="edit-block"
    />
  </div>
</template>

<script>
import eventBus from '~/eventBus'
export default {
  name: 'ContentCategoriesSingleCategory',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      itemDataEdited: {},
      updating: false
    }
  },
  computed: {
    imgEditEventName () {
      return this.item.name + '-image-edit'
    },
    edited () {
      // Сравнивает ключи и значения в исходном объекте и измененном
      // если хоть один ключ не совпадает возвращает true
      for (const key in this.itemDataEdited) {
        if (this.itemDataEdited[key] !== this.item[key]) {
          return true
        }
      }

      return false
    },
    params () {
      // Формирует объект с параметрами для отправки запроса update категории
      // сравнивает ключи и значения в измененном объекте и начальном объекте
      // если значения не совпадают записывает ключ в объект params
      const params = {
        category_id: this.item.id
      }

      for (const key in this.itemDataEdited) {
        if (this.itemDataEdited[key] !== this.item[key]) {
          params[key] = this.itemDataEdited[key]
        }
      }

      return params
    }
  },
  created () {
    eventBus.$on(`${this.imgEditEventName}`, (value) => { this.itemDataEdited.image = value })

    this.itemDataEdited = { ...this.item }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';
.admin-signle-category {
  position: relative;

  .edit-block {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .btns {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;

    .save-btn {
      position: relative;
      padding: 5px 15px;
      margin-right: 20px;
      color: $white;
      background-color: $successDark;
      border: 1px solid $grey;
      border-radius: 5px;

      &:hover {
        background-color: rgba($successDark, 0.7);
      }
    }

    .delete-btn {
      position: relative;
      padding: 5px 15px;
      color: $white;
      background-color: $error;
      border: 1px solid $grey;
      border-radius: 5px;

      &:hover {
        background-color: rgba($error, 0.7);
      }
    }
  }
}
</style>
