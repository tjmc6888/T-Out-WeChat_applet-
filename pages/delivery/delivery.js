// pages/delivery/delivery.js
//模拟数据
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
  onLoad: function (options) {
    //请求获取该用户添加的所有地址 ajax请求
    wx.setNavigationBarTitle({
      title: '收货地址管理' ,
    });
    var deliveryList = this.data.deliveryList;
    deliveryList.push(mock.delivery1)
    deliveryList.push(mock.delivery2)
    var len = deliveryList.length;
    for(var i=0;i<len;i++){
      deliveryList[i]['address'] = deliveryList[i].province+"\/"+deliveryList[i].city+"\/"+deliveryList[i].area
    }
    this.setData({
      deliveryList : deliveryList,
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
      detailed_address: myDelivery.street,
      phone_number: myDelivery.phone_number,
      gender:myDelivery.gender,
      province: myDelivery.province,
      city: myDelivery.city,
      area: myDelivery.area,
      street: myDelivery.street,
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
    wx.showModal({
      title: '提示',
      content: '是否设该地址为默认',
      success: function(res) {
       if (res.confirm) {
        // deliveryList.splice(delivery_index,1)
        deliveryList = context.clearDefault(deliveryList)
        //ajax请求
        deliveryList[item_index].default = 1
        getApp().globalData.myDelivery = deliveryList[item_index]
        context.setData({
          deliveryList:deliveryList
        })
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
  //去除所有默认地址
  clearDefault(delivery_arr){
    var len = delivery_arr.length
    for(var i=0;i<len;i++){
      delivery_arr[i].default = 0
    }
    return delivery_arr;
  },
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