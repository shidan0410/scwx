<template>
  <div class="verifyCard">
    <h1>实名信息</h1>
    <div class="input_group">
      <input type="text" id="realname" :disabled="UserStateInfos.investorFlag == 1" v-model="realname" @blur="verify_name()" maxlength="32" placeholder="请输入姓名字">
      <span class="icon_user"></span>
      <router-link class="_link" v-if="UserStateInfos.investorFlag == 1" :to="{path:'/identifyInvestForm',query:{title:'认证合格投资人'}}">有误？重新认证</router-link>
      <div style="clear:both"></div>
    </div>
    <div class="input_group">
      <input type="text" id="idcard" :disabled="UserStateInfos.investorFlag == 1" v-model="idcard" @blur="verify_idcard()" placeholder="请输入身份证号" style='border:none;'>
      <span class="icon_idcard"></span>
       <div style="clear:both"></div>
    </div>
    <div class="tips">此卡将成为您认购退款的唯一用卡，请查看
      <router-link :to="{path:'/bankList',query:{title:'支持银行'}}">支持银行及限额</router-link>
    </div>
    <div class="input_group">
      <input type="tel" id="banckCard" v-model="banckCard" @blur="verify_bankcard()" placeholder="请输入银行卡号">
      <span class="icon_bankcard"></span>
      <span class="errorMsg" v-if="banckCardError">{{banckCardError}}</span>
      <span class="errorMsg" v-if="banckCardSuccess" style="color:green;">{{banckCardSuccess}}</span>
       <div style="clear:both"></div>
    </div>
    <div class="tips_container" v-show="isShowTips">
      该银行卡不支持，请查看<router-link :to="{path:'/bankList',query:{title:'支持银行'}}">支持银行及限额</router-link>
    </div>
    <div class="input_group">
      <input type="tel" id="bancktel" v-model="bancktel" @blur="verify_tel()" placeholder="请输入银行卡预留手机号">
      <span class="icon_phone"></span>
      <span class="errorMsg" v-if="bancktelError">{{bancktelError}}</span>
       <div style="clear:both"></div>
    </div>
    <div class="form-group">
          <span class="icon_verify"></span>
          <input type="tel" id="verifycode" v-model="verifycode" @focus="verify_tel()" @keyup="verify_code()" placeholder="请输入手机验证码">
          <span class="errorMsg" style="right:4.5rem;" v-if="verifycodeError">{{verifycodeError}}</span>
          <button class="get_code" id="get_code" @click="settime($event)">获取验证码</button>
           <div style="clear:both"></div>
      </div>

      <div class="pay_wrapper">
        <h2>请输入6位支付密码</h2>
        <payPwd @payData="payData"></payPwd>
      </div>
      <!--<div class="input_group">-->
        <!--<input type="password" id="buypwd" v-model="buypwd" @keyup="verify_pwd()" placeholder="请输入支付密码">-->
        <!--<span class="icon_pwd"></span>-->
        <!--<span class="errorMsg" v-if="buypwdError">{{buypwdError}}</span>-->
         <!--<div style="clear:both"></div>-->
      <!--</div>-->
    <button id="" class="btn_disabled" :class="btn_state_change([bancktel,verifycode])"  style="margin-top:1.75rem" @click="bankCardConfirm()">绑定银行卡</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { telphone,passwordReg } from '@/vuelidators/index'
  import {checkMobile,selSupportBank,CheckBankCode,registNextConfirm} from '@/service/getData'
  import {
    timer,verifyTel,verifyCode,verifyPwd,
    verifyName,verifyIdCard,bancktel,isHight,
    isSuccess,verifyBankcard,Encrypt
  } from '@/config/utils'
  import {formatUtils} from '@/config/mixin'
  import {Toast} from 'mint-ui'
  import $ from 'jquery'
  import payPwd from '@/common/paypwd/payPwd'


  export default {
    data () {
      return {
        oidTenderId:'',/*tenderid存在从购买进入,不存在从银行卡绑卡进入*/
        UserStateInfos:{},
      	realname:'',/*用户实名*/
      	realnameError:'',
      	idcard:'',/*身份证号*/
      	idcardError:'',
      	banckCard:'',/*银行卡号*/
      	banckCardError:'',
      	bancktel:'',/*银行预留手机号*/
      	bancktelError:'',
        banckCardSuccess:'',/*中证支持银行卡*/
        buypwd:'',/*支付密码*/
        buypwdError:'',
      	verifycode:'',/*验证码*/
      	verifycodeError:'',
        isShowTips:false,/*判断中证是否支持该银行卡显示提示信息*/
      }
    },
    components: {payPwd},
    mixins:[formatUtils],
    async beforeMount(){
      $('body,html').animate({
        scrollTop:0
      })
      /*获取用户状态信息*/
      this.UserStateInfos = JSON.parse(window.localStorage.getItem('UserStateInfos'));
      this.realname = this.UserStateInfos.userInfo.userRealName;
      this.idcard = this.UserStateInfos.userInfo.idCard;
      if (this.UserStateInfos.investorFlag == 1){/*如果用户已经实名  实名信息直接反显不可更改（如需更改实名信息 跳转至认证合格投资人重新认证）验证信息为校验通过*/
        this.realnameError = false;
        this.idcardError = false;
      }
      /*获取是否带了tenderID 返回页面不同 存在返回支付订单页面,不存在返回银行卡管理页面*/
      this.oidTenderId = this.$route.query.oidTenderId || '';
    },
    mounted(){

    },
    mixins:[formatUtils],
    methods: {
    	/*验证真实姓名*/
    	verify_name(){
    		this.realnameError = verifyName(this.realname);
    	},
    	verify_idcard(){
    		this.idcardError = verifyIdCard(this.idcard);
    	},
    	verify_bankcard(){
    		this.banckCardError = verifyBankcard(this.banckCard);
    		if(!this.banckCardError){
          this.openLoading('验证银行卡号');
    			selSupportBank(this.banckCard).then(res=>{
            if(res.code=="000"){
              if(res.bankFlag=="0"){
                this.banckCardSuccess = '';
                this.banckCardError = '此银行卡暂不支持';
                this.isShowTips = true;
              }else{
                this.banckCardSuccess = res.bankName;
                this.banckCardError = false
              }
            }
    				this.closeLoading();
    			})
    		}
    	},
    	verify_tel(){
    		this.bancktelError = verifyTel(this.bancktel);
    	},
    	verify_code(){
			this.verifycodeError = verifyCode(this.verifycode);
    	},
    	verify_pwd(){
    		//this.buypwdError = verifyPwd(this.buypwd);
    	},
    	btn_state_change(arr){
    		if(isHight(arr)){
    			return 'btn_default'
    		}
    		return ''
    	},
    	settime(event){
    	  /*获取短信验证码需要username idcard 预留手机号 银行卡号*/
    		//先验证姓名、身份证号、银行卡、银行预留手机号
    		//this.verify_name();
    		//this.verify_idcard();
    		//this.verify_bankcard();
//        6230580000044702697

//        console.log(this.bancktelError);
//        console.log(this.realnameError);
        this.verify_tel();
//        var arr = [this.banckCardError,this.idcardError,this.bancktelError,this.realnameError];
        var arr = [this.banckCardError,this.bancktelError];
    		//调用后台发送验证码接口
        console.log(isSuccess(arr));
    		if(isSuccess(arr)){
          this.openLoading('正在获取');
          CheckBankCode(this.banckCard,this.idcard,this.bancktel,this.realname).then(res=>{
//            console.log(res)
            if(res.code=="000"){
              timer(event.target);
            }else{
              Toast(res.msg);
            }
            this.closeLoading();
          })
    		}

    	},
      bankCardConfirm(){
//        6230580000000888852
        var arr = [this.banckCardError,this.bancktelError,this.buypwdError];
//        console.log(this.banckCardError);
//        console.log(this.bancktelError);
//        console.log(this.buypwdError);
//        console.log(isSuccess(arr));
        if(isSuccess(arr)) {
          this.openLoading('正在提交');
          registNextConfirm(this.verifycode,Encrypt(this.buypwd)).then(res => {//此处添加银行卡，不需要支付密码，实名绑卡需要
            if (res.code == "000") {
              /*判断绑定的银行卡是不是两步式签约*/
              if (res.isSign == 0) {
                /*不需要签约*/
                if (this.oidTenderId) {
                  /*支付订单*/
                  this.$router.push({
                    path: '/payOrder?oidTenderId=' + this.oidTenderId + '&tipCardFlag=1',
                    query: {title: '支付订单'}
                  })
                } else {
                  /*从个人中心进入跳转回银行卡列表*/
                  this.$router.push('/bank')
                }
              } else {
                /*跳转至网银签约提示页面,提示文字显示不同*/
                this.$router.push({path: '/bindCardSuccess?oidTenderId=' + this.oidTenderId, query: {title: ''}})
              }

            } else {
              Toast(res.msg)
            }
            this.closeLoading();
          })
        }
      },
      payData(str) {
        if(str.length == 6){
          this.buypwdError = false;
        }else{
          this.buypwdError = true;
        }
        this.buypwd = str;
      },
    }
  }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
  //@import 'src/style/iconfont';

  .verifyCard{
      margin: .75rem;
      .tips_container{
        text-align: center;
        height: 1.4rem;
        line-height: 1.4rem;
        font-size: .55rem;
        color: #FF8E1D;
        background: #FFEBD7;
        border-radius: 2px;
        a{
          color: #000019;
        }
      }
      .errorMsg{
        top:0.85rem;
      }
      h1{
        font-size: .55rem;
        line-height: .9rem;
        margin-bottom: 8px;
        color: #647076;
      }
      .pay_wrapper{
        margin: .75rem .75rem 0;
        h2{
          font-size: .65rem;
          line-height: .9rem;
          color: #666;
          margin-bottom: .4rem;
        }
      }
      .tips{
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: .5rem;
        color: #999999;
        text-align: center;
        a{
          color: #ff8e1d;
          font-size: .5rem;
        }
      }
      .input_group{
        height: 2.4rem;
        position: relative;
        input{
          height:100%;
          line-height: 2.4rem;
          padding-left: 1.3rem;
          border: none;
          border-bottom: 1px solid #e3e3e3;
        }
        input[disabled="disabled"]{
          background:#fff;
          color:#666
        }
        ._link{
          position: absolute;
          top:0.85rem;
          right: 0;
          font-size: .55rem;
          color: #ff8e1d;
        }
    }
    .form-group{
      height: 2.4rem;
      input{
        height:100%;
        line-height: 2.4rem;
        padding-left: 1.3rem;
        font-size:0.55rem;
      }
      button{
        height: 1.65rem;
        margin-top: .7rem;
      }
    }
    .banklist{
      min-height: 1rem;
      .title{font-size: 0.6rem;text-align: center;color: #888;line-height:1.5rem;background:#ddd;}
      ul{
        height: 100%;
        li{
          float: left;
          width: 3.25rem;
          font-size: 0.6rem;
          line-height:1.1rem;
          color:#666;
        }
      }
    }
  }
.icon_user{background:url('../../assets/ic_name.png');position: absolute;height: 22px;width: 20px;top: 0.65rem;background-size: 20px;}
.icon_idcard{background:url('../../assets/ic_id_card.png');position: absolute;height: 22px;width: 20px;top: 0.78rem;background-size: 20px;}
.icon_bankcard{background:url('../../assets/login/bank.png');position: absolute;height: 23px;width: 20px;top: 0.65rem;background-size: 20px;}
.icon_phone{background:url('../../assets/login/login_tel.png');position: absolute;height: 23px;width: 20px;top: 0.65rem;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 0.65rem;background-size: 20px;}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top: 0.65rem;background-size: 20px;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 0.3rem;right:0;background-size: 20px;}


</style>
