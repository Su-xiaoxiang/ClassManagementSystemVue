<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Calendar, Plus } from '@element-plus/icons-vue';

const loading = ref(false);
const dialogVisible = ref(false);

const currentActivity = ref({
  id: '',
  activityName: '',
  location: '',
  activityDate: ''
});

// 模拟活动数据
const activities = ref([
  {
    id: 1,
    activityName: '网页设计大赛',
    location: '淮河校区',
    activityDate: '2024-11-17'
  }
]);

// 处理编辑
const handleEdit = (row) => {
  currentActivity.value = { ...row };
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  activities.value = activities.value.filter(item => item.id !== row.id);
  ElMessage.success('删除成功');
};

// 处理保存
const handleSave = () => {
  if (!currentActivity.value.activityName || !currentActivity.value.location || !currentActivity.value.activityDate) {
    ElMessage.warning('请填写完整信息');
    return;
  }

  const index = activities.value.findIndex(item => item.id === currentActivity.value.id);
  if (index > -1) {
    activities.value[index] = { ...currentActivity.value };
  } else {
    activities.value.push({
      ...currentActivity.value,
      id: Date.now()
    });
  }
  
  dialogVisible.value = false;
  ElMessage.success('保存成功');
};
</script>

<template>
  <div class="activity-management">
    <!-- 顶部操作栏 -->
    <div class="mb-6 flex justify-end">
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon class="mr-1"><Plus /></el-icon>添加活动
      </el-button>
    </div>

    <!-- 活动列表表格 -->
    <el-card shadow="hover" class="activity-table">
      <el-table
        :data="activities"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="activityName" label="活动名称" min-width="120" />
        <el-table-column prop="location" label="活动地点" min-width="120" />
        <el-table-column prop="activityDate" label="活动日期" min-width="120" />
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑/添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentActivity.id ? '编辑活动' : '添加活动'"
      width="500px"
    >
      <el-form :model="currentActivity" label-width="100px">
        <el-form-item label="活动名称" required>
          <el-input v-model="currentActivity.activityName" />
        </el-form-item>
        <el-form-item label="活动地点" required>
          <el-input v-model="currentActivity.location" />
        </el-form-item>
        <el-form-item label="活动日期" required>
          <el-date-picker
            v-model="currentActivity.activityDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.activity-management {
  @apply p-4;
}
</style> 