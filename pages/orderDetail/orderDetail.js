 var mock_data = require('./order_mock')
 var common_method = require('../../common/js/method')
 var global = null
 var api = require('../../api/index').default
 Page({
  data: {
    goodsList:[],
    order_id : '',
    order_pay : '',
    order_place_time : '',
    order_arrive_time : '',
    receiver_name : '',
    receiver_phone : '',
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
    // var goodsArr = global.oneOrder.goodsList
    setTimeout(this.initPage,500)
    global = getApp().globalData
    console.log('global+++++++') 
    console.log(global) 
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
    var statusNum = e.currentTarget.id.split('_')[1]
    if(this.data.btn_right_css=='btn-right')
      this.setData({
        btn_left_css: 'btn-left-return',
        btn_center_css: 'btn-center-return',
        status_text: this.getStatus().status_text,
        btn_right_css: 'btn-right-return',
      })
      else if(statusNum!='2'&&statusNum!='4'&&statusNum!='5'&&statusNum!='3'){
        this.setData({  
          btn_left_css: 'btn-left',
          btn_center_css: 'center-btn-tap',
          status_text: '状态',
          btn_right_css: 'btn-right',
        })
      }else if(statusNum=='3'||statusNum=='2'){
        this.setData({ 
          btn_left_css: 'center-btn-tap',
          btn_center_css: 'center-btn-tap',
          status_text: '状态',
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
    // if()
    var context = this
    wx.showModal({
      title: '提示',
      content: '是否确认' + this.data.btn_right + ' ?',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          switch(parseInt(statusNum)){
            case 0 : {
              //发送 已支付 请求
              context.toSentOrder()
              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=01'
              })
            };break;
            case 1 : {
              //发送 已送达 请求
              context.haveSentOrder()
              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=11'
              })
            };break;
            case 2 : {
              //发送 去评价 请求
              
              //重定向到结果页面
              wx.redirectTo({
                url : '../grade/grade'
              })
            };break;
            case 3 : {
              //发送 已退款 请求
              context.closeOrder()
              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=31'
              })
            };break;
            case 4 : {
              //返回 状态
              context.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: context.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 5 : {
              //返回 状态
              context.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: context.getStatus().status_text,
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
    var context = this
    
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
      content: '是否确认 '+context.data.btn_left+'?',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          switch(parseInt(statusNum)){
            case 0 : {
              //发送 关闭付款 请求
              context.closeOrder();
              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=00'
              })
            };break;
            case 1 : {
              //发送 退款 请求
              context.refundOrder()
              //重定向到结果页面
              wx.redirectTo({
                url : '../resultPage/resultPage?action=10'
              })
            };break;
            case 2 : {
              //发送 去评价 请求
              context.haveSentOrder()
              //重定向到结果页面
              wx.redirectTo({
                url : '../grade/grade'
              })
            };break;
            case 3 : {
              //返回 状态
              context.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: context.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 4 : {
              //返回 状态
              context.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: context.getStatus().status_text,
                btn_right_css: 'btn-right-return',
              })
            };break;
            case 5 : {
              //返回 状态
              context.setData({
                btn_left_css: 'btn-left-return',
                btn_center_css: 'center-btn-return',
                status_text: context.getStatus().status_text,
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
  //关闭订单  {0,3}->4
  closeOrder(){
    // console.log
    var order_id = getApp().globalData.oneOrder.merchant_id
    var url = api.updateOrder+'/'+order_id
    var user_id = getApp().globalData.user_id
    var data = {
      status : 4,
      user : user_id
    }
    var token = getApp().globalData.token
    wx.request({
      url:url,
      data:data,
      method:'PUT',
      header:{
        'Authorization' : token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log('success')
        console.log(res)
      },
      fail(res){
        console.log('fail')
        console.log(res)
      }
    })
  },
  //至待评价  1->2
  haveSentOrder(){
    // console.log
    var order_id = getApp().globalData.oneOrder.merchant_id
    var url = api.updateOrder+'/'+order_id
    var user_id = getApp().globalData.user_id
    var data = {
      status : 2,
      user : user_id
    }
    var token = getApp().globalData.token
    wx.request({
      url:url,
      data:data,
      method:'PUT',
      header:{
        'Authorization' : token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log('success')
        console.log(res)
      },
      fail(res){
        console.log('fail')
        console.log(res)
      }
    })
  },
  //至待送达  0->1
  toSentOrder(){
    // console.log
    var order_id = getApp().globalData.oneOrder.merchant_id
    var url = api.updateOrder+'/'+order_id
    var user_id = getApp().globalData.user_id
    var data = {
      status : 1,
      user : user_id
    }
    var token = getApp().globalData.token
    wx.request({
      url:url,
      data:data,
      method:'PUT',
      header:{
        'Authorization' : token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log('success')
        console.log(res)
      },
      fail(res){
        console.log('fail')
        console.log(res)
      }
    })
  },
  //至待退款  1->3
  refundOrder(){
    // console.log
    var order_id = getApp().globalData.oneOrder.merchant_id
    var url = api.updateOrder+'/'+order_id
    var user_id = getApp().globalData.user_id
    var data = {
      status : 3,
      user : user_id
    }
    var token = getApp().globalData.token
    wx.request({
      url:url,
      data:data,
      method:'PUT',
      header:{
        'Authorization' : token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log('success')
        console.log(res)
      },
      fail(res){
        console.log('fail')
        console.log(res)
      }
    })
  },
  //不同的状态的处理方法
  //初始化页面
  initPage(){
    global = getApp().globalData
    var goodsArr = global.oneOrder.goodsList
    // var delivery = global.oneOrder.delivery
    console.log('goodsList')
    console.log(goodsArr)
    //重构url
    for(var i=0;i<goodsArr.length;i++){
      goodsArr[i]['img']  = goodsArr[i].url
    }
    var myTrolley = getApp().globalData.trolley
    wx.setNavigationBarTitle({
        title: '订单详情' ,
      });
    var status = this.getStatus();
    // var place_time = this.normalDate(global.oneOrder.pay_time)
    var place_time = global.oneOrder.pay_time
    console.log(place_time)
    var arrive_time = this.getArriveTime(place_time)
    var myDelivery = global.myDelivery
    var address = myDelivery.province+','+myDelivery.city+','+myDelivery.area+','+myDelivery.street
    
    console.log('myDelivery')
    console.log(myDelivery)
    console.log(' global.oneOrder')
    console.log( global.oneOrder)
    if(typeof global.oneOrder['backup_content']=='undefined'){
      console.log('null backup')
      global.oneOrder['backup_content'] = global.oneOrder.remark
      global.oneOrder['totalnum'] = global.oneOrder.totalNum
      global.oneOrder['totalPrice'] = global.oneOrder.amount
    }
    
    this.setData({
      goodsList : goodsArr,
      address : address,
      status_text : status.status_text,
      btn_left : status.btn_left,
      btn_right : status.btn_right,
      remark : global.oneOrder.backup_content,
      order_id : global.oneOrder.serial_number,
      order_pay : global.oneOrder.pay_channel,
      order_place_time : place_time,
      order_arrive_time : arrive_time,
      receiver_name : myDelivery.receiver_name,
      receiver_phone : myDelivery.phone_number,
      totalPrice: global.oneOrder.totalPrice,                    
      totalnum: global.oneOrder.totalnum,
      status: global.oneOrder.status                    
    })
  },
  //获取订单状态
  getStatus(){
    var statusNum = 1;
    statusNum = global.oneOrder.status
    //发送 ajax 请求 取得订单状态后返回
    var status = {
      status_text : '',
      btn_left : '',
      btn_right : '',
    }
    var status_text = ''
    switch(statusNum){
      case 0 : {status.status_text = '待付款';status.btn_left = '关闭';status.btn_right = '支付';};break;
      case 1 : {status.status_text = '待送达';status.btn_left = '退款';status.btn_right = '已送达';};break;
      case 2 : {status.status_text = '待评价';status.btn_left = '取消';status.btn_right = '评分';};break;
      case 3 : {status.status_text = '待退款';status.btn_left = '取消';status.btn_right = '已退款';};break;
      case 4 : {status.status_text = '已关闭';status.btn_left = '取消';status.btn_right = '确认';};break;
      case 5 : {status.status_text = '已完成';status.btn_left = '取消';status.btn_right = '确认';};break;
    }
    return status;
  },
  //获取订单预达时间
  getArriveTime(time){
    // 规范时间
    var arrive_date = time.split(' ')[0];//日期
    var arrive_theday_time = time.split(' ')[1];//当天时间
    var date_arr = arrive_date.split('-')//把日期切割成年,月,日
    var theday_time_arr = arrive_theday_time.split(':')//把当天时间切割成时,分,秒
    var arrive_time = ''
    var need_time = 30 ; //所需时间
    
    var minute = parseInt(theday_time_arr[1]) 
    var hour = parseInt(theday_time_arr[0]) 
    minute += need_time
    if(minute>=60){
      minute -= 60;
      hour +=1;
    }
    if(hour>=24){
      hour -=24
      arrive_time += '下一天 '
    }else{
      arrive_time += '当天 '
    }
    console.log(arrive_time)
    minute = parseInt(minute)<10?('0'+minute):minute
    hour = parseInt(hour) <10?('0'+hour):hour
    arrive_time += hour+':'+minute
    console.log(arrive_time)
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