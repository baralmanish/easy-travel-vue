import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import { isAuthenticated } from '@/helpers/utility'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/bundle/:id',
      name: 'bundle',
      component: () => import('../views/BundleView.vue')
    },
    {
      path: '/make-order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/admin',
      name: 'adminDashboard',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/admin/order/:id',
      name: 'adminOrder',
      component: () => import('../views/AdminOrderView.vue')
    },
    {
      path: '/admin/products',
      name: 'adminProducts',
      component: () => import('../views/AdminProductsView.vue')
    },
    {
      path: '/admin/product/add',
      name: 'adminProductsAdd',
      component: () => import('../views/AdminProductsFormView.vue')
    },
    {
      path: '/admin/product/:id/update',
      name: 'adminProductsUpdate',
      component: () => import('../views/AdminProductsFormView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to) => {
  if (!to.path.includes('/admin')) {
    return true
  }

  const authenticated = isAuthenticated()

  if (!authenticated && to.name !== 'adminLogin') {
    return { name: 'adminLogin' }
  }

  if (authenticated && to.name === 'adminLogin') {
    return { name: 'adminDashboard' }
  }

  return
})

export default router
