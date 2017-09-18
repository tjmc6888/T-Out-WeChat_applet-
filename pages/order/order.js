Page({
    data: {
        logs: []
      },
      onLoad: function () {
        console.log('global')
        console.log(getApp())
      },
      toOrderDetail:function(){
          console.log('toOderDetail')
          wx.navigateTo({
              url: '/pages/orderDetail/orderDetail'
          })
      }
})