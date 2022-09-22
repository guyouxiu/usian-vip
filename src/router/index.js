import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    redirect:'index',
    component: () => import('../views/home/home.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta:{
          title:'首页'
        },
        component: () => import('../views/index')
      },
      {
        path: 'member',
        name: 'member',
        meta:{
          title:'会员管理'
        },
        component: () => import('../views/member')
      },
      {
        path: 'supplier',
        name: 'supplier',
        meta:{
          title:'供应商管理'
        },
        component: () => import('../views/supplier')
      },
      {
        path: 'goods',
        name: 'goods',
        meta:{
          title:'商品管理'
        },
        component: () => import('../views/goods')
      },
      {
        path: 'staff',
        name: 'staff',
        meta:{
          title:'员工管理'
        },
        component: () => import('../views/staff')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
