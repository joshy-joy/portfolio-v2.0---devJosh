import { createWebHistory, createRouter } from 'vue-router'

import supabase from '../components/consumable/externals/supabase'

import PublicRoutes from './PublicRoutes'
import AdminRouter from './AdminRoutes'

const routes = [...PublicRoutes, ...AdminRouter]

const router = createRouter({
  history: createWebHistory(),
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
