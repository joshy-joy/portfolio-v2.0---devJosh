import Home from '../components/content/pages/Home.vue'
import About from '../components/content/pages/About.vue'
import Projects from '../components/content/pages/Projects.vue'
import Blogs from '../components/content/pages/Blogs.vue'
import Contact from '../components/content/pages/Contact.vue'

const PublicRoutes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/blogs', component: Blogs },
  { path: '/contact', component: Contact }
]

export default PublicRoutes
