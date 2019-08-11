import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/app/data',
          name: '数据管理',
          component: () => import('./views/app/data.vue')
        },
        {
          path: '/app/package',
          name: '礼包管理',
          component: () => import('./views/app/giftbag.vue')
        },
        {
          path: '/system/role',
          name: 'role',
          component: () => import('./views/system/role.vue')
        },{
          path: '/system/jurisdiction',
          name: 'jurisdiction',
          component: () => import('./views/system/jurisdiction.vue')
        },
        {
          path: '/system/dictionaries',
          name: 'dictionaries',
          component: () => import('./views/system/dictionaries.vue')
        },
        {
          path: '/aaa/aaa',
          name: 'aaa',
          component: () => import('./views/aaa/aaa.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.vue')
    }
  ]
})
