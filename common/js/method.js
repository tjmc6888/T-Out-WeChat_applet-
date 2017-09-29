//获取对应的下标
var getIndex=function(e,dataArr){
  var target_id = e.currentTarget.id.split('_')[1]
  var len = dataArr.length;
  var i = 0;
  var index = -1;
  for(i;i<len;i++){
    if (dataArr[i].id != target_id)
      continue;
    else {
      index = i;
      break;
    }
  }
  return index;
}

module.exports = {
    getIndex : getIndex
}