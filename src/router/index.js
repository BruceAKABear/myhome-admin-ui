import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

import Layout from '@/layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import UserManage from '@/views/systemmanage/UserManage'
import RoleManage from '@/views/systemmanage/RoleManage'
import PermissionManage from '@/views/systemmanage/PermissionManage'
import CategoryManage from '@/views/devicemanage/CategoryManage'
import DeviceList from '@/views/devicemanage/DeviceList'
import DeviceDebug from '@/views/devicemanage/DeviceDebug'
import UserList from '@/views/operationmanage/UserList'
import InnerLayout from '@/layout/InnerLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: Login
  },
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import('@/views/errorpage/404'),
    hidden: true
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/index',
    children: [
      // 运营管理
      {
        path: '/operationManage',
        name: 'InnerLayout',
        component: InnerLayout,
        redirect: '/operationManage/userManage/userAnalyse',
        children: [
          {
            path: '/operationManage/userManage/userAnalyse',
            name: 'UserAnalyse',
            meta: { title: '用户分析' },
            component: () => import('@/views/operationmanage/UserAnalyse')
          }, {
            path: '/operationManage/userManage/userList',
            name: 'UserList',
            meta: { title: '用户列表' },
            component: UserList
          }, {
            path: '/operationManage/familyAnalyse/familyAnalyse',
            name: 'FamilyList',
            meta: { title: '家庭分析' },
            component: () => import('@/views/operationmanage/FamilyAnalyse')
          }, {
            path: '/operationManage/familyAnalyse/familyList',
            name: 'FamilyList',
            meta: { title: '家庭列表' },
            component: () => import('@/views/operationmanage/FamilyList')
          }, {
            path: '/operationManage/feedbackManage/feedbackList',
            name: 'FeedbackList',
            meta: { title: '反馈列表' },
            component: () => import('@/views/operationmanage/FeedbackList')
          }
        ]
      },
      // app管理
      {
        path: '/appManage',
        name: 'AppManage',
        component: InnerLayout,
        redirect: '/appManage/appAnalyse/appVersionManage',
        children: [
          {
            path: '/appManage/appAnalyse/appVersionManage',
            name: 'AppVersionManage',
            meta: { title: 'APK版本' },
            component: () => import('@/views/appmanage/AppVersionManage')
          }
        ]
      },
      // 设备管理
      {
        path: '/deviceManage',
        name: 'DeviceManage',
        component: InnerLayout,
        redirect: '/deviceManage/categoryManage/categoryManage',
        children: [
          {
            path: '/deviceManage/categoryManage/categoryManage',
            name: 'CategoryManage',
            meta: { title: '设备分类' },
            component: CategoryManage
          },
          {
            path: '/deviceManage/categoryManage/deviceIconManage',
            name: 'DeviceIconManage',
            meta: { title: '设备图标' },
            component: () => import('@/views/devicemanage/DeviceIconManage')
          }, {
            path: '/deviceManage/deviceList/deviceList',
            name: 'deviceList',
            meta: { title: '设备列表' },
            component: DeviceList
          }, {
            path: '/deviceManage/developManage/deviceDebug',
            name: 'deviceDebug',
            meta: { title: '设备调试' },
            component: DeviceDebug
          }
        ]
      },
      // 系统管理
      {
        path: '/systemManage',
        name: 'SystemManage',
        component: InnerLayout,
        redirect: '/systemManage/userRolePermission/userManage',
        children:
          [
            {
              path: '/systemManage/userRolePermission/userManage',
              name: 'UserManage',
              meta: { title: '人员管理' },
              component: UserManage
            },
            {
              path: '/systemManage/userRolePermission/roleManage',
              name: 'RoleManage',
              meta: { title: '角色管理' },
              component: RoleManage
            },
            {
              path: '/systemManage/userRolePermission/PermissionManage',
              name: 'PermissionManage',
              meta: { title: '权限管理' },
              component: PermissionManage
            },
            {
              path: '/systemManage/personalManage/basicInfo',
              name: 'UserBasicInfo',
              meta: { title: '个人信息' },
              component: () => import('@/views/systemmanage/UserBasicInfo')
            }

          ]
      },
      {
        path: '/index',
        name: 'Index',
        meta: { title: '信息汇总' },
        component: () => import('@/views/indexpage/Index')
      }
    ]
  },
  {
    path: '/regist',
    name: 'Regist',
    meta: { title: '开发者注册' },
    component: () => import('@/views/Regist')
  },
  {
    path: '*',
    redirect:
      '/404',
    hidden:
      true
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫监控是否登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  const baseTitle = 'MyHome'
  document.title = baseTitle + ' | ' + to.meta.title
  if (to.path === '/login' || to.path === '/regist') {
    // 如果去登录页直接放行到登录页
    next()
  } else {
    // 如果不是去登录页，则判断是否登录
    if (!window.sessionStorage.getItem('userToken')) {
      // 未登录,跳转到登录页
      next('/login')
    } else {
      // 登录，放行
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
