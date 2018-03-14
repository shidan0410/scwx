<template>
  <div class="bind_wrapper">
    <div class="img_bg">
      <img :src="waitOrderInfo.bankCd | imgFilter" v-if="waitOrderInfo.bankCd">
      <span>尾号{{waitOrderInfo.cardNoLast}}</span>
    </div>
    <span>单笔最高{{tenTh(waitOrderInfo.singleLimitAmt)}}w 今日剩余限额{{tenTh(waitOrderInfo.dayLimitAmt)}}w</span>
    <div class="reaminTime" v-if="waitOrderInfo.remainTime"><countDownDemo :endTime="waitOrderInfo.remainTime == undefined ? '0' : waitOrderInfo.remainTime.toString()" :callback="callback" endText="已经结束了"></countDownDemo></div>
    <div class="forms">
      <div class="form_group" style="position: relative;">
        <span class="icon-pwd"></span>
        <input type="tel" placeholder="请输入短信验证码"  maxlength="6" v-model.trim="code" @keyup="verify_code()">
        <button @click="getCode($event)">获取验证码</button>
        <span class="errorMsg" v-if="codeError">{{codeError}}</span>
      </div>
      <div class="payPwd_wrapper">
        <h4>请输入6位支付密码</h4>
        <payPwd @payData="payData"></payPwd>
        <!--<span class="errorMsg" v-if="payPwdError">{{payPwdError}}</span>-->
      </div>
      <button class="buy_btn" @click='buyHandle();' :class="btn_state_change([code,payPwd])" >支 付</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getLoginVerifyCodeToBuy,loginVerifiedCodeToBuy,payOrderConfirm} from '@/service/getData'
  import {timer,verifyCode,isHight,Encrypt} from '@/config/utils'
  import {Toast} from 'mint-ui';
  import payPwd from '@/common/paypwd/payPwd'
  import {formatUtils} from '@/config/mixin'
  import countDownDemo from '@/pages/order/countDownDemo'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        code:'',/*验证码*/
        codeError:'',/*验证码错误提示*/
        payPwd:'',/*支付密码*/
        payPwdError:'',/*支付密码错误提示*/
      };
    },
    props:{
      waitOrderInfo:{},
    },
    mixins: [formatUtils],
    filters:{
      imgFilter(value) {
        return require('../../assets/bank/bankSmall/'+ value +'.png')
      },
    },
    mounted() {
    },
    methods: {
      callback(){
        this.textTip = "订单关闭"
      },
      btn_state_change(arr){
        if(isHight(arr)){
          return 'active'
        }
        return ''
      },
      verify_code() {/*前端校验用户输入的验证码*/
        if(this.code.length == 6){
          let result = verifyCode(this.code);
          this.codeError = result;
          if(!result){
            /*前端校验通过*/
            this.verifiedPhoneCode();
          }
        }
      },
      verifiedPhoneCode() {
          //登录内验证手机验证码
        loginVerifiedCodeToBuy(this.code,6).then(res =>{
            if(res.code != ERR_OK){
              this.codeError = res.msg
            }else{
              this.codeError = false;
            }
          })
      },
      getCode(event){
        /*倒计时*/
        getLoginVerifyCodeToBuy(6).then(res =>{
          if(res.code == ERR_OK){
            timer(event.target)
          }
        })
      },
      payData(str) {
//        console.log(str);
        if(str && str.length == 6){
          this.payPwdError = false;
          this.payPwd = str;
        }else{
          this.payPwdError = '请输入6位支付密码';
        }
      },
      buyHandle() {
//        this.verify_code();
//        this.payData();
        /*判断成功后支付*/
        if(!this.codeError && !this.payPwdError) {
          this.openLoading('支付中');
          /*购买*/
          payOrderConfirm(this.waitOrderInfo.tenderAmount,
            this.waitOrderInfo.bankNoIndex,
            Encrypt(this.payPwd),
            this.waitOrderInfo.projectCode,
            this.waitOrderInfo.tenderId,
            this.code
          ).then(res =>{
            if(res.code == '010' || res.code == '008'){
              Toast(res.msg);
            }else if(res.code == '003'){/*003 验证码不可为空  010 请先发送短信验证码*/
              Toast(res.msg);
            }else{
              /*跳转至购买结果页 缓存信息*/
              window.localStorage.setItem('buyresult',JSON.stringify(res));
              this.$router.push({path:'/buyresult',query:{title:'支付结果'}});
            }
            this.closeLoading();
          })
        }
      }
    },
    components: {payPwd,Toast,countDownDemo}
  }
</script>

<style lang="scss">
  .bind_wrapper{
    .img_bg{
      position: relative;
      span{
        position: absolute;
        right: .9rem;
        top: 1.5rem;
        color: #fff;
        font-size: .56rem;
      }
      img{
        width:100%;
      }
    }
    span{
      margin: 0 .5rem;
      color: #999;
      font-size: .5rem;
    }
    .reaminTime{
      text-align: center;
      margin: 1.7rem 0 1.7rem;
      i{
        color: #FF8E1D;
        font-size: .7rem;
      }
      span{
        font-size: .65rem;
        color: #333;
      }
    }
    .forms{
      padding: 0 1.5rem;
      .form_group{
        position: relative;
        .errorMsg{
          left: 0.4rem;
          top: 2rem!important;
        }
        .icon-pwd{
          position: absolute;
          margin:0;
          width:.9rem;
          top: .3rem;
        }
        input{
          padding-left: 1rem;
          display: inline-block;
          vertical-align: top;
          width: 7rem;
          height: 1.65rem;
          line-height: 1.65rem;
          border-bottom: 1px solid #E3E3E3;
          font-size: .55rem;
          color: #979797;
          margin-right: 1.3rem;
          outline: none;
          border-radius: 0;
          &:focus{
            border-color: #ff8e1d;
          }
        }
        button{
          display: inline-block;
          vertical-align: top;
          width: 4.4rem;
          height: 1.65rem;
          border: 1px solid #FF8E1D;
          border-radius: 8px;
          background-color: #fff;
          color: #FF8E1D;
          font-size: .55rem;
        }
        .errorMsg{
          position: absolute;
          right: 5.5rem;
          color: red;
          top: .5rem;
        }
      }
      .payPwd_wrapper{
        h4{
          font-size: .65rem;
          color: #666666;
          margin: 1.25rem 0 0.55rem;
        }
      }
    }
    .buy_btn{
      position: absolute;
      bottom: 0;
      left: 0;
      width:100%;
      height: 2.15rem;
      line-height: 2.15rem;
      background: #E3E3E3;
      font-size: .75rem;
      color: #999999;
      text-align: center;
      &.active{
        color: #fff;
        background-color: #ff8e1d;
      }
    }
  }
</style>




