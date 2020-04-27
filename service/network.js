import {
  baseURL,
  timeout
} from './config.js'


export default function(options) {
  wx.showLoading({
    title: '数据加载中ing',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}