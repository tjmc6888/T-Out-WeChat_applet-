// pages/edit/edit.js
var region = require('./region')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cities:region.cities,
    cities_index:region.cities_index,
    areas:region.areas,
    areas_index:region.areas_index,
    region: [],
    address: '',
    userName: '',
    detailed_address: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 事件
   */
  //下拉刷新
  onPullDownRefresh: function () {
  
  },
  bindRegionChange(e){
    // console.log('select region')
    // console.log(e)
    var region = e.detail.value
    var address = region.join(',')
    this.setData({
      region : region,
      address : address,
    })
    // region.push()
  },
   //页面上拉触底事件的处理函数
  onReachBottom: function () {
  
  },
})