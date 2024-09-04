import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/common.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './routes/router'

import HeaderLayout from './components/layout/HeaderLayout.vue'
import TheNavigations from './components/navigations/TheNavigations.vue'
import MainContent from './components/content/MainContent.vue'
import FooterLayout from './components/layout/FooterLayout.vue'
import TheLineNumber from './components/commons/TheLineNumber.vue'
import AuthenticationWindow from './components/auth/AuthenticationWindow.vue'
import PushNotifications from './components/commons/PushNotifications.vue'

const app = createApp(App)

app.component('main-content', MainContent)
app.component('footer-layout', FooterLayout)
app.component('primary-nav', TheNavigations)
app.component('header-layout', HeaderLayout)
app.component('line-number', TheLineNumber)
app.component('authentication-window', AuthenticationWindow)
app.component('push-notifications', PushNotifications)

app.use(router)

app.mount('#app')
