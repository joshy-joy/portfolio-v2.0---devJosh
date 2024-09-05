import ProjectDashboard from '@/components/admin/ProjectDashboard.vue'
import BlogDashboard from '@/components/admin/BlogDashboard.vue'
import FileUpload from '@/components/admin/FileUpload.vue'

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
  },
  {
    path: '/dashboard/uploads',
    component: FileUpload,
    meta: {
      requiresAuth: true
    }
  }
]

export default AdminRouter
