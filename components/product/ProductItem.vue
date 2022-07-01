<template>
  <section id="product">
    <BasePreloader v-if="productLoading" color="#ffd737" />
    <div class="product-container">
      <h1 class="product__title">
        {{ product.name }}
      </h1>
      <span class="product__article">
        Артикул: <span class="product__article-number">{{ product.article }}</span>
      </span>
      <ul class="product__tabs">
        <li
          v-for="tab in productTabs"
          :key="productTabs.indexOf(tab)"
          class="product__tab-item"
        >
          <a
            href="#"
            class="product__tab"
            :class="{'product_active-tab': productTabs.indexOf(tab) === activeTabIndex}"
            @click.prevent="changeTab(productTabs.indexOf(tab))"
          >
            {{ tab }}
          </a>
        </li>
      </ul>
      <div class="product-content">
        <div
          class="product__product-block"
          :class="{'product_hidden': activeTabIndex !== 0}"
        >
          <div class="product__product-images">
            <GalleryContainer
              :images="product.images"
              class="product-gallery-container"
            />
          </div>
          <div class="product__product-description-block">
            <AvailableComponent />
            <div class="product-buy">
              <CartBuyComponent
                :product-name="product.name"
                :product-id="product.id"
                :price="+product.price"
              />
              <div class="product__indicator-buttons">
                <CompareIndicator
                  :product-id="product.id"
                  :product-name="product.name"
                />
                <FavoriteIndicator
                  :product-id="product.id"
                  :product-name="product.name"
                />
              </div>
            </div>
            <p class="product__product-description">
              {{ product.description }}
            </p>
            <div class="product__delivery">
              <svg class="product__delivery-svg"><use xlink:href="@/assets/images/sprites.svg#delivery" /></svg>
              <div class="product__delivery-text-block">
                <h3 class="product__delivery-title">
                  Гарантируем доставку вовремя!
                </h3>
                <p class="product__delivery-text">
                  Если мы опоздали, доставка - бесплатно.
                </p>
              </div>
            </div>
            <h2 class="product__services-title">
              Возможные услуги:
            </h2>
            <ul class="product__services-list">
              <li class="product__services-item">
                <div class="product__services-item-dot" />
                <span class="product__services-item-name">Распил материала</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="product__product-details"
          :class="{'product_hidden': activeTabIndex !== 1}"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, natus assumenda! Placeat magni itaque, aliquam adipisci molestiae reprehenderit odit vero blanditiis autem nemo doloribus, asperiores accusamus officia alias dolor error? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus sit velit unde, dolores sunt at aperiam aliquam, doloribus exercitationem rem veniam! Odio perspiciatis assumenda neque eius tempora perferendis sunt non. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam architecto ut, delectus eligendi reiciendis perspiciatis quas optio, fuga libero natus totam placeat cumque soluta! Fugit, asperiores. Labore, commodi fuga.
        </div>
        <div
          class="product__product-char"
          :class="{'product_hidden': activeTabIndex !== 2}"
        >
          <ul class="product__char-list">
            <li class="product__char-item">
              <span class="product__char-name">Тип товара</span>
              <div class="dotted" />
              <span class="product__char-value">Арматура</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Применение</span>
              <div class="dotted" />
              <span class="product__char-value">Для фундамента</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Материал</span>
              <div class="dotted" />
              <span class="product__char-value">Сталь</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Фактура</span>
              <div class="dotted" />
              <span class="product__char-value">Рифленая</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Форма</span>
              <div class="dotted" />
              <span class="product__char-value">Круглая</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Способ изготовления</span>
              <div class="dotted" />
              <span class="product__char-value">Горячекатаная</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Диаметр, мм</span>
              <div class="dotted" />
              <span class="product__char-value">12</span>
            </li>
            <li class="product__char-item">
              <span class="product__char-name">Длина арматуры, м</span>
              <div class="dotted" />
              <span class="product__char-value">2,9</span>
            </li>
          </ul>
        </div>
        <div
          class="product__product-spec"
          :class="{'product_hidden': activeTabIndex !== 3}"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    productData: {
      type: Object,
      default () {
        return {}
      }
    },
    productLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      productTabs: [
        'Описание',
        'Детали',
        'Характеристики',
        'Сертификаты'
      ],
      activeTabIndex: 0
    }
  },
  computed: {
    product () {
      return this.productData ? this.productData : {}
    }
  },
  methods: {
    changeTab (index) {
      this.activeTabIndex = index
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

#product {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 50px 0;
}

.product-container {
    width: 100%;
}

.product-content {
    position: relative;
    padding: 30px;
    border: 1px solid $lightGrey;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 0 5px $lightGrey;
    z-index: 10;
}

.product_hidden {
    position: absolute;
    opacity: 0;
    display: none;
}

.product__title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
}

