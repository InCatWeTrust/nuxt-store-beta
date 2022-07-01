<template>
  <div class="admin-content-product">
    <div class="container">
      <div
        class="title-block"
        @click.stop="togglePopup"
      >
        <span>
          {{ product.article }}
          -
          {{ product.name }}
        </span>
        <button
          v-show="productEdited"
          class="button update"
          :disabled="updating"
          @click.stop="updateProduct"
        >
          Сохранить
        </button>
        <button
          class="button delete"
          :disabled="updating"
          @click.stop="deleteProduct"
        >
          Удалить
        </button>
      </div>

      <div
        v-show="popupOpen"
        class="popup"
      >
        <div
          class="main-img"
          :class="{
            'edited': mainImg
          }"
        >
          <span class="title">
            Главная картинка:
          </span>
          <input
            id="main-img-edit"
            type="file"
            @change="mainImgListener"
          >
          <label for="main-img-edit">
            <img
              :src="mainImgUrl || product.image"
              alt="главная"
            >
          </label>
        </div>

        <div
          class="name"
          :class="{
            'edited': productDataEdit.name !== product.name
          }"
        >
          <span class="title">
            Наименование товара:
          </span>
          <input v-model="productDataEdit.name" type="text" :disabled="updating">
        </div>

        <div
          class="description"
          :class="{
            'edited': productDataEdit.description !== product.description
          }"
        >
          <span class="title">
            Описание товара:
          </span>
          <textarea
            v-model="productDataEdit.description"
            :disabled="updating"
          />
        </div>

        <div
          class="h1-title"
          :class="{
            'edited': productDataEdit.h1 !== product.h1
          }"
        >
          <span class="title">
            Заголовок h1 товара:
          </span>
          <input v-model="productDataEdit.h1" type="text" :disabled="updating">
        </div>

        <div
          class="url"
          :class="{
            'edited': productDataEdit.url !== product.url
          }"
        >
          <span class="title">
            url товара:
          </span>
          <input v-model="productDataEdit.url" type="text" :disabled="updating">
        </div>

        <div
          class="top-title"
          :class="{
            'edited': productDataEdit.title !== product.title
          }"
        >
          <span class="title">
            title товара:
          </span>
          <input v-model="productDataEdit.title" type="text" :disabled="updating">
        </div>

        <div
          class="price"
          :class="{
            'edited': productDataEdit.price !== product.price
          }"
        >
          <span class="title">
            Цена товара, ₽:
          </span>
          <input v-model.number="productDataEdit.price" type="text" :disabled="updating">
        </div>

        <div
          class="is-promo"
          :class="{
            'edited': +productDataEdit.is_promo !== +product.is_promo
          }"
        >
          <span class="title">
            По акции:
          </span>
          <select v-model="productDataEdit.is_promo" :disabled="updating">
            <option :value="+product.is_promo">
              {{ +product.is_promo ? 'Да' : 'Нет' }}
            </option>
            <option :value="+!product.is_promo">
              {{ +!product.is_promo ? 'Да' : 'Нет' }}
            </option>
          </select>
        </div>

        <div
          class="is-hot"
          :class="{
            'edited': +productDataEdit.is_hot !== +product.is_hot
          }"
        >
          <span class="title">
            Горячий товар:
          </span>
          <select v-model="productDataEdit.is_hot" :disabled="updating">
            <option :value="+product.is_hot">
              {{ +product.is_hot ? 'Да' : 'Нет' }}
            </option>
            <option :value="+!product.is_hot">
              {{ +!product.is_hot ? 'Да' : 'Нет' }}
            </option>
          </select>
        </div>

        <div
          class="is-new"
          :class="{
            'edited': +productDataEdit.is_new !== +product.is_new
          }"
        >
          <span class="title">
            Новинка:
          </span>
          <select v-model="productDataEdit.is_new" :disabled="updating">
            <option :value="+product.is_new">
              {{ +product.is_new ? 'Да' : 'Нет' }}
            </option>
            <option :value="+!product.is_new">
              {{ +!product.is_new ? 'Да' : 'Нет' }}
            </option>
          </select>
        </div>
        <AdminContentPropsList
          :items="product.props"
          :updating="updating"
          :product-id="product.id"
          :product-name="product.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '~/config'
import eventBus from '~/eventBus'

