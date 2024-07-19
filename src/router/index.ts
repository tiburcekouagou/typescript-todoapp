import TodoView from '@/views/TodoView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all',
      component: TodoView
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: TodoView
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodoView
    }
  ]
})

export default router
