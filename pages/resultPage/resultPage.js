// pages/resultPage/resultPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result : {},
    result_content : '美食正在制作或已在路上,请君稍等...',//支付后，待送达
    result_content1 : '俺们尽快操作,请君稍等...',//退款
    result_content2 : '该订单已完成,望君再次光临', // 完成，送达
    result_content3 : '该订单已关闭,望君再次光临', //退款后,关闭后
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result = {
      img:'',
      content:'',
    }
    console.log(options)
    console.log(options.action)
    console.log(typeof options.action)
    switch(options.action){
      case '00':{
        //待付款:关闭
        result.img = '/assets/img/closed.png';
        result.content = '该订单已关闭,望君再次光临';
      };break;
      case '01':{
        //待付款:支付
        result.img = '/assets/img/cooking.png';
        result.content = '美食正在制作或已在路上,请君稍等...';
      };break;
      case '10':{
        //待送达:退款
        result.img = '/assets/img/dealing.png';
        result.content = '俺们尽快操作,请君稍等...';
      };break;
      case '11':{
        //待送达:已送达
        result.img = '/assets/img/finished.png';
        result.content = '该订单已完成,望君再次光临';
      };break;
      case '51':{
        //待送达:已送达
        result.img = '/assets/img/smile.png';
        result.content = '感谢您的点评,望君再次光临';
      };break;
      case '31':{
        //待退款:已退款
        result.img = '/assets/img/closed.png';
        result.content = '该订单已关闭,望君再次光临';
      };break;
    }
    this.setData({
      result:result
    })
  },
  /**
   * 事件
   */
  comeback_btn(){
    wx.navigateBack({
      delta: 1
    })
  }
})