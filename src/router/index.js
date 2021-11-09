import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/main/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'retailer/manage',
        name:'RetailerManage',
        component:() => import('../components/retailer/RetailerManage.vue')
      },{
        path:'product/manage',
        name:'ProductManage',
        component:() => import('../components/product/ProductManage.vue')
      },{
        path:'product/add',
        name:'ProductAdd',
        component:() => import('../components/product/ProductAdd.vue')
      },{
        path:'contract/manage',
        name:'ContractManage',
        component:() => import('../components/contract/ContractManage.vue')
      },{
        path:'contract/add',
        name:'ContractAdd',
        component:() => import('../components/contract/ContractAdd.vue')
      },{
        path:'contract/edit',
        name:'ContractEdit',
        component:() => import('../components/contract/ContractEdit.vue')
      }
      ,{
        path:'contract/detail',
        name:'ContractDetail',
        component:() => import('../components/contract/ContractDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user/Register'),
  },



  
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
