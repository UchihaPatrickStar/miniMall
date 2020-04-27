// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

// const types = ['pop', 'new', 'sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []},
    },
    currentType: 'pop',
    types: ['pop', 'new', 'sell'],
    showBackTop: false,
    top_distance: 1000,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  //-------------------网络请求函数------------------
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list
      // for(let item of list) {
      //   this.data.goods[type].list.push(item)
      // }
      const oldList = this.data.goods[type].list
      oldList.push(...list)

      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  //--------------------事件监听函数--------------------
  handleTabClick(event) {
    const index = event.detail.index
    // switch(index) {
    //   case 0: 
    //     currentType = 'pop'
    //     break;
    //   case 1:
    //     currentType = 'new'
    //     break;
    //   case 2:
    //     currentType = 'sell'
    //     break;
    // }
    this.setData({
      currentType: this.data.types[index]
    })
  },

  hangdleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    // 官方：不要在滚动的函数中频繁的调用this.setData
    const flag1 = scrollTop >= this.data.top_distance
    if(flag1 != this.data.showBackTop){
      this.setData({
        showBackTop: flag1
      })
    }
    // this.setData({
    //   showBackTop: scrollTop >= this.data.top_distance
    // })

    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
    // this.setData({
    //   isTabFixed: scrollTop >= this.data.tabScrollTop
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})