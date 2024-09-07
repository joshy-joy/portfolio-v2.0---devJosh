import HomePage from '../components/content/pages/HomePage.vue'
import AboutPage from '../components/content/pages/AboutPage.vue'
import ProjectsPage from '../components/content/pages/ProjectsPage.vue'
import BlogsPage from '../components/content/pages/BlogsPage.vue'
import ContactPage from '../components/content/pages/ContactPage.vue'

const PublicRoutes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/projects', name: 'projects', component: ProjectsPage },
  { path: '/blog/:id', name: 'blog', component: BlogsPage },
  { path: '/contact', name: 'contact', component: ContactPage }
]

export default PublicRoutes
