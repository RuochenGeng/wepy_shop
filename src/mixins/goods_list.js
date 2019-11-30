import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    goodsList: [],
    total: 0,
    isOver: false,
    isLoading: false
  }
  methods = {
    goGoodsDatail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    }
  }
  onLoad(options) {
    this.query = options.query || ''
    this.cid = options.cid || ''
    this.getGoodList()
  }
  // 获取商品列表数据
  async getGoodList() {
    this.isLoading = true
    const {
      data: res
    } = await wepy.get('/goods/search', {
      query: this.query,
      cid: this.cid,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
    if (res.meta.status !== 200) {
      return wepy.basicToast('获取商品列表数据失败')
    }
    this.goodsList = [...this.goodsList, ...res.message.goods]
    this.total = res.message.total
    this.isLoading = false
    this.$apply()
    wepy.stopPullDownRefresh()
  }
  // 触底操作
  onReachBottom() {
    if (this.isLoading) {
      return
    }
    if (this.pagenum * this.pagesize >= this.total) {
      this.isOver = true
      return
    }
    this.pagenum++
    this.getGoodList()
  }
  // 下拉刷新
  onPullDownRefresh() {
    this.pagenum = 1,
      this.total = 0,
      this.goodsList = [],
      this.isOver = this.isLoading = false
    this.getGoodList()
  }
}
