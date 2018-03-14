<template>
  <div class="edit_tel_wrapper">
    <div class="content">
      <div class="oldPhone">
        <div>当前手机号码：</div>
        <div class="tel">{{ personalInfo.mobile }}</div>
      </div>
      <div class="form-group group" style="margin-top: 3.45rem">
        <span class="icon-pwd" style="position: absolute;top: .25rem;"></span>
        <input type="text" v-model.trim="oldCode" placeholder="请输入验证码" @keyup="verify_old_code()" style="padding-left: 1rem">
        <button @click="getCodeOld($event)" style="font-size: .5rem">获取验证码</button>
        <span class="errorMsg" v-if="oldCodeError" style="right: 4.5rem;">{{oldCodeError}}</span>
      </div>


      <button class="btn_disabled" @click="submit();" :class="btn_state_change(oldCode)">下一步</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getLoginVerifyCode,loginVerifiedCode,checkMobile,saveNewUserPhone,getVerifyCode,verifiedCodeUpdMoblie} from '@/service/getData'
  import {timer,getStore,verifyCode,verifyTel,isHight} from '@/config/utils'
  import {formatUtils} from '@/config/mixin'
  import { Toast } from 'mint-ui';
  const ERR_OK = '000';

  export default {
    data() {
      return {
        personalInfo:'',
        oldCode:'',//原手机验证码
        oldCodeError:'',//手机错误码提示
      };
    },
    mixins: [formatUtils],
    beforeMount() {
      this.personalInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    },
    mounted() {
    },
    methods: {
      btn_state_change(a){
        if(a){
          return 'btn_default'
        }
      },
      getCode(flag,obj) {
        if(flag=='old'){
          getLoginVerifyCode(3).then(res =>{
            if(res.code == ERR_OK){
              timer(obj)
            }
          })
        }else{
          getVerifyCode(this.newTel,3).then(res=>{
            if(res.code == ERR_OK){
              timer(obj)
            }
          })
        }

      },
      verifiedPhoneCode(val) {
          //登录内验证手机验证码
          loginVerifiedCode(val,3).then(res =>{
            if(res.code != ERR_OK){
              this.oldCodeError = res.msg
            }else{
              this.oldCodeError = false
            }
          })
      },
      getCodeOld(event){
        /*倒计时*/
        this.getCode('old',event.target);
      },
      verify_old_code() {/*验证验证码*/
        let result = verifyCode(this.oldCode);
        this.oldCodeError = result;
        if(!result){
          /*前端校验通过*/
          this.verifiedPhoneCode(this.oldCode);
        }
      },

      submit() {
        if(!this.oldCodeError && this.oldCode){
          /*前端校验通过提交信息*/
          this.$emit("changeCurrent",3)
        }
      }
    },
    components: {
      Toast
    }
  }
</script>

<style lang="scss">

  .edit_tel_wrapper{
    .content{
      padding: 2.25rem 1.4rem;
      .btn_default,.btn_disabled{
        margin-top: 1.5rem;
        outline: none;
      }
      .oldPhone{
        font-size: .7rem;
        color: #999;
        span{
          color: #333;
          line-height: 1.1rem;
        }
      }
      .group{
        margin-top: 1.3rem;
        height:1.5rem;
        .errorMsg{

        }
        input[type='text']{
          font-size: 0.7rem;
          outline: none;
        }
      }
    }
  }

</style>
