import request from '@/utils/request.js'
// 管理员获取用户
export const adminSelectUser = (classId) => {
  return request.get('/admin/selectUser', {
    params: {
      classId
    }
  })
}
