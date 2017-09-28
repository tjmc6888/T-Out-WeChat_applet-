var mock_goods = require('../index/mock')
var goodsArr = []
// mock_goods.goodsItem1.goodsNum=3
// mock_goods.goodsItem2.goodsNum=4
goodsArr.push(mock_goods.goodsItem1)
goodsArr.push(mock_goods.goodsItem2)
var totalPrice = goodsArr[0].goodsNum * goodsArr[0].price + goodsArr[1].goodsNum * goodsArr[1].price
var totalNum = goodsArr[0].goodsNum + goodsArr[1].goodsNum 
var order1  = {
    merchant_id:'12',
    serial_number:'0321554',
    goodsList:goodsArr,
    pay_channel:'alipay',
    pay_time:'2017/09/28_12-15-21',
    arrive_time:'',
    status: 1,
    goodsNum:0,
    remark:'加多点饭,谢谢！',
    price: 12,
    amount: totalPrice,
    totalNum: totalNum,
    recerver_name : 'samyoo',
    recerver_phone : '18821240315',
  }
var order2  = {
    merchant_id:'13',
    serial_number:'03215543',
    goodsList:goodsArr,
    pay_channel:'wx',
    pay_time:'2017/09/28_12-35-21',
    arrive_time:'',
    status: 2,
    goodsNum:0,
    remark:'加多点饭,谢谢233！',
    price: 12,
    amount: totalPrice,
    totalNum: totalNum,
    recerver_name : 'rover',
    recerver_phone : '18821247969',
  }

  module.exports = {
    order1 : order1,
    order2 : order2,
  }