import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    cart: []
  }
  onLoad() {
    this.cart = this.$parent.globalData.cart
  }
  computed = {
    // 判断购物车是否为空
    isEmpty() {
      if (this.cart.length <= 0) {
        return true
      }
      return false
    },
    // 总价格。单位为分
    amount() {
      let total = 0
      this.cart.forEach(x => {
        if (x.isCheck) {
          total += x.price * x.count
        }
      })
      return total * 100
    },
    // 是否全选
    isFullchecked() {
      const allCount = this.cart.length
      let c = 0
      this.cart.forEach(x => {
        if (x.isCheck) {
          c++
        }
      })
      return allCount === c
    }
  }
  methods = {
    // 监听商品数量变化
    countChanged(e) {
      const count = e.detail
      const id = e.target.dataset.id
      this.$parent.updataGoodsCount(id, count)
    },
    // 复选框发生改变
    statusChanged(e) {
      const status = e.detail
      const id = e.target.dataset.id
      this.$parent.updataGoodsStatus(id, status)
    },
    // 点击删除对应的商品
    close(id) {
      this.$parent.remveGoodsById(id)
    },
    // 监听全选框
    onFullCheckChange(e) {
      this.$parent.updataAllGoodsStatus(e.detail)
    },
    // 提交订单
    submitOrder() {
      if (this.amount <= 0) {
        return wepy.baseToast('订单金额不能为空')
      }
      wepy.navigateTo({
        url: '/pages/order'
      })
    }
  }

}
