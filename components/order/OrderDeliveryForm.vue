<template>
  <div class="order-delivery-container">
    <form class="order-delivery-form">
      <div class="box">
        <div
          class="number"
          :class="{'filled': formData.address}"
        >
          1
        </div>
        <div class="content">
          <h2 class="title">
            Введите адрес доставки *
          </h2>
          <BaseFormText
            v-model="formData.address"
            title="Адрес доставки"
            :error="formErrors.address"
            class="block mb40"
          />
          <BaseFormTextarea
            v-model="formData.address_comment"
            title="Комментарий"
            :error="formErrors.address_comment"
            class="order-textarea"
          />
        </div>
      </div>
      <div class="box">
        <div
          class="number"
          :class="{'filled': payment}"
        >
          2
        </div>
        <div class="content">
          <h2 class="title">
            Способ оплаты *
          </h2>
          <RadioBaseRadio
            :error="formErrors.payment"
            name="payment"
            label="Картой на сайте"
            value="Картой на сайте"
            :checked="payment"
            @update:value="(value) => payment_method = value"
          />
          <RadioBaseRadio
            :error="formErrors.payment"
            name="payment"
            label="Наличными"
            value="Наличными"
            :checked="payment"
            @update:value="(value) => payment_method = value"
          />
        </div>
      </div>
      <div class="box">
        <div
          class="number"
          :class="{'filled': formData.email}"
        >
          3
        </div>
        <div class="content">
          <h2 class="title">
            Ваш email *
          </h2>
          <BaseFormText
            v-model="formData.email"
            title="Email"
            :error="formErrors.email"
            class="block mb40"
          />
        </div>
      </div>
      <div class="box">
        <div
          class="number"
          :class="{'filled': formData.comment}"
        >
          4
        </div>
        <div class="content">
          <h2 class="title">
            Комментарий к заказу
          </h2>
          <BaseFormTextarea
            v-model="formData.comment"
            title="Комментарий"
            :error="formErrors.comment"
            class="order-textarea"
          />
        </div>
      </div>
      <div class="order-total-bottom">
        <OrderAccept
          :total="cartTotalPrice"
          :email="formData.email"
          :address="formData.address"
          :comment="formData.comment"
          :order-load="orderLoad"
        />
      </div>
    </form>
    <div class="order-total-right">
      <OrderAccept
        :total="cartTotalPrice"
        :term="false"
        :email="formData.email"
        :address="formData.address"
        :comment="formData.comment"
        :order-load="orderLoad"
      />
    </div>
  </div>
</template>

<script>
import eventBus from '~/eventBus'
export default {
  name: 'OrderDeliveryForm',
  props: {
    cartTotalPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      formData: {
        email: (this.$auth.user && this.$auth.user.email) || ''
      },
      formErrors: {},

      payment_method: 'Картой на сайте',
      orderLoad: false
    }
  },
  computed: {
    payment () {
      return this.payment_method
    },
    email () {
      return this.formData.email || ''
    }
  },
  created () {
    eventBus.$on('order-load', (isLoad) => { this.orderLoad = isLoad })
    eventBus.$on('order-form-errors', (err) => {
      if (err) {
        for (const item in err) {
          this.formErrors[item] = err[item][0]
        }
      } else {
        this.formErrors = {}
      }
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.order-delivery-container {
  display: flex;
  align-items: flex-start;
}

.order-delivery-form {
  width: 70%;
  padding: 0;
  border: 1px solid $lightGrey;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  .box {
    display: flex;
    align-items: flex-start;
    padding: 15px;
    padding-top: 0;

    &:first-child {
      padding-top: 15px;
    }

    .number {
      position: sticky;
      top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin-right: 60px;
      border-radius: 50%;
      font-size: 18px;
      color: $white;
      background-color: $grey;

      &.filled {
        color: $brandColor;
        background-color: $almostBlack;
      }
    }

    .content {
      width: calc(100% - 100px);
      padding-top: 10px;
    }
  }

  .title {
    margin-bottom: 20px;
    font-size: 20px;
  }
}

.order-textarea {
  textarea {
    height: 200px;
    padding-left: 10px;
    border: 1px solid $almostBlack;
    border-radius: 5px;
  }
}

@media (max-width: 1024px) {
.order-delivery-form {
  width: 100%;
}
}

@media (max-width: 500px) {
.order-delivery-form {
  .box {
    .number {
      width: 20px;
      height: 20px;
      margin-right: 20px;
      font-size: 14px;
    }

    .content {
      width: calc(100% - 40px);
      padding-top: 4px;
    }
  }

  .title {
    margin-bottom: 15px;
    font-size: 14px;
  }
}

.order-textarea {
  textarea {
    height: 120px;
  }
}
}
</style>
