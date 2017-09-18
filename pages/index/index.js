//index.js
//获取应用实例
const app = getApp()
//轮播图配置
var swiper = require('../../common/component/swiper')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperConfig: {},
    animationData: {}
  },
  //购物车动画效果
  show: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
    })
    this.animation = animation
    animation.bottom(50).step()
    console.log('show')
    console.log(animation)
    this.setData({
      animationData: animation.export()
    })
  },
  hide: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
    })
    this.animation = animation
    animation.bottom(-50).step()
    console.log('hide')
    console.log(animation)
    this.setData({
      animationData: animation.export()
    })
  },
  //跳转至trolley页面
  toTrolley() {
    wx.navigateTo({
      url: '../trolley/trolley'
    })
  } ,

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //初始化页面
  onLoad: function () {
    console.log("this.data before")

    // 可在此设置图片url
    this.setData({
      swiperConfig: swiper.swiperConfig
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    // console.log("this.data after")
    // console.log(this.data)
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
