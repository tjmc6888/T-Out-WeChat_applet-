var goodsItem1 = {
    id:'12',
    img:'/assets/img/goods1.jpg',
    goodsName:'小鸡腿军',
    price:6,
    description:'好吃不油腻',
    status: 1,
    goodsNum:3
  }
var goodsItem2 = {
    id:'14',
    img:'/assets/img/goods1.jpg',
    goodsName:'大鸡腿军',
    price:12,
    description:'管饱，尽兴',
    status: 1,
    goodsNum:2
  }

  var goodsArr = []
  goodsArr.push(goodsItem1)
  goodsArr.push(goodsItem2)
  var totalPrice = goodsArr[0].goodsNum * goodsArr[0].price + goodsArr[1].goodsNum * goodsArr[1].price
  var totalNum = goodsArr[0].goodsNum + goodsArr[1].goodsNum 

var order1 = {
    merchant_id:'11',
    serial_number:'0321554',
    goodsList:goodsArr,
    pay_channel:'alipay',
    pay_time:'2017/09/28_12-15-21',
    arrive_time:'',
    status: 1,
    status_text: '',
    remark:'加多点饭,谢谢！',
    amount: totalPrice,
    totalNum: totalNum,
    recerver_name : 'tom',
    recerver_phone : '18814240315',
}
var order2 = {
    merchant_id:'22',
    serial_number:'032457854',
    goodsList:goodsArr,
    pay_channel:'wx',
    pay_time:'2017/09/28_12-25-21',
    arrive_time:'',
    status: 3,
    status_text: '',
    remark:'加多！',
    amount: totalPrice,
    totalNum: totalNum,
    recerver_name : 'samyoo2',
    recerver_phone : '1882145315',
}
var order3 = {
    merchant_id:'33',
    serial_number:'45871554',
    goodsList:goodsArr,
    pay_channel:'wx',
    pay_time:'2017/09/29_12-15-21',
    arrive_time:'',
    status: 2,
    status_text: '',
    remark:'加辣！',
    amount: totalPrice,
    totalNum: totalNum,
    recerver_name : 'samyoo',
    recerver_phone : '18821240315',
}
var order4 = {
    merchant_id:'44',
    serial_number:'07851554',
    goodsList:goodsArr,
    pay_channel:'alipay',
    pay_time:'2017/09/28_12-15-21',
    arrive_time:'',
    status: 4,
    status_text: '',
    remark:'加香菜！',
    amount: totalPrice,
    totalNum: totalNum,
    recerver_name : 'tony',
    recerver_phone : '18878440315',
}


  module.exports = {
    goodsItem1 : goodsItem1,
    goodsItem2 : goodsItem2,
    order1 : order1,
    order2 : order2,
    order3 : order3,
    order4 : order4,
  }