import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerView from '../views/PlayerView.vue'
import CanvasItem from '../components/CanvasItem.vue'
import CreatorItem from '../components/CreatorItem.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'player',
      component: PlayerView
    },
    {
      path: '/canvas',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CanvasItem
    },
    {
      path: '/creatoritem',
      name: 'creatoritem',

      component: CreatorItem
    },
  ]
})

export default router
