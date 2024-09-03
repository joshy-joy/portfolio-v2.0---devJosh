import ProjectDashboard from '@/components/admin/ProjectDashboard.vue'
import BlogDashboard from '@/components/admin/BlogDashboard.vue'

const AdminRouter = [
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

export default AdminRouter
