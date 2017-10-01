// pages/myInfo/myInfo.js
var global = getApp().globalData
Page({
  data: {
    user : global.userInfo,
    genderImg : '/assets/img/man.png',
    address : '',
    address_name : '',
  },

  /**
   * 生命周期
   */
  onLoad: function (options) {
    var user = this.data.user;
    //若用户为登陆
    if(!user)
      this.setUserInfo()
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          //选择就近的建筑，获取位置
          wx.chooseLocation({
            success(res){
              console.log('location2')
              console.log(res)
              address = res.address
              address_name = res.name
              context.setData({
                address : res.address,
                address_name : res.name
              })
            },
          })
        }
      })
  },
  /**
   * 方法
   */
  //设置用户信息
  setUserInfo(){
    var context = this
    var app = getApp()
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        context.setData({
          user : res.userInfo
        })
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(res)
        }
      }
    })
  },
})