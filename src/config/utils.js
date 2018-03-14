/**
 * Created by ylc on 2017/5/23.
 */

/**
 * 格式化金额
 * 如：123456.21格式化后为：123,456.21
 */

import wx from 'weixin-js-sdk'
import {weixin,WXSaveHeadpic} from '@/service/getData'

export const weixinInfo = (arr) => {
  let url = window.location.href;
  weixin(url).then(res =>{
    // console.log(res)
    if(res.code == '000'){
      // 微信配置
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: arr
      })
    }
  })
}
/*微信获取摄像头*/
export const chooseImage = (callback) => {
  weixinInfo(["chooseImage","uploadImage"]);
  wx.ready(() => {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds.pop(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        // alert(localIds)
        uploadImage(localIds,function (result) {
          callback(result)
        });
      }
    });
  })
}

export const uploadImage = (localIds,callback) => {
  wx.uploadImage({
    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      // alert(JSON.stringify(res))
      var serverId = res.serverId; // 返回图片的服务器端ID
      WXSaveHeadpic(serverId).then(res =>{
        // alert(JSON.stringify(res));
        callback(res)
      })
    }
  });
}

/*获取本地图片接口*/
export const getLocalImgData = (localId,callback) => {
  wx.getLocalImgData({
    localId: localId, // 图片的localID
    success: function (res) {
      var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
      callback(localData)
    }
  });
}

// 微信分享配置
export const wxShareConfig = (title, desc, link, imgUrl) => {
  weixinInfo(['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']);
  wx.ready(() => {
    // “分享给朋友”
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () {

      },
      fail: function () {

      }
    })
    // “分享到朋友圈”
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl,
      success: function () {

      },
      fail: function () {

      }
    })

    // 分享到QQ
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () {

      },
      fail: function () {

      }
    })
    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () {

      },
      fail: function () {

      }
    })
    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function () {

      },
      fail: function () {

      }
    })
  })
}


