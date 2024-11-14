<script setup>
//接口调用方式
import { getImgCarousel,getCLassCommittee,getActivities,getStudyResources } from '@/api/UserInfo/HomePage.js'
import { onMounted, ref } from 'vue'
import { getInfo } from '@/utils/storage.js'
// 普通类型
const tableLayout = 'auto';
// 添加更多学习资源
const resources = ref([]);
// 轮播图图片数组
const carouselImages =ref([])
// 班委信息数组
const tableData = ref([])
// 活动信息数组
const activities = ref([])
// 获取当前用户的班级ID
const classId = ref('')
classId.value = getInfo().classId
// 函数方法
/*获取轮播图信息*/
const getimgCarousel = async () => {
  try {
    // 使用 await 等待 Promise 完成
    const res = await getImgCarousel(classId.value);
    // 检查返回的结果是否成功
    if (res && res.code === 200) {
      // 获取数据并存储到数组
      carouselImages.value = res.data;
    } else {
      console.error("获取轮播图数据失败", res);
    }
  } catch (error) {
    console.error("请求发生错误：", error);
  }
}
/*获取班委信息*/
const getCommittee = async () => {
  try {
    // 使用 await 等待 Promise 完成
    const res = await getCLassCommittee(classId.value);
    // 检查返回的结果是否成功
    if (res && res.code === 200) {
      tableData.value = res.data
   } else {
      console.error("获取轮播图数据失败", res);
    }
  } catch (error){
    console.error("请求发生错误：", error)
  }
}
/*获取活动信息*/
const getActivitie = async () => {
  try {
    // 使用 await 等待 Promise 完成
    const res = await getActivities(classId.value);
    // 检查返回的结果是否成功
    if (res && res.code === 200) {
      //console.log("获取活动信息成功", res.data);
      activities.value = res.data
   } else {
      console.error("获取轮播图数据失败", res);
    }
  } catch (error){
    console.error("请求发生错误：", error)
  }
}
/*获取学习资源*/
const getStudyResource = async () => {
  try {
    const res = await getStudyResources(classId.value);

    // 检查返回的结果是否成功
    if (res && res.code === 200) {
      //console.log("获取学习资源信息成功", res.data);
      resources.value = res.data
   } else {
      console.error("获取学习资源数据失败", res);
    }
  } catch (error){
    console.error("请求发生错误：", error)
  }
}

// 记载页面时记载方法
onMounted( async () => {
  await getimgCarousel()
  await getCommittee()
  await getActivitie()
  await getStudyResource()
})
</script>

<template>
  <main class="w-full flex-grow flex flex-col justify-between -my-10">
    <!-- 图片轮播图 -->
    <div class="block md:hidden">
      <el-carousel arrow="always" height="220px">
        <el-carousel-item v-for="(image, index) in (carouselImages.length ? carouselImages : [{ imgCarouselUrl: 'https://img0.baidu.com/it/u=1760989771,2332546193&fm=253&fmt=auto&app=138&f=JPEG?w=1024&h=405' }])" :key="index" >
          <img :src="image.imgCarouselUrl" class="w-full h-full md:h-full" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="hidden lg:block">
      <el-carousel arrow="always" height="500px">
        <el-carousel-item v-for="(image, index) in (carouselImages.length ? carouselImages : [{ imgCarouselUrl: 'https://img0.baidu.com/it/u=1760989771,2332546193&fm=253&fmt=auto&app=138&f=JPEG?w=1024&h=405' }])" :key="index">
          <img :src="image.imgCarouselUrl" class="w-full h-full md:h-full" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="hidden lg:hidden md:block">
      <el-carousel arrow="always" height="400px">
        <el-carousel-item v-for="(image, index) in (carouselImages.length ? carouselImages : [{ imgCarouselUrl: 'https://img0.baidu.com/it/u=1760989771,2332546193&fm=253&fmt=auto&app=138&f=JPEG?w=1024&h=405' }])" :key="index">
          <img :src="image.imgCarouselUrl" class="w-full h-full md:h-full" />
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
            <el-table-column prop="classrolesName" label="职位" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="committeeName" label="姓名" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="phone" label="电话" class="text-left border-b border-gray-300" />
          </el-table>
        </div>
      </div>

      <!-- 班级活动信息展示区域 -->
      <div class="w-full md:w-1/3 bg-red-200 flex flex-col items-center justify-center min-h-[310px] rounded-2xl shadow-lg p-4 transition-transform duration-300 transform hover:scale-105">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">班级活动</h3>
        <div class="w-full h-full max-h-[200px] overflow-y-auto">
          <el-table :data="activities" :table-layout="tableLayout" class="w-full h-full border border-gray-300">
            <el-table-column prop="activiteName" label="活动名称" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="address" label="活动地点" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="activiteDate" label="活动日期" width="150" class="text-left border-b border-gray-300" />
          </el-table>
        </div>
      </div>

      <!-- 学习资源展示区域 -->
      <div class="w-full md:w-1/3 bg-yellow-200 flex flex-col items-center justify-center min-h-[310px] rounded-2xl shadow-lg p-4 transition-transform duration-300 transform hover:scale-105">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">学习资源</h3>
        <div class="w-full h-full max-h-[200px] overflow-y-auto">
          <el-table :data="resources" :table-layout="tableLayout" class="w-full h-full border border-gray-300">
            <el-table-column prop="studyResourcesName" label="资源名称" width="150" class="text-left border-b border-gray-300" />
            <el-table-column prop="studyResourcesUrl" label="链接" class="text-left border-b border-gray-300">
              <template #default="{ row }">
                <a :href="row.studyResourcesUrl" target="_blank" class="hover:underline text-blue-600">
                  {{ row.studyResourcesUrl }}
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
