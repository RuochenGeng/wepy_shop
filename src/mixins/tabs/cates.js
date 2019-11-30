import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    categoryList: [],
    secondCategoryList: [],
    active: 0,
    windowHeight: 0
  }
  methods = {
    // 切换分类时触发
    onChange(event) {
      this.active = event.detail
      this.secondCategoryList = this.categoryList[this.active].children
    },
    // 点击跳转到商品列表页面
    goGoodsList(id) {
      wepy.navigateTo({
        url: '/pages/goods_list?cid=' + id
      })
      console.log(id)
    }
  }
  onLoad() {
    this.getCategoryList()
    this.getWindowHeight()
  }
  // 获取分类数据
  async getCategoryList() {
    const {
      data: res
    } = await wepy.get(
      '/categories'
    )
    if (res.meta.status !== 200) {

      return wepy.basicToast('分类 数据请求失败')
    }
    this.categoryList = res.message
    this.secondCategoryList = this.categoryList[this.active].children
    this.$apply()
  }
  // 获取左边栏高度
  async getWindowHeight() {
    try {
      const {
        windowHeight
      } = await wepy.getSystemInfo()
      this.windowHeight = windowHeight
      this.$apply()
    } catch (error) {}
  }
}
