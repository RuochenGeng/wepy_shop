import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    categoryList: []
  }
  methods = {}
  onLoad() {
    this.getCategoryList()
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
    console.log(res.message)
    this.$apply()
  }
}
