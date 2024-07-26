import { auth } from '@/configs/firebase'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TodoView from '@/views/TodoView.vue'
import { useAuth } from '@vueuse/firebase'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all',
      component: TodoView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: TodoView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodoView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requireAuth: false
      }
    }
  ]
})

// Guardiens de navigation
// router.beforeEach(async (to, from) => {
//   const { isAuthenticated} = useAuth(auth)
  
//   if (!isAuthenticated.value && to.meta.requireAuth) {
//     return { 
//       name: 'login', 
//       query: {
//         redirect: to.fullPath
//       } 
//     }
//   }
// })

export default router
