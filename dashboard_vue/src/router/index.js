import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import auth from "../views/auth.vue";
import userOK from "../views/userOK.vue";
import homeNotConnected from "../views/homeNotConnected.vue";
import home from '../views/home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",  //home view not connected
      name: "homeNotConnected",
      component: homeNotConnected
    },
    {
      path: '/home', 
      name: 'home', 
      component: home
    },
    {
      path: '/login', //home view
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth',
      name: 'auth', 
      component: auth
    }, 
    {
      path: '/connectionSuccessful/', 
      name: 'connectionSuccessful', 
      component: userOK
    }
     

  ]
})

export default router
