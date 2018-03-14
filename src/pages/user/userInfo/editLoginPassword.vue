<template>
  <div class="edit_pay_password_wrapper">
    <div class="content">
      <div class="oldPhone">密码可使用英文. 数字，字数限制为8～20位字符</div>
      <div class="input_group group">
        <span class="icon-loginPwd icons"></span>
        <input type="password" placeholder="请输入原始密码" style="width: 100%;" @blur="verify_password(1);" v-model.trim="loginPassword">
        <span class="errorMsg" v-if="loginPasswordMsg">{{loginPasswordMsg}}</span>
        <span class="icon-closeeyes eyes" @click="pwd_change($event)"></span>
      </div>
      <div class="input_group group">
        <span class="icon-loginPwd icons"></span>
        <input type="password" placeholder="请输入新密码" @blur="verify_password(2);" v-model.trim="NewloginPassword">
        <span class="errorMsg" v-if="NewloginPasswordMsg">{{NewloginPasswordMsg}}</span>
        <span class="icon-closeeyes eyes" @click="pwd_change($event)"></span>
      </div>
      <div class="input_group group">
        <span class="icon-loginPwd icons"></span>
        <input type="password" placeholder="请确认新密码" v-model.trim="confirmPayPassword"  @blur="verify_ConfirmPayPassword();">
        <span class="errorMsg" v-if="confirmPayPasswordMsg" >{{confirmPayPasswordMsg}}</span>
        <span class="icon-closeeyes eyes" @click="pwd_change($event)"></span>
      </div>
      <button class="btn_disabled" @click="submit();" :class="btn_state_change(loginPassword,NewloginPassword,confirmPayPassword)">提交</button>
    </div>
      <!--<button class="btn_disabled" @click="submit();" :class="btn_state_change(codeMsg,loginPasswordMsg,NewloginPasswordMsg)">提交</button>-->

    </div>
</template>

<script type="text/ecmascript-6">
  import {getLoginVerifyCode,loginVerifiedCode,updRetrievePwd} from '@/service/getData'
  import {timer,getStore,verifyCode,verifyPwd,isHight,Encrypt,isSuccess} from '@/config/utils'
  import {formatUtils} from '@/config/mixin'
  import { Toast } from 'mint-ui';
  import $ from 'jquery';

  const ERR_OK = '000';

  export default {
    data() {
      return {
        personalInfo:'',
//        code:'',//手机验证码
//        codeMsg:'',
        loginPassword:'',//旧密码
        loginPasswordMsg:'',
        NewloginPassword:'',//新密码
        NewloginPasswordMsg:'',
        confirmPayPassword:'',
        confirmPayPasswordMsg:'',
        eyeOpen:false,
      };
    },
    mixins: [formatUtils],
    beforeMount() {
      this.personalInfo = JSON.parse(getStore('personalInfo'));
    },
    mounted() {
    },
    methods: {
      pwd_change(event){
        console.log(1);
        if(this.eyeOpen){
          $(event.target).parent().find('input').attr('type','password');
          $(event.target).removeClass("icon-eyes").addClass("icon-closeeyes");
          this.eyeOpen = false;
        }else{
          $(event.target).parent().find('input').attr('type','text');
          $(event.target).removeClass("icon-closeeyes").addClass("icon-eyes");
          this.eyeOpen = true;
        }
      },
//      btn_state_change(a,b,c){
//        let arr = [a,b,c];
//        if(isHight(arr)){
//          return 'btn_default'
//        }
//      },
      btn_state_change(a,b,c){
        if(isHight([a,b,c])){
          return 'btn_default'
        }
      },
//      getCode(obj) {
//        getLoginVerifyCode(4).then(res =>{
//          /*登录内获取短信验证码*/
//          if(res.code == ERR_OK){
//            timer(obj)
//          }
//        })
//      },
//      verifyCode(val) {
//        loginVerifiedCode(val,4).then(res =>{
//          if(res.code != ERR_OK){
//            this.codeMsg = res.msg
//          }else{
//            this.codeMsg = false
//          }
//        })
//      },
//      verify_code() {
//        var result = verifyCode(this.code);
//        this.codeMsg = result;
//        if(!result){
//          /*前端校验通过*/
//          this.verifyCode(this.code,1);
//        }
//      },
      verify_password(type) {
        if(type == 1){
          var result = verifyPwd(this.loginPassword);
          this.loginPasswordMsg = result;
        }else {
          var result = verifyPwd(this.NewloginPassword);
          this.NewloginPasswordMsg = result;
        }
      },
      verify_ConfirmPayPassword() {
        /*确认密码是否相同*/
        if(this.confirmPayPassword.length >= 8){
          if(this.confirmPayPassword == this.NewloginPassword){
            this.confirmPayPasswordMsg = false;
          }else{
            this.confirmPayPasswordMsg = '两次输入密码不一致';
          }
        }else{
          this.confirmPayPasswordMsg = '至少8位数字和字母组合';
        }
      },
//      getCode(event) {
//        /*倒计时*/
//        this.getCode(event.target);
//      },
      submit() {
//        console.log(this.loginPasswordMsg)
//        console.log(this.NewloginPasswordMsg)
//        console.log(this.confirmPayPasswordMsg)
//        console.log("0000000000000"+isSuccess([this.loginPasswordMsg,this.NewloginPasswordMsg,this.confirmPayPasswordMsg]))
//        if(!this.loginPasswordMsg && !this.NewloginPasswordMsg && !this.confirmPayPasswordMsg){
        if(isSuccess([this.loginPasswordMsg,this.NewloginPasswordMsg,this.confirmPayPasswordMsg])){
//            console.log("sss")
            /*前端校验通过提交信息*/
            this.openLoading();
            updRetrievePwd(Encrypt(this.loginPassword),Encrypt(this.NewloginPassword)).then(res =>{
              this.closeLoading();
              if(res.code == ERR_OK){
                /*保存新密码成功*/
                Toast({
                  message: '修改登录密码成功',
                  className: 'toast'
                });
                this.$router.push({path:'/login',query:{title:'登录'}})
              }else if(res.code == '001'){
                this.loginPasswordMsg = res.msg
              }else if(res.code == '002'){
                this.NewloginPasswordMsg = res.msg
              }else if(res.code == '006'){
                this.loginPasswordMsg = res.msg
              }else{
                Toast({
                  message: res.msg,
                  className: 'toast'
                });
              }
            })
          }
        }
    },
    components: {
      Toast
    }
  }
</script>

<style lang="scss" scoped>
  .edit_pay_password_wrapper{
    .content{
      padding: 2.25rem 1.4rem;
      .btn_default,.btn_disabled{
        margin-top: 1.5rem;
      }
      .oldPhone{
        font-size: .55rem!important;
        color: #333333!important;
        text-align: center;
      }
      .group{
        margin-top: 1.3rem;
        height:1.5rem;
        .errorMsg{
          right: 32px;
        }
        .eyes{
          position: absolute;
          right: 0;
          top: -0rem;
        }
        .icons{
          position: absolute;
          top: .2rem;
        }
        input[type='text'],input[type='password']{
          font-size: 0.7rem;
          outline: none;
          padding-left: 1rem;
        }
      }
    }
  }

</style>
