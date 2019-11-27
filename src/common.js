import wepy from 'wepy'
const BASE_URL = 'https://www.zhengzhicheng.cn/api/public/v1'
wepy.basicToast = (title = '请求失败', isOk = false) => wepy.showToast({
  title,
  icon: isOk ? 'success' : 'none',
  duration: 2000
})

wepy.get = (url, data) => req(url, data)
wepy.post = (url, data) => req(url, data, isPost)

function req(url, data = {}, isPost = false) {
  return wepy.request({
    url: BASE_URL + url,
    data,
    method: isPost ? 'post' : 'get'
  })
}
