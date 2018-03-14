/**
 * Created by ylc on 2017/7/3.
 */
// import {getStyle} from '../../config/mUtils'
import $ from 'jquery'
import { Indicator } from 'mint-ui';
import {setCookie} from './utils'

export const formatUtils = {
  component:{
    Indicator
  },
  methods: {
    dowloadapp() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid){
          window.location.href = 'http://zhushou.360.cn/detail/index/soft_id/3864772?recrefer=SE_D_%E5%A3%B9%E7%9B%90%E5%8F%8C%E5%88%9B';
      }
      if(isiOS){
          window.location.href = 'https://itunes.apple.com/cn/app/%E5%A3%B9%E7%9B%90%E5%8F%8C%E5%88%9B/id1258089139?mt=8';
      }
    },
    closeTip: function (el) {
      setCookie('hide','hide',3);
    },
    openLoading(title) {
      Indicator.open({
        text: title,
        spinnerType: 'fading-circle'
      });
    },
    closeLoading() {
      Indicator.close();
    },
    amountFilterWan (number, transactionStatus) {//最低认购金额、最大认购金额、目标金额转换
      // console.log(transactionStatus)
      if (number == 0 || number == '不限') {
        return '不限'
      } else {
        var str = '';
        if (transactionStatus == '认购') {
          // str = '-';
        } else if (transactionStatus == '撤单') {
          str = '+'
        }
        var arr = (number / 10000).toString().split('.');
        if (arr.length > 1) {
          return str + arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.' + arr[1]
        } else {
          return str + (number / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

      }
    },
    amountFilter (number, transactionStatus) {//最低认购金额、最大认购金额、目标金额转换
      // console.log(transactionStatus)
      if (number == 0 || number == '不限') {
        return '不限'
      } else {
        var str = '';
        if (transactionStatus == '认购') {
          // str = '-';
        } else if (transactionStatus == '撤单') {
          str = '+'
        }
        var arr = (number / 10000).toString().split('.');
        if (arr.length > 1) {
          return str + arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.' + arr[1] + '万'
        } else {
          return str + (number / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '万'
        }
      }
    },
    // amountFilterDetail (number, transactionStatus) {//最低认购金额、最大认购金额、目标金额转换
    //   // console.log(transactionStatus)
    //   if (number == 0 || number == '不限') {
    //     return '0'
    //   } else {
    //     var str = '';
    //     if (transactionStatus == '认购') {
    //       // str = '-';
    //     } else if (transactionStatus == '撤单') {
    //       str = '+'
    //     }
    //     var arr = (number / 10000).toString().split('.');
    //     if (arr.length > 1) {
    //       return str + arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.' + arr[1]
    //     } else {
    //       return str + (number / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    //     }
    //   }
    // },
    alreadyAmountFilter (surplus, total) {//已募集金额转换
      if (total == 0) {
        return '不限'
      } else {
        var str = String(Math.floor(total - surplus));

        var arr = (str / 10000).toString().split('.');

        if (arr.length > 1) {
          return arr[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.' + arr[1] + '万'
        } else {
          return (str / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '万'
        }

        // return (str / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'万元'
        // return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'万元'
      }
    },
    formatAmount (number) {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    tenTh (val) {//元转万元
      return (val / 10000)
    },
    percent (surplus, total){//募集金额百分比
      if (total == 0) {
        return '不限'
      } else {
        return Math.floor(((total - surplus) / total) * 10000) / 100 + '%';
      }
    },
    percentValue (surplus, total){//募集金额百分比
      if (total == 0) {
        return parseInt(0)
      } else {
        return parseInt(Math.floor(((total - surplus) / total) * 10000) / 100);
      }
    },
    subtraction (current, total){//已募集金额

      var str = String(Math.floor(total - current));

      return str.replace(/\B(?=(?:\d{3})+\b)/g, ',');

    },
    numFormat (data){//数字格式化

      var str = String(data);
      return str.replace(/\B(?=(?:\d{3})+\b)/g, ',');

    },
    levelFontColor (level) {//根据风险等级设置字体颜色
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
    },
    levelBgColor(level){//根据风险等级设置背景颜色
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
    },
    //根据产品状态转换文字
    formatZh (level) {
      switch (level) {
        case "" :
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
          return '展示';
          break;
      }
    },

    //根据产品状态转换背景颜色
    formatZhBg (level) {
      switch (level) {
        case '' :
          return 'zs';
          break;
        case '0' :
          return 'yr';
          break;
        case '1' :
          return 'rg';
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
          return 'zs';
          break;
      }
    },
    formatRisk (level) {//风险等级转换文字
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
    },
    fOrderState (state) {//订单中心 订单状态和项目状态数字和文字转换
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
    },
    diMType (level) {//订单中心 订单状态和项目状态数字和文字转换
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
    },
    allotmentSharesFilter(value) {//出让股份
      if(value == ''){
        return '0'
      }else{
        return value
      }
    },
    shareholdersNumFilter(value) {//股东人数
      if(value == '' || value == 0){
        return 0
      }else{
        return value
      }
    },
    //中文乱码
    ToUnicode(str) {
      return escape(str).replace(/%/g,"\\").toLowerCase();
    },
    UnUnicode(str) {
      return unescape(str.replace(/\\/g, "%"));
    },
    goDetail(url,title) {
      $('body,html').animate({
        scrollTop:0
      })
      if(localStorage.loginFlag=="true"){
        //return true
        if(url.indexOf('usercenter') > -1){
          this.$router.push({path:url,query:{title:title,params:'active'}});
        }else{
          this.$router.push({path:url,query:{title:title}});
        }
      }else{
        this.$router.push({path:'/loginRegister',query:{title:'登录'}});
      }
    }
  }
}
