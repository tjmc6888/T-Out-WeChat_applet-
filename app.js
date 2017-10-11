//app.js
var userData = require('/common/js/userData')
//API
var api = require('/api/index').default

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var context = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('res.code is ')
        // console.log(res)
        console.log(res.code)
        var data = {
          'js_code':res.code
        }
        context.globalData.js_code = res.code
        // 微信平台登陆
        wx.request({
          url: api.wxLogin, //仅为示例，并非真实的接口地址
          data: data,
          method:'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log('success')
            console.log(res.data)
            var token = 'Bearer '+res.data.access_token
            var header = {
              'Authorization' : token,
              'content-type': 'application/x-www-form-urlencoded'
            }
            context.globalData.token = token
            context.globalData.requestObj.header = header
            //获取当前用户信息
            // wx.request({
            //   url : api.myInfo,
            //   method : 'GET',
            //   header : header,
            //   success(res){
            //     console.log('myInfo success')
            //     console.log(res)
            //     // context.globalData.
            //   },
            //   fail(res){
            //     console.log('myInfo fail')
            //     console.log(res)
            //   },
            // })
            context.wxLogin(token)
            //
          },
          fail: function(res) {
            console.log('fail')
            console.log(res)
          },
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('res.userInfo')
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //获取当前用户信息
  wxLogin(token){
    var context = this
    wx.request({
      url:api.myInfo,
      method:'GET',
      data:{
        relations:['deliveries']
      },
      header:{
        'Authorization' : token,
      },
      success(res){
        console.log('success')
        console.log(res)
        var myAllInfo = res.data
        var deliveries = myAllInfo.deliveries
        var len = deliveries.length
        //未添加收货地址
        if(len)
          for(var i=0;i<len;i++){
            if(deliveries[i].is_default==1){
              context.globalData.myDelivery = deliveries[i]
              context.globalData.myDelivery['default'] = deliveries[i].is_default
              break;
            }
          }
        else{
          context.globalData.myAddress = ''
          context.globalData.myDelivery = {
                  province:'',
                  city: '',
                  area: '',
                  street: '',
                  address:'',
          }
        }
        context.globalData.myInfo = myAllInfo
        //更新me 数据
        var header = {
          'Authorization' : token,
          'content-type': 'application/x-www-form-urlencoded'
        }
        wx.request({
          url:api.myInfo,
          method:'PUT',
          header:header,
          data:{
            country: myAllInfo.country,
            province: myAllInfo.province,
            city: myAllInfo.city,
            nickname : myAllInfo.nickname,
            gender : myAllInfo.gender,
            portrait : myAllInfo.portrait,
          },
          success(res){
            console.log('update user')
            console.log(res)
          }
        })
      },
      fail(res){
        console.log('fail')
        console.log(res)
      },
    })
  },
  globalData: {
    merchant_id: '',
    js_code: '',
    userInfo: null,
    myInfo: null,
    trolley: {
      goodsArr : [] ,
      totalPrice : 0,
      totalnum : 0,
    },
    goodsInfo: {},
    oneOrder : {},
    myOrder: {},
    myDelivery: {
      province:'GuangDong',
      city: 'GuangZhou',
      area: 'PanYu',
      street: 'XiaoGuWei',
      address:'广州市番禺区小谷围大学城广东药科大学',
    },
    myAddress : '广州市番禺区小谷围大学城广东药科大学',
    api:api,
    token: '',
    requestObj :{
      url: '',
      data: {},
      method: '',
      header: {},
      success: {},
      fail: {},
      complete: {},
    }
  }
})