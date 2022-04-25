import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '/@/layout/index.vue'
import Login from '/@/views/Login/index.vue'
import HomePage from '/@/views/HomePage/index.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    redirect: '/homepage',
    leaf: true,
    component: Layout,
    children: [
      {
        path: '/homepage',
        name: '首页',
        iconCls: 'el-icon-s-help',
        component: HomePage
      }
    ]
  },
  {
    path: '/',
    name: '订单模块',
    leaf: false,
    iconCls: 'el-icon-s-data',
    component: Layout,
    children: [
      {
        path: '/order',
        name: '订单信息',
        component: () => import('/@/views/showOrder.vue')
      },
      {
        path: '/postorder',
        name: '添加订单',
        component: () => import('/@/views/postOrder.vue')
      }
    ] 
  },
  {
    path: '/',
    name: '客户模块',
    leaf: false,
    iconCls: 'el-icon-s-data',
    component: Layout,
    children: [
      {
        path: '/getguests',
        name: '客户信息',
        component: () => import('/@/views/showGuest.vue')
      },
      {
        path: '/guest',
        name: '添加客户',
        component: () => import('/@/views/postGuest.vue')
      }
    ]
  },
  {
    path: '/',
    name: '员工模块',
    leaf: false,
    iconCls: 'el-icon-s-data',
    component: Layout,
    children: [
      {
        path: '/getemployees',
        name: '员工信息',
        component: () => import('/@/views/showEmployee.vue')
      },
      {
        path: '/employee',
        name: '添加员工',
        component: () => import('/@/views/postEmployee.vue')
      },
      {
        path: '/employee/performance',
        name: '员工绩效',
        component: () => import('/@/views/showEmployeePerformance.vue')
      }
    ]
  },
  {
    path: '/',
    name: '支出模块',
    leaf: false,
    iconCls: 'el-icon-s-data',
    component: Layout,
    children: [
      {
        path: '/spend',
        name: '服务支出',
        component: () => import('/@/views/showSpend.vue')
      },
      {
        path: '/stores',
        name: '进货表',
        component: () => import('/@/views/showStore.vue')
      },
      {
        path: '/store',
        name: '材料入库',
        component: () => import('/@/views/postStore.vue')
      },
    ]
  },
]

// 构建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('password')
  }
  let name = sessionStorage.getItem('name') // name区分是否登录
  if (!name && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router