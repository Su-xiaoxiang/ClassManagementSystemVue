<script setup>
</script>

<template>
  <main class="w-full min-h-screen flex-grow flex flex-col -my-10">
    <!-- 第一部分 -->
    <!-- 图片轮播图 -->
    <div class="block md:hidden">
      <el-carousel arrow="always" height="220px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="@/assets/MingDelogo.jpg" class="w-full h-full md:h-full">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hidden lg:block ">
      <el-carousel arrow="always" height="500px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="@/assets/MingDelogo.jpg" class="w-full h-full">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hidden lg:hidden md:block ">
      <el-carousel arrow="always" height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="@/assets/MingDelogo.jpg" class="w-full h-full">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--    第二部分-->
    <div class="w-full flex flex-col md:flex-row flex-grow">
      <div class="w-full md:w-1/3 bg-blue-300 flex items-center justify-center min-h-[310px]">
        1
      </div>
      <div class="w-full md:w-1/3 bg-green-300 flex items-center justify-center min-h-[310px]">
        2
      </div>
      <div class="w-full md:w-1/3 bg-red-300 flex items-center justify-center min-h-[310px]">
        3
      </div>
    </div>
  </main>
  <footer class="bg-gray-200 w-full text-center p-4">
    版权所有© Copyright 2024-现在 灵诺科技工作室所有 版本V-1.0.0
  </footer>
</template>

<style scoped>
/* 可以添加额外的样式来进一步定制组件 */
</style>
