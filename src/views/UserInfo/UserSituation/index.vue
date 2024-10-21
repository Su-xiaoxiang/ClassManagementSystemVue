<script setup>
import { computed, ref } from 'vue'

// 示例上课情况数据
const attendanceData = [
  { date: '2024-10-01', course: '数学', status: '正常', remark: '准时到达' },
  { date: '2024-10-02', course: '英语', status: '迟到', remark: '迟到5分钟' },
  { date: '2024-10-03', course: '计算机', status: '旷课', remark: '未到' },
  { date: '2024-10-04', course: '物理', status: '正常', remark: '准时到达' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
  { date: '2024-10-05', course: '化学', status: '迟到', remark: '迟到10分钟' },
];

// 示例课表数据
const timetableData = [
  {
    day: '星期一', courses: [
      { week: 1, course: '数学', time: '9:00 - 11:00', location: '教室A101' },
      { week: 1, course: '英语', time: '13:00 - 15:00', location: '教室B202' }
    ]
  },
  {
    day: '星期二', courses: [
      { week: 1, course: '计算机', time: '10:00 - 12:00', location: '教室C303' }
    ]
  },
  {
    day: '星期三', courses: [
      { week: 2, course: '物理', time: '14:00 - 16:00', location: '教室D404' },
      { week: 3, course: '化学', time: '10:00 - 12:00', location: '教室E505' }
    ]
  },
  {
    day: '星期四', courses: [
      { week: 2, course: '生物', time: '9:00 - 11:00', location: '教室F606' }
    ]
  },
  {
    day: '星期五', courses: [
      { week: 1, course: '历史', time: '13:00 - 15:00', location: '教室G707' }
    ]
  },
  {
    day: '星期六', courses: [
      { week: 1, course: '历史', time: '13:00 - 15:00', location: '教室G707' }
    ]
  },
  {
    day: '星期日', courses: [

    ]
  }
];

// 示例课外活动数据
const activitiesData = [
  { name: '学生会', role: '成员', description: '参与组织各类校园活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
  { name: '志愿者活动', role: '志愿者', description: '参与社区服务和志愿活动' },
];

// 示例实习信息数据
const internshipData = [
  { company: '科技有限公司', position: '实习生', description: '参与软件开发项目，协助开发新功能' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
  { company: '营销公司', position: '市场实习生', description: '协助市场调研和数据分析' },
];

// 查询日期
const queryDate = ref('');

// 根据日期过滤上课情况
const filteredAttendanceData = computed(() => {
  return queryDate.value
    ? attendanceData.filter(item => item.date === queryDate.value)
    : attendanceData;
});
</script>
<template>
  <main class="flex flex-col w-full items-center p-10 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
    <h1 class="text-4xl font-extrabold text-center mb-10 text-blue-900">个人信息</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
      <!-- 上课情况模块 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
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
            <button @click="filterAttendance" class="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 shadow-md">查询</button>
          </div>
        </div>
        <div class="flex-grow overflow-y-auto  border-t-2 border-gray-100 mt-4 pt-4 max-h-[300px]">
          <el-table :data="filteredAttendanceData" style="width: 100%" class="text-sm">
            <el-table-column prop="date" label="日期" width="150" />
            <el-table-column prop="course" label="课程" width="150" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <span :class="{
                  'text-green-500': row.status === '正常',
                  'text-yellow-500': row.status === '迟到',
                  'text-red-500': row.status === '旷课'
                }">
                  {{ row.status }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" />
          </el-table>
        </div>
      </div>

      <!-- 课表查询模块 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">课表查询</h2>
        <div class="flex-grow overflow-y-auto border-t-2 border-gray-100 mt-4 pt-4 max-h-[300px]">
          <div v-for="(day, index) in timetableData" :key="index" class="mb-6">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">{{ day.day }}</h3>
            <el-table :data="day.courses" style="width: 100%" class="text-sm">
              <el-table-column prop="week" label="第几周" width="100" />
              <el-table-column prop="course" label="课程" />
              <el-table-column prop="time" label="时间" width="150" />
              <el-table-column prop="location" label="地点" width="150" />
            </el-table>
          </div>
        </div>
      </div>

      <!-- 课外活动模块 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">课外活动</h2>
        <div class="flex-grow overflow-y-auto  border-t-2 border-gray-100 mt-4 pt-4  max-h-[300px]">
          <el-table :data="activitiesData" style="width: 100%" class="text-sm">
            <el-table-column prop="name" label="活动名称" width="150" />
            <el-table-column prop="role" label="角色" width="100" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </div>
      </div>

      <!-- 实习信息模块 -->
      <div class="bg-white shadow-xl rounded-lg flex flex-col p-8 h-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">实习信息</h2>
        <div class="flex-grow overflow-y-auto  border-t-2 border-gray-100 mt-4 pt-4  max-h-[300px]">
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

<script setup>
import { computed, ref } from 'vue'

// 示例数据省略...
</script>

<style scoped>
main {
  background-color: #f3f4f6; /* 背景颜色 */
}

h1 {
  color: #1e3a8a; /* 主标题颜色 */
}

h2 {
  color: #2563eb; /* 子标题颜色 */
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
