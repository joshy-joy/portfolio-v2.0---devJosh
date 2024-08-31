<script lang="ts">
import eventBus from '../consumable/eventBus'

interface Notifications {
  message: string
  createdAt: number
}

interface NotificationComponentData {
  notificationMaxLifeSpan: number
  counters: string
  notificationList: Array<Notifications>
}

export default {
  data(): NotificationComponentData {
    return {
      notificationMaxLifeSpan: 10000,
      counters: '',
      notificationList: []
    }
  },
  methods: {
    closeNotification(createdAt: number) {
      this.notificationList = this.notificationList.filter((item: Notifications) => {
        if (createdAt == item.createdAt) {
          return false
        }
        return true
      })
    }
  },
  mounted() {
    eventBus.on('notify', (msg: string) => {
      this.notificationList.push({
        message: msg,
        createdAt: Date.now()
      })
    })

    // check once per second
    setInterval(() => {
      if (this.notificationList.length > 0) {
        this.notificationList = this.notificationList.filter((item: Notifications) => {
          if (Date.now() - this.notificationMaxLifeSpan > item.createdAt) {
            return false
          }
          return true
        })
      }
    }, 5000)
  },
  beforeUnmount() {
    clearInterval(this.counters)
  }
}
</script>

<template>
  <div class="notification-wrap">
    <div
      class="notification-block show-notification"
      :key="notification.createdAt"
      v-for="notification in notificationList"
    >
      <div class="message">
        <p>{{ notification.message }}</p>
      </div>
      <button class="close" @click="closeNotification(notification.createdAt)">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<style>
.notification-wrap {
  position: fixed;
  bottom: 50px;
  right: 10px;
  z-index: 999;
}

.notification-block {
  width: 350px;
  height: 100px;
  margin: 10px 0 0 0;

  background-color: #181818;
  border: 1px solid #2b2b2b;

  color: #ffff;
  font-family: 'Roboto', sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message {
  padding: 10px 10px 10px 30px;
  font-size: 12px;
}

.message p {
  margin: 0;
}

.close {
  padding: 10px !important;
  color: #ffff !important;
}

.close:hover {
  cursor: pointer !important;
  color: #ffff !important;
}

.show-notification {
  position: relative;
  animation: 0.5s forwards;
  animation-name: show;
}

@keyframes show {
  from {
    right: -360px;
  }
  to {
    right: 10px;
  }
}

@keyframes hide {
  from {
    left: 0px;
  }
  to {
    left: -220px;
  }
}
</style>
