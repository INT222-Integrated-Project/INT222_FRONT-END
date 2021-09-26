import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import AddEdit from '../views/AddandEditProduct.vue'
import Shipping from '../views/Shipping.vue'

const routes = [
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
    component: Login
  },
  {
    path: '/addEdit',
    name: 'AddEdit',
    component: AddEdit
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: Shipping
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: Shipping
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
