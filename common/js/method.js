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

//规范数据
//时间格式如下：yyyy/mm/dd_hh-mm-ss
function normalDate(time){
  var arrive_date = time.split('_')[0];//日期
  var arrive_theday_time = time.split('_')[1];//当天时间
  var date_arr = arrive_date.split('/')//把日期切割成年,月,日
  var theday_time_arr = arrive_theday_time.split('-')//把当天时间切割成时,分,秒
  var arrive_time = ''
  date_arr[1] = date_arr[1].length<2?('0'+date_arr[1]):date_arr[1]//规范月
  date_arr[2] = date_arr[2].length<2?('0'+date_arr[2]):date_arr[2]//规范日
  theday_time_arr[2] = date_arr[2].length<2?('0'+theday_time_arr[2]):theday_time_arr[2]//规范时
  theday_time_arr[1] = date_arr[1].length<2?('0'+theday_time_arr[1]):theday_time_arr[1]//规范分
  theday_time_arr[0] = date_arr[0].length<2?('0'+theday_time_arr[0]):theday_time_arr[0]//规范秒

  arrive_time = date_arr.join('\-') +' '
  arrive_time += theday_time_arr.join('\:')
  return arrive_time;
}

module.exports = {
    getIndex : getIndex,
    normalDate : normalDate,
}