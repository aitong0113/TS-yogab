import Dashboard from '@/components/Dashboard.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/product-management',
          name: 'product-management',
          component: () => import('@/views/ProductManagement.vue'),
        },
        {
          path: '/order-management',
          name: 'order-management',
          component: () => import('@/views/OrderManagement.vue'),
        },
        {
          path: '/coupon-management',
          name: 'coupon-management',
          component: () => import('@/views/CouponManagement.vue'),
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    }
  },
})

export default router
