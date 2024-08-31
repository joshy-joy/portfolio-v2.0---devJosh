import { createMemoryHistory, createRouter } from 'vue-router'

import ProjectDashboard from '@/components/admin/ProjectDashboard.vue'
import BlogDashboard from '@/components/admin/BlogDashboard.vue'

import supabase from '../components/consumable/externals/supabase'

const routes = [
  {
    path: '/dashboard/projects',
    component: ProjectDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/blogs',
    component: BlogDashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const AdminRouter = createRouter({
  history: createMemoryHistory(),
  routes
})

AdminRouter.beforeEach((to, from, next) => {
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

export default AdminRouter
