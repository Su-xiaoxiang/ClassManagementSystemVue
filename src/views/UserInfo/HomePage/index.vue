<template>
  <main class="w-full flex-grow flex flex-col justify-between -my-10">
    <!-- 图片轮播图 -->
    <div class="block md:hidden">
      <el-carousel arrow="always" height="220px">
        <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <img :src="image" class="w-full h-full md:h-full" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hidden lg:block">
      <el-carousel arrow="always" height="500px">
        <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <img :src="image" class="w-full h-full md:h-full" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hidden lg:hidden md:block">
      <el-carousel arrow="always" height="400px">
        <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <img :src="image" class="w-full h-full md:h-full" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 班委信息展示区域 -->
    <div class="w-full flex-grow flex flex-col md:flex-row p-4 gap-4">
      <!-- 班委信息表格卡片 -->
      <div class="w-full md:w-1/3 bg-white flex flex-col items-center justify-center p-6 shadow-lg rounded-2xl min-h-[310px] border border-gray-300 transition-transform duration-300 transform hover:scale-105">
        <h2 class="text-2xl font-extrabold mb-4 text-gray-800">班委信息</h2>
        <div class="w-full h-full max-h-[200px] overflow-y-auto">
          <el-table :data="tableData" :table-layout="tableLayout" class="w-full h-full border border-gray-300">
            <el-table-column prop="Job" label="职位" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="name" label="姓名" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="Phone" label="电话" class="text-left border-b border-gray-300" />
          </el-table>
        </div>
      </div>

      <!-- 班级活动信息展示区域 -->
      <div class="w-full md:w-1/3 bg-red-200 flex flex-col items-center justify-center min-h-[310px] rounded-2xl shadow-lg p-4 transition-transform duration-300 transform hover:scale-105">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">班级活动</h3>
        <div class="w-full h-full max-h-[200px] overflow-y-auto">
          <el-table :data="activities" :table-layout="tableLayout" class="w-full h-full border border-gray-300">
            <el-table-column prop="title" label="活动名称" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="date" label="日期" width="150" class="text-left border-b border-gray-300" />
          </el-table>
        </div>
      </div>

      <!-- 学习资源展示区域 -->
      <div class="w-full md:w-1/3 bg-yellow-200 flex flex-col items-center justify-center min-h-[310px] rounded-2xl shadow-lg p-4 transition-transform duration-300 transform hover:scale-105">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">学习资源</h3>
        <div class="w-full h-full max-h-[200px] overflow-y-auto">
          <el-table :data="resources" :table-layout="tableLayout" class="w-full h-full border border-gray-300">
            <el-table-column prop="name" label="资源名称" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="link" label="链接" class="text-left border-b border-gray-300">
              <template #default="{ row }">
                <a :href="row.link" target="_blank" class="hover:underline text-blue-600">
                  {{ row.link }}
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 版权栏 -->
    <footer class="bg-gray-900 text-white py-6">
      <div class="container mx-auto text-center">
        <p class="text-sm font-light">
          版权所有© Copyright 2024-现在 灵诺科技工作室所有 | 版本 V-1.0.0
        </p>
        <p class="text-xs text-gray-400 mt-2">
          Powered by <span class="text-blue-400">LingNuo Studio</span> | All Rights Reserved
        </p>
      </div>
    </footer>
  </main>
</template>

<script setup>
const tableLayout = 'auto';
const tableData = [
  { Job: '班长', name: 'Tom', Phone: '12345678910' },
  { Job: '副班长', name: 'Jerry', Phone: '09876543210' },
  { Job: '班委', name: 'Alice', Phone: '11223344556' },
  { Job: '班委', name: 'Bob', Phone: '22334455667' },
  { Job: '班委', name: 'Cathy', Phone: '33445566778' },
  { Job: '班委', name: 'David', Phone: '44556677889' },
];

// 添加更多活动
const activities = [
  { title: '运动会', date: '2024年10月30日' },
  { title: '读书分享会', date: '2024年11月5日' },
  { title: '手工艺活动', date: '2024年11月15日' },
  { title: '音乐晚会', date: '2024年11月25日' },
  { title: '科技展', date: '2024年12月1日' },
  { title: '春游活动', date: '2024年12月10日' },
  { title: '班级聚会', date: '2024年12月15日' },
];

// 添加更多学习资源
const resources = [
  { name: 'Python编程基础', link: 'https://www.example.com/resource1' },
  { name: '高等数学自学指南', link: 'https://www.example.com/resource2' },
  { name: '大学英语学习资料', link: 'https://www.example.com/resource3' },
  { name: '前端开发教程', link: 'https://www.example.com/resource4' },
  { name: '数据结构与算法', link: 'https://www.example.com/resource5' },
  { name: '机器学习入门', link: 'https://www.example.com/resource6' },
  { name: '项目管理技巧', link: 'https://www.example.com/resource7' },
];
// 轮播图图片数组
const carouselImages = [
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJsdXUlMjBzZWxmaWV8ZW58MHx8fHwxNjc4ODgzOTQz&ixlib=rb-4.0.3&q=80&w=400',
  'https://images.unsplash.com/photo-1537128254286-7cfe05e6f1b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJsdXUlMjBzZWxmaWV8ZW58MHx8fHwxNjc4ODgzOTQz&ixlib=rb-4.0.3&q=80&w=400',
  'https://images.unsplash.com/photo-1526045612214-e57e4d1c2eb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJsdXUlMjBzZWxmaWV8ZW58MHx8fHwxNjc4ODgzOTQz&ixlib=rb-4.0.3&q=80&w=400',
  'https://images.unsplash.com/photo-1615800275741-ecbe98e2f56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJsdXUlMjBzZWxmaWV8ZW58MHx8fHwxNjc4ODgzOTQz&ixlib=rb-4.0.3&q=80&w=400',
];
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

main {
  @apply flex flex-col min-h-screen;
}

/* 表格样式 */
.el-table {
  border-collapse: collapse;
  width: 100%;
}

.el-table .el-table__header-wrapper th {
  background-color: #f9fafb;
  color: #374151;
  font-weight: bold;
  padding: 12px 8px;
  border: 1px solid #e5e7eb;
}

/* 表格行样式增强 */
.el-table .el-table__row {
  transition: background-color 0.3s;
}

.el-table .el-table__row:nth-child(odd) {
  background-color: #f9fafb; /* 交替背景色 */
}

.el-table .el-table__row:hover {
  background-color: #e0f7ff; /* 悬停高亮 */
}

/* 单元格样式 */
.el-table-column {
  padding: 8px;
  text-align: left;
  border: 1px solid #e5e7eb;
}
</style>
