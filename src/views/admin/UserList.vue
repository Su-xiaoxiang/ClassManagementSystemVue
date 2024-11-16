<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Search, Key, Warning } from '@element-plus/icons-vue';
import { getInfo } from '@/utils/storage.js'
import { adminSelectUser } from  '@/api/admin/index.js'
// 分页相关参数
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);
const searchQuery = ref('');
const dialogVisible = ref(false);
const AdddialogVisible = ref(false);
const showSearchResult = ref(false);
const resetPasswordVisible = ref(false);
const currentResetUser = ref(null);
// 获取当前用户班级ID
const classId = ref('')
classId.value = getInfo().classId
const currentUser = ref({
  username: '',
  name: '',
  job: '',
  className: '',
});
const AddcurrentUser = ref({
  username: '',
  name: '',
  job: '',
});
// 生成模拟用户数据
const users = ref([])

// 搜索防抖
const searchTimeout = ref(null);
const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = setTimeout(() => {
    showSearchResult.value = searchQuery.value !== '';
    updateTotal();
  }, 300);
};

// 过滤用户
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;

  const searchTerm = searchQuery.value.toLowerCase().trim();
  return users.value.filter(user =>
    user.username.toLowerCase().includes(searchTerm)
  );
});

// 分页后的用户数据
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredUsers.value.slice(start, end);
});

// 更新总数
const updateTotal = () => {
  total.value = filteredUsers.value.length;
};

// 处理页码改变
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

// 处理每页条数改变
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1;
};

// 处理编辑
const handleEdit = (row) => {
  currentUser.value = { ...row };
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  users.value = users.value.filter(user => user.id !== row.id);
  ElMessage.success('删除成功');
};

// 处理保存
const handleSave = () => {
  if (!currentUser.value.userId || !currentUser.value.name) {
    ElMessage.warning('请填写必要信息');
    return;
  }

  const index = users.value.findIndex(user => user.id === currentUser.value.id);
  if (index > -1) {
    users.value[index] = { ...currentUser.value };
  } else {
    users.value.push({
      ...currentUser.value,
      id: Date.now(),
      createTime: new Date().toISOString().split('T')[0]
    });
  }

  dialogVisible.value = false;
  ElMessage.success('保存成功');
};
// 函数
//获取用户信息
const adminSelectUsers = async () => {
  try {
    const res = await adminSelectUser(classId.value)

    // 检查返回的结果是否成功
    if (res && res.code === 200) {
      console.log("获取个人信息成功", res.data);
      users.value = res.data
    } else {
      console.error("获取个人信息失败", res);
    }
  } catch (error){
    console.error("请求发生错误：", error)
  }

}
// 监听搜索结果变化
watch(filteredUsers, () => {
  updateTotal();
  currentPage.value = 1;
});

onMounted(async () => {
  await adminSelectUsers()
  updateTotal();
});

// 添加重置密码相关方法
const handleResetPassword = (row) => {
  currentResetUser.value = row;
  resetPasswordVisible.value = true;
};

const confirmResetPassword = () => {
  // 这里添加实际的密码重置逻辑
  ElMessage.success(`已重置用户 ${currentResetUser.value.name} 的密码为：123456`);
  resetPasswordVisible.value = false;
  currentResetUser.value = null;
};
</script>

