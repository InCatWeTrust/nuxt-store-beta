<template>
  <div class="notifications">
    <transition-group name="notify">
      <NotificationsBaseNotifyItem
        v-for="item in list"
        v-show="!item.deleted"
        :key="item.id"
        class="notifications-wrapper"
        :item="item"
        @delete="del($event)"
      />
    </transition-group>
  </div>
</template>

<script>
import eventBus from '~/eventBus'

export default {
  name: 'BaseNotifyList',
  data () {
    return {
      // Входящие параметры
      listData: [
        // {
        //   title: 'Заголовок',
        //   text: 'Текст уведомления',
        //   type: 'warn' || 'success' || 'error', ..Тип уведомления
        //   link: '/', ..Если нужна ссылка
        //   delay: 10000 ..Задержка скрытия уведомления
        // }
      ],
      reminds: 0
    }
  },
  computed: {
    list () {
      return this.listData.map((item) => {
        return {
          ...item,
          id: this.listData.indexOf(item) + 1
        }
      })
    }
  },
  watch: {
    reminds () {
      if (this.reminds === 0) {
        this.listData = []
      }
    }
  },
  created () {
    eventBus.$on('notify', (data) => {
      this.listData.push(data)
      this.reminds += 1
    })
  },
  methods: {
    del (id) {
      this.listData = this.list.map((item) => {
        if (item.id !== id) {
          return item
        } else {
          return {
            ...item,
            deleted: true
          }
        }
      })

      this.reminds -= 1
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/_variables.scss';

.notifications {
  display: block;
  position: fixed;
  z-index: 5000;
  width: 380px;
  top: 55px;
  right: 40px;
}

.notify-enter-active, .notify-leave-active {
  transition: all 0.3s;
}
.notify-enter {
  opacity: 0;
  transform: translateY(30px);
}
.notify-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 768px) {

  .notifications {
    width: 100%;
    top: unset;
    right: unset;
    bottom: 10px;
    left: 0;
  }

}
</style>
