import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheoryView from '../views/TheoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Если есть хеш (например, #map), плавно крутим к нему
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // В остальных случаях — в начало страницы
    return { top: 0 }
  },
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView 
    },
    { 
      path: '/theory/:id', 
      name: 'theory', 
      component: TheoryView 
    },
    { 
      path: '/exercise/:id', 
      name: 'exercise', 
      component: () => import('../views/ExerciseView.vue') 
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/'
    }
  ]
})

export default router