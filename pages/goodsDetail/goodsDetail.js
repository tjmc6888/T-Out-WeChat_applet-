// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsInfo: {}
  },
  onLoad: function (options) {
    // console.log(getApp().globalData.goodsInfo)
    var goodsInfo = getApp().globalData.goodsInfo
    this.setData({
      goodsInfo : goodsInfo,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
})