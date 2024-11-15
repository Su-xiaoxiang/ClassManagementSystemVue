<script setup>
import { computed, onMounted, ref } from 'vue';
import { getUserClassSituation } from '@/api/UserInfo/UserSituation.js';
import { getInfo } from '@/utils/storage.js';

// 获取当前用户ID
const userId = ref('');
userId.value = getInfo().classId;

// 上课情况数据
const attendanceData = ref([]);

// 查询日期
const queryDate = ref('');

// 添加日期格式化函数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 获取个人上课情况信息
const getUserClassSituations = async () => {
  try {
    const res = await getUserClassSituation(userId.value);

    // 检查返回的结果是否成功
    if (res && res.code === 200) {
      console.log("获取个人信息成功", res.data);
      attendanceData.value = res.data;
    } else {
      console.error("获取个人信息失败", res);
    }
  } catch (error) {
    console.error("请求发生错误：", error);
  }
};

// 计算过滤后的上课情况数据
const filteredAttendanceData = computed(() => {
  return queryDate.value
    ? attendanceData.value.filter(item => {
        // 直接使用我们的 formatDate 函数来格式化两个日期进行比较
        const itemDate = formatDate(item.courseStatusDate);
        return itemDate === queryDate.value;
      })
    : attendanceData.value;
});

// 页面加载时获取个人信息
onMounted(async () => {
  await getUserClassSituations();
});
</script>

<template>
  <main class="flex flex-col w-full items-center p-10 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
    <h1 class="text-4xl font-extrabold text-center mb-10 text-blue-900">个人信息</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-7xl">
      <!-- 上课情况模块 - 设置为占据两列 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out lg:col-span-2">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">个人上课情况</h2>
        <div class="mb-6">
          <label for="queryDate" class="block text-gray-700 mb-2">查询日期:</label>
          <div class="flex items-center">
            <input
              type="date"
              id="queryDate"
              v-model="queryDate"
              class="border border-gray-300 rounded-lg p-2 w-2/3"
            />
          </div>
        </div>
        <div class="flex-grow overflow-y-auto border-t-2 border-gray-100 mt-4 pt-4 max-h-[300px]">
          <el-table :data="filteredAttendanceData" style="width: 100%" class="text-sm">
            <el-table-column prop="courseStatusDate" label="日期" width="150">
              <template #default="{ row }">
                {{ formatDate(row.courseStatusDate) }}
              </template>
            </el-table-column>
            <el-table-column prop="courseName" label="课程" width="150" />
            <el-table-column prop="courseStatus" label="状态" width="100">
              <template #default="{ row }">
                <span :class="{
                  'text-green-500': row.courseStatus === '正常',
                  'text-yellow-500': row.courseStatus === '迟到',
                  'text-red-500': row.courseStatus === '旷课',
                  'text-blue-500': row.courseStatus === '早退'
                }">
                  {{ row.courseStatus }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="courseDescription" label="备注" />
          </el-table>
        </div>
      </div>

      <!-- 课外活动模块 - 设置为占据一列 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out lg:col-span-2">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">课外活动</h2>
        <div class="flex-grow overflow-y-auto border-t-2 border-gray-100 mt-4 pt-4 max-h-[300px]">
          <el-table :data="activitiesData" style="width: 100%" class="text-sm">
            <el-table-column prop="name" label="活动名称" width="150" />
            <el-table-column prop="role" label="角色" width="100" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </div>
      </div>

      <!-- 实习信息模块 - 设置为占据三列 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out lg:col-span-4">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">实习信息</h2>
        <div class="flex-grow overflow-y-auto border-t-2 border-gray-100 mt-4 pt-4 max-h-[300px]">
          <el-table :data="internshipData" style="width: 100%" class="text-sm">
            <el-table-column prop="company" label="公司" width="150" />
            <el-table-column prop="position" label="职位" width="150" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </div>
      </div>
    </div>
  </main>

  <!-- 版权栏 -->
  <footer class="bg-gray-900 text-white py-8 w-full mt-10">
    <div class="container mx-auto text-center">
      <p class="text-lg font-light">
        版权所有© Copyright 2024-现在 灵诺科技工作室所有 | 版本 V-1.0.0
      </p>
      <p class="text-xs text-gray-400 mt-2">
        Powered by <span class="text-blue-400">LingNuo Studio</span> | All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<style scoped>
main {
  background-color: #f3f4f6;
}

h1 {
  color: #1e3a8a;
}

h2 {
  color: #2563eb;
}

.el-table {
  border-collapse: collapse;
  border-spacing: 0;
}

.el-table th,
.el-table td {
  padding: 12px;
}

.el-table th {
  background-color: #f9fafb;
}

.el-table tr:nth-child(odd) {
  background-color: #f1f5f9;
}

footer {
  background-color: #1f2937;
  color: #ffffff;
}

footer p {
  margin: 0;
  font-size: 0.9rem;
}

footer span {
  color: #60a5fa;
}
</style>
