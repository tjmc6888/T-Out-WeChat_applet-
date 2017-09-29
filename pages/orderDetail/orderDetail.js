 var mock_data = require('./order_mock')
 var common_method = require('../../common/js/method')
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
    status : 0,
    status_text : '待付款',
    totalPrice: 0,                    
    totalnum: 0,                  
    address : '',
    btn_left : '',
    btn_right : '',
    btn_left_css : '',
    btn_center_css : '',
    btn_right_css : '',
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
    var status = this.getStatus();
    var place_time = this.normalDate(mock_data.order1.pay_time)
    var arrive_time = this.getArriveTime(mock_data.order1.pay_time)
    this.setData({
      goodsList : goodsArr,
      delivery : getApp().globalData.myDelivery,
      address : getApp().globalData.myAddress,
      status_text : status.status_text,
      btn_left : status.btn_left,
      btn_right : status.btn_right,
      remark : mock_data.order1.remark,
      order_id : mock_data.order1.serial_number,
      order_pay : mock_data.order1.pay_channel,
      order_place_time : place_time,
      order_arrive_time : arrive_time,
      receiver_name : mock_data.order1.recerver_name,
      receiver_phone : mock_data.order1.recerver_phone,
      totalPrice: mock_data.order1.totalPrice,                    
      totalnum: mock_data.order1.totalNum,
      status: mock_data.order1.status                    
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  /**
   * 事件处理
   */
  dealStatus(e){
    console.log('deal')
    console.log(e)
    if(this.data.btn_left_css=='btn-left')
      this.setData({
        btn_left_css: 'btn-left-return',
        btn_center_css: 'btn-center-return',
        status_text: this.getStatus().status_text,
        btn_right_css: 'btn-right-return',
      })
      else{
        this.setData({
          btn_left_css: 'btn-left',
          btn_center_css: 'center-btn-tap',
          status_text: '返回',
          btn_right_css: 'btn-right',
        })
      }
  },
  //右边点击
  tapRight(e){
    var statusNum = e.currentTarget.id.split('_')[1]
    console.log('eeeeeeright')
    console.log(e)
    console.log(e.currentTarget.id.split('_'))
    var status = {
      status_text : this.data.btn_left,
      btn_left : '',
      btn_right : '',
    }
    // statusNum = 2
    wx.showModal({
      title: '提示',
      content: '是否确认' + this.data.btn_right + ' ?',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          switch(parseInt(statusNum)){
            case 0 : {
              //发送 已支付 请求

              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=0'
              })
            };break;
            case 1 : {
              //发送 已送达 请求

              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=1'
              })
            };break;
            case 2 : {
              //返回 状态
              this.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: this.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 3 : {
              //返回 状态
              this.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: this.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 4 : {
              //返回 状态
              this.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: this.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
          }
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
  })
  },
  //左边点击
  tapLeft(e){
    var statusNum = e.currentTarget.id.split('_')[1]
    console.log('eeeeeeleft')
    console.log(e)
    console.log(e.currentTarget.id.split('_'))
    var status = {
      status_text : '',
      btn_left : '',
      btn_right : '',
    }
    wx.showModal({
      title: '提示',
      content: '是否确认 '+this.data.btn_left+'?',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          switch(parseInt(statusNum)){
            case 0 : {
              //发送 关闭付款 请求

              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=0'
              })
            };break;
            case 1 : {
              //发送 退款 请求

              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=1'
              })
            };break;
            case 2 : {
              //返回 状态
              this.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: this.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 3 : {
              //返回 状态
              this.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: this.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 4 : {
              //返回 状态
              this.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: this.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
      })
  },
  /**
   * 方法方法
   */
  //不同的状态的处理方法
  
  //获取订单状态
  getStatus(){
    var statusNum = 1;
    statusNum = this.data.status
    //发送 ajax 请求 取得订单状态后返回
    var status = {
      status_text : '',
      btn_left : '',
      btn_right : '',
    }
    var status_text = ''
    switch(statusNum){
      case 0 : {status.status_text = '待付款';status.btn_left = '关闭';status.btn_right = '支付';};break;
      case 1 : {status.status_text = '待送达';status.btn_left = '退款';status.btn_right = '已达';};break;
      case 2 : {status.status_text = '已完成';status.btn_left = '取消';status.btn_right = '确认';};break;
      case 3 : {status.status_text = '待退款';status.btn_left = '取消';status.btn_right = '确认';};break;
      case 4 : {status.status_text = '已关闭';status.btn_left = '取消';status.btn_right = '确认';};break;
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