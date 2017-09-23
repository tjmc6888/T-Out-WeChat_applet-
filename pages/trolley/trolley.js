// pages/trolley/trolley.js
Page({
  data: {
    goodsList:[],
    goods_item:{},
    delivery: '',
    totalPrice: 0,                    //总价
    totalnum: 0,                      //商品总数
    base_price: 20,                      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("getApp().globalData.trolley")
    console.log(getApp().globalData.trolley)
    var myTrolley = getApp().globalData.trolley
    console.log(myTrolley)
    wx.setNavigationBarTitle({
        title: '购物车' ,
      });

    this.setData({
      goodsList : myTrolley.goodsArr,
      totalPrice: myTrolley.totalPrice,                    
      totalnum: myTrolley.totalnum,                     
      delivery : getApp().globalData.myDelivery,
    })
  },
  //把商品条目添加进商品数组
  setGoodsList(goodsItem){
    var goodsArr = this.data.goodsList
    goodsArr.push(goodsItem)
    this.setData({
      goodsList : goodsArr
    })
  },
  //把新的商品数组覆盖
  coverGoodsList(goodsArr){
    this.setData({
      goodsList : goodsArr
    })
  },
  //添加一件商品
  addOne(e){
    var goodsArr = this.data.goodsList
    var target_index = this.getIndex(e,'goodsList')
    goodsArr[target_index].goodsNum += 1 ;
    var totalPrice = this.data.totalPrice
    var totalnum = this.data.totalnum
    totalnum += 1
    totalPrice +=goodsArr[target_index].price
    //设置全局购物车数据
    var myTrolley = getApp().globalData.trolley
    myTrolley.totalPrice=totalPrice
    myTrolley.totalnum=totalnum
    myTrolley.goodsArr=goodsArr
    getApp().globalData.trolley = trolley
    this.setData({
      goodsList : goodsArr,
      totalPrice: totalPrice,
      totalnum: totalnum,
    })
  },
  //减少一件商品
  deleOne(e){
    var goodsArr = this.data.goodsList
    var target_index = this.getIndex(e,'goodsList')
    goodsArr[target_index].goodsNum -=1
    var totalPrice = this.data.totalPrice
    var totalnum = this.data.totalnum
    totalnum =totalnum -  1
    totalPrice =totalPrice- goodsArr[target_index].price
    if(parseInt(goodsArr[target_index].goodsNum)<=0){
      goodsArr.splice(target_index,1)
      // if(goodsArr.length==0){
      //   wx.navigateBack();   //返回上一个页面
      // }
    }
    //设置全局购物车数据
    var myTrolley = getApp().globalData.trolley
    myTrolley.totalPrice=totalPrice
    myTrolley.totalnum=totalnum
    myTrolley.goodsArr=goodsArr
    this.setData({
      goodsList : goodsArr,
      totalPrice: totalPrice,
      totalnum: totalnum,
    })
  },
  /**
   * 跳转
   */
  //跳转至收货地址编辑页面
  toDelivery(){
    wx.navigateTo({
      url: '../delivery/delivery'
    })
  },
  /**
   * 方法
   */
  //发送订单至服务器
  sentOrder(){
    //in this 
  },
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})