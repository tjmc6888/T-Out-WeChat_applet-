// pages/delivery/delivery.js
//模拟数据
var api = require('../../api/index').default

var mock = require('./delivery_mock')
var common_method = require('../../common/js/method')
var globalData = getApp().globalData
Page({
  data: {
    deliveryList : [],
    user : globalData.userInfo,
    default_delevery : {}
  },
  /**
   * 生命周期
   */
  onLoad: function () {
    //请求获取该用户添加的所有地址 ajax请求
    wx.setNavigationBarTitle({
      title: '收货地址管理' ,
    });

    this.init_del()
  },
  onShow(){
    //获取当前用户信息
      var context = this
      var token = getApp().globalData.token
      wx.request({
        url:api.myInfo,
        method:'GET',
        data:{
          relations:['deliveries']
        },
        header:{
          'Authorization' : token,
        },
        success(res){
          console.log('success')
          console.log(res)
          var myAllInfo = res.data
          var deliveries = myAllInfo.deliveries
          var len = deliveries.length
          //未添加收货地址
          if(len)
            for(var i=0;i<len;i++){
              if(deliveries[i].is_default==1){
                getApp().globalData.myDelivery = deliveries[i]
                getApp().globalData.myDelivery['default'] = deliveries[i].is_default
                break;
              }
            }
          getApp().globalData.myInfo = myAllInfo
          // context.globalData.
          context.init_del()
        },
        fail(res){
          console.log('fail')
          console.log(res)
        },
      })
    
  },
  /**
   * 事件
   */
  //删除信息
  deleteOne(e){
    console.log('delete')
    console.log(e)
    var deliveryList = this.data.deliveryList
    // var delivery_index = this.getIndex(e,'deliveryList')
    var delivery_index = common_method.getIndex(e,deliveryList)
    var context = this
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      success: function(res) {
       if (res.confirm) {
        deliveryList.splice(delivery_index,1)
        //ajax请求
        var del_id = e.currentTarget.id.split('_')[1]
        wx.request({
          url:api.getDelivery+'/'+del_id,
          method: 'DELETE',
          header:{
            'Authorization' : getApp().globalData.token,
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res){
            console.log('dele success')
            console.log(res)
          }
        })
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
      url: '../edit/edit?action=add'
    })
  },
  //跳转至修改页面
  editOne(e){
    var deliveryList = this.data.deliveryList
    // var delivery_index = this.getIndex(e,'deliveryList')
    var delivery_index = common_method.getIndex(e,deliveryList)
    getApp().globalData.myDelivery = deliveryList[delivery_index]
    var address = deliveryList[delivery_index].address
    var phone_number = deliveryList[delivery_index].phone_number
    var detailed_address = deliveryList[delivery_index].street
    var myDelivery = deliveryList[delivery_index]
    var data = {
      address: address,
      username: myDelivery.username,
      receiver_name: myDelivery.receiver_name,
      detailed_address: myDelivery.street,
      phone_number: myDelivery.phone_number,
      gender:myDelivery.gender,
      province: myDelivery.province,
      city: myDelivery.city,
      area: myDelivery.area,
      street: myDelivery.street,
      delivery_id: myDelivery.delivery_id,
    }
    console.log('data')
    console.log(data)
    var dataStr = JSON.stringify(data)
    console.log(dataStr)
    dataStr = dataStr.slice(1,dataStr.length-1) // 去除括号{}
    dataStr = dataStr.replace(/\[/g,'') // 去除括号[
    dataStr = dataStr.replace(/\]/g,'') // 去除括号]
    dataStr = dataStr.replace(/\,/g,'&')//把全部','换成'&'
    dataStr = dataStr.replace(/\"/g,'')//去掉全部"
    dataStr = dataStr.replace(/\:/g,'=')//把全部':'换成'='
    dataStr = dataStr
    console.log(dataStr)
    wx.navigateTo({
      url: '../edit/edit'+"?action=edit&"+dataStr
    })

  },
  //设置为默认
  setDefault(e){
    console.log('eee setdefault')
    console.log(e)
    var deliveryList = this.data.deliveryList
    // var item_index = this.getIndex(e,'deliveryList')
    var item_index = common_method.getIndex(e,deliveryList)
    var context = this
    var old_def_id = getApp().globalData.myDelivery.id
    var new_def_id = e.currentTarget.id.split('_')[1]
    var user = globalData.myInfo
    wx.showModal({
      title: '提示',
      content: '是否设该地址为默认',
      success: function(res) {
       if (res.confirm) {
        deliveryList = context.clearDefault(deliveryList)
        //ajax请求
        //设为默认
        wx.request({
          url:api.getDelivery+'/'+old_def_id,
          method:'PUT',
          data:{
            is_default : 0,
            user : user.user_id
          },
          header:{
            'Authorization' : getApp().globalData.token,
            'content-type': 'application/x-www-form-urlencoded'
          },
          // success(res){
          //   console.log('success ud')
          //   console.log(res)
          // }
        })
        //取消默认
        wx.request({
          url:api.getDelivery+'/'+new_def_id,
          method:'PUT',
          data:{
            is_default : 1,
            user : user.user_id
          },
          header:{
            'Authorization' : getApp().globalData.token,
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res){
            console.log(res)
            deliveryList[item_index].is_default = 1
            deliveryList[item_index].default = 1
            getApp().globalData.myDelivery = deliveryList[item_index]
            context.setData({
              deliveryList:deliveryList
            })
          }
        })
//
       }
      }
     })
  },

   //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  
  },
  /**
   * 方法
   */
  //初始化页面
  init_del(){
    var deliveryList = [];
    console.log('globalData.myInfo') 

    console.log(globalData.myInfo) 

    deliveryList = globalData.myInfo.deliveries
    var len = deliveryList.length;
    for(var i=0;i<len;i++){
      deliveryList[i]['address'] = deliveryList[i].province+","+deliveryList[i].city+","+deliveryList[i].area+","+deliveryList[i].street
      deliveryList[i]['default'] = deliveryList[i].is_default
      deliveryList[i]['id'] = deliveryList[i].delivery_id
      deliveryList[i]['delivery_id'] = deliveryList[i].delivery_id
      deliveryList[i]['gender'] = deliveryList[i].receiver_sex
      deliveryList[i]['receiver_name'] = deliveryList[i].receiver_name
    }
    this.setData({
      deliveryList : deliveryList,
    })
  },
  //去除所有默认地址
  clearDefault(delivery_arr){
    var len = delivery_arr.length
    for(var i=0;i<len;i++){
      delivery_arr[i].default = 0
    }
    return delivery_arr;
  },
  //下拉刷新
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  }
  // //获取对应的下标
  // getIndex(e,str){
  //   var target_id = e.currentTarget.id.split('_')[1]
  //   var goodsArr = this.data[str]
  //   var len = goodsArr.length;
  //   var i = 0;
  //   var index = -1;
  //   for(i;i<len;i++){
  //     if (goodsArr[i].id != target_id)
  //       continue;
  //     else {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // },
})