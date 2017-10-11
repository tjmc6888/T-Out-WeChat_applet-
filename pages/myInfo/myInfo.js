// pages/myInfo/myInfo.js
var global = getApp().globalData
Page({
  data: {
    user : global.userInfo,
    position　: '',
    genderImg : '/assets/img/boy.png',
    address : '',
    address_name : '',
    nickName : 'johnsamyoo',
    phone_number : '18826104512',
    GM_phone : '18826108847',
    live : ''
  },

  /**
   * 生命周期
   */
  onLoad: function (options) {
    var user = this.data.user;
    // //若用户为登陆
    var myInfo = getApp().globalData.myInfo
    console.log('myInfo')
    console.log(myInfo)
    this.setData({
      phone_number : myInfo.deliveries[0].phone_number,
      nickName : myInfo.nickname,
      live  : myInfo.country+','+myInfo.province+','+myInfo.city
    })
    if(!user)
      this.setUserInfo()
  },
  /**
   * 方法
   */
  //设置用户信息
  setUserInfo(){
    var context = this
    var app = getApp()
    var gender = ''
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        console.log('res')
        console.log(res)
        if(res.userInfo.gender==1)
          gender = '/assets/img/boy.png'
        else
          gender = '/assets/img/girl.png'
        
        context.setData({
          user : res.userInfo,
          genderImg : gender
        })
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(res)
        }
      }
    })
  },
  /**
   * 事件
   */
  login(){
    var context = this
    wx.showModal({
      title:"提示",
      content:"是否确认登陆？",
      success: function(res) {
        if (res.confirm) {
          context.setUserInfo()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //跳转至 收货地址 页面
  toDelivery(){
    wx.navigateTo({
      url: '../delivery/delivery'
    })
  },
  //跳转至 介绍 页面
  toAbout(){
    wx.navigateTo({
      url: '../about/about'
    })
  },
  //弹窗 联系客服 电话拨打
  contactGM(){
    var phone = this.data.GM_phone
    wx.showModal({
      title: '提示',
      content: '是否拨打客服电话:'+phone+'？',
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: ''+phone 
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //定位
  getPosition(){
    var context = this
    var address = ''
    var address_name = ''
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
              address_name : res.name,
            })
          },
        })
      }
    })
  },
  //退出登陆
  logout(){
    var context = this
    wx.showModal({
      title: '提示',
      content: '是否确认退出登录？',
      success: function(res) {
        if (res.confirm) {
          context.setData({
            user:null
          })
        } else if(res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})