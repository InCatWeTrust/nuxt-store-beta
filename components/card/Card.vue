<template>
  <div class="card">
    <div class="card-wrapper">
      <div class="top">
        <span class="article">
          Артикул: {{ item.article }}
        </span>
        <div class="buttons">
          <CompareIndicator
            :product-id="item.id"
            :category-name="categoryName || null"
            :product-name="item.name"
          />
          <FavoriteIndicator
            :product-id="item.id"
            :product-name="item.name"
          />
        </div>
      </div>
      <div class="bottom">
        <div class="info">
          <PromoIconsList
            v-if="promoFlags"
            :is-promo="item.is_promo"
            :is-new="item.is_new"
            :is-hot="item.is_hot"
          />
          <NuxtLink
            :to="`/product/${item.url}`"
            class="img-link"
          >
            <GallerySwiper
              :images="images"
            />
          </NuxtLink>
          <div class="about">
            <NuxtLink
              :to="`/product/${item.url}`"
              class="name lines-3"
            >
              {{ item.name }}
            </NuxtLink>
            <AvailableComponent />
          </div>
        </div>
        <div class="cart-controlls">
          <CartBuyComponent
            :product-id="item.id"
            :product-name="item.name"
            :price="+item.price"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const imgList = [
//   'images/test/test1.webp',
//   'images/test/test2.webp',
//   'images/test/test3.webp',
//   'images/test/test4.webp',
//   'images/test/test5.jpg',
//   'images/test/test6.jpg',
//   'images/test/test7.jpg',
//   'images/test/test8.png',
//   'images/test/test9.jpg',
//   'images/test/test10.jpg'
// ]

export default {
  name: 'BaseCard',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    categoryName: {
      type: String,
      default: ''
    },
    promoFlags: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    images () {
      return this.item.images ? this.item.images : []
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.card {
  height: 550px;
  position: relative;
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: linear;

  *:not(:active):not(:hover):focus {
    outline: 2px solid $black;
  }

  &:hover {
    transform: translate(4px, -4px);

    &::after {
      transform: translate(-4px, 4px) scale(1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: -1;
    background-color: $darkerBrandColor;
    transform: scale(0.98);
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: linear;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid $lightGrey;
    border-radius: 5px;
    background-color: $white;

    .top {
      display: flex;
      align-items: center;
      padding: 4px 10px;
      border-bottom: 1px solid $lightGrey;

      .article {
        margin-right: auto;
        font-weight: 300;
        font-size: 12px;
      }

      .buttons {
        display: flex;
      }
    }

    .bottom {
      display: flex;
      flex-direction: column;
      flex: 1;

      .info {
        position: relative;
        margin-bottom: auto;

        .img-link {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 230px;
          padding: 10px 20px;
        }

        .about {
          height: 90px;
          flex: 1;
          padding: 0 10px;

          .name {
            margin-bottom: 5px;
            font-weight: 500;
            line-height: 1.2;
          }

          .available {
            margin-bottom: 0;
          }
        }
      }

      .cart-controlls {
        .section-buy {
          padding: 4px 10px;
          border: none;
          box-shadow: none;

          .section-buy__title {
            margin-bottom: 8px;
          }

          .section-buy__old-price {
            margin-bottom: 5px;
            font-size: 16px;
            color: $grey;
          }

          .section-buy__price {
            font-size: 22px;
          }

          .section-buy__amount {
            padding: 10px 0;

            .amount-select {
              flex-wrap: wrap;
              justify-content: space-between;

              .amount-input {
                height: 36px;
              }

              .amount-select-button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 15%;
                height: 36px;
                font-size: 18px;
                font-weight: 500;
                background-color: transparent;
                border: none;

                &:hover {
                  color: $darkerBrandColor;
                }

                &.amount-up {
                  margin-right: unset;
                }
              }

              .amount-input {
                text-align: center;
                width: 65%;
                padding-left: 5px;
                font-size: 14px;
                border: none;
              }

              .cart-button {
                width: 100%;
                margin-bottom: 5px;
                font-size: 12px;
                font-weight: 400;
                letter-spacing: 0;
                order: -1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
