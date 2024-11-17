import request from '@/utils/request.js'
// 管理员获取用户
export const adminSelectUser = (classId) => {
  return request.get('/admin/selectUser', {
    params: {
      classId
    }
  })
}
// 管理员获取权限
export const getRolesList = () => {
  return request.get('/admin/getRolesList')
}
// 初始化用户密码
export const updateUserPassword = (userId) => {
  return request.get('/admin/updateUserPassword',{
     params:{
       userId
     }
  })
}
// 删除用户
export const delectUserByUserId = (userId) => {
  return request.delete('/admin/delectUserByUserId',{
     params:{
       userId
     }
  })
}
// 更新用户
export const updateUser = (id,name,job) => {
  return request.post('/admin/updateUser',{
       id,
       name,
       job
  })
}
