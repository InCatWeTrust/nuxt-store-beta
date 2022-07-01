<template>
  <div>
    <div
      class="notifications-content"
      :class="{
        'success': item.type === 'success',
        'error': item.type === 'error',
        'warn': item.type === 'warn'
      }"
    >
      <span v-if="item.title" class="notifications-title">{{ item.title }}</span>
      <span v-if="item.text" class="notifications-text">{{ item.text }}</span>
      <NuxtLink
        v-if="item.link"
        :to="item.link"
        class="notifications-link"
        @click="deleteItem"
      >
        Посмотреть
      </NuxtLink>
      <div
        class="notifications-close"
        @click.prevent="deleteItem"
      />
    </div>
  </div>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'BaseNotifyItem',
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
      deleted: false
    }
  },
  created () {
    eventBus.$on('notificate', (data) => { this.listData.push(data) })
  },
  mounted () {
    const context = this

    function removeEl () {
      context.deleteItem()
      context.deleted = true
    }

    context.delTimer = setTimeout(() => {
      removeEl()
    }, context.item.delay || 5000)

    this.$el.addEventListener('mouseover', () => {
      clearTimeout(context.delTimer)
    })

    this.$el.addEventListener('mouseout', () => {
      context.delTimer = setTimeout(() => {
        removeEl()
      }, 5000)
    })
  },
  methods: {
    deleteItem () {
      this.$emit('delete', this.item.id)
      clearTimeout(this.delTimer)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.notifications-wrapper {
  display: block;
  overflow: visible;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notifications-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  text-align: left;
  margin: 10px;
  padding: 10px 35px 10px 10px;
  font-size: 14px;
  color: $white;
  border-radius: 5px;
  background: $white;
  border: 2px solid $lightGrey;
  border-left: 5px solid $defaultBlue;
  box-shadow: -5px 10px 15px $grey;

  .notifications-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    color: $black;
  }

  .notifications-text {
    font-size: 16px;
    line-height: 1.2;
    color: $black;
  }

  .notifications-link {
    margin-top: 10px;
    padding-bottom: 2px;
    font-size: 14px;
    font-weight: 500;
    color: $almostBlack;
    border-bottom: 1px dashed $almostBlack;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
  }

  .notifications-close {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 2;

      &:hover::after,
      &:hover::before {
        background-color: $brandColor;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 2px;
        border-radius: 5px;
        background-color: $black;
        transition: background-color 200ms ease;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
  }

  &.success {
    border-left-color: $success;
  }

  &.warn {
    border-left-color: $warning;
  }

  &.error {
    border-left-color: $error;
  }
}

@media (max-width: 768px) {

  .notifications-content {
    box-shadow: unset;
  }

}
</style>
