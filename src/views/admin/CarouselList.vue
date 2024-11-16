<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Picture, Plus } from '@element-plus/icons-vue';

// 分页相关参数
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);
const dialogVisible = ref(false);

// 上传相关
const uploadRef = ref(null);
const imageUrl = ref('');

// 当前编辑的轮播图数据
const currentCarousel = ref({
  id: '',
  imageUrl: '',
  isShow: true,
});

// 模拟轮播图数据
const carousels = ref([
  {
    id: 1,
    imageUrl: 'https://placeholder.co/800x400',
    isShow: true,
  },
  {
    id: 2,
    imageUrl: 'https://placeholder.co/800x400',
    isShow: false,
  },
]);

// 图片上传前的验证
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('只能上传图片文件！');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！');
    return false;
  }
  return true;
};

// 处理图片上传
const handleUploadSuccess = (response) => {
  imageUrl.value = response.url; // 根据实际响应结构调整
  currentCarousel.value.imageUrl = response.url;
  ElMessage.success('图片上传成功');
};

// 处理上传失败
const handleUploadError = () => {
  ElMessage.error('图片上传失败，请重试');
};

// 分页数据
const paginatedCarousels = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return carousels.value.slice(start, end);
});

// 更新总数
const updateTotal = () => {
  total.value = carousels.value.length;
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
  currentCarousel.value = { ...row };
  imageUrl.value = row.imageUrl;
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  carousels.value = carousels.value.filter(item => item.id !== row.id);
  ElMessage.success('删除成功');
};

// 处理保存
const handleSave = () => {
  if (!currentCarousel.value.imageUrl) {
    ElMessage.warning('请上传轮播图片');
    return;
  }

  const index = carousels.value.findIndex(item => item.id === currentCarousel.value.id);
  if (index > -1) {
    carousels.value[index] = { ...currentCarousel.value };
  } else {
    carousels.value.push({
      ...currentCarousel.value,
      id: Date.now(),
    });
  }
  
  dialogVisible.value = false;
  ElMessage.success('保存成功');
};

// 处理状态改变
const handleStatusChange = (row) => {
  const index = carousels.value.findIndex(item => item.id === row.id);
  if (index > -1) {
    carousels.value[index].isShow = row.isShow;
    ElMessage.success(`已${row.isShow ? '显示' : '隐藏'}该轮播图`);
  }
};
</script>

<template>
  <div class="carousel-management">
    <!-- 顶部操作栏 -->
    <div class="mb-6 flex justify-end">
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon class="mr-1"><Plus /></el-icon>添加轮播图
      </el-button>
    </div>

    <!-- 轮播图列表表格 -->
    <el-card shadow="hover" class="carousel-table">
      <el-table
        :data="paginatedCarousels"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column label="轮播图" min-width="200">
          <template #default="{ row }">
            <el-image
              :src="row.imageUrl"
              fit="cover"
              class="carousel-image"
              :preview-src-list="[row.imageUrl]"
            >
              <template #error>
                <div class="image-error">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="显示状态" min-width="120">
          <template #default="{ row }">
            <el-switch
              v-model="row.isShow"
              @change="handleStatusChange(row)"
            />
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

    <!-- 编辑/添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentCarousel.id ? '编辑轮播图' : '添加轮播图'"
      width="500px"
    >
      <el-form :model="currentCarousel" label-width="100px">
        <el-form-item label="轮播图" required>
          <el-upload
            ref="uploadRef"
            class="carousel-uploader"
            :show-file-list="false"
            action="/api/upload"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
          >
            <img v-if="imageUrl" :src="imageUrl" class="uploaded-image" />
            <el-icon v-else class="upload-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">建议尺寸：800x400px，大小不超过2MB</div>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="currentCarousel.isShow" />
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
.carousel-management {
  @apply p-4;
}

.carousel-image {
  @apply w-40 h-20 rounded-lg object-cover shadow-sm;
}

.image-error {
  @apply flex items-center justify-center h-20 bg-gray-100 rounded-lg;
}

.carousel-uploader {
  @apply border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-300;
}

.uploaded-image {
  @apply w-full h-40 object-cover rounded-lg;
}

.upload-icon {
  @apply text-3xl text-gray-400 p-20;
}

.upload-tip {
  @apply text-xs text-gray-500 mt-2;
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
</style> 