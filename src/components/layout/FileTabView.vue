<script lang="ts">
import { defineComponent } from 'vue'

import eventBus from '../consumable/eventBus'
interface Tab {
  tabName: string
  path: string
  isActive: boolean
}

const diactivate = (tab: Tab) => {
  tab.isActive = false
}
const getTabIndex = (tabs: Array<Tab>, term: string) =>
  tabs.findIndex((tab) => tab.tabName.toLowerCase() === term.toLowerCase())

export default defineComponent({
  data() {
    return {
      tabs: [{ tabName: 'Home.go', path: '/', isActive: true}]
    }
  },
  methods: {
    selectTab(name: string) {
      let index = getTabIndex(this.tabs, name)
      this.tabs.forEach(diactivate)
      this.tabs[index].isActive = true
      const isBlog = this.tabs[index].path.includes('blog')
      if (isBlog) {
        this.emitBlogRenderEvent(this.tabs[index].path)
      }
    },
    closeTab(name: string) {
      if (name !== 'Home.go') {
        let index = getTabIndex(this.tabs, name)
        if (this.tabs[index].isActive) {
          this.tabs[index - 1].isActive = true
          this.$router.push(this.tabs[index - 1].path)
        }
        this.tabs.splice(index, 1)
      }
    },
    emitBlogRenderEvent(path: string) {
      let id = path.split("/")
      eventBus.emit('showBlogWithID', id[id.length-1])
    }
  },
  mounted() {
    eventBus.on('openTab', (tabName: string, path: string) => {
      let index = getTabIndex(this.tabs, tabName)
      this.tabs.forEach(diactivate)
      const isBlog = path.includes('blog')
      if (isBlog) {
        this.emitBlogRenderEvent(path)
      }
      if (index >= 0) {
        this.tabs[index].isActive = true
      } else {
        this.tabs.push({ tabName: tabName, path: path, isActive: true})
      }
    })
  }
})
</script>

<template>
  <div class="tab-wrap">
    <div
      :class="{ 'tab-section': true, activeTab: tab.isActive }"
      :key="tab.tabName"
      v-for="tab in tabs"
    >
      <router-link :to="tab.path" @click="selectTab(tab.tabName)">{{ tab.tabName }}</router-link>
      <button class="close-btn" @click="closeTab(tab.tabName)" v-if="tab.tabName != 'Home.go'">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.tab-wrap {
  width: 100%;
  height: 30px;
  background: #181818;
  color: #7e7e7e;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #2b2b2b;
  overflow-x: scroll;
}

.tab-section {
  height: 100%;
  text-align: center;
  border-right: 1px solid #2b2b2b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-wrap: nowrap;
}

.tab-section a {
  padding: 2px 20px;
  margin: 0 !important;
  text-decoration: none;
  color: #eeeeee;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

.activeTab {
  background: #1f1f1f;
  border-bottom: 0;
}

.close-btn {
  background: none;
  border: none;
  padding: 2px 10px 2px 10px;
  color: inherit;
  cursor: pointer;
}

.close-btn i {
  color: #ffff;
}

.close-btn:focus {
  outline: none;
  box-shadow: none;
}

.tab-wrap::-webkit-scrollbar {
  display: none;
}
</style>
