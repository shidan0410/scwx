<template>
  <div class="edit_tel_wrapper">
    <div class="content">
      <div class="input_group group">
        <span class="icon-phone icons"></span>
        <input type="text" placeholder="请输入新手机号" v-model.trim="newTel" @blur="verify_tel()">
        <span class="errorMsg" v-if="telError">{{telError}}</span>
      </div>
      <div class="form-group group">
        <span class="icon-pwd icons" style="left: 0;"></span>
        <input type="text" v-model.trim="newCode" placeholder="请输入验证码" @focus="verify_tel()" @keyup="verify_new_code()">
        <button @click="getCodeNew($event)">获取验证码</button>
        <span class="errorMsg" v-if="newCodeError" style="right: 4.5rem;">{{newCodeError}}</span>
      </div>
      <button class="btn_disabled" @click="submit();" :class="btn_state_change(newTel,newCode)">绑定</button>
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
        newTel:'',//新手机号
        newCode:'',//新手机验证码
        telError:'',//手机错误提示
        newCodeError:''//手机错误码提示
      };
    },
    mixins: [formatUtils],
    mounted() {
    },
    methods: {
      btn_state_change(a,b){
        if(a&&b){
          return 'btn_default'
        }
      },
      getCode(obj) {
        getVerifyCode(this.newTel,3).then(res=>{
          if(res.code == ERR_OK){
            timer(obj)
          }
        })
      },
      verifiedPhoneCode(val) {
          //登录外验证手机验证码
          verifiedCodeUpdMoblie(this.newTel,val,3).then(res=>{
            if(res.code != ERR_OK){
              this.newCodeError = res.msg
            }else{
              this.newCodeError = false
            }
          })

      },
      getCodeNew(event){
        /*倒计时*/
        if(!this.newTel){
          this.telError = '手机号不能为空';
          return false;
        }
        this.getCode(event.target);
      },
      verify_new_code() {
        if(this.newCode.length==6){
          let result = verifyCode(this.newCode);
          this.newCodeError = result;
          if(!result){
            /*前端校验通过*/
            this.verifiedPhoneCode(this.newCode);
          }
        }

      },
      verify_tel() {
        let result = verifyTel(this.newTel);
        this.telError = result;
        if(!result){
          /*校验手机号是否注册过*/
          checkMobile(this.newTel).then(res =>{
            if(res.code != ERR_OK){
              this.telError = res.msg;
            }else{
              this.telError = false;
            }
          })
        }
      },
      submit() {
        if(!this.telError && !this.newCodeError){
          /*前端校验通过提交信息*/
          this.openLoading();
          saveNewUserPhone(this.newTel).then(res =>{
            this.closeLoading();
            if(res.code == ERR_OK){
              /*保存新手机号成功*/
              Toast({
                message: '修改手机号成功',
                className: 'toast'
              });
              this.$router.push({path:'/login',query:{title:'登录'}})
            }else if(res.code == '002'){
              this.telError = res.msg;
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
      Toast
    }
  }
</script>

<style lang="scss" scoped>
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
        position: relative;
        .icons{
          position: absolute;
          left: .15rem;
          top: .23rem;
        }
        .errorMsg{

        }
        input[type='text']{
          font-size: 0.7rem;
          outline: none;
          padding-left: 1rem;
        }
      }
    }
  }

</style>
