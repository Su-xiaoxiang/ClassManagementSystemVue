<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center w-full h-full">
    <header class="w-full h-28 flex flex-col">
      <div
        class="bg-rose-300 w-full h-2/3 text-xl  text-left pl-8 pt-5 font-semibold flex justify-between md:text-2xl">
        <span
          class="overflow-hidden font-semibold  animate-pulse text-transparent bg-gradient-to-r bg-clip-text  from-red-500 via-fuchsia-500 to-blue-500">班级教学综合信息服务平台</span>
        <div class="hidden md:block  space-x-10   ">
          <router-link to="/index/HomePageIndex" class="text-gray-500 lg:text-2xl text-xl"
                       exact-active-class="text-red-400 lg:text-2xl text-xl ">班级首页
          </router-link>
          <router-link to="/index/UserInfo" class="text-gray-500 lg:text-2xl text-xl"
                       exact-active-class="text-red-400 lg:text-2xl text-xl">个人信息
          </router-link>
          <router-link to="/index/UserSituation" class="text-gray-500 lg:text-2xl text-xl"
                       exact-active-class="text-red-400 lg:text-2xl text-xl">情况查询
          </router-link>
        </div>
        <div class="hidden lg:block">
          <el-button type="danger" size="large" class="mr-5" @click="logout">退出登录</el-button>
        </div>
        <div class="hidden md:block lg:hidden">
          <el-button type="danger" size="small" class="mr-5" @click="logout">退出登录</el-button>
        </div>
        <!--        下拉菜单-->
        <div class="block md:hidden">
          <el-dropdown trigger="click">
            <el-icon :size="50" class="mr-5 -mt-2"><Setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/index/HomePageIndex" class="text-gray-500 "
                                                exact-active-class="text-red-400  text- ">班级首页
                </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/index/UserInfo" class="text-gray-500 "
                               exact-active-class="text-red-400 ">个人信息
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/index/UserSituation" class="text-gray-500 "
                               exact-active-class="text-red-400 ">情况查询
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item >
                  <el-button type="danger" size="small" class="mr-5" @click="logout">退出登录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
/*移动端图标*/
import { Setting } from '@element-plus/icons-vue'
/*退出登录*/
import { removeInfo } from '@/utils/storage.js'
/*路由引入*/
import router from '@/router/index.js'
/*函数方法*/
// 退出登录
const logout = () => {
  // 清除用户信息
  removeInfo()
  router.push('')
  window.location.reload()
}

</script>

<style scoped>
</style>
