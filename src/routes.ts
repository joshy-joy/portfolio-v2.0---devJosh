import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './components/main/sections/Home.vue'
import About from './components/main/sections/About.vue'
import Projects from './components/main/sections/Projects.vue'
import Blogs from './components/main/sections/Blogs.vue'
import Contact from './components/main/sections/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/blogs', component: Blogs },
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;