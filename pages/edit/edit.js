// pages/edit/edit.js
var region = require('./region')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    address: '',
    userName: '',
    detailed_address: '',
    phone_number: '',
    gender:[{name:'先生',value:1,checked:'true'},{name:'女士',value:2}],
    default:[{name:'是',value:1,checked:'true'},{name:'否',value:0}],
    default_delivery : 0,
    status : 0,    // 0 => 添加地址 ， 1=> 修改地址
    delivery_gender: '男',
  },
  /**
   * 方法
   */
  //添加地址至服务器
  confirmDelivery(){
    console.log('ee')
    // var gender = '';
    var genderArr = this.data.gender
    // var gender_index =-1;
    // for(var i=0;i<2;i++){
    //   if(genderArr[i].checked=='true')
    //     gender =  genderArr[i].name
    // }
    // 清除 checked 
    for(var i=0;i<2;i++){
      genderArr[i].checked = null
    }
    var data = {
      region: this.data.region,
      address: this.data.address,
      userName: this.data.userName,
      detailed_address: this.data.detailed_address,
      phone_number: this.data.phone_number,
      gender:this.data.delivery_gender,
      default_delivery : this.data.default_delivery
    }
    console.log('confirm delivery')
    console.log(data)
    //发送请求至服务器

    //返回上一页
    wx.navigateBack({
      // delta:1
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
        if(genderArr[i].name == options.gender) {
           genderArr[i].checked = 'true'
        }
      }
      this.setData({
          region: region,
          address: options.street,
          userName: options.username,
          detailed_address: options.street,
          phone_number: options.phone_number,
          gender: genderArr,
          status : 1
      })
    }
  },
  /**
   * 事件
   */
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
    var gender = e.detail.value==1?'男':'女'
    this.setData({
      delivery_gender:gender
    })
  },

   //页面上拉触底事件的处理函数
  onReachBottom: function () {
  
  },
})