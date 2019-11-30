import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    goodsList: [],
    total: 0
  }
  methods = {}
  onLoad(options) {
    console.log(options)
    this.query = options.query || ''
    this.cid = options.cid || ''
    this.getGoodList()
  }
  // 获取商品列表数据
  async getGoodList() {
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
    console.log(res)
    this.$apply()
  }
  onReachBottom() {
    this.pagenum++
    this.getGoodList()
  }
}
