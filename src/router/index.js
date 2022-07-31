import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'Login',
  meta: { title: '登录' },
  component: () => import('@/views/Login')
}, {
  path: '/404',
  meta: { title: '页面未找到' },
  component: () => import('@/views/errorpage/404'),
  hidden: true
}, {
  path: '/',
  component: () => import('@/layout/index'),
  redirect: '/dashboard',
  children: [// 运营管理
    {
      path: '/dashboard',
      meta: { title: '控制台' },
      component: () => import('@/views/dashboard/Index')
    }, {
      path: '/family',
      component: () => import('@/layout/InnerLayout'),
      redirect: '/family/family',
      children: [{
        path: '/family/family',
        meta: { title: '家庭信息' },
        component: () => import('@/views/family/Family')
      }, {
        path: '/family/floor',
        meta: { title: '楼层信息' },
        component: () => import('@/views/family/Floor')
      }, {
        path: '/family/room',
        meta: { title: '房间信息' },
        component: () => import('@/views/family/Room')
      }, {
        path: '/family/members',
        meta: { title: '成员信息' },
        component: () => import('@/views/family/Members')
      }]
    }, {
      path: 'device',
      component: () => import('@/layout/InnerLayout'),
      redirect: '/device/product',
      children: [{
        path: '/device/product',
        meta: { title: '产品管理' },
        component: () => import('@/views/device/Product')
      }, {
        path: '/device/firmware',
        meta: { title: '固件管理' },
        component: () => import('@/views/device/Firmware')
      }, {
        path: '/device/device',
        meta: { title: '设备管理' },
        component: () => import('@/views/device/Device')
      }, {
        path: '/device/debug',
        meta: { title: '设备调试' },
        component: () => import('@/views/device/Debug')
      }]
    }, {
      path: 'automation',
      component: () => import('@/layout/InnerLayout'),
      redirect: '/automation/scheduleJob',
      children: [{
        path: '/automation/scheduleJob',
        meta: { title: '定时任务' },
        component: () => import('@/views/automation/ScheduleJob')
      }, {
        path: '/automation/countDown',
        meta: { title: '倒计时任务' },
        component: () => import('@/views/automation/CountDown')
      }, {
        path: '/automation/condition',
        meta: { title: '条件任务' },
        component: () => import('@/views/automation/Condition')
      }]
    }, {
      path: 'system',
      component: () => import('@/layout/InnerLayout'),
      redirect: '/system/rtls',
      children: [{
        path: '/system/rtls',
        meta: { title: '室内定位' },
        component: () => import('@/views/system/Rtls')
      }, {
        path: '/system/systeminfo',
        meta: { title: '系统信息' },
        component: () => import('@/views/system/SystemInfo')
      }, {
        path: '/system/personal',
        meta: { title: '个人信息' },
        component: () => import('@/views/system/Personal')
      }]
    }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]

const router = new VueRouter({
  routes
})
// // 路由守卫监控是否登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  const baseTitle = 'MyHome'
  document.title = baseTitle + ' | ' + to.meta.title
  if (to.path === '/login') {
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
