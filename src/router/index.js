import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/components/dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Movie Buff',
    component: () => import('../pages/home.vue')
  },
  {
    path: '/upComimg',
    name: '即將上映',
    component: () => import('../pages/upComing.vue')
  },
  {
    path: '/nowPlaying',
    name: '現正熱映',
    component: () => import('../pages/nowPlaying.vue')
  },{
    path: '/listPage',
    name: '我的清單',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/listPage.vue')
  }, {
    path: '/booking/:id',
    name: '電影訂票',
    component: () => import('../pages/booking.vue'),
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