export const amountFilterWan = (number,transactionStatus) => {//最低认购金额、最大认购金额、目标金额转换
  // console.log(transactionStatus)
  if (number == 0 || number == '不限'){
    return '不限'
  }else{
    var str = '';
    if(transactionStatus == '认购'){
      // str = '-';
    }else if(transactionStatus == '撤单'){
      str = '+'
    }
    var arr = (number / 10000).toString().split('.');
    if( arr.length > 1){
      return str+arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+ '.' +arr[1]
    }else{
      return str+(number / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

  }
}


export const amountFilter = (number,transactionStatus) => {//最低认购金额、最大认购金额、目标金额转换
  // console.log(transactionStatus)
  if (number == 0 || number == '不限'){
    return '不限'
  }else{
    var str = '';
    if(transactionStatus == '认购'){
      // str = '-';
    }else if(transactionStatus == '撤单'){
      str = '+'
    }
    var arr = (number / 10000).toString().split('.');
    if( arr.length > 1){
      return str+arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+ '.' +arr[1] +'万'
    }else{
      return str+(number / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'万'
    }

  }
}

export const alreadyAmountFilter = (surplus, total) => {//已募集金额转换
  // console.log(surplus+'-----'+total)
  if (total == 0){
    return '不限'
  }else{
    var str = String(Math.floor(total - surplus));

    var arr = (str / 10000).toString().split('.');

    if( arr.length > 1){
      return arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+ '.' +arr[1] +'万'
    }else{
      return (str / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'万'
    }

    // return (str / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'万元'
    // return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'万元'
  }
}

export const formatAmount = (number) =>{
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

//元转万元
export const tenTh = (val) =>{
  return (val / 10000);
};

//募集金额百分比
export const percent = (surplus, total) =>{
  if(total == 0){
    return '不限'
  }else{
    return Math.floor(((total - surplus) / total) * 10000) / 100 + '%';
  }
};

//募集金额百分比
export const percentValue = (surplus, total) =>{
  if(total == 0){
    return parseInt(0)
  }else{
    return parseInt(Math.floor(((total - surplus) / total) * 10000) / 100);
  }
};



//已募集金额
export const subtraction =  (current, total)=> {

  var str = String(Math.floor(total - current));

  return str.replace(/\B(?=(?:\d{3})+\b)/g, ',');

};

//数字格式化
export const numFormat =  (data) =>{

  var str = String(data);
  return str.replace(/\B(?=(?:\d{3})+\b)/g, ',');

};


//根据风险等级设置字体颜色
export const levelFontColor = (level) =>{
  switch (level) {
    case '1' :
      return 'lowFont';
      break;
    case '2' :
      return 'lowFont';
      break;
    case '3' :
      return 'midFont';
      break;
    case '4' :
      return 'highFont';
      break;
    case '5' :
      return 'highFont';
      break;
    default :
      return 'lowFont';
      break;
  }
};
//根据风险等级设置背景颜色
export const levelBgColor = (level) =>{
  switch (level) {
    case '1' :
      return 'lowBg';
      break;
    case '2' :
      return 'midLowBg';
      break;
    case '3' :
      return 'midBg';
      break;
    case '4' :
      return 'midHighBg';
      break;
    case '5' :
      return 'highBg';
      break;
    default :
      return 'lowBg';
      break;
  }
};

//根据产品状态转换文字
export const formatZh = (level) =>{
  switch (level) {
    case '' :
      return '展示';
      break;
    case '0' :
      return '预热';
      break;
    case '1' :
      return '认购';
      break;
    case '2' :
      return '认购';
      break;
    case '3' :
      return '交割期';
      break;
    case '4' :
      return '退出';
      break;
    case '5' :
      return '交割完成';
      break;
    case '6' :
      return '募集成功';
      break;
    case '7' :
      return '募集失败';
      break;
    default :
      return '';
      break;
  }
};

//根据产品状态转换背景颜色
export const formatZhBg = (level) =>{
  switch (level) {
    case '' :
      return 'zs';
      break;
    case '1' :
      return 'yr';
      break;
    case '2' :
      return 'rg';
      break;
    case '3' :
      return 'jg';
      break;
    case '4' :
      return 'jg';
      break;
    case '5' :
      return 'jg';
      break;
    case '6' :
      return 'cg';
      break;
    case '7' :
      return 'tc';
      break;
    case '8' :
      return 'sb';
      break;
    default :
      return '';
      break;
  }
};

//风险等级转换文字
export const formatRisk = (level) => {
  switch (level) {
    case '1' :
      return '低';
      break;
    case '2' :
      return '中低';
      break;
    case '3' :
      return '中';
      break;
    case '4' :
      return '中高';
      break;
    case '5' :
      return '高';
      break;
    default :
      return '';
      break;
  }
};

//订单中心 订单状态和项目状态数字和文字转换
export const fOrderState = (state) =>{
  switch (state) {
    case '冷静期' :
      return '#589fff';
      break;
    case '撤单中' :
      return '#666';
      break;
    case '撤单失败' :
      return '#ee2020';
      break;
    case '进行中' :
      return '#666';
      break;
    case '成功' :
      return '#57c657';
      break;
    case '失败' :
      return '#ee2020';
      break;
    default :
      return '';
      break;
  }

};
3
//订单中心 订单状态和项目状态数字和文字转换
export const diMType = (level) =>{
  switch (level) {
    case '1' :
      return '红利转投';
      break;
    case '2' :
      return '现金分红';
      break;
    default :
      return '暂无';
      break;
  }

};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 最大认购金额比对
 */
export const formatMaxAmount = (data) => {
  if (!data) return;
  if ( data == 0 || '不限'){
    return 1000000000
  }
}

/**
 * 格式化时间日期 2017-05-12
 */
export const dateForm = (data) => {
  if (!data) return;
  let arr = data.split(' ');
  return arr[0]
}
//中文乱码
export const ToUnicode = (str) =>{
   return escape(str).replace(/%/g,"\\").toLowerCase();
}
export const  UnUnicode = (str) =>{
     return unescape(str.replace(/\\/g, "%"));
}

export const countTime = (obj)=>{
  var _this = $(obj);
  var time = 90;
  _this.attr('disabled', true).css({
    'cursor': 'not-allowed',
    'color': '#999',
  });
  clearInterval(_timer);
  var _timer = setInterval(function () {
    time--;
    _this.html(time + "s后重新获取");
    if (time < 1) {
      clearInterval(_timer);
      _this.html("获取验证码").attr("disabled", false).css({
        'color': '#ff8f1f',
      });
    }
  }, 1000);
}

export const timer = (obj,css)=>{
  var _this = $(obj);
  var time = 90;
  _this.attr('disabled', true).css({
    'cursor': 'not-allowed',
    'color': '#999',
    'border':'1px solid #ddd'
  });
  clearInterval(_timer);
  var _timer = setInterval(function () {
    time--;
    _this.html(time + "s后重新获取");
    if (time < 1) {
      clearInterval(_timer);
      if(css) {
        _this.html("获取验证码").attr("disabled", false).css(css);
      }else{
        _this.html("获取验证码").attr("disabled", false).css({
          'color': '#ff8f1f',
          'border':'1px solid #ff8f1f'
        });
      }
    }
  }, 1000);
}


var _returnOrderTimer;
export const returnOrderTimer = (obj) =>{
  var _this = $(obj);
  var time = 90;
  _this.attr('disabled', true).css({
    'cursor': 'not-allowed',
    'color': '#999',
    'border':'1px solid #ddd'
  });
  clearInterval(_returnOrderTimer);
  _returnOrderTimer = setInterval(function () {
    time--;
    _this.html(time + "s后重新获取");
    if (time < 1) {
      clearInterval(_returnOrderTimer);
      _this.html("获取验证码").attr("disabled", false).css({
        'color': '#ff8f1f',
        'border':'1px solid #ff8f1f'
      });
    }
  }, 1000);
}


export const refreshOrderTimer = (obj) =>{
  clearInterval(_returnOrderTimer);
  var _this = $(obj);
  _this.html("获取验证码").attr("disabled", false).css({
        'color': '#ff8f1f',
        'border':'1px solid #ff8f1f'
      });
  
}
export const Encrypt = (val) =>{
   var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkb7xhUuyoIH2zBFBf5JNZd6Trdt3Gaa34eWhNys0ENCkWp/Q+lV5BqSD3kEwRZ5dBkiB1RG5KdP4NMUm4PqhCFsN77QUV6IIR2q7S3IuojPPlxF9S8SFGBKnPDAO7mMexKHnEOLdcykEw3vkUZky9KhyLwiubi31zKidEv2yWXQIDAQAB";
   var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
   var data = encrypt.encrypt(val);
   return data;
}
// export const verifyTel = (telNum)=>{
//   var regphone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
//   if(telNum.length==0){
//     return "手机号不能为空";
//   }
//   else if(telNum.length<11){
//       return "lengthError"
//   }
//   else if(telNum.length==11&&regphone.test(telNum)){
//          return false;
//   }else{
//     return "手机号格式不正确";
//   }
// }
export const verifyTel = (telNum)=>{
  var regphone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  //console.log(telNum);
  if(telNum.length<11){
    return "请输入11位手机号";
  }else if(telNum.length==11&&!regphone.test(telNum)){
    console.log('dfd');
      return "手机号格式不正确"
  }else if(telNum.length==11&&regphone.test(telNum)){
         return false;
  }else{
    return "";
  }
}
export const verifyCode = (code)=>{
  if(code == ''){
    return '验证码不能为空'
  }else if(code.length==6&&/^[0-9]+$/.test(code)){
    return false;
  }else{
    return "验证码不正确"
  }
}

export const verifyPayPassword = (code)=>{
  if(code == ''){
    return '密码不能为空'
  }else if(code.length==6&&/^[0-9]+$/.test(code)){
    return false;
  }else{
    return "密码不正确"
  }
}

export const verifyPwd = (password)=>{
  var pwdLength = password.length;
  var regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![`~!@#$%^&*()_+=\\|{}\[\]'":;,.<>/?-]+$)[`~!@#$%^&*()_+=\\|{}\[\]'":;,.<>/?0-9a-zA-Z-]{8,20}$/;
  if(pwdLength==0){
    return "密码不能为空"
  }else if(pwdLength<8){
    return "至少8位数字和字母组合"
  }else if(pwdLength>=8&&pwdLength<=20&&regPwd.test(password)){
    return false;
  }else{
    return "密码格式不正确"
  }
}

export const verifyEmail = (email)=> {
  var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
  if(email.length == 0){
    return '邮箱不能为空'
  }else if(emailRegex.test(email)){
    return false
  }else{
    return "邮箱格式不正确"
  }
}

export const verifyName = (realname) =>{
  var re = /^([\u4E00-\u9FA5]+，?)+$/;
  //console.log(re.test(realname));
  if(realname.length==0){
    return '真实姓名不能为空';
  }else if(re.test(realname)){
      return false
  }else{
    return '请输入中文';

  }
}

export const verifyIdCard = (idcard) =>{
    var re = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if(idcard.length==0){
      return '身份证号不能为空'
    }else if(re.test(idcard)){
        return false
    }else{
      return '身份证号格式不正确'
    }
}
export const verifyBankcard = (bankcard) =>{
  if(bankcard.length==0){
    return '银行卡号不能为空'
  }else{
    return false
  }
}

export const isSuccess = (arr)=> {
  for (let i in arr) {
    if(arr[i].toString() == ''){
      return false
      break;
    }else if(arr[i].toString() != 'false'){
      return false
      break;
    }
  }
  return true
}
export const isHight = (arr)=> {
  for (let i in arr) {
    if(!arr[i].toString()){
      return false
      break;
    }
  }
  return true
}

/*cookies 设置*/
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
//生成十位随机码
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function genRandomStr(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};


