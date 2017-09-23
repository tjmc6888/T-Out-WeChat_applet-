// pages/delivery/delivery.js
//模拟数据
var mock = require('./delivery_mock')
var globalData = getApp().globalData
Page({
  data: {
    deliveryList : [],
    user : globalData.userInfo,
    default_delevery : {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求获取该用户添加的所有地址 ajax请求
    wx.setNavigationBarTitle({
      title: '收货地址管理' ,
    });
    var deliveryList = this.data.deliveryList;
    deliveryList.push(mock.delivery1)
    deliveryList.push(mock.delivery2)
    var len = deliveryList.length;
    for(var i=0;i<len;i++){
      deliveryList[i]['address'] = deliveryList[i].city+" "+deliveryList[i].area+" "+ " "+deliveryList[i].street
    }
    this.setData({
      deliveryList : deliveryList,
    })
  },
  /**
   * 生命周期
   */
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {
  
  },
  /**
   * 事件
   */
  //删除信息
  deleteOne(e){
    console.log('delete')
    console.log(e)
    var deliveryList = this.data.deliveryList
    var delivery_index = this.getIndex(e,'deliveryList')
    console.log(delivery_index)
    var context = this
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      success: function(res) {
       if (res.confirm) {
        deliveryList.splice(delivery_index,1)
        //ajax请求
        context.setData({
          deliveryList:deliveryList
        })
       }
      }
     })
  },
  /**
   * 跳转
   */
  //跳转至添加页面
  addOne(e){
    wx.navigateTo({
      url: '../add/add?delivery'
    })
  },
  //跳转至修改页面
  editOne(e){
    console.log(e)
    var deliveryList = this.data.deliveryList
    var delivery_index = this.getIndex(e,'deliveryList')
    getApp().globalData.myDelivery = deliveryList[delivery_index]
    wx.navigateTo({
      // url: '../edit/edit?delivery='//传id
      url: '../edit/edit?delivery'
    })
  },

   //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  
  },
   //页面上拉触底事件的处理函数
  onReachBottom: function () {
  
  },
  /**
   * 方法
   */
  //获取对应的下标
  getIndex(e,str){
    var target_id = e.target.id.split('_')[1]
    var goodsArr = this.data[str]
    var len = goodsArr.length;
    var i = 0;
    var index = -1;
    for(i;i<len;i++){
      if (goodsArr[i].id != target_id)
        continue;
      else {
        index = i;
        break;
      }
    }
    return index;
  },
})