import request from '@/utils/request.js'
// 获取轮播图片
export const getImgCarousel = (classId) => {
  return request.get('/getImgCarousel', {
    params: {
      classId
    }
  })
}

// 获取班委信息
export  const getCLassCommittee = (classId) => {
  return request.get('/getCLassCommittee', {
    params: {
      classId
    }
  })
}
// 获取活动信息
export  const  getActivities = (classId) => {
  return request.get('/getActivities', {
    params: {
      classId
    }
  })
}
