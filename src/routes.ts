import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './components/main/sections/Home.vue'
import About from './components/main/sections/About.vue'
import Projects from './components/main/sections/Projects.vue'
import Blogs from './components/main/sections/Blogs.vue'
import Contact from './components/main/sections/Contact.vue'
import Dashboard from './components/dashboard/TheDashboard.vue'

import supabase from './components/consumable/externals/supabase'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/blogs', component: Blogs },
  { path: '/contact', component: Contact },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    supabase
      .getUserSession()
      .then((data) => {
        if (data.data && data.data.session && data.data.session.access_token) {
          next()
        } else {
          next('/about')
        }
      })
      .catch((err: Error) => {
        console.error(err)
      })
  } else {
    // Non-protected route, allow access
    next()
  }
})

export default router
