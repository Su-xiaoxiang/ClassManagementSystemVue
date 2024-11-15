import request from '@/utils/request.js'

// 获取用户上课情况ID
export const getUserClassSituation = (userId) => {
  return request.get('/getUserClassSituation', {
    params: {
      userId
    }
  })
}
