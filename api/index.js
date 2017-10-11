var host = 'https://wx.takeoutmp.top/tout'
var shop = host+'/shops'
var login = host+'/login'
var wxLogin = host+'/wechat/login'
var user = host+'/users'
var order = host+'/merchants'
var delivery = host+'/deliveries'
var tag = host+'/tags'
var product = host+'/products'
var myInfo = host+'/user/me'
export default {
  'getShop' : shop,
  'updateShop' : shop+'/1',
  'login' : login,
  'getProducts' : product,
  'updateProduct' : product,
  'addProduct' : product,
  'deleteProduct' : product,//
  'getTags' : tag,
  'updateTag' : tag,//
  'addTag' : tag,
  'deleteTags' : tag,
  'updateOrder' : order,
  'deleteTags' : order,
  'getOrders' : order,
  'addOrders' : order,
  'updateUser' : user,
  'deleteUser' : user,
  'getUsers' : user,
  'wxLogin' : wxLogin,
  'myInfo' : myInfo,
  'getDelivery' : delivery,
  'getMyOrder' : user
}
