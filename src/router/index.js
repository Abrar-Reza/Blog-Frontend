import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:blog_detail',
      name: 'blog_detail',
      component: () => import('../views/BlogDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/create_blog',
      name: 'create_blog',
      component: () => import('../views/CreateBlog.vue')
    },
    {
      path: '/update_blog/:blog_post',
      name: 'update_blog',
      component: () => import('../views/UpdateBlog.vue')
    }
  ]
})

export default router