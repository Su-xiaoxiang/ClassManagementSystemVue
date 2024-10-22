<template>
  <main class="flex flex-col w-full items-center p-10 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
      <h1 class="text-4xl font-bold text-center mb-6">个人信息</h1>
      <div class="flex flex-col md:flex-row md:items-center mb-6">
        <img
          :src="user.avatar"
          alt="头像"
          class="w-40 h-40 rounded-full border-4 border-gray-300 mb-4 md:mb-0 md:mr-6"
        />
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">基本信息</h3>
        <ul class="list-disc pl-5 text-lg">
          <li>学号: {{ user.number }}</li>
          <li>职务: {{ user.Job }}</li>
          <li>班级: {{ user.class }}</li>
        </ul>
      </div>
      <el-divider></el-divider>
      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">自我介绍</h3>
        <p class="text-gray-700 text-lg">{{ user.introduction }}</p>
      </div>
    </div>
  </main>
  <!-- 版权栏 -->
  <footer class="bg-gray-900 text-white py-6 w-full mt-10">
    <div class="container mx-auto text-center">
      <p class="text-sm font-light">
        版权所有© Copyright 2024-现在 灵诺科技工作室所有 | 版本 V-1.0.0
      </p>
      <p class="text-xs text-gray-400 mt-2">
        Powered by <span class="text-blue-400">LingNuo Studio</span> | All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<script setup>
// 用户信息示例数据
const user = {
  name: '张三',
  number: '20236306518',
  Job: '班委',
  class: '2023软件技术5班',
  introduction: '大家好，我是张三，一个热爱编程的学生，希望通过不断学习提升自己的技术水平。',
  avatar: 'https://via.placeholder.com/150', // 头像占位符
};
</script>

<style scoped>
main {
  background-color: #f3f4f6; /* 背景颜色 */
}

h1 {
  color: #2c3e50; /* 标题颜色 */
}

h2, h3 {
  color: #34495e; /* 二级和三级标题颜色 */
}
</style>
