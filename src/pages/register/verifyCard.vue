<template>
  <div class="verifyCard">
    <div class="input_group">
		<input type="text" id="realname" v-model="realname" @blur="verify_name()" maxlength="32" placeholder="请输入姓名">
		<span class="icon_user"></span>
		<span class="errorMsg" v-if="realnameError">{{realnameError}}</span>
    <div style="clear:both"></div>
	</div>
	<div class="input_group">
		<input type="text" id="idcard" v-model="idcard" @blur="verify_idcard()" placeholder="请输入身份证号">
		<span class="icon_idcard"></span>
		<span class="errorMsg" v-if="idcardError">{{idcardError}}</span>
     <div style="clear:both"></div>
	</div>
	<div class="input_group">
		<input type="number" id="banckCard" v-model="banckCard" @blur="verify_bankcard()" placeholder="请输入银行卡号">
		<span class="icon_bankcard"></span>
		<span class="errorMsg" v-if="banckCardError">{{banckCardError}}</span>
    <span class="errorMsg" v-else-if="banckCardSuccess" style="color:green;">{{banckCardSuccess}}</span>
     <div style="clear:both"></div>
	</div>
  <div class="banklist" v-show="banklistShow">
    <p class="title">当前银行支持列表</p>
    <ul>
      <li v-for="item in banklist">{{item.bankNm}}</li>
    <!--   <li>农业银行</li>
      <li>建设银行</li>
      <li>浦发银行</li>
      <li>平安银行</li>
      <li>交通银行</li>
      <li>工商银行</li> -->
    </ul>
     <div style="clear:both"></div>
  </div>
	<div class="input_group">
		<input type="tel" id="bancktel" v-model="bancktel" @blur="verify_tel()" placeholder="请输入银行卡预留手机号">
		<span class="icon_phone"></span>
		<span class="errorMsg" v-if="bancktelError">{{bancktelError}}</span>
     <div style="clear:both"></div>
	</div>
	<div class="form-group">
        <span class="icon_verify"></span>
        <input type="number" id="verifycode" maxlength="6" v-model="verifycode"  @blur="verify_code()" placeholder="请输入手机验证码">
        <span class="errorMsg" style="right:4.5rem;" v-if="verifycodeError">{{verifycodeError}}</span>
        <button class="get_code" id="get_code" @click="settime($event)">获取验证码</button>
         <div style="clear:both"></div>
    </div>
	<div class="input_group">
		<input type="password" id="buypwd" v-model="buypwd" @blur="verify_pwd()" placeholder="请输入支付密码">
		<span class="icon_pwd"></span>
		<span class="errorMsg" v-if="buypwdError">{{buypwdError}}</span>
     <div style="clear:both"></div>
	</div>
	<button id="" class="btn_disabled" :class="btn_state_change([realname,idcard,banckCard,bancktel,verifycode,buypwd])"  style="margin-top:1.5rem" @click="bankCardConfirm()">确认</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { telphone,passwordReg } from '@/vuelidators/index'
  import {checkMobile,registFirstSubmit,selSupportBank,selSupportBankList,CheckBankCode,registNextConfirm} from '@/service/getData'
  import {
    timer,verifyTel,verifyCode,verifyPwd,
    verifyName,verifyIdCard,bancktel,isHight,
    isSuccess,verifyBankcard,Encrypt
  } from '@/config/utils'
  import {formatUtils} from '@/config/mixin'
  import {Toast} from 'mint-ui'
  import $ from 'jquery'


  export default {
    data () {
      return {
      	realname:'',
      	realnameError:'',
      	idcard:'',
      	idcardError:'',
      	banckCard:'',
      	banckCardError:'',
      	bancktel:'',
      	bancktelError:'',
        banckCardSuccess:'',
      	verifycode:'',
      	verifycodeError:'',
      	buypwd:'',
      	buypwdError:'',
        banklist:'',
        banklistShow:false,
        productId:'',
        productName:'',
        from:'',//入口
        title:''
      }
    },
    mixins:[formatUtils],
    async beforeMount(){
      this.productId = this.$route.query.productId || '';
      this.productName = this.$route.query.productName || '';
      this.from = this.$route.query.from || '';
      this.title = this.$route.query.title || '';
    },
    mounted(){
      selSupportBankList().then(res=>{
          if(res.code=='000'){
            this.banklist = res.bankCdList;
          }else{
            Toast('获取支持银行卡列表失败');
          }

      })
      console.log("从哪里来"+this.from);
      console.log('跳过按钮需要的参数：'+this.productId+","+this.productName);
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
                this.banckCardError = '此银行卡暂不支持';
                this.banklistShow = true;
                this.banckCardSuccess = false;
              }else{
                this.banckCardSuccess = res.bankName;
                this.banckCardError = false;
                this.banklistShow = false
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
    		if(this.buypwd.length<6){
          this.buypwdError = '支付密码为六位数字'
        }else{
          this.buypwdError=false;
        }
    	},
    	btn_state_change(arr){
    		if(isHight(arr)){
    			return 'btn_default'
    		}
    		return ''
    	},
    	settime(event){
    		//先验证姓名、身份证号、银行卡、银行预留手机号
    		this.verify_name();
    		this.verify_idcard();
    		this.verify_bankcard();
    		this.verify_tel();
    		var arr = [this.realnameError,this.idcardError,this.banckCardError,this.bancktelError];
    		//调用后台发送验证码接口
    		if(isSuccess(arr)){
          this.openLoading();
  				checkBankCode(this.realname,this.idcard,this.banckCard,this.bancktel).then(res=>{
  					if(res.code=='000'){
  						timer(event.target);
  					}else{
  						Toast(res.msg);
  					}
            this.closeLoading();
  				});

    		}

    	},
      bankCardConfirm(){
        var arr = [this.verifycodeError,this.buypwdError];
        console.log(arr);
        if(isSuccess(arr)){
          this.openLoading();
          registNextConfirm(this.verifycode,Encrypt(this.buypwd)).then(res=>{
              if(res.code=="000"){
                 if(res.isSign == '1'){//需要网银签约
                      this.$router.push({path:'/bankContract?product='+this.productId+'&bankCd='+res.bankId,query:{title:'网银签约'}})
                 }else{
                  //从项目详情页面进入实名绑卡，然后跳入风险评测，如果用户选择跳过，需要进入项目详情页面，此时需要productId和productName两个参数
                    this.$router.push({path:'/risk?isShow=true&title='+ this.title +'&from='+ from,query:{productId:this.productId,productName:this.productName,title:'风险评测'}})
                 }
              }else if(res.code=="009"){
                this.banckCardError = res.msg;
                this.banklistShow = true;
              }else{
                Toast(res.msg)
              }
              this.closeLoading();
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  @import 'src/style/iconfont';
.verifyCard{
	margin: 1.5rem;
	.input_group{
		height: 1.5rem;
		margin-top:0.5rem;
		input{height:1.4rem;padding: 0.3rem;padding-left: 1rem;}
	}
	.form-group{
		height: 1.5rem;
		margin-top:0.5rem;
		input{height:1.4rem;padding: 0.3rem;padding-left: 1rem;font-size:0.6rem}
	}
  .banklist{
    min-height: 1rem;
    .title{font-size: 0.6rem;text-align: center;color: #888;line-height:1.5rem;background:#ddd;}
    ul{
      height: 100%;
      li{float: left;width: 3.25rem;font-size: 0.6rem;line-height:1.1rem;color:#666;}
    }

  }
}
.icon_user{background:url('../../assets/login/realname.png');position: absolute;height: 23px;width: 20px;top: 0.25rem;background-size: 20px;}
.icon_idcard{background:url('../../assets/login/idcard_no.png');position: absolute;height: 23px;width: 20px;top: 0.25rem;background-size: 20px;}
.icon_bankcard{background:url('../../assets/login/bank.png');position: absolute;height: 23px;width: 20px;top: 0.25rem;background-size: 20px;}
.icon_phone{background:url('../../assets/login/login_tel.png');position: absolute;height: 23px;width: 20px;top: 0.25rem;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 0.25rem;background-size: 20px;}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top: 0.25rem;background-size: 20px;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 0.3rem;right:0;background-size: 20px;}


</style>
