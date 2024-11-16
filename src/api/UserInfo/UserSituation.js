import request from '@/utils/request.js'

// 获取用户上课情况
export const getUserClassSituation = (userId) => {
  return request.get('/getUserClassSituation', {
    params: {
      userId
    }
  })
}
// 获取用户活动情况
export const getUserExtracurricularActivitie = (userId) => {
  return request.get('/getUserExtracurricularActivities', {
    params: {
      userId
    }
  })
}
// 获取用户实习情况
export const getInternshipinformations = (userId) => {
  return request.get('/getInternshipinformation', {
    params: {
      userId
    }
  })
}
