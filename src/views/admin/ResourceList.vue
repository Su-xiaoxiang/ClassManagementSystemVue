<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Link, Plus } from '@element-plus/icons-vue';

const loading = ref(false);
const dialogVisible = ref(false);

const currentResource = ref({
  id: '',
  resourceName: '',
  link: ''
});

// 模拟资源数据
const resources = ref([
  {
    id: 1,
    resourceName: '灵诺博客',
    link: 'https://www.lingnuo.top'
  }
]);

// 处理编辑
const handleEdit = (row) => {
  currentResource.value = { ...row };
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  resources.value = resources.value.filter(item => item.id !== row.id);
  ElMessage.success('删除成功');
};

// 处理保存
const handleSave = () => {
  if (!currentResource.value.resourceName || !currentResource.value.link) {
    ElMessage.warning('请填写完整信息');
    return;
  }

  const index = resources.value.findIndex(item => item.id === currentResource.value.id);
  if (index > -1) {
    resources.value[index] = { ...currentResource.value };
  } else {
    resources.value.push({
      ...currentResource.value,
      id: Date.now()
    });
  }
  
  dialogVisible.value = false;
  ElMessage.success('保存成功');
};
</script>

<template>
  <div class="resource-management">
    <!-- 顶部操作栏 -->
    <div class="mb-6 flex justify-end">
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon class="mr-1"><Plus /></el-icon>添加资源
      </el-button>
    </div>

    <!-- 资源列表表格 -->
    <el-card shadow="hover" class="resource-table">
      <el-table
        :data="resources"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="resourceName" label="资源名称" min-width="120" />
        <el-table-column label="链接" min-width="200">
          <template #default="{ row }">
            <a :href="row.link" target="_blank" class="text-blue-500 hover:text-blue-700">
              {{ row.link }}
            </a>
          </template>
        </el-table-column>
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
      :title="currentResource.id ? '编辑资源' : '添加资源'"
      width="500px"
    >
      <el-form :model="currentResource" label-width="100px">
        <el-form-item label="资源名称" required>
          <el-input v-model="currentResource.resourceName" />
        </el-form-item>
        <el-form-item label="链接" required>
          <el-input v-model="currentResource.link" />
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
.resource-management {
  @apply p-4;
}
</style> 