import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue'),
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/details/:id',
    name: 'details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailsPage.vue'),
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/status',
    name: 'status',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ANYYY.vue'),
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/series',
    name: 'series',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SeriesPage.vue'),
    meta: {
      needsAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('request_token')) {
    store.commit('setRequestToken', localStorage.getItem('request_token'))
  } else {
    store.dispatch('getRequestToken')
  }

  if (localStorage.getItem('is_authenticated')) {
    if (localStorage.getItem('auth_type') === 'guest') {
      store.commit('setGuestSessionId', localStorage.getItem('session_id'))
    } else if (localStorage.getItem('auth_type') === 'user') {
      store.commit('setLoginSession', localStorage.getItem('session_id'))
    }
  }

  if (to.meta.needsAuth) {
    if (store.state.isAuthenticated) {
      if (to.path === '/login') {
        router.push('/')
      } else {
        next()
      }
    } else {
      if (to.path !== '/login' && to.query.approved !== 'true') {
        console.log(to)
        console.log(from)
        alert('Usuario não autenticado, favor fazer login primeiro')
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
