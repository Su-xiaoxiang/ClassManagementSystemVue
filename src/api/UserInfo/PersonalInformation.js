import request from '@/utils/request.js'
// 获取个人信息
export const getPersonalInformation = (userId) => {
  return request.get('/getPersonalInformation', {
    params: {
      userId
    }
  })
}
