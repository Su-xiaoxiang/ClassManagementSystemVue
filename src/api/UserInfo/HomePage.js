import request from '@/utils/request.js'
// 获取轮播图片
export let getImgCarousel= () => {
   return request.get('/getImgCarousel')
}
