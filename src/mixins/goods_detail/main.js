import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    goods_id: '',
    goodsInfo: [],
    addressInfo: null
  }
  onLoad(options) {
    this.goods_id = options.goods_id
    this.getGoodsInfo()
  }
  methods = {
    // 点击预览图片
    preview(current) {
      wepy.previewImage({
        urls: this.goodsInfo.pics.map(x => x.pics_big),
        current: current
      })
    },
    // 获取用户的收获地址
    async chooseAddress() {
      const res = await wepy.chooseAddress().catch(err => err)
      if (res.errMsg !== 'chooseAddress:ok') {
        return wepy.basicToast('获取收获地址失败')
      }
      this.addressInfo = res
      wepy.setStorageSync('address', res)
      this.$apply()
    },
    // 添加到购物车
    addToCart() {
      this.$parent.addGoodsToCart(this.goodsInfo)
      wepy.showToast({
        title: '已添加到购物车',
        icon: 'success'
      })
    }
  }
  computed = {
    addressStr() {
      if (this.addressInfo === null) {
        return '请输入地址'
      }
      const addr = this.addressInfo
      const str = addr.provinceName + addr.cityName + addr.countyName + addr.detailInfo
      return str
    }
  }

  // 获取商品详情
  async getGoodsInfo() {
    const {
      data: res
    } = await wepy.get('/goods/detail', {
      goods_id: this.goods_id
    })
    if (res.meta.status !== 200) {
      return basicToast('获取商品详情失败')
    }
    this.goodsInfo = res.message
    console.log(this.goodsInfo)
    this.$apply()
  }
}
