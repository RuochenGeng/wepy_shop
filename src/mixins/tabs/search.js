import wepy from 'wepy'

const STORAGE_KEY = 'KW'
export default class extends wepy.mixin {
  data = {
    value: '',
    suggestList: [],
    timer: -1,
    kwList: []
  }
  onLoad() {
    this.kwList = wepy.setStorageSync('kw') || []
  }

  onShow() {
    this.value = ''
  }

  methods = {
    // 在用户点击键盘上的搜索按钮触发
    onSearch() {
      const kw = this.value
      if (kw.length > 0) {
        wepy.navigateTo({
          url: '/pages/goods_list?query=' + kw
        })
      }
      // 把用户填写的搜索历史记录在setStorage中
      if (this.kwList.indexOf(kw) === -1) {
        this.kwList.unshift(kw)
      }
      this.kwList = this.kwList.slice(0, 10)
      wepy.setStorageSync('kw', this.kwList)
    },
    // 在用户点击搜索框右侧取消按钮时触发
    onCancel() {},
    onChange(e) {
      this.value = e.detail.trim()
      if (this.value.length === 0) {
        this.suggestList = ''
        return
      }
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.getSuggestList()
      }, 500)
    },
    // 跳转商品详情页
    goGoodsDetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    },
    // 跳转商品分类页面
    goGoodsList(query) {
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + query
      })
    },
    // 清出搜索历史
    clearHistory() {
      this.kwList = []
      wepy.setStorageSync('kw', [])
    }
  }
  // 计算属性
  computed = {
    isShowHistory() {
      if (this.value.length <= 0) {
        return true
      }
      return false
    }
  }
  // 搜索关键字，获取信息
  async getSuggestList() {
    const {
      data: res
    } = await wepy.get('/goods/qsearch', {
      query: this.value
    })
    if (res.meta.status !== 200) {
      return wepy.basicToast('获取信息失败')
    }
    this.suggestList = res.message
    this.$apply()
  }

}
