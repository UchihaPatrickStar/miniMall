// pages/category/childCpns/w-content/w-content.js
const types = ['pop', 'new', 'sell']
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      console.log(this.properties.categoryDetail)
      // // 1.获取当前的点击
      // const currentIndex = e.detail.index;

      // // 2.获取当前的type
      // let currentType = types[currentIndex]

      // // 3.改变data中的数据
      // this.setData({
      //   currentIndex,
      //   currentType
      // })
    }
  }
})
