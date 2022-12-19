import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import { auth, loginAPI } from '@/request/api'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      keepAlive: false,
      login: true,
      title: 'Dashboard'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - DevTimeGO'
  }
  if (to.meta.login) {
    const token = localStorage.getItem('token')
    if (token) {
      auth().then((res) => {
        next()
      }).catch(() => {
        next({
          path: '/login'
        })
      })
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
