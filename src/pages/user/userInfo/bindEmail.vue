<template>
  <div class="edit_tel_wrapper">
    <div class="content">
      <div class="input_group group">
        <span class="icon-email"></span>
        <input type="email" placeholder="请输入邮箱" v-model.trim="email" @blur="verify_email();">
        <span class="errorMsg" v-if="emailError" >{{emailError}}</span>
      </div>
      <!--<button class="btn_disabled" :class="btn_state_change(emailError)" @click="submit()">提交</button>-->
      <button class="btn_disabled" :class="{btn_default:email}" @click="submit()">提交</button>
      <p>绑定邮箱后需要登录该邮箱进行验证</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {verifyEmail,isHight,isSuccess} from '@/config/utils'
  import {sendUserEmail} from '@/service/getData'
  import { Toast } from 'mint-ui';
  import {formatUtils} from '@/config/mixin'

  const ERR_OK = '000'
  export default {
    data() {
      return {
        email:'',//邮箱
        emailError:''
      };
    },
    mixins: [formatUtils],
    mounted() {
    },
    methods: {
      btn_state_change(a){
        let arr = [a];
        if(isHight(arr)){
          return 'btn_default'
        }
      },
      verify_email() {
        var result = verifyEmail(this.email);
        this.emailError = result;
      },
      submit() {
        //console.log(this.emailError)
        //this.verify_email();
        if(isSuccess([this.emailError])){
            /*前端校验通过*/
          this.openLoading();
          sendUserEmail(this.email).then(res =>{
            this.closeLoading();
            if(res.code == ERR_OK){
              Toast({
                message: '邮件发送成功',
                className: 'toast'
              });
              this.$router.push({path:'/userlist',query:{title:'基本信息'}})
            }else{
              this.emailError = res.msg;
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

<style lang="scss">
  .edit_tel_wrapper{
    .content{
      padding: 2.25rem 1.4rem;
      .btn_default{
        margin-top: 1.5rem;
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
        input[type='email']{
          font-size: 0.7rem;
          outline: none;
          padding-left: 1rem;
        }
        .icon-email{
          position: absolute;
          top: .3rem;
        }
      }
    }
    p{
      font-size: .55rem;
      color: #999999;
      margin-top: .85rem;
    }
  }

</style>
