import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheoryView from '../views/TheoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/theory/:id', name: 'theory', component: TheoryView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router