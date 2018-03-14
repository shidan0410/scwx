<template>
  <div class="edit_pay_password_wrapper">
    <div class="content">
      <div class="oldPhone">
        密码仅支持6位数字
      </div>

      <div class="input_group group">
        <!--<label for="">请输入原支付密码</label>-->
        <!--<payPwd @payData="payData1"></payPwd>-->
        <input type="password" placeholder="请输入原支付密码" v-model.trim="oldpayPassword" @blur="verify_oldPayPassword('oldpayPasswordMsg');" @keyup="verify_oldPayPassword();" maxlength="6">
        <span class="errorMsg" v-if="oldpayPasswordMsg">{{oldpayPasswordMsg}}</span>
      </div>
      <div class="input_group group">
        <!--<label for="">请输入原支付密码</label>-->
        <!--<payPwd @payData="payData2"></payPwd>-->
        <input type="password" placeholder="请输入6位新支付密码" v-model.trim="payPassword" @blur="verify_PayPassword('payPasswordMsg');" @keyup="verify_PayPassword()" maxlength="6">
        <span class="errorMsg" v-if="payPasswordMsg">{{payPasswordMsg}}</span>
      </div>
      <div class="input_group group">
        <!--<label for="">请输入原支付密码</label>-->
        <!--<payPwd @payData="payData3"></payPwd>-->
        <input type="password" placeholder="请确认新密码" v-model.trim="confirmPayPassword"  @keyup="verify_ConfirmPayPassword();" maxlength="6">
        <span class="errorMsg" v-if="confirmPayPasswordMsg" >{{confirmPayPasswordMsg}}</span>
      </div>
      <button class="btn_disabled" @click="submit();" :class="btn_state_change(oldpayPasswordMsg,payPasswordMsg,confirmPayPasswordMsg)">提交</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {sendShortMessage,updNewPayPassword} from '@/service/getData'
  import {timer,getStore,verifyPayPassword,isHight,Encrypt,isSuccess} from '@/config/utils'
  import { Toast } from 'mint-ui';
  import {formatUtils} from '@/config/mixin'
  import payPwd from '@/common/paypwd/payPwd'

  const  ERR_OK = '000';
  export default {
    data() {
      return {
        personalInfo:'',
        code:'',//手机验证码
        codeMsg:'',
        oldpayPassword:'',//原支付密码
        oldpayPasswordMsg:'',
        payPassword:'',
        payPasswordMsg:'',
        confirmPayPassword:'',
        confirmPayPasswordMsg:''
      };
    },
    mixins: [formatUtils],
    beforeMount() {
      this.personalInfo = JSON.parse(getStore('personalInfo'));
    },
    mounted() {
    },
    methods: {
      payData1(arr) {
        if(arr && arr.length == 6){
          this.oldpayPasswordMsg = false;
          this.oldpayPassword = arr.join('');
        }else{
          this.oldpayPasswordMsg = '请输入6位原支付密码';
        }
      },
      payData2(arr) {
        if(arr && arr.length == 6){
          this.payPasswordMsg = false;
          this.payPassword = arr.join('');
        }else{
          this.payPasswordMsg = '请输入6位新支付密码';
        }
      },
      payData3(arr) {
        if(arr && arr.length == 6){
          this.confirmPayPassword = arr.join('');
          if(this.confirmPayPassword == this.payPassword){
            this.confirmPayPasswordMsg = false;
          }else{
            this.confirmPayPasswordMsg = '两次输入密码不一致';
          }
        }else{
          this.confirmPayPasswordMsg = '请确认输入6位新支付密码';
        }
      },
      btn_state_change(a,b,c){
        let arr = [a,b,c];
        if(isSuccess(arr)){
          return 'btn_default'
        }
      },
      verify_oldPayPassword(str) {
        if(str){
          this.oldpayPasswordMsg =  verifyPayPassword(this.oldpayPassword);
        }else{
          verifyPayPassword(this.oldpayPassword);
        }

      },
      verify_PayPassword(str) {
        /*校验支付密码*/
        if(str){
          this.payPasswordMsg = verifyPayPassword(this.payPassword)
        }else{
          verifyPayPassword(this.payPassword)
        }

      },
      verify_ConfirmPayPassword() {
          /*确认密码是否相同*/
        if(this.confirmPayPassword.length == 6){
          if(this.confirmPayPassword == this.payPassword){
            this.confirmPayPasswordMsg = false;
          }else{
            this.confirmPayPasswordMsg = '两次输入密码不一致';
          }
        }else{
          this.confirmPayPasswordMsg = '';
        }
      },
      submit() {
        if(isSuccess([this.oldpayPasswordMsg,this.payPasswordMsg,this.confirmPayPasswordMsg])){
          /*前端校验通过提交信息*/
          this.openLoading();
          updNewPayPassword(Encrypt(this.oldpayPassword),Encrypt(this.payPassword)).then(res =>{
            if(res.code == ERR_OK){
              /*保存新密码成功*/
              Toast({
                message: '修改支付密码成功',
                className: 'toast'
              });
              this.$router.push({path:'/userlist',query:{title:'基本信息'}})
            }else if(res.code == '004'){
                /*原支付密码格式错误*/
              this.oldpayPasswordMsg = res.msg;
            }else if(res.code == '005'){
              /*新支付密码格式错误*/
              this.payPasswordMsg = res.msg;
            }else{
              Toast({
                message: res.msg,
                className: 'toast'
              });
            }
            this.closeLoading();
          })
        }
      }
    },
    components: {
      Toast,payPwd
    }
  }
</script>

<style lang="scss">
  .edit_pay_password_wrapper{
    .content{
      padding: 2.25rem 1.4rem;
      .btn_default{
        margin-top: 1.5rem;
      }
      button{
        margin-top: 2rem;
      }
      .oldPhone{
        font-size: .55rem;
        color: #333;
        text-align: center;
      }
      .group{
        margin-top: 1.3rem;
        height:1.5rem;
        input[type='text'],input[type='password']{
          font-size: 0.7rem;
          outline: none;
        }
        label{
          display: block;
          font-size: .55rem;
          color: #666666;
          margin-bottom: .5rem;
        }
      }
    }
  }

</style>