.product__article {
    display: block;
    margin-bottom: 25px;
    font-size: 12px;
    font-weight: 300;
}

.product__article-number {
    font-weight: 400;
}

.product__tabs {
    display: flex;
    z-index: 5;
}

.product__tab {
    display: block;
    padding: 10px 15px;
    border: 1px solid $grey;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: 500;
    transition: all 300ms ease;
}

.product__tab-item:not(:last-child) {
    margin-right: 10px;
}

.product__tab:hover {
    background-color: $brandColor;
}

.product_active-tab {
    background-color: $brandColor;
}

.product__product-block {
    display: flex;
    align-items: flex-start;
}

.product__product-images {
    width: 60%;
    margin-right: auto;
    position: relative;
    height: 500px;
}

.product__product-image {
    width: 100%;
    margin-bottom: 15px;
}

.product__product-images-item {
    width: 23%;
    border-bottom: 2px solid $brandColor;
}

.product__product-description-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
    padding-left: 25px;
}

.product__product-description {
    margin-bottom: 20px;
    line-height: 1.5;
}

.product__delivery {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 20px;
    margin-bottom: 25px;
    border: 1px solid $lightGrey;
    border-radius: 5px;
    box-shadow: 0 3px 5px $lightGrey;
}

.product__delivery-svg {
    width: 50px;
    height: 50px;
    margin-right: 25px;
}

.product__delivery-title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
}

.product__delivery-text {
    font-size: 14px;
    font-weight: 300;
}

.product__services-title {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 300;
    font-style: italic;
}

.product__services-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.product__services-item {
    display: flex;
    align-items: center;
    font-weight: 500;
}

.product__services-item:not(:last-child) {
    margin-bottom: 10px;
}

.product__services-item-dot {
    width: 12px;
    height: 12px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: $darkerBrandColor;
}

.product__char-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.product__char-item {
    width: 70%;
    display: flex;
    align-items: flex-end;
}

.product__char-item:not(:last-child) {
    margin-bottom: 15px;
}

.product__char-name {
    white-space: nowrap;
}

.product__char-value {
    font-weight: 500;
    white-space: nowrap;
}

.product-buy {
    width: 100%;
    margin-bottom: 20px;
}

.product-buy .section-buy {
    box-shadow: -5px 5px 5px whitesmoke;
}

.product__indicator-buttons {
  padding: 10px;
  border-bottom: 1px dotted $lightGrey;
}

.product-gallery-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;

  .list,
  .content {
    height: 100%;
  }

  .list {
    width: 25%;
  }

  .content {
    width: 75%;
  }

  @media (max-width: 768px) {
    .content {
      width: 100%;

      .main-img {
        object-fit: contain;
      }
    }
  }
}

@media (max-width: 1024px) {

    .product__tab {
        padding: 10px 10px;
        font-size: 12px;
    }

    .product__product-block {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .product__product-images {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .product__product-image {
        width: 300px;
        height: 300px;
        margin-bottom: 15px;
        object-fit: contain;
    }

    .product__product-images-list {
        display: flex;
        justify-content: center;
    }

    .product__product-images-list li {
        width: 60px;
        height: 60px;
    }

    .product__product-images-item {
        width: 100%;
    }

    .product__product-description-block {
        width: 100%;
        padding-left: 0;
    }

    .product__char-item {
        width: 100%;
    }

}

@media (max-width: 768px) {

    #product {
        flex-direction: column;
    }

    .product-content {
        padding: 0;
        box-shadow: none;
        border: none;
    }

    .product-container {
        width: 100%;
        margin-bottom: 20px;
    }

    .product__product-images-list li {
        width: 50px;
        height: 50px;
    }

    .product__product-image {
        width: 220px;
        height: 220px;
        margin-bottom: 10px;
    }

    .product-container .available-text {
        font-size: 14px;
    }

    .product__product-description {
        font-size: 14px;
    }

    .product__services-item-name {
        font-size: 14px;
    }

    .product__tabs {
      border-bottom: 1px solid $darkGrey;
      margin-bottom: 20px;
    }

    .product__tab-item:not(:last-child) {
        margin-right: 0;
    }

    .product__tab {
        padding: 8px 5px;
        font-size: 8px;
        border-radius: 0;
        border: none;
    }

    .product-buy {
        position: relative;
        top: 0;
        width: 100%;
    }

    .product-buy .section-buy {
        box-shadow: none;
    }

    .product__char-item {
        font-size: 12px;
    }

    .product__char-item:not(:last-child) {
        margin-bottom: 10px;
    }

}
</style>
