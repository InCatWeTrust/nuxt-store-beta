<template>
  <div class="admin-content-product-add">
    <div class="box">
      <AdminEditImages
        :error="errors.images"
        :updating="updating"
        event-name="admin-content-images"
      />
    </div>

    <div class="box">
      <span class="title">
        Артикул товара:
      </span>
      <input v-model="product.article" type="text" :disabled="updating">
      <div v-if="errors.article" class="error">
        {{ errors.article }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Наименование товара:
      </span>
      <input v-model="product.name" type="text" :disabled="updating">
      <div v-if="errors.name" class="error">
        {{ errors.name }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Описание товара:
      </span>
      <textarea
        v-model="product.description"
        :disabled="updating"
      />
      <div v-if="errors.description" class="error">
        {{ errors.description }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Категории товара:
      </span>
      <div class="categories">
        <AdminContentSelect
          v-for="category in categoriesCount"
          :key="category"
          :items="categories"
          :slug="`${category}`"
        />
      </div>
      <button @click.prevent="addCategory">
        Добавить категорию
      </button>
      <div v-if="errors.category" class="error">
        {{ errors.category }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Заголовок h1 товара:
      </span>
      <input v-model="product.h1" type="text" :disabled="updating">
      <div v-if="errors.h1" class="error">
        {{ errors.h1 }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        url товара:
      </span>
      <input v-model="product.url" type="text" :disabled="updating">
      <div v-if="errors.url" class="error">
        {{ errors.url }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        title товара:
      </span>
      <input v-model="product.title" type="text" :disabled="updating">
      <div v-if="errors.title" class="error">
        {{ errors.title }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Цена товара, ₽:
      </span>
      <input v-model.number="product.price" type="number" :disabled="updating">
      <div v-if="errors.price" class="error">
        {{ errors.price }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        По акции:
      </span>
      <select v-model="product.is_promo" :disabled="updating">
        <option :value="0">
          Нет
        </option>
        <option :value="1">
          Да
        </option>
      </select>
      <div v-if="errors.is_promo" class="error">
        {{ errors.is_promo }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Горячий товар:
      </span>
      <select v-model="product.is_hot" :disabled="updating">
        <option :value="0">
          Нет
        </option>
        <option :value="1">
          Да
        </option>
      </select>
      <div v-if="errors.is_hot" class="error">
        {{ errors.is_hot }}
      </div>
    </div>

    <div class="box">
      <span class="title">
        Новинка:
      </span>
      <select v-model="product.is_new" :disabled="updating">
        <option :value="0">
          Нет
        </option>
        <option :value="1">
          Да
        </option>
      </select>
      <div v-if="errors.is_new" class="error">
        {{ errors.is_new }}
      </div>
    </div>

    <button
      class="add-btn"
      :disabled="updating"
      @click.prevent="addProduct"
    >
      Добавить товар
    </button>
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ContentProductAdd',
  props: {
    categories: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      product: {},
      errors: {},

      updating: false,
      categoriesCount: { 1: 1 },
      categoriesPicked: {},
      categoryParams: null
    }
  },
  created () {
    eventBus.$on('admin-content-select-category', ({ slug, picked }) => {
      if (picked) {
        this.categoriesPicked[slug] = picked
      } else {
        delete this.categoriesPicked[slug]
        delete this.categoriesCount[slug]
        this.$forceUpdate()
      }
      this.categoryParams = Object.values(this.categoriesPicked).join('|')
    })
    eventBus.$on('admin-content-images', (value) => { this.product.images = value })
  },
  methods: {
    async addProduct () {
      this.errors = {}
      this.updating = true

      const formData = new FormData()

      for (let i = 0; i < this.product.images.length; i++) {
        formData.append(`files[${i}]`, this.product.images[i])
      }

      try {
        const response = await this.$axios.post(`${API_BASE_URL}/api/V2/adminsaveproduct`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            ...this.product,
            category_id: this.categoryParams || null,
            images: null
          }
        })

        return response.data
      } catch (err) {
        this.errors = err.response.data.errors
      } finally {
        this.updating = false
      }
    },
    imagesListener (event) {
      const dt = new ClipboardEvent('').clipboardData || new DataTransfer()
      const images = event.target.files

      for (const image of this.images) {
        dt.items.add(image)
      }

      for (const image of images) {
        dt.items.add(image)
      }

      const items = dt.files

      this.images = items

      this.getImgsUrl()

      this.product.images = this.images
      this.mainImg = this.imagesUrl[0]
    },
    getImgsUrl () {
      this.imagesUrl = []
      for (const img of this.images) {
        this.imagesUrl.push(URL.createObjectURL(img))
      }
    },
    addCategory () {
      const value = Math.random()
      this.categoriesCount[value] = value
      this.$forceUpdate()
    },
    pickMainImg (index) {
      const dt = new ClipboardEvent('').clipboardData || new DataTransfer()

      for (let i = 0; i < this.images.length; i++) {
        if (i === 0) {
          dt.items.add(this.images[index])
        } else if (i === index) {
          dt.items.add(this.images[0])
        } else {
          dt.items.add(this.images[i])
        }
      }

      const items = dt.files

      this.images = items

      this.getImgsUrl()

      this.product.images = this.images
      this.mainImg = this.imagesUrl[0]
    },
    deleteImg (index) {
      const dt = new ClipboardEvent('').clipboardData || new DataTransfer()

      for (let i = 0; i < this.images.length; i++) {
        if (i !== index) {
          dt.items.add(this.images[i])
        }
      }

      const items = dt.files

      this.images = items

      this.getImgsUrl()

      this.product.images = this.images
      this.mainImg = this.imagesUrl[0]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.admin-content-product-add {
  padding: 10px;
  border: 1px solid $lightGrey;

  .box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid $blue;

      &:focus {
        border-color: $successDark;
      }
    }

    textarea {
      height: 100px;
    }

    .title {
      display: inline-block;
      margin-bottom: 15px;
      font-weight: 500;
      font-size: 14px;
    }

    .error {
      font-size: 14px;
      color: $error;
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .add-btn {
    padding: 10px 25px;
    color: $white;
    background-color: $blue;
    border: 1px solid $grey;

    &:hover {
      background-color: $successDark;
    }
  }
}
</style>
