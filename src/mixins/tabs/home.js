import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    swiperList: [],
    cateItems: [],
    floorList: []
  }
  methods = {
    goGoodsList(url) {
      wepy.navigateTo({url})
    }
  }
  onLoad() {
    this.getSwiperList()
    this.getcateItems()
    this.getFloorList()
  }
  // 获取轮播图数据
  async getSwiperList() {
    const {
      data: res
    } = await wepy.get(
      '/home/swiperdata'
    )
    if (res.meta.status !== 200) {

      return wepy.basicToast('轮播图 数据请求失败')
    }
    this.swiperList = res.message
    this.$apply()
  }
  // 获取首页分类数据
  async getcateItems() {
    const {
      data: res
    } = await wepy.get(
      '/home/catitems'
    )
    if (res.meta.status !== 200) {
      return wepy.basicToast('分类数据请求失败')
    }
    this.cateItems = res.message
    console.log(this.cateItems)
    this.$apply()
  }
  // 获取楼层数据
  async getFloorList() {
    const {
      data: res
    } = await wepy.get('/home/floordata')
    if (res.meta.status !== 200) {
      return wepy.basicToast('楼层数据请求失败')
    }
    this.floorList = res.message
    console.log(res.message)

    this.$apply()
  }
}
