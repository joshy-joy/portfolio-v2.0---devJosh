import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/common.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ThePortfolioMain from './components/main/portfolioContent.vue'
import ThePortfolioFooter from './components/commons/ThePortfolioFooter.vue'
import TheExplorer from './components/explorer/TheExplore.vue'
import TheHeader from './components/commons/TheHeader.vue'
import TheLineNumber from './components/commons/TheLineNumber.vue'


const app = createApp(App)

app.component('portfolio-content', ThePortfolioMain)
app.component('portfolio-footer', ThePortfolioFooter)
app.component('side-menu', TheExplorer)
app.component('portfolio-header', TheHeader)
app.component('line-number', TheLineNumber)

app.mount('#app')
