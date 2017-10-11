var mock = require('./mock_data')
var method = require('../../common/js/method')
var global = null
var api = require('../../api/index').default
var orderList = []
var goodsList = [] //将某一个orderlist[i]的goodsArr填充
Page({
    data: {
        logs: [],
        orderList: [],
        goodsList: [],
        current_page : 0,
        size : 5,
      },
      /**
       * 生命周期
       */
      onLoad: function () {
        var context  = this 
        wx.setNavigationBarTitle({
            title: '我的订单' ,
          });
        
        global = getApp().globalData
        console.log(getApp().globalData)
        var myInfo = getApp().globalData.myInfo
        var token = getApp().globalData.token
        var current_page = this.data.current_page
        var size = this.data.size
        //发送 ajax 请求订单列表获取数据
        wx.request({
            url:api.getMyOrder+'/'+myInfo.user_id+'/merchants',
            method:'GET',
            data:{
              relations:["details", "delivery"],
              page:current_page,
              size:size,
            },
            header:{
              'Authorization' : token,
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log('success')
                console.log(res)
                orderList = res.data.MeteData
                orderList = context.init_order(orderList)
                context.setData({
                    orderList : orderList
                })
            },
            fail: function(res) {
                console.log('fail')
                console.log(res)
            },
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
        },
        //页面上拉触底事件分页
        onReachBottom: function () {
            console.log('bottom')
            var context  = this 
            var orderList_add = []
            var goodsList_add = [] //将某一个orderlist[i]的goodsArr填充
            global = getApp().globalData
            var myInfo = getApp().globalData.myInfo
            var token = getApp().globalData.token
            var current_page = this.data.current_page +1
            var size = this.data.size
            wx.request({
                url:api.getMyOrder+'/'+myInfo.user_id+'/merchants',
                method:'GET',
                data:{
                  relations:["details", "delivery"],
                  page:current_page,
                  size:size,
                },
                header:{
                  'Authorization' : token,
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                    console.log('success')
                    console.log(res)
                    orderList_add = res.data.MeteData
                    if(orderList_add.length<size){
                        wx.showToast({
                            title: '数据已全部加载,无更多数据',
                          })
                    }else{

                        orderList_add = context.init_order(orderList_add)
                        orderList = orderList.concat(orderList_add)
                        context.setData({
                            current_page : current_page,
                            orderList : orderList
                        })
                    }
                },
                fail: function(res) {
                    console.log('fail')
                    console.log(res)
                },
            })
        },
      /**
       * 方法
       */
      //设置订单商品列表
      setGoodsList(details){
        var len = details.length
        for(var i=0;i<len;i++){
            details[i]['goodsName'] = details[i].name
            details[i]['goodsNum'] = details[i].number
        }
        return details
      },
      //订单商品总数量
      getTotalNum(details){
        var num = 0 ;
        var len = details.length
        for(var i=0;i<len;i++){
            num += details[i].number
        }
        return num
      },
      //时间戳转化
      getTime(timeStamp){
        var datetime = new Date();
        datetime.setTime(timeStamp);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minute = datetime.getMinutes();
        var second = datetime.getSeconds();
        //yyyy/mm/dd_hh-mm-ss
        var normalTime =  year + "/" + month + "/" + date+"_"+hour+"-"+minute+"-"+second;
        console.log('normal time')
        console.log(normalTime)
        return normalTime
      },
      //初始化订单页面
      init_order(orderList){
        var context  = this 
        console.log('orderList')
        console.log(orderList)
        var len = orderList.length;
        for(var i=0;i<len;i++){
            //把状态转成文字
            switch(orderList[i].status){
                case 0 : {orderList[i].status_text = '待付款';};break;
                case 1 : {orderList[i].status_text = '待送达';};break;
                case 2 : {orderList[i].status_text = '待评价';};break;
                case 3 : {orderList[i].status_text = '待退款';};break;
                case 4 : {orderList[i].status_text = '已关闭';};break;
                case 5 : {orderList[i].status_text = '已完成';};break;
            }
            //时间戳转化
            orderList[i]['pay_time'] = context.getTime(orderList[i].create_time)
            //规范时间
            orderList[i].pay_time = method.normalDate(orderList[i].pay_time)
            //订单商品总数量
            orderList[i]['totalNum'] = context.getTotalNum(orderList[i].details)
            //订单商品列表
            orderList[i]['goodsList'] = context.setGoodsList(orderList[i].details)
            
        }

        return orderList
      }
})