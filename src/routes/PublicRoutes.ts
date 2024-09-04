import HomePage from '../components/content/pages/HomePage.vue'
import AboutPage from '../components/content/pages/AboutPage.vue'
import ProjectsPage from '../components/content/pages/ProjectsPage.vue'
import BlogsPage from '../components/content/pages/BlogsPage.vue'
import ContactPage from '../components/content/pages/ContactPage.vue'

const PublicRoutes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/blog/:id', component: BlogsPage },
  { path: '/contact', component: ContactPage }
]

export default PublicRoutes
