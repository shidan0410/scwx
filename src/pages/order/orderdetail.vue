<template>
    <div class="orderdetail_wrapper">
     <!--  <div class="h_tip">该项目于2017/09/04募集失败</div> -->
      <div class="h_tip" v-if="orderDetail.statusType==6||orderDetail.statusType==7">该项目于{{orderDetail.cancelDate}}撤单成功</div>

      <div class="pro_info">
        <p class="title">{{orderDetail.productName}}({{orderDetail.projectCode}})</p>
        <img style="height:8rem;width:100%;background:#ddd" :src="orderDetail.smallImg" />
        <span class="pro_status" :class="formatZhBg(orderDetail.productStatus)">{{orderDetail.productStatusName}}</span>
        <div class="order_info">
          <table>
            <tr>
              <td class="t_title">订单状态</td>
              <td class="t_content" style="color:#FB8724">{{orderDetail.tenderStatusName}}</td>
            </tr>
            <tr>
              <td class="t_title">订单号</td>
              <td class="t_content">{{orderDetail.oidTenderID}}</td>
            </tr>
            <tr>
              <td class="t_title">创建时间</td>
              <td class="t_content">{{orderDetail.insDate}}</td>
            </tr>
            <tr>
              <td class="t_title">投资人信息</td>
              <td class="t_content">{{orderDetail.userName}}  {{orderDetail.maskIdCard}}</td>
            </tr>
          </table>
          <!--募集成功失败字段还没有-->
          <!-- <img src="../../assets/raise_defeated.png"> -->
        </div>
      </div>
      <p class="a_money"><span class="m_1">认购金额 </span><span class="m_2"> <i>{{orderDetail.tenderAmount}}</i>元</span></p>
      <div class="trans" v-show="trans">
        <p class="item_title">交易信息</p>
        <div class="trans_info">
            <table>
              <tr>
                <td class="t_title">交易流水号</td>
                <td class="t_content">{{orderDetail.tenderSsn}}</td>
              </tr>
              <tr>
                <td class="t_title">交易银行卡</td>
                <td class="t_content">{{orderDetail.cardNo}}<span class="trans_bank">({{orderDetail.bankNm}})</span></td>
              </tr>
              <tr>
                <td class="t_title">付款时间</td>
                <td class="t_content">{{orderDetail.payDate}}</td>
              </tr>
            </table>
        </div>
      </div>
      <div class="cancel" v-show="cancel">
        <p class="item_title">退款信息</p>
        <div class="trans_info">
            <table>
              <tr>
                <td class="t_title">交易流水号</td>
                <td class="t_content">6447625271490117633</td>
              </tr>
              <tr>
                <td class="t_title">交易银行卡</td>
                <td class="t_content">{{orderDetail.cardNo}}<span class="trans_bank">({{orderDetail.bankNm}})</span></td>
              </tr>
              <tr>
                <td class="t_title">退款时间</td>
                <td class="t_content">{{orderDetail.finishDate}}</td>
              </tr>
            </table>
        </div>
      </div>
      
      <div class="btn_area">
        <span v-if="orderDetail.tenderStatusName=='待支付'">立即支付(20:34)</span>
        <span v-if="orderDetail.tenderStatusName=='订单关闭'">删除订单</span>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import {AppOrderDetails} from '@/service/getData'
import {Toast} from 'mint-ui'
import $ from 'jquery'
import {formatUtils} from '@/config/mixin'
import {formatZhBg} from '@/config/utils'

  export default {
    data() {
      return {
      	oidTenderID:'',
        orderDetail:'',
        trans:true,
        cancel:false

      };
    },
    mixins: [formatUtils],
    created:function(){
  	 this.oidTenderID = this.$route.query.oidTenderID || '';
    },
    components: {},
    mounted:function(){
    	AppOrderDetails(this.oidTenderID).then(res=>{
        console.log(res)
    // 		"orderInfoMap": {
    //     "oidTenderID": "6477762004739162113",
    //     "insDate": "2017-10-17 14:25:55",
    //     "projectCode": "S40066",
    //     "statusType": 2,
    //     "overdueDate": "2017-10-17 14:55:55.0",
    //     "smallImg": "/app/data/avatar/20170503INgs5la4d3-.jpg",
    //     "finalPayDate": "01-01 00:00",
    //     "tenderSsn": "",
    //     "maskIdCard": "500300********6495",
    //     "cardNo": "6222******000",
    //     "productStatus": "1",
    //     "issEndDate": "2017-09-06",
    //     "productStatusName": "认购期",
    //     "bankNm": "农业银行",
    //     "userName": "波风水门",
    //     "confirmSuccessDate": "01/01 00:00",
    //     "payDate": "1970-01-01 00:00:00",
    //     "tenderStatusName": "订单关闭",
    //     "tenderAmount": "10000",
    //     "productName": "项目名称"
    // },
        if(res.code=="000"){
          this.orderDetail = res.orderInfoMap;
          var statusName = this.orderDetail.tenderStatusName;
          //根据状态判断信息是否显示
          if(statusName=="订单关闭"){
            this.trans = false;
          }else if(statusName=="退款完成"){
            this.cancel = true;
          }else{

          }
        }else{
          Toast(res.msg);
        }
    	});
    },
    methods: {

    },
    filters:function(){

    }
  };

</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.orderdetail_wrapper{
  font-size: 0.65rem;
  table{
      font-size: 0.65rem;
      width: 100%;
      margin-top: 0.5rem;
      td{padding:5px 0;}
      .t_title{color:#9EAABD;text-align:left;}
      .t_content{color:#282E37;text-align:right;}
  }
  .h_tip{
    height: 2rem;
    line-height: 2rem;
    font-size: 0.65rem;
    width: 100%;
    background: #FFEBD7;
    color: #FF8E1D;
    text-align: center
  }
  .pro_info{
    margin:0.75rem;
    position:relative;
    .title{color:#333;font-size:0.65rem;margin-bottom:0.5rem;line-height:1rem;}
    .pro_status{
      position: absolute;
      right: 15px;
      top: 9rem;
      padding: 3px 9px;
      border-radius: 20px;
    }
    .order_info{
      position: relative;
      img{
        position: absolute;
        width: 2.5rem;
        top: 20px;
        left: 100px;
        transform: rotate(-30deg);
      }
    }
  }
  .a_money{
    text-align: center;
    border-top: 1px solid #ddd;
    line-height: 2.5rem;
    font-size: 0.65rem;
    .m_1{color:#9EAABD}
  }
  .item_title{
    height: 2rem;
    line-height: 2rem;
    background:#F8F8F8;
    padding-left:0.75rem;
  }
  .trans_info{
    margin:0.75rem;
    .trans_bank{color:#9EAABD}
  }
  .btn_area{
    span{
      position: fixed;
      bottom: 0;
      height: 2rem;
      width: 100%;
      background: #FF8E1D;
      line-height: 2rem;
      text-align: center;color:#fff;
    }

  }
}
</style>
