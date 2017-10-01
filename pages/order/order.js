var mock = require('./mock_data')
var method = require('../../common/js/method')
var global = getApp().globalData
Page({
    data: {
        logs: [],
        orderList: [],
        goodsList: [],
      },
      /**
       * 生命周期
       */
      onLoad: function () {
        var orderList = []
        var goodsList = [] //将某一个orderlist[i]的goodsArr填充
        //发送 ajax 请求订单列表获取数据
        
        //mock
        orderList.push(mock.order1)
        orderList.push(mock.order2)
        orderList.push(mock.order3)
        orderList.push(mock.order4)
        var len = orderList.length;
        for(var i=0;i<len;i++){
            //把状态转成文字
            switch(orderList[i].status){
                case 0 : {orderList[i].status_text = '待付款';};break;
                case 1 : {orderList[i].status_text = '待送达';};break;
                case 2 : {orderList[i].status_text = '已完成';};break;
                case 3 : {orderList[i].status_text = '待退款';};break;
                case 4 : {orderList[i].status_text = '已关闭';};break;
            }
            //规范时间
            orderList[i].pay_time = method.normalDate(orderList[i].pay_time)
            
        }
        this.setData({
            orderList : orderList
        })
      },
      /**
       * 事件
       */
      toOrderDetail:function(e){
          console.log('toOderDetail')
          var orderArr = this.data.orderList
          for(var i=0;i<orderArr.length;i++){
            orderArr[i]['id'] = orderArr[i].merchant_id
          }
          console.log(e)
          console.log(orderArr)
          var order_index = method.getIndex(e,orderArr)
          console.log(order_index)
          global.oneOrder = orderArr[order_index]
          wx.navigateTo({
              url: '/pages/orderDetail/orderDetail'
          })
      }
      /**
       * 方法
       */
})