<template>
  <div class="users-management">
    <!-- 顶部操作栏 -->
    <div class="mb-6 flex flex-wrap justify-between items-center gap-4">
      <div class="search-box flex-grow max-w-md relative">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户名、姓名或班级..."
          class="custom-search-input"
          :prefix-icon="Search"
          clearable
          @input="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch">
              搜索
            </el-button>
          </template>
        </el-input>

        <!-- 搜索结果提示 -->
        <div v-if="showSearchResult" class="search-result-tip">
          找到 {{ filteredUsers.length }} 条结果
        </div>
      </div>
      <el-button type="primary" @click="AdddialogVisible = true">
        添加用户
      </el-button>
    </div>

    <!-- 用户列表表格 -->
    <el-card shadow="hover" class="user-table">
      <el-table
        :data="paginatedUsers"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column prop="job" label="职务" min-width="120" />
        <el-table-column prop="className" label="班级" min-width="120" />
        <el-table-column label="密码操作" min-width="120">
          <template #default="{ row }">
            <el-button
              size="small"
              type="warning"
              class="reset-password-btn"
              @click="handleResetPassword(row)"
            >
              <template #icon>
                <el-icon class="mr-1"><Key /></el-icon>
              </template>
              重置密码
            </el-button>
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

      <!-- 分页 -->
      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="'编辑用户'"
      width="500px"
    >
      <el-form :model="currentUser" label-width="100px">
        <el-form-item label="用户名" required>
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-input v-model="currentUser.name" />
        </el-form-item>
        <el-form-item label="职务" >
          <el-select  v-model="currentUser.job" style="width: 100%">
            <el-option label="班长" value="2" />
            <el-option label="团支书" value="3" />
            <el-option label="学习委员" value="4" />
            <el-option label="学生" value="9" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="currentUser.className" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
      </template>
    </el-dialog>

 <!-- 增加编辑对话框 -->
    <el-dialog
      v-model="AdddialogVisible"
      :title="'添加用户'"
      width="500px"
    >
      <el-form :model="AddcurrentUser" label-width="100px">
        <el-form-item label="用户名" required>
          <el-input v-model="AddcurrentUser.username" />
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-input v-model="AddcurrentUser.name" />
        </el-form-item>
        <el-form-item label="职务" >
          <el-select  v-model="AddcurrentUser.job" style="width: 100%">
            <el-option label="班长" value="2" />
            <el-option label="团支书" value="3" />
            <el-option label="学习委员" value="4" />
            <el-option label="学生" value="9" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加重置密码确认对话框 -->
    <el-dialog
      v-model="resetPasswordVisible"
      title="重置密码确认"
      width="400px"
    >
      <div class="text-center">
        <el-icon class="text-5xl text-warning mb-4"><Warning /></el-icon>
        <p class="text-lg mb-2">确定要重置该用户的密码吗？</p>
        <p class="text-gray-500 text-sm">重置后的默认密码将为：123456</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetPasswordVisible = false">取消</el-button>
          <el-button type="warning" @click="confirmResetPassword">
            确认重置
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.users-management {
  @apply p-4;
}

.custom-search-input {
  @apply transition-all duration-300;
}

.custom-search-input :deep(.el-input__wrapper) {
  @apply shadow-sm hover:shadow transition-shadow duration-300;
}

.custom-search-input :deep(.el-input__inner) {
  @apply text-gray-700;
}

.custom-search-input :deep(.el-input__inner)::placeholder {
  @apply text-gray-400;
}

.custom-search-input :deep(.el-input-group__append) {
  @apply bg-blue-500 border-blue-500;
}

.custom-search-input :deep(.el-input-group__append button) {
  @apply text-white border-none bg-transparent;
}

.custom-search-input :deep(.el-input-group__append button:hover) {
  @apply bg-blue-600;
}

/* 搜索结果提示样式 */
.search-result-tip {
  @apply absolute -bottom-6 left-0 text-sm text-gray-500 mt-1;
}

/* 分页样式 */
.el-pagination {
  @apply mt-4 py-2;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  @apply bg-blue-500;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  @apply text-blue-500;
}

.reset-password-btn {
  @apply transition-all duration-300 flex items-center justify-center;
}

.reset-password-btn:hover {
  @apply transform scale-105;
}

:deep(.el-button.reset-password-btn) {
  @apply bg-gradient-to-r from-yellow-400 to-yellow-500 border-none text-white;
}

:deep(.el-button.reset-password-btn:hover) {
  @apply from-yellow-500 to-yellow-600;
}

/* 对话框图标样式 */
.el-icon.text-warning {
  @apply text-yellow-500;
}

/* 确认对话框样式 */
:deep(.el-dialog) {
  @apply rounded-lg;
}

:deep(.el-dialog__header) {
  @apply text-center pb-0;
}

:deep(.el-dialog__body) {
  @apply py-6;
}

:deep(.el-dialog__footer) {
  @apply text-center;
}
</style>
