// pages/trolley/trolley.js
var api = require('../../api/index').default
Page({
  data: {
    goodsList:[],
    delivery: '',
    totalPrice: 0,                    //总价
    totalnum: 0,                      //商品总数
    base_price: 20,    
    channels : [{name:'wx',value:'微信',checked:'true'},{name:'alipay',value:'支付宝'}],              
    channel : '微信',
    backup_content : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    this.init_trolley()
  },
  onLoad: function (options) {
    //请求数据

    wx.setNavigationBarTitle({
        title: '购物车' ,
      });
      this.init_trolley()
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
    getApp().globalData.trolley = myTrolley
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
      url: '../delivery/delivery',
    })
  },
  /**
   * 方法
   */
  //初始化页面
  init_trolley(){
    var myTrolley = getApp().globalData.trolley
    console.log(myTrolley)
    var token = getApp().globalData.token
    //获取收获地址
    var myDelivery = getApp().globalData.myDelivery
    var delivery = myDelivery.province+','+myDelivery.city+','+myDelivery.area+','+myDelivery.street
    if(delivery==",,,")
      delivery = '请添加收货地址'
    this.setData({
      goodsList : myTrolley.goodsArr,
      totalPrice: myTrolley.totalPrice,                    
      totalnum: myTrolley.totalnum,                     
      delivery : delivery,
    })
  },
  //获取当前时间
  getTime(){
    var d = new Date()
    return (d.getFullYear()+'-'
    +d.getMonth()+'-'
    +d.getDay()+' '
    +d.getHours()+':'
    +d.getMinutes()+':'
    +d.getSeconds())
  },
  //发送订单至服务器
  sentOrder(){
    //in this 
    console.log('sent ok')
    var context = this
    var order = this.data
    var pay_time = this.getTime()
    console.log(pay_time)
    var data = {
      goodsList: order.goodsList,
      delivery: order.delivery,
      totalPrice:  order.totalPrice,                    
      totalnum: order.totalnum,                      
      channel : order.channel,
      backup_content : order.backup_content,
      pay_time : pay_time,
      status : 1
    }

    if(data.delivery == '请添加收货地址'){
      console.log(context.set_sentData(data))
      wx.showModal({
        title: '提示',
        content: '您还未添加默认收获地址,'+data.delivery,
        success: function(res) {
          if (res.confirm) {
            //前往地址添加页面
            context.toDelivery()
          }
        }
      })
    }else{
      data['delivery'] = getApp().globalData.myDelivery
      getApp().globalData.myOrder = data
      getApp().globalData.oneOrder = data
      console.log('oneOrder')
      console.log(data)
    //传送至订单详情页
    var sent_data = {}
    sent_data = context.set_sentData(data)
    var order_id = getApp().globalData.merchant_id
    wx.request({
      url: api.updateOrder+'/'+order_id, 
      data: sent_data,
      method:'PUT',
      header: {
        'Authorization' : getApp().globalData.token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log('success')
        console.log(res)
        // getApp().globalData.oneOrder
        wx.navigateTo({
          url: '../orderDetail/orderDetail',
        })
      },
      fail(res){
        console.log('fail')
        console.log(res)
      }
    })
    //   wx.redirectTo({

    // parse
    }
  },
  //设置备注信息
  setBackup(e){
    this.setData({
      backup_content : e.detail.value
    })
  },
  //设置发送数据
  set_sentData(data){
    var delivery = getApp().globalData.myDelivery
    var user = getApp().globalData.myInfo
    if(data.channel == '微信')
      data['pay_channel'] =1
    else
      data['pay_channel'] =2

    return {
      status : 1,
      pay_channel : data.pay_channel,
      remark : data.backup_content,
      // delivery : JSON.stringify(delivery) ,
      delivery : JSON.stringify(delivery) ,
      user : user.user_id
    }
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
   * 事件
   */
  radioChange(e){
    var channel = e.detail.value=='wx'?'微信':'支付宝'
    
    this.setData({
      channel:channel
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
})