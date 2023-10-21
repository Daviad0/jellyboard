import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerView from '../views/PlayerView.vue'
import CreatorView from '../views/CreatorView.vue'
import AccountView from '../views/AccountView.vue'
import CanvasItem from '../components/CanvasItem.vue'
import SubmitAnswerItem from '../components/SubmitAnswerItem.vue'
import MultipleChoiceItem from '../components/MultipleChoiceItem.vue'
import SlideshowViewer from '../components/SlideshowViewer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'player',
      component: PlayerView
    },
    {
      path: '/creator',
      name: 'creator',
      component: CreatorView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
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
      path: '/submitanswer',
      name: 'submitanswer',

      component: SubmitAnswerItem
    },
    {
      path: '/multiplechoice',
      name: 'multiplechoice',

      component: MultipleChoiceItem
    },
    {
      path: '/slideshow',
      name: 'slideshow',

      component: SlideshowViewer
    },
  ]
})

export default router