export default {
  name: 'ContentProductsItem',
  props: {
    productData: {
      type: Object,
      default () {
        return {}
      }
    },
    productsLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      productDataEdit: null,
      productImage: null,
      popupOpen: false,
      mainImg: null,
      mainImgUrl: null,

      updating: false
    }
  },
  computed: {
    product () {
      return {
        ...this.productData,
        price: Number(String(this.productData.price).replace(' ', '')),
        image: this.productData.image && require(`~/assets${this.productData.image}`)
      }
    },
    productEdited () {
      let edited = false

      for (const key in this.productDataEdit) {
        if (this.productDataEdit[key] !== this.product[key]) {
          edited = true
          break
        }
      }

      return edited
    },
    params () {
      const params = {
        product_id: this.product.id
      }

      for (const key in this.productDataEdit) {
        if (this.productDataEdit[key] !== this.product[key]) {
          params[key] = this.productDataEdit[key]
        }
      }

      return params
    }
  },
  watch: {
    product () {
      this.productDataEdit = Object.assign({}, this.product)
    }
  },
  created () {
    eventBus.$on('admin-props-edit-updating', (isUpdating) => { this.updating = isUpdating })

    this.productDataEdit = Object.assign({}, this.product)
    this.productImage = this.productData.image
  },
  methods: {
    togglePopup () {
      this.popupOpen = !this.popupOpen
    },
    async deleteProduct () {
      if (confirm(`Вы уверены, что хотите удалить товар: ${this.product.name}`)) {
        this.updating = true

        try {
          const response = await this.$axios.post(`${API_BASE_URL}/api/V2/deleteproduct`, null, {
            params: {
              product_id: this.product.id
            }
          })

          eventBus.$emit('admin-content-delete-product')

          return response.data
        } finally {
          this.updating = false
        }
      }
    },
    async updateProduct () {
      if (confirm(`Внести изменения в ${this.product.name}?`)) {
        this.updating = true

        try {
          const response = await this.$axios.post(`${API_BASE_URL}/api/V2/updateproduct`, null, {
            params: this.params
          })

          if (response.data && response.data.product) {
            eventBus.$emit('admin-update-products', { ...this.productDataEdit, image: this.productImage })
            eventBus.$emit('notify', {
              title: 'Редактирование товара',
              text: `Товар ${this.product.article} успешно изменён`,
              type: 'success',
              delay: 5000
            })
          }

          return response.data
        } catch (err) {
          eventBus.$emit('notify', {
            title: 'Редактирование товара',
            text: `ошибка - ${err.response.data}`,
            type: 'error',
            delay: 5000
          })
        } finally {
          this.updating = false
        }
      }
    },
    mainImgListener (event) {
      this.mainImg = event.target.files[0]

      if (this.mainImg) {
        this.mainImgUrl = URL.createObjectURL(this.mainImg)
        this.productDataEdit.image = this.mainImg
      } else {
        this.mainImgUrl = null
        this.productDataEdit.image = this.product.image
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/css/_variables.scss";

.admin-content-product {
  border: 1px solid $grey;

  .container {
    padding: 0;
  }

  .title-block {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background-color: $lightGrey;
    }

    span {
      margin-right: auto;
    }

    .button {
      padding: 5px 15px;
      font-size: 14px;
      border-radius: 10px;
      color: $white;

      &.update {
        margin-right: 10px;
        border: 1px solid $successDark;
        background-color: $successDark;

        &:hover {
          background-color: $blue;
        }
      }

      &.delete {
        border: 1px solid $error;
        background-color: $error;

        &:hover {
          background-color: $black;
        }
      }

    }
  }

  .popup {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    border-top: 1px dashed $black;

    div {
      &.edited {
        input,
        textarea,
        select {
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

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid $blue;

      &:hover,
      &:focus {
        background-color: rgba($defaultBlue, 0.3);
      }
    }

    textarea {
      height: 100px;
    }

    .title,
    .main-img,
    .name,
    .description,
    .h1-title,
    .url,
    .top-title,
    .price,
    .is-promo,
    .is-hot,
    .is-new {
      margin-bottom: 10px;
    }

    .is-promo,
    .is-hot,
    .is-new {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .title {
      position: relative;
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 10px;
      font-weight: 500;
      font-size: 14px;
    }

    .main-img {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      img {
        width: 220px;
        height: 220px;
        object-fit: contain;
      }

      input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        visibility: hidden;
      }

      label {
        position: relative;
        cursor: pointer;

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid $grey;
          background-color: rgba($grey, 0.3);
          opacity: 0;
        }

        &::after {
          content: '+';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          font-size: 26px;
          font-weight: 300;
          border: 1px solid $white;
          border-radius: 50%;
          color: $purple;
          background-color: rgba($white, 0.3);
          opacity: 0;
        }

        &:hover::before,
        &:hover::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
