// pages/orderDetail/orderDetail.js
 var mock_data = require('./order_mock')

Page({
  data: {
    goodsList:[],
    order_id : '',
    order_pay : '',
    order_place_time : '',
    order_arrive_time : '',
    receiver_name : '',
    receiver_phone : '',
    delivery : '',
    remark : '',
    status_img : '/assets/img/paying2.png',
    status_text : '待付款',
    totalPrice: 0,                    
    totalnum: 0,                  
    address : ''
  },

  /**
   * 生命周期
   */
   // 生命周期函数--监听页面加载
  onLoad: function (options) {
    //请求数据
    
    var goodsArr = mock_data.order1.goodsList
    console.log('goodsList')
    console.log(goodsArr)
    var myTrolley = getApp().globalData.trolley
    wx.setNavigationBarTitle({
        title: '订单详情' ,
      });
    var status_text = this.getStatus();
    var place_time = this.normalDate(mock_data.order1.pay_time)
    var arrive_time = this.getArriveTime(mock_data.order1.pay_time)
    this.setData({
      // getStatus : myTrolley.goodsArr,
      goodsList : goodsArr,
      // totalPrice: myTrolley.totalPrice,                    
      // totalnum: myTrolley.totalnum,                     
      delivery : getApp().globalData.myDelivery,
      address : getApp().globalData.myAddress,
      status_text : status_text,
      remark : mock_data.order1.remark,
      order_id : mock_data.order1.serial_number,
      order_pay : mock_data.order1.pay_channel,
      order_place_time : place_time,
      order_arrive_time : arrive_time,
      receiver_name : mock_data.order1.recerver_name,
      receiver_phone : mock_data.order1.recerver_phone,
      totalPrice: mock_data.order1.totalPrice,                    
      totalnum: mock_data.order1.totalNum,                     
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  /**
   * 方法
   */
  //获取订单状态
  getStatus(){
    var statusNum = 1;
    //发送 ajax 请求 取得订单状态后返回
    var status = ''

    switch(statusNum){
      case 0 : status = '待付款';break;
      case 1 : status = '待送达';break;
      case 2 : status = '已完成';break;
      case 3 : status = '待退款';break;
      case 4 : status = '已关闭';break;
    }
    return status;
  },
  //获取订单预达时间
  getArriveTime(time){
    // 规范时间

    var arrive_date = time.split('_')[0];//日期
    var arrive_theday_time = time.split('_')[1];//当天时间
    var date_arr = arrive_date.split('/')//把日期切割成年,月,日
    var theday_time_arr = arrive_theday_time.split('-')//把当天时间切割成时,分,秒
    var arrive_time = ''
    var need_time = 30 ; //所需时间
    
    var minute = parseInt(theday_time_arr[1]) 
    var hour = parseInt(theday_time_arr[0]) 

    minute += need_time
    if(minute>=60){
      minute -= 60;
      hour +=1;
      if(hour>=24){
          hour -=24
          arrive_time += '明天 '
        }
      else{
        arrive_time += '今天 '
      }
    }
    minute = parseInt(minute)<10?('0'+minute):minute
    hour = parseInt(hour) <10?('0'+hour):hour
    arrive_time += hour+':'+minute
    return arrive_time;
  },
  //规范数据
  normalDate(time){
    var arrive_date = time.split('_')[0];//日期
    var arrive_theday_time = time.split('_')[1];//当天时间
    var date_arr = arrive_date.split('/')//把日期切割成年,月,日
    var theday_time_arr = arrive_theday_time.split('-')//把当天时间切割成时,分,秒
    var arrive_time = ''
    date_arr[1] = date_arr[1].length<2?('0'+date_arr[1]):date_arr[1]//规范月
    date_arr[2] = date_arr[2].length<2?('0'+date_arr[2]):date_arr[2]//规范日
    theday_time_arr[2] = date_arr[2].length<2?('0'+theday_time_arr[2]):theday_time_arr[2]//规范时
    theday_time_arr[1] = date_arr[1].length<2?('0'+theday_time_arr[1]):theday_time_arr[1]//规范分
    theday_time_arr[0] = date_arr[0].length<2?('0'+theday_time_arr[0]):theday_time_arr[0]//规范秒

    arrive_time = date_arr.join('\-') +' '
    arrive_time += theday_time_arr.join('\:')
    return arrive_time;
  }

})