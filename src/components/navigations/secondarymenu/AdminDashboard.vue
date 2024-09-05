<script lang="ts">
import { defineComponent } from 'vue'
import eventBus from '../../consumable/eventBus'

export default defineComponent({
  methods: {
    openTab(tabName: string, path: string) {
      eventBus.emit('openTab', tabName, path)
    }
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="secondary-menu-wrap">
      <i class="bi"> </i>
      <h6 class="secondary-menu-headings">ADMIN DASHBOARD</h6>
    </div>
    <div class="secondary-menu-list-wrap">
      <ul class="directory-list">
        <li
          class="directory-list-item"
          @click="openTab('Project Dashboard', '/dashboard/projects')"
        >
          <router-link to="/dashboard/projects">
            <div class="file-item-wrap">
              <p class="file-item-name">Projects</p>
            </div>
          </router-link>
        </li>
        <li class="directory-list-item" @click="openTab('Blog Dashboard', '/dashboard/blogs')">
          <router-link to="/dashboard/blogs">
            <div class="file-item-wrap">
              <p class="file-item-name">Blogs</p>
            </div>
          </router-link>
        </li>
        <li class="directory-list-item" @click="openTab('File upload', '/dashboard/uploads')">
          <router-link to="/dashboard/uploads">
            <div class="file-item-wrap">
              <p class="file-item-name">file uploads</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.secondary-menu-wrap {
  padding: 10px 0 0 35px;
  font-family: 'Roboto', sans-serif !important;
}

.secondary-menu-wrap h6 {
  font-size: 14px;
}

.secondary-menu-list-wrap {
  width: 100%;
}

.directory-list {
  list-style: none;
  padding: 0 !important;
}

.directory-list-item:hover {
  background: #37373e;
}

.directory-list-item a {
  text-decoration: none;
  color: #bcbcbc;
}

.file-item-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 30px;
}

.file-item-name {
  margin: 0;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

.file-item-name a {
  text-decoration: none;
  color: #bcbcbc;
}
</style>
