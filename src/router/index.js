import { createRouter, createWebHistory } from 'vue-router'
import { getInfo } from '@/utils/storage'
import { showFailToast } from 'vant'
import Login from '@/views/login/index.vue'
import index from '@/views/UserInfo/index.vue'
import HomePageIndex from '@/views/UserInfo/HomePage/index.vue'
import UserInfo from '@/views/UserInfo/UserInfo/index.vue'
import UserSituation from '@/views/UserInfo/UserSituation/index.vue'
import NotFound from '@/404.vue' // 注意这里的路径

// 定义路由
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/index',
    component: index,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (to.path === '/index') {
        // 重定向到默认的子路由 '/index/HomePageIndex'
        next('/index/HomePageIndex');
      } else {
        next();  // 继续导航到其他子路由
      }
    },
    children: [
      { path: 'HomePageIndex', component: HomePageIndex },  // 默认子路由
      { path: 'UserInfo', component: UserInfo },  // 其他子路由
      { path: 'UserSituation', component: UserSituation },  // 其他子路由
    ]
  },
  { path: '/:pathMatch(.*)*', component: NotFound } // 通配符路由的语法变化
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用HTML5的 history 模式
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = getInfo().token // 获取 token

  // 如果目标路由需要身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token === '') {
      // 如果用户未登录且当前路径不是登录页，重定向到登录页
      if (to.path !== '/login') {
        showFailToast('请登录')
        next('/login')
      } else {
        next(false) // 如果已经在登录页，取消导航
      }
    } else {
      // 用户已登录，继续导航
      next()
    }
  } else {
    // 不需要身份验证的路由，继续导航
    next()
  }
})

export default router
