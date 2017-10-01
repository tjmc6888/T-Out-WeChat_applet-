//index.js
//获取应用实例
const app = getApp()
//轮播图配置
var swiper = require('../../common/component/swiper')
//模拟数据
var mock = require('./mock')
var delivery_mock = require('../delivery/delivery_mock')

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
    this.setData({
      typeList: typeList,
      showType : showType
    })
  },
  /**
   * 调用方法
   */
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
    wx.navigateTo({
      url: '../trolley/trolley'
    })
    // this.clearNum(goodsArr)
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
  //跳转至 edit 页面
  toEdit: function () {
    var dataStr = JSON.stringify(delivery_mock.delivery1)
    dataStr = dataStr.slice(1,dataStr.length-1) // 去除括号
    dataStr = dataStr.replace(/\,/g,'&')//把全部','换成'&'
    dataStr = dataStr.replace(/\"/g,'')//去掉全部"
    dataStr = dataStr.replace(/\:/g,'=')//把全部':'换成'='
    dataStr = "?"+dataStr
    console.log(dataStr)
    // wx.navigateTo({
    //   url: '../edit/edit'+dataStr
    // })
  },
  //跳转至 orderDetail 页面
  toOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  },

  /**
   * 初始化方法
   */
  //初始化商品列表
  initGoodsList() {
    var goodsList = []
    //以下为模拟数据
    goodsList.push(mock.goodsItem1)
    goodsList.push(mock.goodsItem2)
    return goodsList;
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
  //初始化商品类型
  initGoodsType() {
    var typeList = []
    //以下为模拟数据
    typeList.push(mock.type1)
    typeList.push(mock.type2)
    typeList.push(mock.type3)
    typeList.push(mock.type4)
    typeList[0]['active'] = "active"
    return typeList;
  },
  /**
   * 生命周期
   */
  //初始化页面
  onLoad: function () {
    console.log("this.data before")
    this.setUserInfo()
    // console.log(getApp().globalData.userInfo)
    this.clearNum(this.data.goodsList)
    wx.setNavigationBarTitle({
      title: '首页' ,
    });
    var goodsList = this.initGoodsList(); //初始化商品数据
    var typeList = this.initGoodsType(); //初始化商品数据
    var preferential_list = this.initPreferentialList()//初始化商品优惠
    var showType = typeList[0]  //初始化类别描述
    this.setData({
      swiperConfig: swiper.swiperConfig, //设置轮播的配置
      goodsList: goodsList,
      preferential_list: preferential_list,
      showType: showType,
      typeList : typeList
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
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
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})