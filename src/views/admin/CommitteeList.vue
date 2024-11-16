<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { User, Plus } from '@element-plus/icons-vue';

const loading = ref(false);
const dialogVisible = ref(false);

const currentCommittee = ref({
  id: '',
  position: '',
  name: '',
  phone: ''
});

// 模拟班委数据
const committees = ref([
  {
    id: 1,
    position: '班长',
    name: '张三',
    phone: '123456789'
  },
  {
    id: 2,
    position: '团支书',
    name: '刘帅',
    phone: '123456768'
  },
  {
    id: 3,
    position: '学习委员',
    name: '席潭田',
    phone: '123456789'
  }
]);

// 处理编辑
const handleEdit = (row) => {
  currentCommittee.value = { ...row };
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  committees.value = committees.value.filter(item => item.id !== row.id);
  ElMessage.success('删除成功');
};

// 处理保存
const handleSave = () => {
  if (!currentCommittee.value.position || !currentCommittee.value.name || !currentCommittee.value.phone) {
    ElMessage.warning('请填写完整信息');
    return;
  }

  const index = committees.value.findIndex(item => item.id === currentCommittee.value.id);
  if (index > -1) {
    committees.value[index] = { ...currentCommittee.value };
  } else {
    committees.value.push({
      ...currentCommittee.value,
      id: Date.now()
    });
  }
  
  dialogVisible.value = false;
  ElMessage.success('保存成功');
};
</script>

<template>
  <div class="committee-management">
    <!-- 顶部操作栏 -->
    <div class="mb-6 flex justify-end">
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon class="mr-1"><Plus /></el-icon>添加班委
      </el-button>
    </div>

    <!-- 班委列表表格 -->
    <el-card shadow="hover" class="committee-table">
      <el-table
        :data="committees"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="position" label="职位" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column prop="phone" label="电话" min-width="120" />
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
      :title="currentCommittee.id ? '编辑班委' : '添加班委'"
      width="500px"
    >
      <el-form :model="currentCommittee" label-width="100px">
        <el-form-item label="职位" required>
          <el-select v-model="currentCommittee.position" style="width: 100%">
            <el-option label="班长" value="班长" />
            <el-option label="团支书" value="团支书" />
            <el-option label="学习委员" value="学习委员" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-input v-model="currentCommittee.name" />
        </el-form-item>
        <el-form-item label="电话" required>
          <el-input v-model="currentCommittee.phone" />
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
.committee-management {
  @apply p-4;
}
</style> 