// pages/goodsDetail/goodsDetail.js
var app = getApp().globalData;
var mock = require('goods_mock')
var sample_mock = mock.goodsItem3
Page({
  data: {
      goodsInfo: {},
      myTrolley : app.trolley,
      goodsName : ''+sample_mock.goodsName,
      goodsPrice : ''+sample_mock.price,
      description : ''+sample_mock.description,
      sell_number : ''+sample_mock.sell_number,
      goods_status : ''+sample_mock.status,
      goodsImg : ''+sample_mock.img,
      grade : ''+sample_mock.grade
  },
  /**
   * 生命周期
   */
  onLoad: function (options) {
    var goodsInfo = app.goodsInfo
    // console.log(options.id)
    console.log(mock.goodsItem3)
    //发送 ajax 请求

    this.setData({
      goodsInfo : goodsInfo,
      goodsName : ''+goodsInfo.goodsName,
      goodsPrice : ''+goodsInfo.price,
      description : ''+goodsInfo.description,
      sell_number : ''+sample_mock.sell_number,
      goods_status : ''+goodsInfo.status,
      goodsImg : ''+goodsInfo.img,
      grade : ''+sample_mock.grade
    })
  },
  /**
   * 事件
   */
  addOne(e){
    console.log(e)
    //购物车是否已添加该商品
    var trolleyArr = app.trolley.goodsArr
    var goodsInfo = app.goodsInfo
    var len = trolleyArr.length
    var ifNoFound = true
    for(var i=0;i<len;i++){
      if(trolleyArr[i].id == goodsInfo.id){
        trolleyArr[i].goodsNum +=1;
        ifNoFound = false
      }
    }
    //购物车不存在该商品
    if(ifNoFound){
      goodsInfo.goodsNum = 1;
      trolleyArr.push(goodsInfo)
      // 添加进购物车
      getApp().globalData.trolley.goodsArr = trolleyArr
    }
  },
  //点击图片看大图
  getBigImg(){
    var img = this.data.goodsImg
    console.log('eeee')
    console.log(img)
    wx.previewImage({
      current: ''+img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  //返回上一个页面
  comeback_btn(){
    wx.navigateBack({
      delta: 1
    })
  }
  /**
   * 方法
   */

})