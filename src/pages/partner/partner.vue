<template>
    <div id='_wrapper'>
      <img src="./img.png" alt="">
      <div class="titles_container">
        <div class="time">活动时间： 2017.11.22 - 2017.12.22</div>
        <div class="top_title">
          <div>
            <div class="boxs_1 box">
              <div><img src="./icon_2.png" alt=""></div>
              <span class="ft">免费提供</span>
              <span>双创板挂板资格</span>
            </div>
             <div class="boxs_2 box">
              <div><img src="./icon_1.png" alt=""></div>
              <span class="ft">独家定制</span>
              <span>创业服务大礼包</span>
            </div>
            <p>挂牌仪式 · 媒体宣传 · 融资路演 · 品牌推广 · 导师授课</p>
          </div>        
        </div>
      </div>
      <div class="content">
        <h1>马上报名</h1>
        <h2>抢取盐商集团投融资&创业孵化一站式服务</h2>
        <div class="content_form">
          <div class="ipt_form">
            <label for="">*</label>
            <input type="text" placeholder="请输入企业名称" v-model.trim="companyName" @blur="checkcompanyName();">
            <span class="errorMsg" v-if="companyNameError">请输入企业名称</span>
          </div>
          <div class="ipt_form">
            <label for="">*</label>
            <input type="text" placeholder="请输入联系人姓名" v-model.trim="username" @blur="checkusername();">
            <span class="errorMsg" v-if="usernameError">请输入联系人姓名</span>
          </div>
          <div class="ipt_form">
            <label for="">*</label>
            <input type="tel" placeholder="请输入联系电话" v-model.trim="mobile" @blur="verify_tel()">
            <span class="errorMsg" v-if="mobileError">{{mobileError}}</span>
          </div>
          <div class="ipt_form">
            <label for="">*</label>
            <input type="tel" class="code_txt" placeholder="请输入验证码" v-model.trim="code" @keyup="verify_code()">
            <button class="getCode_btn" @click='getCode($event)'>获取验证码</button>
            <span class="errorMsg" v-if="codeError">{{codeError}}</span>
          </div>
          <div class="ipt_form">
            <label for=""></label>
            <input type="email" placeholder="请输入邮箱地址" v-model.trim="email" >
          </div>
          <div class="ipt_form">
            <label for=""></label>
            <input type="date" id="date" placeholder="请输入企业注册时间"  v-model.trim="registerTime" >
          </div>
          <div class="ipt_form">
            <label for=""></label>
            <input type="text" placeholder="请输入所属行业" v-model.trim="industryType">
          </div>
          <div class="ipt_form">
            <label for=""></label>
            <textarea placeholder="请输入企业注册地址" v-model.trim="registerAddress"></textarea>
          </div>
          <div class="ipt_form">
            <label for=""></label>
            <div class="tips">
              <p class="t_title">温馨提示：</p>
              <p class="t_con">信息填写完整有助于审核筛选，
               且商业模式清晰，有一定营收的企业优先</p>
            </div>
          </div>
          <button class="submit_btn" @click='buyHandle()' >确认上传</button>
        </div>
      </div>
      <div class="rules">
        <h1>活动规则</h1>
        <ul>
          <li>
            <span>1</span>
            <span>本次活动仅限盐城当地相关创新创业企业报名参加；</span>
          </li>
          <li>
            <span>2</span>
            <span>本次活动可通过以下三种方式报名：<br/>
                下载“壹盐双创”APP，进入活动报名页面；<br/>
                登录“壹盐双创”官网，进入活动报名页面；<br/>
                关注“壹盐双创”公众号，进入活动报名页面；<br/>
            </span>        
          </li>
          <li>
            <span>3</span>
            <span>企业提交报名资料，审核通过后会进行电话通知联系；</span>
          </li>
          <li>
            <span>4</span>
            <span>企业报名成功审核通过后，壹盐双创免费提供双创板挂板资格和独家定制创业服务大礼包；优秀企业还将有机会获得盐商集团的投融资和创业孵化一站式服务；</span>
          </li>
          <li>
            <span>5</span>
            <span>活动结束后，入选企业将公布于“壹盐双创”官网；</span>
          </li>
          <li>
            <span>6</span>
            <span>本次活动最终解释权归“壹盐双创”所有；</span>
          </li>
          <li>
            <span>7</span>
            <span>如有任何疑问请直接留言至“壹盐双创”官方公众号“yiyanstart”；</span>
          </li>
        </ul>   
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import {getVerifyCode, addFinancing, loginOutVerifiedCode} from '@/service/getData'
  import $ from 'jquery'
  import {formatUtils} from '@/config/mixin'
  import {timer,verifyCode,verifyTel,isSuccess} from '@/config/utils'
  import { Toast } from 'mint-ui';
  
  const ERR_OK = '000';

  export default {
    data() {
      return {
        openid:'',/*openid*/
        companyName:'', /*企业名称*/
        companyNameError:'',
        username:'', /*联系人*/
        usernameError:'',
        mobile:'', /*联系人电话*/
        mobileError:'',
        code:'',
        codeError:'',
        email:'', /*邮箱地址*/
        emailError:'',
        registerTime:'', /*企业注册时间*/
        industryType:'',/*所属行业*/
        registerAddress:'', /*企业注册地址*/
      };
    },
    components:{ Toast },
    mixins: [formatUtils],
    async beforeMount(){
      // alert(333)
      // alert(JsObject.getIMEI_ID())
          // this.openid = localStorage.openid;
      // JsObject.showToast("-------"+this.$route.query.type)
      // JsObject.showToast(this.$route.query.IMEI_ID) 
      // if(this.$route.query.type){/*判断从app打开*/
      //   localStorage.openid = JsObject.getIMEI_ID();
      //   // localStorage.openid = this.$route.query.IMEI_ID;
      //   JsObject.showToast("SSSSS---------"+localStorage.openid)
      // }
    },
    mounted() {
        var o = document.getElementById('date');
        o.onfocus = function(){
            this.removeAttribute('placeholder');
        };
        o.onblur = function(){
            if(this.value == '') this.setAttribute('placeholder','请输入企业注册时间');
        };
    },
    methods:{
      checkcompanyName() {
        if(this.companyName){
          this.companyNameError = false;
        }else{
          this.companyNameError = "请输入企业名称";
        }
      },
       checkusername() {
        if(this.username){
          this.usernameError = false;
        }else{
          this.usernameError = "请输入联系人姓名";
        }
      },
      verify_tel() {/*校验联系人手机号*/
        let result = verifyTel(this.mobile);
        this.mobileError = result;
        if(!result){        
          this.mobileError = false;
        }
      },
      getCode(event) {/*倒计时，获取验证码*/
        if(!this.mobile){
          this.mobileError = '手机号不能为空';
          return false;
        }else{
          getVerifyCode(this.mobile,2).then(res =>{
            if(res.code == ERR_OK){
              timer(event.target,{'color': '#0B74E3'})
            }else{
              Toast(res.msg)
            }
          })
        }
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
      verifiedPhoneCode() {//登录内验证手机验证码
        loginOutVerifiedCode(this.mobile,this.code,2).then(res =>{
          if(res.code == ERR_OK){
            this.codeError = false;
          }else{
            this.codeError = res.msg;
          }
        })
      },
      buyHandle() {
        console.log(isSuccess([!this.companyName,
          !this.username,
          this.mobileError,
          this.codeError]));
        if(isSuccess([!this.companyName,
          !this.username,
          this.mobileError,
          this.codeError])) {
          this.openLoading('提交中');
          addFinancing(this.username,
            this.mobile,
            this.email,
            this.companyName,
            this.registerTime,
            this.registerAddress,
            this.industryType,
            "1"
          ).then(res =>{
            if(res.code == ERR_OK) {
              Toast("申请成功");
              localStorage.openid = this.openid;
              var _self = this;
              setTimeout(function() {
                // window.location.reload();
                 // JsObject.showToast("++++++++++++++++++-")
                if(_self.$route.query.type){
                  // JsObject.showToast("-------"+_self.$route.query.type)
                  JsObject.returnLastNativePage();
                }else{
                  _self.$router.push({path:'/index',query:{title:'壹盐双创'}})
                }

              },2000)

            }else {
              Toast(res.msg);
            }
             this.closeLoading();
          })       
        }else{
          Toast("请输入正确信息后提交！")
        }
      }   
    },
  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  
  #_wrapper{
    font-size: 0;
    width: 100%;
    background: -webkit-linear-gradient(top,#007BFF,#85C8FC);
    padding-bottom:1.9rem;
    & > img{
      width: 96%;
    }
    .errorMsg{
      position: relative;
      width: 100%;
      right: 0;
      top: 4px;
      display: block;
      text-align: left;
      padding-left: .9rem;
    }
    .titles_container{
      width: 13.25rem;
      margin:.7rem auto 0;
      .time{
        @include wh(12.2rem,1.8rem);
        margin:0 auto;
        background: #6EB0F7;
        box-shadow: 0 1px 2px 0 #007BE0;
        font-size: .65rem;
        color: #FEF041;
        text-align: center;
        line-height: 1.8rem;
      }
      .top_title{
        border-bottom:6rem solid #0B74E3;  
        border-left:.6rem solid transparent;  
        border-right:.6rem solid transparent;  
        position: relative;
        & > div{
          position: absolute;
          width: 12.2rem;
          p{
            text-align: center;
            font-size: .45rem;
            color: #FFFFFF;
            padding-top:.3rem;
          }
          .box{
            display: inline-block;
            width: 50%;
            padding-top: .4rem;
            &>div{
              margin-left: 1.55rem;
            }
            img{
              width: 50%;
              padding-bottom:.3rem;
            }
            span{
              display: block;
              font-size: .65rem;
              text-align: center;
              line-height:1rem;
              color: #FFFFFF;
              letter-spacing: .06rem;
              &.ft{
                letter-spacing: .14rem;
              }
            }
          }
        } 
      }
    }
    .content{
      width: 13.25rem;
      margin: 0 auto;
      padding-top:.75rem;
      padding-bottom: .75rem;
      background: rgba(0,114,248,0.50);
      box-shadow: 0 1px 8px 0 #3785E0;
      border-radius: 0 0 8px 8px;
      h1{
        font-size: 1rem;
        color: #FBE905;
        line-height: 2rem;
        text-align: center;
      }
      h2{
        font-size: .6rem;
        color: #FBE905;
        line-height: 1rem;
        text-align: center;
      }
      .content_form{
        padding-top:.3rem;
        text-align: center;
        .submit_btn{
          @include wh(6rem,1.8rem);
          font-size: .75rem;
          margin-top: .75rem;
          color: #4A90E2;
          background: #F8E71C;
          box-shadow: 0 2px 6px 0 #F8E606;
          border-radius: 4px;
        }
      }
      .ipt_form{
        margin-bottom: .45rem;
        padding:0 0.65rem;
        label{
          display: inline-block;
          vertical-align: top;
          width: .75rem;
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: .9rem;
          color: #F8E71C;
        }
        input{
          font-size: .65rem;
          color: #333;
          appearance:none;
          @include wh(11.1rem,1.7rem);
          line-height: 1.7rem;
          padding-left:.4rem;
          background: #FFFFFF;
          border-radius: 4px;
          outline: none;
          &::-webkit-input-placeholder{
            font-size: .65rem;
            color: #C9C8C8;
          }
        }
        .code_txt{
          width: 6.4rem;
          display: inline-block;
          vertical-align: top;
          margin-right: .5rem;
        }
        .getCode_btn{
          width:4.25rem;
          height: 1.7rem;
          border-radius: 4px;
          background:#fff;
          display: inline-block;
          vertical-align: top;
          font-size: .6rem;
          color: #0B74E3;
        }
        input[type="date"]:before {
          content: attr(placeholder);
          color:#C9C8C8;
        }
        input[type="date"]::-webkit-input-placeholder {
          font-size: .65rem;
          color: #C9C8C8;
        }
        textarea{
          font-size: .65rem;
          color: #333;
          resize:none;
          @include wh(11.1rem,2.6rem);
          line-height: 1.7rem;
          padding-left:.4rem;
          background: #FFFFFF;
          border-radius: 4px;
          outline: none;
          &::-webkit-input-placeholder{
            font-size: .65rem;
            color: #C9C8C8;
          }
        }
        .tips{
          display: inline-block;
          width: 11.1rem;
          p{
            font-size: .6rem;
            line-height: .75rem;
            color: #F8E71C;
            display: inline-block;
            vertical-align: top;
            &.t_title{
              width: 30%;
            }
            &.t_con{
              width: 70%;
              text-align: left;
            }
          }
        }
      }
    }
    .rules{
      width: 13.25rem;
      margin: .5rem auto 0;  
      padding-top:.75rem;
      background: rgba(0,114,248,0.50);
      box-shadow: 0 1px 8px 0 #3785E0;
      border-radius: 0 0 8px 8px;
      h1{
        font-size: 1rem;
        color: #fff;
        line-height: 2rem;
        text-align: center;
        position: relative;
        &::after{
          content: '';
          @include wh(.25rem,.25rem);
          border-radius:50%;
          background: #fff;
          position: absolute;
          left: 4rem;
          top: .9rem;
        }
        &::before{
          content: '';
          @include wh(.25rem,.25rem);
          border-radius:50%;
          background: #fff;
          position: absolute;
          right: 4rem;
          top: .9rem;
        }
      }
      ul{
        padding-left:.9rem;
        li{
          padding-bottom:.5rem;
          & span:nth-child(1){
            display: inline-block;
            vertical-align: top;
            margin-right: .3rem;
            position: relative;
            top: .2rem;
            @include wh(.8rem,.8rem);
            text-align: center;
            line-height: .8rem;
            border-radius:50%;
            background:#fff;
            font-size: .65rem;
            color: #007BE0;
          }
           & span:nth-child(2){
            display: inline-block;
            vertical-align: top;
            width: 85%;
           }
          span{
            font-size: .7rem;
            color: #fff;
            line-height: 1.1rem;
          }
        }
      }
    }
  }

  

</style>
