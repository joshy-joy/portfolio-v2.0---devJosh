import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ThePortfolioMain from './components/main/portfolioContent.vue'
import ThePortfolioFooter from './components/commons/ThePortfolioFooter.vue'
import TheExplorer from './components/explorer/TheExplore.vue'
import TheHeader from './components/commons/TheHeader.vue'


const app = createApp(App)

app.component('portfolio-content', ThePortfolioMain)
app.component('portfolio-footer', ThePortfolioFooter)
app.component('side-menu', TheExplorer)
app.component('portfolio-header', TheHeader)

app.mount('#app')
