import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheoryView from '../views/TheoryView.vue'
import ExerciseView from '../views/ExerciseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/theory/:id', name: 'theory', component: TheoryView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: '/exercise/:id', name: 'exercise', component: () => import('../views/ExerciseView.vue') }
  ]
})

export default router