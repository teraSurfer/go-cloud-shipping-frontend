import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/vendor',
    name: 'Vendor',
    component: () => import('@/views/Vendor.vue'),
    children: [
      {
        path: '/vendor/home',
        name: 'VendorHome',
        component: () => import('@/components/vendor/Home.vue')
      },
      {
        path: '/vendor/orders',
        name: 'VendorOrders',
        component: () => import('@/components/vendor/Orders.vue')
      },
      {
        path: '/vendor/order/:id',
        name: 'VendorOrder',
        component: () => import('@/components/vendor/Order.vue')
      },
      {
        path: '/vendor/update-price',
        name: 'UpdatePrice',
        component: () => import('@/components/vendor/UpdatePrice.vue')
      },
      {
        path: '/vendor/profile',
        name: 'Profile',
        component: () => import('@/components/vendor/Profile.vue')
      },
      {
        path: '/vendor/scan',
        name: 'Scan',
        component: () => import('@/components/vendor/Scan.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
