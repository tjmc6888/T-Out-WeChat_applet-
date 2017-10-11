//index.js
//获取应用实例
const app = getApp()
//轮播图配置
var swiper = require('../../common/component/swiper')
//模拟数据
var mock = require('./mock')
var delivery_mock = require('../delivery/delivery_mock')
var api = require('../../api/index').default
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperConfig: {},                 //轮播图配置
    animationData: {},                //动画数据
    goodsList: [],                    //商品列表
    totalPrice: 0,                    //总价
    totalnum: 0,                      //商品总数
    typeList:[],                      //商品类型列表
    preferential_list: [],            //优惠列表
    showType : {},                    //展示的类别信息
    notice:'营业时间为:10:00 - 20:00', //公告
    base_price : 20,                  //起送价
    type_id : 0,                  
    logo : '',
    shop_name: '',
    address: '',
    // api : getApp().globalData.api
  },
  /**
   * 事件处理
   */
  //添加商品
  addGoods(e) {
    this.show()
    var goodsArr = this.data.goodsList
    var i = 0;
    var length = goodsArr.length;
    var target_id = e.target.id.split('_')[1]
    var totalnum = this.data.totalnum;
    for (i; i < length; i++) {
      if (goodsArr[i].id != target_id)
        continue;
      else {
        var totalPrice = this.data.totalPrice + goodsArr[i].price;
        goodsArr[i].goodsNum += 1;
        totalnum += 1;
        this.setData({
          goodsList: goodsArr,
          totalPrice: totalPrice,
          totalnum : totalnum
        })
        break;
      }
    }
    console.log(this.data.totalPrice)
  },
  //减少商品
  deleGoods(e) {
    var goodsArr = this.data.goodsList
    var i = 0;
    var length = goodsArr.length;
    var totalnum = this.data.totalnum
    var target_id = e.target.id.split('_')[1]
    for (i; i < length; i++) {
      if (goodsArr[i].id != target_id){
        continue;
      }
      else {
        var totalPrice = this.data.totalPrice;

        if (totalPrice <= 0) {
          // this.hide();   //隐藏购物车
        } else if (goodsArr[i].goodsNum > 0) { //当前商品是否存在数量
          totalPrice = totalPrice - goodsArr[i].price;
          goodsArr[i].goodsNum -= 1;
          totalnum -=1;
          if (totalPrice <= 0) {
            this.hide(); //隐藏购物车
          }
          this.setData({
            goodsList: goodsArr,
            totalPrice: totalPrice,
            totalnum
          })
        }
        break;
      }
    }
    console.log('price')
    console.log(totalPrice)
  },
  setNum(e){
    console.log(e)
    var goodsArr = this.data.goodsList
    var target_index = this.getIndex(e,'goodsList')
    // console.log(target_index)
    //原来数量
    var oNum =  goodsArr[target_index].goodsNum;
    var oPrice = 0;
    if(oNum>0)
      oPrice = oNum * goodsArr[target_index].price;
    //先减去原来的价格和数量
    var totalPrice = this.data.totalPrice - oPrice;
    var totalnum = this.data.totalnum - oNum;
    var goodsNum = parseInt(e.detail.value)
    if(!e.detail.value)
      goodsNum = 0
    goodsArr[target_index].goodsNum = goodsNum
    //设置新的价格和数量
    totalnum += goodsNum
    totalPrice += goodsNum * goodsArr[target_index].price;
    if(totalnum)
      this.show()
    else
      this.hide()
    this.setData({
      goodsList : goodsArr,
      totalPrice: totalPrice,
      totalnum : totalnum,
    })
  },
  //设置商品类型
  setType(e){
    var target_index = this.getIndex(e,'typeList');
    var typeList = this.data.typeList
    //类别展示
    var showType = this.data.typeList[target_index]
    typeList = this.clearTypeStyle(typeList);
    // console.log('ty')
    // console.log(e)
    // console.log(target_index)
    // console.log(typeList[target_index])
    typeList[target_index]['active'] = "active"
    //在此发送请求
    console.log('type')
    console.log(e)
    var type_id = e.target.id.split('_')[1]
    this.setData({
      typeList: typeList,
      showType : showType,
      type_id : type_id
    })
  },
  /**
   * 调用方法
   */
  //初始化数据
  init(token){
    var context = this
    var globalData = getApp().globalData
    var requestObj = getApp().globalData.requestObj
    requestObj.url = api.getProducts
    requestObj.data = {
      'relations' :   ["tag","photos"],
      size: 100
    }
    requestObj.method = 'GET'
    requestObj.success = (res)=>{
      console.log('success')
      console.log(res)
      wx.hideLoading()
      //设置信息
      var wholeData = context.set_data(res.data.MeteData)
      var goodsList = wholeData.goodsList; //初始化商品数据
      var typeList = wholeData.typeList; //初始化商品数据
      
      var preferential_list = context.initPreferentialList()//初始化商品优惠
      var showType = typeList[0]  //初始化类别描述

      context.setData({
        goodsList: goodsList,
        preferential_list: preferential_list,
        showType: showType,
        typeList : typeList,
        type_id : typeList[0].tag_id
      })
    }
    requestObj.fail = (res)=>{
      console.log('fail')
      console.log(res)
      wx.hideLoading()
    }

    //获取关联的商品表和分类表
    //闭包
    //微信登陆
    var req = ()=>{
      var request = requestObj
      wx.request(request)
      // //获取商店信息
      wx.request({
        url: api.getShop,
        method:'GET',
        header:{
          'Authorization' : getApp().globalData.token,
        },
        success(res){
          console.log('success shop')
          console.log(res.data.MeteData)
          var md = res.data.MeteData[0] 
          var swiperConfig = swiper.swiperConfig
          swiperConfig['imgUrls'] =JSON.parse(md.images) 
          context.setData({
            logo : md.logo,
            notice : md.announcement,
            swiperConfig : swiperConfig,
            shop_name : md.name,
            address : md.address,
          })
        }
      })
      wx.hideLoading()
    }
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(req,2000)
    // var request = requestObj
    // wx.request(request)
    this.setUserInfo()
    this.clearNum(this.data.goodsList)
    wx.setNavigationBarTitle({
      title: '首页' ,
    });


    if (app.globalData.userInfo) {

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //重构数据
  set_data(data){
   //商品列表
   var goodsList = []
   var typeList = []
   var goods_len = data.length
   var context = this
   var type_temp_arr =[]
    console.log('data+++++++')
    console.log(data)
   for(var i=0;i<goods_len;i++){
      //商品列表
      goodsList.push(data[i])
      goodsList[i]['goodsName'] = data[i].name
      goodsList[i]['id'] = data[i].product_id
      goodsList[i]['description'] = data[i].description
      goodsList[i]['img'] = data[i].photos[0].url
      goodsList[i]['goodsNum'] = 0
      context.clearNum(goodsList)
      //分类列表
      type_temp_arr.push(data[i].tag)

      type_temp_arr[i]['typeName'] = data[i].tag.name
      type_temp_arr[i]['id'] = data[i].tag.tag_id
      type_temp_arr[i]['description'] = ''
   }
      typeList = context.unique(type_temp_arr)
      console.log(goodsList)
      console.log(typeList)
      typeList[0]['active'] = "active"
   return {
    typeList : typeList,
    goodsList : goodsList,
   }
  },
  //获取对应数组的index
  clearTypeStyle(typeList){
    var len = typeList.length;
    for(var i=0;i<len;i++){
      typeList[i]['active'] = ' ';
    }
    return typeList;
  },
  //设置用户信息
  setUserInfo(){
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(res)
        }
      }
    })
  },
  //清除货物数量
  clearNum(arr){
    var len = arr.length;
    for(var i=0;i<len;i++){
      arr[i].goodsNum = 0;
    }
    this.setData({
      goodsList : arr
    })
  },
  //获取对应的下标
  getIndex(e,str){
    var target_id = e.target.id.split('_')[1]
    // var goodsArr = this.data.goodsList
    var goodsArr = this.data[str]
    // console.log('inde')
    // console.log(goodsArr)
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
   * 动画
   */
  //购物车动画效果
  show: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
    })
    this.animation = animation
    animation.bottom(0).step()
    // console.log('show')
    // console.log(animation)
    this.setData({
      animationData: animation.export()
    })
  },
  hide: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
    })
    this.animation = animation
    animation.bottom(-60).step()
    // console.log('hide')
    // console.log(animation)
    this.setData({
      animationData: animation.export()
    })
  },
  /**
   * 页面跳转
   */
  //跳转至trolley页面
  toTrolley() {
    var context = this
    //设置购物车数据至全局
    var myTrolley = {
      goodsArr : [] ,
      totalPrice : 0,
      totalnum : 0,
    }
    var goodsArr = this.data.goodsList
    var len = goodsArr.length
    for(var i=0;i<len;i++){
      if(goodsArr[i].goodsNum)
        myTrolley.goodsArr.push(goodsArr[i])
    }
    myTrolley.totalPrice = this.data.totalPrice
    myTrolley.totalnum = this.data.totalnum
    getApp().globalData.trolley = myTrolley;
    console.log('myTrolley')
    console.log(myTrolley)
    console.log(getApp().globalData)
    //创建订单
    var requestObj = getApp().globalData.requestObj
    requestObj.url = api.addOrders
    var data_tmp = {}
    data_tmp = myTrolley
    data_tmp['user'] = getApp().globalData.myInfo.user_id
    data_tmp['status'] = 0
    //随机数
    data_tmp['serial_number'] = Math.floor(Math.random()*(999999-100000+1)+100000)+''+data_tmp['user'];
    data_tmp['amount'] = myTrolley.totalPrice
    var len = myTrolley.goodsArr.length
    data_tmp['details'] = []
    //设置 details
    for(var i=0;i<len;i++){
      var ga = myTrolley.goodsArr
      var det_data = {
        product : ga[i].product_id,
        name : ga[i].goodsName,
        number : ga[i].goodsNum,
        price : ga[i].price,
        amount : ga[i].price * ga[i].goodsNum,
      }
      data_tmp['details'].push(det_data)
    }
    data_tmp['details'] = JSON.stringify(data_tmp['details'])
    requestObj.data = data_tmp
    requestObj.method = 'POST'
    requestObj.success = (res)=>{
      console.log('success')
      console.log(res)
      getApp().globalData.merchant_id = res.data.merchant_id
      wx.navigateTo({
        url: '../trolley/trolley'
      })
    }
    requestObj.fail = (res)=>{
      console.log('fail')
      console.log(res)
    }
    wx.request(requestObj)

  },
  //跳转至 goodsDetail 页面
  toGoodsDetail (e) {
    console.log('togoodsd')
    console.log(e)
    //设置购物车数据至全局
    var myTrolley = {
      goodsArr : [] ,
      totalPrice : 0,
      totalnum : 0,
    }
    var goodsArr = this.data.goodsList
    //把商品展示数据获取设置到全局
    var target_index = this.getIndex(e,'goodsList')
    getApp().globalData.goodsInfo = goodsArr[target_index]
    
    var len = goodsArr.length
    for(var i=0;i<len;i++){
      if(goodsArr[i].goodsNum)
        myTrolley.goodsArr.push(goodsArr[i])
    }
    myTrolley.totalPrice = this.data.totalPrice
    myTrolley.totalnum = this.data.totalnum
    getApp().globalData.trolley = myTrolley;

    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+e.currentTarget.id.split('_')[1]
    })
  },
  //跳转至 delivery 页面
  toDelivery: function () {
    wx.navigateTo({
      url: '../delivery/delivery'
    })
  },
  //跳转至 orderDetail 页面
  toOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  },
  //跳转至 toGrade 页面
  toGrade: function () {
    wx.navigateTo({
      url: '../grade/grade'
    })
  },

  /**
   * 初始化方法
   */
  //去重
  unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem,elem_id; i<arr.length; i++) {
      elem = arr[i]
      elem_id = arr[i].tag_id
      if (!hash[elem_id]) {
          result.push(elem);
          hash[elem_id] = true;
      }
    }
    return result;
},
  //初始化优惠信息
  initPreferentialList() {
    var preferential_list = []
    //以下为模拟数据
    preferential_list.push(mock.preferential1)
    preferential_list.push(mock.preferential2)
    preferential_list.push(mock.preferential3)
    return preferential_list;
  },
  /**
   * 生命周期
   */
  //初始化页面
  onLoad: function () {
    var context = this
    //获取当前用户信息
    var token = getApp().globalData.token
    context.init(token)
    // var setToken = ()=>{
    //   if(token)
    //     context.init(token)
    //   else{
    //     // 登录
    //     wx.login({
    //       success: res => {
    //         console.log('res.code is ')
    //         console.log(res.code)
    //         var data = {
    //           'js_code':res.code
    //         }
    //         //微信平台登陆
    //         wx.request({
    //           url: api.wxLogin, 
    //           data: data,
    //           method:'POST',
    //           header: {
    //               'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           success: function(res) {
    //             getApp().globalData.token = 'Bearer '+res.data.access_token
    //             getApp().globalData.requestObj.header = {
    //               'Authorization' : 'Bearer '+res.data.access_token,
    //               'content-type': 'application/x-www-form-urlencoded'
    //             }
    //           }
    //         })
    //       }
    //     })
    //   }
    // }
    // setInterval(setToken,500)
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})