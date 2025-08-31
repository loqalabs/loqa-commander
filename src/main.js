import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import Timeline from './views/Timeline.vue'
import Analytics from './views/Analytics.vue'

import './style.css'

const routes = [
  { 
    path: '/', 
    name: 'Timeline', 
    component: Timeline,
    meta: { title: 'Voice Command Timeline' }
  },
  { 
    path: '/analytics', 
    name: 'Analytics', 
    component: Analytics,
    meta: { title: 'Analytics' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  document.title = `${to.meta.title} - Loqa Observer`
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')