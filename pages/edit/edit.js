// pages/edit/edit.js
var region = require('./region')
var globalData = getApp().globalData
var api = require('../../api/index').default
// var token = globalData.token
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    address: '',
    userName: '',
    detailed_address: 'aaa',
    phone_number: '',
    gender:[{name:'先生',value:1,checked:'true'},{name:'女士',value:2}],
    default:[{name:'是',value:1,checked:'true'},{name:'否',value:0}],
    default_delivery : 0,
    status : 0,    // 0 => 添加地址 ， 1=> 修改地址
    delivery_gender: '男',
    action : 'add',
    receiver_name : '',
    street : ''
  },
  /**
   * 方法
   */
  //添加地址至服务器
  confirmDelivery(){
    console.log('ee')
    // var gender = '';
    var genderArr = this.data.gender
    // 清除 checked 
    for(var i=0;i<2;i++){
      genderArr[i].checked = null
    }
    var myInfo = globalData.myInfo
    var region = this.data.region
    console.log('region')
    console.log(region)
    var data = {
      // region: region,
      // address: this.data.address,
      // userName: this.data.userName,
      // detailed_address: this.data.detailed_address,
      // gender:this.data.delivery_gender,
      default_delivery : this.data.default_delivery,
      phone_number: this.data.phone_number,
      country: 'China',
      province : region[0],
      city : region[1],
      area : region[2],
      receiver_name : this.data.receiver_name,
      receiver_sex : this.data.delivery_gender,
      street : this.data.street,
      // is_default : 0,
      user : myInfo.user_id,
    }
    console.log('confirm delivery')
    console.log(data)
    var method = 'POST'
    var url = api.getDelivery
    if(this.data.action=='edit'){
      method = 'PUT'
      url = api.getDelivery+'/'+this.data.delivery_id
    }else{
      data['is_default'] = 0
    }
    //发送请求至服务器
    wx.request({
      url: url, 
      data: data,
      method:method,
      header:{
        'Authorization' : getApp().globalData.token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(method+'success')
        console.log(res)
        //返回上一页
        wx.navigateBack({
          // delta:1
        })
      },
      fail: function(res) {
        console.log(method+'fail')
        console.log(res)
      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options')
    console.log(options)
    
    var genderArr = this.data.gender
    if(options.action=='edit'){
      var region = []
      region.push(options.province)
      region.push(options.city)
      region.push(options.area)

      for(var i=0;i<2;i++){
        if(genderArr[i].value == options.gender) {
           genderArr[i].checked = 'true'
        }
      }
      this.setData({
          region: region,
          address: region.join(','),
          userName: options.username,
          receiver_name: options.receiver_name,
          street: options.street,
          phone_number: options.phone_number,
          gender: genderArr,
          status : 1,
          delivery_id : options.delivery_id,
          action : options.action
      })
    }
  },
  /**
   * 事件
   */
  //详细地址输入框
  setAddress(e){
    this.setData({
      street: e.detail.value
    })
  },
  //收货人输入框
  setReceiver(e){
    this.setData({
      receiver_name : e.detail.value
    })
  },
  //手机号输入框
  setPhone(e){
    this.setData({
      phone_number : e.detail.value
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
  
  },
  //下拉选择框
  bindRegionChange(e){
    // console.log('select region')
    // console.log(e)
    var region = e.detail.value
    var address = region.join(',')
    this.setData({
      region : region,
      address : address,
    })
  },
  //是否设为默认
  setDefault(e){
    console.log('set default ')
    console.log(e)
    //把其他的地址默认字段置为0,请求
    var ifDefault = 0;
    if(e.detail.value ==1)
      ifDefault = 1
    this.setData({
      default_delivery : ifDefault
    })
  },
  //设置性别
  radioChange(e){
    var gender = e.detail.value
    console.log(gender)
    this.setData({
      delivery_gender:gender
    })
  },

   //页面上拉触底事件的处理函数
  onReachBottom: function () {
  
  },
})