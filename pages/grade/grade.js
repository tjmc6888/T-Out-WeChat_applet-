// pages/grade/grade.js
var api = require('../../api/index').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:1,
    star_1 : '/assets/img/star_empty.png',
    star_2 : '/assets/img/star_empty.png',
    star_3 : '/assets/img/star_empty.png',
    star_4 : '/assets/img/star_empty.png',
    star_5 : '/assets/img/star_empty.png',
    star_arr :['/assets/img/star_empty.png','/assets/img/star_empty.png','/assets/img/star_empty.png','/assets/img/star_empty.png','/assets/img/star_empty.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 方法
   */
  //加星
  add(e){
    console.log(e)
    var grade = e.currentTarget.id.split('_')[1]
    console.log(grade*20)
    var starList = this.data.star_arr
    for(var i=0;i<grade;i++){
      starList[i] = '/assets/img/star_full.png'
    }
    for(var i=grade;i<5;i++){
      starList[i] = '/assets/img/star_empty.png'
    }
    this.setData({
      star_arr : starList,
      // score : grade*20,
      score : grade
    })
  },
  //提交分数
  sentGrade(){
    var order_id = getApp().globalData.oneOrder.merchant_id
    var url = api.updateOrder+'/'+order_id
    var user_id = getApp().globalData.user_id
    var data = {
      status : 5,
      user : user_id,
      grade : this.data.score
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
        wx.redirectTo({
          url:'../resultPage/resultPage?action=51'
        })
      },
      fail(res){
        console.log('fail')
        console.log(res)
      }
    })
  },

})