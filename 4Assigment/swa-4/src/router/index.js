import { createRouter, createWebHistory } from 'vue-router'
import Register from '../component/register.vue'
import Login from '../component/Login.vue'
import Highscore from '../component/highscore.vue'
import Board from '../component/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/highscore',
      name: 'highscore',
      component: Highscore
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    }
  ]
});