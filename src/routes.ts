import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './components/content/pages/Home.vue'
import About from './components/content/pages/About.vue'
import Projects from './components/content/pages/Projects.vue'
import Blogs from './components/content/pages/Blogs.vue'
import Contact from './components/content/pages/Contact.vue'

import supabase from './components/consumable/externals/supabase'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/blogs', component: Blogs },
  { path: '/contact', component: Contact }
  // {
  //   path: '/dashboard',
  //   component: AdminDashboard,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
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
