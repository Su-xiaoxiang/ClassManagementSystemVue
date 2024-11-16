<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Expand, 
  Fold, 
  Menu, 
  User, 
  Picture, 
  UserFilled, 
  Calendar, 
  Collection 
} from '@element-plus/icons-vue';

const route = useRoute();
const isSidebarCollapsed = ref(false);
const isMobileMenuOpen = ref(false);

// 获取当前路由路径
const currentPath = computed(() => route.path);

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 菜单项配置
const menuItems = [
  { 
    icon: User, 
    label: '用户管理', 
    path: '/admin/user-list'
  },
  { 
    icon: Picture, 
    label: '轮播图管理', 
    path: '/admin/carousel-list'
  },
  { 
    icon: UserFilled, 
    label: '班委管理', 
    path: '/admin/committee-list'
  },
  { 
    icon: Calendar, 
    label: '活动管理', 
    path: '/admin/activity-list'
  },
  { 
    icon: Collection, 
    label: '资源管理', 
    path: '/admin/resource-list'
  }
];

// 判断菜单项是否激活
const isActive = (path) => currentPath.value === path;
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 顶部导航栏 -->
    <nav class="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
      <div class="flex items-center justify-between h-full px-4">
        <!-- 左侧 Logo 和折叠按钮 -->
        <div class="flex items-center space-x-4">
          <button @click="toggleMobileMenu" class="lg:hidden text-gray-600">
            <el-icon class="text-xl"><Menu /></el-icon>
          </button>
          <button @click="toggleSidebar" class="hidden lg:block text-gray-600">
            <el-icon class="text-xl">
              <component :is="isSidebarCollapsed ? Expand : Fold" />
            </el-icon>
          </button>
          <span class="text-xl font-bold text-blue-600">班级管理后台系统</span>
        </div>

        <!-- 右侧工具栏 -->
        <div class="flex items-center space-x-4">
          <el-dropdown>
            <span class="flex items-center space-x-2 cursor-pointer">
              <el-avatar size="small" src="https://placeholder.co/32" />
              <span class="text-sm text-gray-700">Admin</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </nav>

    <!-- 侧边栏 -->
    <aside
      :class="[
        'fixed top-16 bottom-0 left-0 z-40 transition-all duration-300',
        'lg:block',
        isMobileMenuOpen ? 'block' : 'hidden',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      ]"
    >
      <div class="h-full bg-white shadow-lg">
        <ul class="py-4">
          <li v-for="item in menuItems" :key="item.path" class="px-4 py-2">
            <router-link
              :to="item.path"
              :class="[
                'flex items-center space-x-3 rounded-lg p-2 transition-colors duration-200',
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <el-icon :class="{ 'text-blue-600': isActive(item.path) }">
                <component :is="item.icon" />
              </el-icon>
              <span v-show="!isSidebarCollapsed" 
                    :class="{ 'text-blue-600': isActive(item.path) }">
                {{ item.label }}
              </span>
              
              <!-- 活动指示器 -->
              <div v-if="isActive(item.path) && !isSidebarCollapsed" 
                   class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l">
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <!-- 主要内容区域 -->
    <main
      :class="[
        'transition-all duration-300 pt-16',
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64',
      ]"
    >
      <div class="p-6">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

/* 添加菜单项的悬停效果 */
.router-link-active {
  @apply relative;
}

/* 添加过渡效果 */
.router-link-active::before {
  content: '';
  @apply absolute left-0 top-0 bottom-0 w-full bg-current opacity-0 transition-opacity duration-200;
}

.router-link-active:hover::before {
  @apply opacity-10;
}
</style>
