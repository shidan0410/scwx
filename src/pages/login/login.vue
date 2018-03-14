<template>
<div class="login">
	<!--<img src='../../assets/logo.png' style="width:7rem" />-->
  <h1>登录</h1>
	<div class="login_info">
		<div class="input_group">
			<input type="tel" id="phone_num" v-model="tel" @keyup="delTelError()"  maxlength="11" placeholder="请输入用户名">
			<span class="icon_phone"></span>
			<span class="errorMsg" v-if="telError">{{telError}}</span>
		</div>

		<div class="input_group">
			<input type="password" id="pwd" v-model="pwd" @blur="verify_pwd()" placeholder="请输入密码">
			<span class="icon_pwd"></span>
			<span class="icon_eye" id="iconEye" @click="pwd_change()"></span>
			<span class="errorMsg" v-if="pwdError" style="right:22px;">{{pwdError}}</span>
		</div>
		<div class="form-group" v-show="imgCodeErrorShow">
	        <span class="icon_verify"></span>
	        <input class="form__input" v-model="imgCode" @keyup="" placeholder="请输入图形验证码">
	        <img src="" id="m_imgCode" @click="getImgVerifyCode()">
	        <span class="errorMsg" style="right:4.5rem;" v-if="imgCodeError">{{imgCodeError}}</span>
      	</div>
	</div>
	<button id="loginBtn" class="btn_disabled" :class="btn_state_change(tel,pwd)" style="margin-top:1.5rem" @click="login()">
		登录
	</button>
	<div class="link_area">
		<!-- <router-link class="a_link" :to="{path:'/register',query:{title:'注册'}}" style="float:left">立即注册</router-link> -->
		<router-link class="a_link" :to="{path:'/backpwdone',query:{title:'找回密码'}}">忘记密码</router-link>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import {verifyTel,verifyCode,verifyPwd,Encrypt,isHight,isSuccess} from '@/config/utils'
import { Toast } from 'mint-ui';
import {login,getImgVerifyCode} from '@/service/getData'
import {formatUtils} from '@/config/mixin'
// import JE from 'jsencrypt'
    export default {
        data() {
            return {
              sessionTel:'',
            	tel:'',
            	telError:'',
            	imgCode:'',
            	imgCodeError:'',
            	imgCodeErrorShow:false,
            	pwd:'',
            	pwdError:'',
            	pwdErrorNum:0,//密码输入错误次数
            	eyeOpen:false,
            	tokenId:''

            };
        },
        mounted() {
        	this.tel = this.$store.state.tel;
        	this.telError = false;//默认进来，手机号已填写且正确，所以此值是FALSE
        },
        mixins:[formatUtils],
        methods:{
        	delTelError(){
        		this.telError = ""
        	},
        	//从后台获取图形验证码
		    getImgVerifyCode(){
				getImgVerifyCode().then(res=>{
				    if(res.code=="000"){
				      	$('#m_imgCode').attr('src',"data:image/png;base64,"+res.msg);
				    }else{
				      	alert('获取图形验证码失败');
				    }
				})
		    },
        	verify_tel(){
        		var result = verifyTel(this.tel);
        		this.telError = result;
        		if(!this.telError){
              if(this.sessionTel != this.tel){
                this.imgCodeErrorShow = false;
              }
            }
        	},
        	verify_pwd(){
        		if(this.pwd.length>0){
        			this.pwdError = false
        		}
        	},
        	pwd_change(){
        		if(this.eyeOpen){
        			$("#pwd").attr('type','password');
        			$("#iconEye").removeClass("icon_eye_open").addClass("icon_eye");
        			this.eyeOpen = false;
        		}else{
        			$("#pwd").attr('type','text');
        			$("#iconEye").removeClass("icon_eye").addClass("icon_eye_open");
        			this.eyeOpen = true;
        		}
        	},
        	btn_state_change(tel,pwd){
        			//console.log(pwdError);
        		var arr = [tel,pwd]
          if(isHight(arr)){
            return 'btn_default'
          }
        		return ''
        	},
        	login(){
        		if(isSuccess([this.telError,this.pwdError])){
        			this.openLoading();
              		this.sessionTel = this.tel;
	        		login(this.tel,Encrypt(this.pwd),this.imgCode).then(res=>{
//	        			console.log(res);
	        			if(res.code=="000"){
	        				this.$router.push('/index');
	        				localStorage.tokenid = res.tokenId||'';
	        				//登录成功后保存用户登录帐号
	        				localStorage.user = this.tel;
	        				localStorage.pwd = Encrypt(this.pwd);
	        				localStorage.loginFlag = true;
	        			}else if(res.code=='007'){//密码错误三次
	        				//图形验证码
	        				localStorage.loginFlag = false;
	        				this.imgCodeErrorShow = true;
	        				this.getImgVerifyCode();
	        				Toast(res.msg);
	        			}else if(res.code == '008'){//验证码错误
	        				localStorage.loginFlag = false;
							this.imgCodeErrorShow = true;
	        				this.getImgVerifyCode();
	        				Toast(res.msg);
	        			}else{
	        				localStorage.loginFlag = false;
	        				Toast(res.msg);
	        			}
	        			this.closeLoading();
	        		})
        		}else{
        			this.verify_tel();
        		}

        	}
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
.login{
	margin: 1.5rem;
	margin-top:1.1rem;
  text-align: center;
  h1{
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 600;
    color: #333333;
    text-align: left;
  }
	.login_info{
		margin-top:3.4rem;
		.input_group{
			margin: 0.5rem 0;
			position:relative;
			text-align: left;
			// border-bottom: 1px solid #ddd;
			input{padding:0.4rem 1rem;font-size:0.6rem}

		}
		.form-group{
			text-align: left;
			margin: 1rem 0rem;
			input{font-size: .6rem;
          outline: none;
          padding: 0.25rem 0 0.25rem 1rem;}
			#m_imgCode{position: absolute;right: 0;width: 3.9rem;height: 1.5rem;}
		}

	}
	.link_area{min-height:1rem;margin-top:1rem;}
	.a_link{color:#999;font-size:0.6rem;}
.icon_phone{background:url('../../assets/login/login_tel.png');position: absolute;height: 23px;width: 20px;top: 7px;background-size: 20px;left:0;}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top:7px;background-size: 20px;left:0;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_eye_open{background:url('../../assets/login/login_show.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 7px;background-size: 20px;}
}
</style>
