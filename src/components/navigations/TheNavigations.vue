<script>
import { defineComponent } from 'vue'

import FileExplorer from './secondarymenu/FileExplorer.vue'
import BlogExplorer from './secondarymenu/BlogExplorer.vue'

import eventBus from '../consumable/eventBus'

export default defineComponent({
  components: {
    'file-explorer': FileExplorer,
    'blog-explorer': BlogExplorer
  },
  data() {
    return {
      showExplorer: false,
      isAuthenticated: false,
      isSecondaryMenuVisible: false,
      activePrimaryMenuItem: ''
    }
  },
  methods: {
    login() {
      eventBus.emit('openLoginWindow', true)
    },
    togglePrimaryMenu(primaryMenu) {
      if (this.activePrimaryMenuItem !== primaryMenu && !this.isSecondaryMenuVisible) {
        this.isSecondaryMenuVisible = true
      } else if (this.activePrimaryMenuItem == primaryMenu) {
        this.isSecondaryMenuVisible = !this.isSecondaryMenuVisible
      }
      this.activePrimaryMenuItem = primaryMenu
    }
  },
  mounted() {
    eventBus.on('openSideNavigation', (data) => {
      this.showExplorer = data
    })
    eventBus.on('closeSideNavigation', (data) => {
      this.showExplorer = data
    }),
      eventBus.on('authEvent', (flag) => {
        this.isAuthenticated = flag
      })
  }
})
</script>

<template>
  <div
    class="col-sm-2"
    :class="{
      'show-explorer': showExplorer,
      'hide-explorer': !showExplorer,
      'hide-secondary-menu-items': !isSecondaryMenuVisible
    }"
  >
    <div class="nav">
      <div class="nav-menu-top">
        <i class="bi bi-files" @click="togglePrimaryMenu('explorer')"></i>
        <!-- <i class="bi bi-code-square"></i> -->
        <i class="bi bi-file-earmark-text-fill" @click="togglePrimaryMenu('blog')"></i>
        <i
          class="bi bi-columns-gap"
          v-if="isAuthenticated"
          @click="togglePrimaryMenu('dashboard')"
        ></i>
      </div>
      <div class="nav-menu-bottom">
        <i class="bi bi-person-circle" @click="login()"></i>
      </div>
    </div>
    <file-explorer
      v-if="activePrimaryMenuItem == 'explorer' && isSecondaryMenuVisible"
    ></file-explorer>
    <blog-explorer v-if="activePrimaryMenuItem == 'blog' && isSecondaryMenuVisible"></blog-explorer>
  </div>
</template>

<style scoped>
.col-sm-2 {
  background-color: #181818;
  border-right: 1px solid #2b2b2b;
  color: #bcbcbc;
  font-family: 'Roboto', sans-serif;
  min-width: 250px;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 !important;
}

.hide-secondary-menu-items {
  min-width: 0 !important;
  max-width: fit-content !important;
}

.nav {
  border-right: 1px solid #2b2b2b;
  height: 100%;
  width: 40px;
  padding: 10px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.nav-menu-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nav-menu-top i::before {
  margin: 0 0 40px 0;
}

i::before {
  font-size: 25px;
  cursor: pointer;
}

i:hover {
  color: #ffff;
}

/*media query for screen width less than 1000px */
@media all and (max-width: 660px) {
  .show-explorer {
    width: 250px;
    position: fixed;
    top: 45px;
    left: 0px;
    z-index: 999;
    animation: 0.5s forwards;
    animation-name: show;
  }

  .hide-explorer {
    width: 250px;
    position: fixed;
    top: 45px;
    left: -250px;
    z-index: 999;
    animation: 0.5s forwards;
    animation-name: hide;
  }

  @keyframes show {
    from {
      left: -250px;
    }
    to {
      left: 0px;
    }
  }

  @keyframes hide {
    from {
      left: 0px;
    }
    to {
      left: -250px;
    }
  }
}
</style>
