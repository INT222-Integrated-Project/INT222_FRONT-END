import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import AddEdit from '../views/AddandEditProduct.vue'
import Shipping from '../views/Shipping.vue'
import Dashboard from '../views/Dashboard.vue'

import AdminPanel from '../views/admin/AdminPanel.vue'
import ForbiddenSector from '../views/publicVisitors/ForbiddenSector.vue'
import AddProduct from '../views/staffs/AddProduct.vue'

import store from '@/store'


const routes = [
  //Public user section
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['authentication/authenticated']) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/ForbiddenSector',
    name: 'ForbiddenSector',
    component: ForbiddenSector
  },
  //User only section
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authentication/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authentication/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: Shipping,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authentication/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  //Staff only sector
  {
    path: '/addEdit',
    name: 'AddEdit',
    component: AddEdit,
    beforeEnter: (to, from, next) => {
      if (!(store.getters['authentication/authenticated'] && (store.getters['authentication/roleName'] == "admin" || store.getters['authentication/roleName'] == "staff"))) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (!(store.getters['authentication/authenticated'] && (store.getters['authentication/roleName'] == "admin" || store.getters['authentication/roleName'] == "staff"))) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  //Admin only sector
  {
    path: '/adminPanel',
    name: 'AdminPanel',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      if (!(store.getters['authentication/authenticated'] && store.getters['authentication/roleName'] == "admin")) {
        return next({
          name: 'ForbiddenSector'
        })
      }

      next()
    }
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router