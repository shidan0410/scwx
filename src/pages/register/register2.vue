<template>
  <div id="register_wrapper">
    <!--手机号-->
    <section>
      <div class="input_group">
        <span class="icon_phone"></span>
        <input class="form__input" type="tel" id="tel" v-model="telNum" @blur="verify_tel()" maxlength="11"  placeholder="请输入手机号">
        <span class="errorMsg" v-if="telError">{{telError}}</span>
      </div>
    </section>
    <!--图形验证码-->
    <section style="display:block;" id="imgCodeArea">
      <div class="form-group">
        <span class="icon_verify"></span>
        <input class="form__input" v-model="imgCode" @keyup="" placeholder="请输入图形验证码">
        <img src="" id="m_imgCode" @click="getImgCode()">
        <span class="errorMsg" style="right:4.5rem;" v-if="imgCodeError">{{imgCodeError}}</span>

      </div>
    </section>
    <!--手机验证码-->
    <section>
      <div class="form-group">
        <span class="icon_verify"></span>
        <input class="form__input" v-model="code" @blur="verify_code()" placeholder="请输入手机验证码">
        <span class="errorMsg" style="right:4.5rem;" v-if="codeError">{{codeError}}</span>
        <button class="get_code" id="get_code" @click="settime($event)">获取验证码</button>
      </div>
    </section>

    <!--密码-->
    <section>
      <div class="input_group">
        <span class="icon_pwd"></span>
        <input class="form__input" type="password" id="pwd" v-model="password" @blur="verify_pwd()" placeholder="密码必须是8到20位字母数字组合">
        <span class="icon-closeeyes" id="iconEye" @click="pwd_change()" style="position: absolute;right: 0;top: 6px;"></span>
        <span class="errorMsg" v-if="pwdError" style="right:1.5rem">{{pwdError}}</span>
      </div>
    </section>

    <!--注册协议-->
    <section style="margin:1.25rem 0 0 0.25rem">
      <div class="">
       <!--  <label class="mint-checklist-label" for="sss">
          <span class="mint-checkbox">
            <input type="checkbox" id="sss" class="mint-checkbox-input" value="" v-model="isAgree">
            <span class="mint-checkbox-core"></span>
          </span>
          <span class="reg_protocol">我已阅读和同意<a href="#/registeProtocol">《注册及服务协议》</a></span>
        </label> -->
        <input id="isAgree" type="checkbox" v-model="isAgree">
        <span class="reg_protocol">我已阅读和同意<a href="#/registeProtocol">《注册及服务协议》</a></span>
      </div>
    </section>
    <button  class="btn_disabled" :class="btn_state_change(telNum,imgCode,code,password)" @click="submit();" style="margin-top:1rem">下一步</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { telphone,passwordReg } from '@/vuelidators/index'
  import {login,checkMobile,registFirstSubmit,getImgVerifyCode,getVerifyCodeToImg,verifiedPicCode,loginOutVerifiedCode} from '@/service/getData'
  import {timer,verifyTel,verifyCode,verifyPwd,isHight,isSuccess,Encrypt,genRandomStr} from '@/config/utils'
  import $ from 'jquery'
  import {formatUtils} from '@/config/mixin'
  import {Toast,Checklist} from 'mint-ui';

  const ERR_OK = '000';

  export default {
    data () {
      return {
        telNum: '',//手机号
        telError:'',
        imgCode:'',//图形验证码
        imgCodeError:'',
        password:'',//密码
        pwdError:'',
        code:'',//手机验证码
        codeError:'',
        isAgree:false,//是否同意注册协议
        errorMsg:{},
        btn_state:true,
        eyeOpen:false,
        registerCode:'',//注册邀请码
        isShare:false
      }
    },
    async beforeMount(){
//        this.registerCode = this.$route.query.registerCode||'';
//        if(this.registerCode){//从分享过来的注册，生成随机码作为openid；
            localStorage.openid = genRandomStr(10);
            this.isShare = true;
//        }
     },
    mounted(){
      this.getImgVerifyCode();


    },
    components:{Toast,Checklist},
    mixins:[formatUtils],
    methods: {
      pwd_change(){
            if(this.eyeOpen){
              $("#pwd").attr('type','password');
              $("#iconEye").removeClass("icon-eyes").addClass("icon-closeeyes");
              this.eyeOpen = false;
            }else{
              $("#pwd").attr('type','text');
              $("#iconEye").removeClass("icon-closeeyes").addClass("icon-eyes");
              this.eyeOpen = true;
            }
      },
      verify_tel(){
        var result = verifyTel(this.telNum);
        if(result!='lengthError'){
      if(!result){//res为false表示前端验证通过
            checkMobile(this.telNum).then(res=>{
              if(res.code==ERR_OK){
                this.telError=result;
              }else{
                this.telError=res.msg;
              }
            })
          }else{
            this.telError=result
          }
        }


      },
      verify_imgCode(){
        this.telError = verifyTel(this.telNum);
        if(this.imgCode.length==0){
          this.imgCodeError = '图形验证码不能为空'
        }
      },
      //从后台获取图形验证码
      getImgVerifyCode(){
        getImgVerifyCode().then(res=>{
            if(res.code==ERR_OK){
                $('#m_imgCode').attr('src',"data:image/png;base64,"+res.msg);
                $("#imgCodeArea").css('display','block');
            }else{
                alert('获取图形验证码失败');
            }
        })
      },
      getImgCode(){
        this.getImgVerifyCode();
      },
      verify_code(){
        var result = verifyCode(this.code);
        if(!result){
          //请求数据库验证
          loginOutVerifiedCode(this.telNum,this.code,1).then(res=>{
            if(res.code==ERR_OK){
              this.codeError = false;
            }else if(res.code=='003'){
              this.codeError = res.msg;
              this.getImgVerifyCode();
              this.imgCode = ""
            }else if(res.code=='005'){
              //this.codeError = res.msg;
              Toast(res.msg+"，请重新获取");
              this.getImgVerifyCode();
              this.imgCode = ""
            }else{
              this.codeError = res.msg;
            }
          });
        }else{
          this.codeError=result
        }
      },
      verify_pwd(){
        var result = verifyPwd(this.password);
        this.pwdError = result;
      },
      btn_state_change(tel,imgCode,code,pwd){
        var arr = [tel,imgCode,code,pwd];
        if(isHight(arr)&&this.isAgree){
          return 'btn_default'
        }
        return ''
      },
      submit(){
        //按钮是灰色时不做验证
        //registerCode 注册邀请码
        var arr = [this.telError,this.codeError,this.pwdError];
        if(isSuccess(arr)&&this.isAgree){
           // console.log("res");
           this.openLoading();
           registFirstSubmit(Encrypt(this.password),this.registerCode).then(res=>{
              console.log(res);
              if(res.code=="000"){
                if(this.isShare){
                  //跳转关注公众号页面
                  this.$router.push('/followWechat');
                }else{
                  //先做登录操作，保存登录后的token，跳转首页,
                  console.log("注册成功后登录："+this.telNum+","+Encrypt(this.password));
                  login(this.telNum,Encrypt(this.password)).then(res=>{
                    console.log(res);
                    if(res.code=="000"){
                      this.$router.push('/index');
                      localStorage.tokenid = res.tokenId||'';
                      localStorage.user = this.telNum;
                      localStorage.pwd = Encrypt(this.password);//保存密码，后续登录使用
                      localStorage.loginFlag = true;
                    }else{
                      localStorage.loginFlag = false;
                      Toast(res.msg);
                    }
                  })
                }
              }else{
                Toast(res.msg);
                this.getImgVerifyCode();
                this.imgCode = ""
              }
              this.closeLoading();
           })
        }


      },
      settime(event) {
         //获取手机验证码，需要图形验证码作为参数
         //获取验证码前验证手机号和图形验证码
         this.telError = verifyTel(this.telNum);//验证手机号
         this.imgCodeError = "";
         if(!this.telError&&!this.imgCodeError){
            getVerifyCodeToImg(this.telNum,this.imgCode,1).then(res=>{
              console.log(res);
              var _self = this;
              if(res.code==ERR_OK){
                  timer(event.target,function(){
                    _self.getImgVerifyCode();
                    _self.imgCodeError = '';
                  });

              }else{
                //this.imgCodeError = res.msg;
                //this.getImgVerifyCode();
                Toast(res.msg);
              }
            })
         }

      },
      finishTimer(){

      }


    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  @import 'src/style/iconfont';

  #register_wrapper{
    padding: 3rem 1.25rem 0 1.25rem;
    section {
      position: relative;
      margin-bottom: 0.5rem;
      .form-group__message{
        position: absolute;
        right:0;
        top:0.3rem;
        font-size: .6rem;
        color: red;
        line-height: 1;
        display: none;
      }
      .form-group,.input_group{
        // border-bottom: 1px solid #ddd;
        margin-bottom: 0.3rem;
        overflow: hidden;
        height: 1.5rem;
        input{
          // width:calc(100% - 2rem);
          font-size: .6rem;
          outline: none;
          padding-left:1rem;
          // padding: 0.25rem 0 0.25rem 1rem;

        }
      }
    }

  }
  .reg_protocol{
    color:#666;font-size:0.6rem;
    a{color:#ff8e1d;}
  }
  .form-group--error+.form-group__message {
    display: block!important;
  }
#m_imgCode{position: absolute;right: 0;width: 3.9rem;height: 1.5rem;}
.errorMsg{
  font-size:0.6rem;color:red;position:absolute;right:0;top: 9px;
}
.icon_phone{background:url('../../assets/login/login_tel.png');position: absolute;height: 23px;width: 20px;top: 4px;background-size: 20px;}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top: 4px;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 4px;background-size: 20px;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 4px;right:0;background-size: 20px;}

.mint-checkbox-core{
      width:.5rem!important;
      height: .5rem !important;
      border-radius: 0!important;
      position: relative;
      top:-2px;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core{
      background: #ff8e1d!important;
      border-color:#ff8e1d!important;
    }
    .mint-checkbox-core::after {
      top: -0.01rem !important;
      left: 0.1rem !important;
      width: .1rem !important;
      height: .25rem !important;
    }

</style>

