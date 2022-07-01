<template>
  <li
    class="products__item"
    :class="gridClass"
  >
    <div class="products__item-card">
      <div class="products__card-top">
        <span class="products__card-article">Артикул: {{ product.article }}</span>
        <div class="products__card-top-btns">
          <CompareIndicator
            :product-id="product.id"
            :category-name="categoryName || null"
            :product-name="product.name"
          />
          <FavoriteIndicator
            :product-id="product.id"
            :product-name="product.name"
          />
        </div>
      </div>
      <div class="products__card-bottom">
        <div class="products__card-product">
          <NuxtLink
            :to="`/product/${product.url}`"
            class="products__card-product-link"
          >
            <GallerySwiper
              :images="product.images"
            />
          </NuxtLink>
          <div class="products__card-about">
            <NuxtLink
              :to="`/product/${product.url}`"
              class="products__card-name"
              :class="{'lines-3': grid === 'square'}"
            >
              {{ product.name }}
            </NuxtLink>
            <AvailableComponent />
            <div class="products__card-services">
              <span class="products__card-services-title">Возможные услуги:</span>
              <ul class="products__card-services-list">
                <li class="products__card-services-item">
                  - Распил металла
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="products__card-buy">
          <CartBuyComponent
            :product-id="product.id"
            :product-name="product.name"
            :price="+product.price"
          />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ProductsListItem',
  props: {
    grid: {
      type: String,
      default: 'land'
    },
    product: {
      type: Object,
      default () {
        return {}
      }
    },
    categoryName: {
      type: String,
      default: ''
    }
  },
  computed: {
    gridClass () {
      return `products__${this.grid}`
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.products__item {
    padding: 5px 7px 14px 7px;
}

.products__land {
    flex: 0 0 100%;
}

.products__square {
    flex: 0 0 25%;
}

.products__item-card {
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 10px $shadow;
    background-color: $white;
}

.products__card-top {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid $lightGrey;
}

.products__card-article {
    margin-right: auto;
    font-size: 10px;
    color: $grey;
}

.products__card-top-btns {
    display: flex;

    svg {
      width: 15px;
      height: 15px;
    }
}

.products__square {
  .products__card-product {
    margin-bottom: auto;
  }

  .products__card-product-link {
    display: inline-block;
    position: relative;
    height: 220px;
  }

  .products__item-card {
    height: 610px;
  }

  .products__card-bottom {
    height: 100%;
  }

  .products__card-about {
    height: 115px;
    overflow: hidden;
  }

  .products__card-name {
    overflow: hidden;
  }
}

.products__land {
  .section-buy {
    min-height: 250px;
  }
}

// .products__land {
//   button:not(:last-child) {
//     margin-right: 25px;
//   }
// }

// .products__square {
//   button:not(:last-child) {
//     margin-right: 5px;
//   }
// }

.products__card-bottom {
    display: flex;
}

.products__land .products__card-bottom {
    flex-direction: row;
}

.products__square .products__card-bottom {
    flex-direction: column;
}

.products__card-product {
    display: flex;
    align-items: center;
}

.products__land .products__card-product {
    width: 70%;
    flex-direction: row;
    padding-left: 15px;
    border-right: 1px solid $lightGrey;
}

.products__square .products__card-product {
    width: 100%;
    flex-direction: column;
    border-bottom: 1px solid $lightGrey;
}

.products__card-product-link {
    display: flex;
    align-items: center;
}

.products__land .products__card-product-link {
    width: 200px;
    height: 200px;
}

.products__square .products__card-product-link {
    width: 200px;
    padding: 15px;
}

.products__card-img {
    width: 100%;
}

.products__land .products__card-about {
    width: 80%;
    padding: 30px;
}

.products__square .products__card-about {
    width: 100%;
    padding: 15px;
}

.products__land .products__card-buy {
    width: 30%;
}

.products__square .products__card-buy {
    width: 100%;
}

.products__card-name {
    display: block;
    margin-bottom: 15px;
    font-weight: 500;
}

.products__land .products__card-services {
    display: block;
}

.products__square .products__card-services {
    display: none;
}

.products__card-services-list {
    display: flex;
    flex-direction: column;
}

.products__card-services-title {
    display: block;
    margin-bottom: 10px;
    font-weight: 300;
}

.products__card-services-item {
    padding-left: 10px;
    font-weight: 500;
    color: $lightPurple;
}

.products__card-buy .section-buy__one-click,
.products__card-buy .section-buy__additional {
    display: none;
}

.products__card-buy .section-buy {
    height: 100%;
    box-shadow: none;
    border: none;
}

.products__card-buy .section-buy__old-price {
    font-size: 18px;
    font-weight: 400;
    color: $lightGreyText;
}

.products__card-buy .section-buy__price {
    padding-bottom: 20px;
    margin-bottom: auto;
    font-size: 22px;
}

.products__card-buy .amount-select {
    align-items: unset;
    flex-wrap: wrap;
    justify-content: space-between;
}

.products__card-buy .amount-select-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    height: 35px;
    font-size: 16px;
    font-weight: 500;
    background-color: transparent;
    border: none;
}

.products__card-buy .amount-input {
    width: 65%;
    height: 35px;
    text-align: center;
    padding: 0 10px;
    font-size: 14px;
    background-color: transparent;
    border: none;
}

.products__card-buy .cart-button {
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 500;
    order: -1;
}

.products__card-buy .amount-up {
    margin-right: unset;
}

@media (max-width: 1200px) {

    .products__square {
        flex: 0 0 33.33%;
    }

}

@media (max-width: 1024px) {

    .products__land .products__card-product {
        flex-direction: column;
        padding-left: 0;
    }

    .products__land .products__card-product-link {
        width: 220px;
        height: 220px;
        padding: 15px;
    }

    .products__card-img {
        height: 100%;
        object-fit: cover;
    }

}

@media (max-width: 950px) {

    .products__square {
        flex: 0 0 50%;
    }

    .products__land .products__card-product {
        width: 60%;
    }

    .products__land .products__card-buy {
        width: 40%;
    }

}

@media (max-width: 768px) {

.products__square {
    flex: 0 0 50%;
}

.products__land .products__card-about {
    width: 100%;
    padding: 10px 15px;
}

.products__land .products__card-product-link {
    padding: 15px;
}

.products__square .products__card-product-link {
    padding: 10px;
}

.products__card-name {
  font-size: 14px;
}

}

@media (max-width: 500px) {

.products__square {
  .products__item-card {
    height: 495px;
  }

  .products__card-about {
    height: 100px;
  }

  .products__card-name {
    font-size: 14px;
  }
}

.products__land .products__card-product-link {
    height: 150px;
    padding: 10px;
}

.products__square .products__card-product-link {
    width: 150px;
    height: 150px;
}

.products__card-buy .cart-button {
    font-size: 9px;
    font-weight: 600;
}

.products__card-buy .amount-input {
    font-size: 12px;
}

.products__card-buy .available {
    font-size: 10px;
}

.products__card-services-title {
    font-size: 14px;
}

.products__card-services-item {
    padding-left: 0;
    font-size: 14px;
}

.products__card-buy .section-buy__title {
    font-size: 12px;
}

.products__card-buy .section-buy__old-price {
    font-size: 14px;
}

.products__square .products__card-buy .section-buy__old-price {
    font-size: 12px;
}

.products__card-buy .section-buy__price {
    padding-bottom: 15px;
    padding-left: 0;
    font-size: 16px;
}

.products__square .products__card-buy .section-buy__price {
    font-size: 14px;
}

.card-product-link-square .products__card-article {
    font-size: 10px;
    order: 1;
}

.products__square .products__card-top {
    flex-direction: column;
    align-items: flex-start;
}

.products__card-top-btns {
    margin-bottom: 3px;
}

.products__square {
  .products__card-top-btns {
    svg {
      width: 15px;
      height: 15px;
    }
  }
}

.products__square .products__card-about {
    padding: 10px;
}

.products__square .products__card-about .available {
    font-size: 9px;
    margin-bottom: 0;
}

.products__land .products__card-about .available {
    font-size: 10px;
    margin-bottom: 10px;
}

.products__card-buy .section-buy {
    padding: 10px;
}

.products__card-buy .section-buy__amount {
    padding: 15px 0 0;
}

}

@media (max-width: 350px) {
  .products__square {
    .products__card-product-link {
      width: 120px;
    }
  }

  .products__land {
    .products__card-product-link {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
