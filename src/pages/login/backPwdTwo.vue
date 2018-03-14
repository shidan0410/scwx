<template>
<div class="backpwd">
     <h1 style="text-align:left">找回密码</h1>
    <div class="form-group" style="margin-top:3rem;">
        <input type="number" v-model="code" @keyup="verify_code()" maxlength="6" placeholder="请输入手机验证码">
        <button @click="getCode()" id="getCode" style="width:4.5rem">获取验证码</button>
        <span class="icon_verify"></span>
        <span class="errorMsg" style="right:5rem;" v-if="codeError">{{codeError}}</span>
      </div>
	<div class="input_group">
        <span class="icon_pwd"></span>
        <input class="form__input" type="password" id="pwd" v-model="pwd" @blur="verify_pwd()" placeholder="请输入8到20位数字与字母组合">
        <span class="icon_eye" id="iconEye" @click="pwd_change()"></span>
        <span class="errorMsg" v-if="pwdError">{{pwdError}}</span>
    </div>
	<div class="input_group">
        <span class="icon_pwd"></span>
        <input class="form__input" type="password" id="re_pwd" v-model="confirmPwd" @blur="confirm_pwd()" placeholder="请确认新密码">
        <span class="icon_eye" id="iconEye1" @click="pwd_change1()"></span>
        <span class="errorMsg" v-if="confirmPwdError">{{confirmPwdError}}</span>
    </div>
	<button id="loginBtn" class="btn_disabled" :class="btn_state_change()" style="margin-top:1.5rem" @click="confirm()">
		修改并登录
	</button>
</div>
</template>

<script type="text/ecmascript-6">
import {verifyCode,verifyPwd,isHight,Encrypt,isSuccess,Loadding,timer} from '@/config/utils'
import { Toast} from 'mint-ui';
import {formatUtils} from '@/config/mixin'
import {useRetrieveAppPwdSubmit,getVerifyCode,loginOutVerifiedCode,getVerifyAppCodeToImg} from '@/service/getData'
// import JE from 'jsencrypt'
    export default {
        data() {
            return {
                tel:'',
                code:'',
                codeError:'',
            	pwd:'',
            	pwdError:'',
            	confirmPwd:'',
            	confirmPwdError:'',
                eyeOpen:false,
                eyeOpen1:false,
            };
        },
        mounted() {
            this.tel = this.$store.state.tel;
            this.getCode();
        },
        methods: {
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
            pwd_change1(){
                if(this.eyeOpen1){
                    $("#re_pwd").attr('type','password');
                    $("#iconEye1").removeClass("icon_eye_open").addClass("icon_eye");
                    this.eyeOpen1 = false;
                }else{
                    $("#re_pwd").attr('type','text');
                    $("#iconEye1").removeClass("icon_eye").addClass("icon_eye_open");
                    this.eyeOpen1 = true;
                }
            },
            getCode(){
//                console.log(this.tel)
                getVerifyAppCodeToImg(this.tel,5).then(res=>{
//                    console.log(res);
                    if(res.code=="000"){
                        timer($("#getCode"));
                    }else{
                        Toast(res.msg);
                    }
                })
            },
            verify_code(){
                if(this.code.length>=6){
                    var result = verifyCode(this.code);
                    if(!result){
                        loginOutVerifiedCode(this.tel,this.code,5).then(res=>{
                            if(res.code=='000'){
                                this.codeError = false
                            }else{
                                this.codeError = res.msg;
                            }
                        })
                    }else{
                        this.codeError = result;
                    }
                }else{
                    this.codeError = '';
                }
            },
        	verify_pwd(){
        		this.pwdError = verifyPwd(this.pwd);
        	},
            confirm_pwd(){
                if(this.pwd!=this.confirmPwd){
                    this.confirmPwdError="两次密码不一致"
                }else{
                    this.confirmPwdError = false
                }
            },
        	btn_state_change(){
                var arr = [this.code,this.pwd,this.confirmPwd]
				if(isHight(arr)){
						return 'btn_default'
	        	}
        		return ''
        	},
        	confirm(){
        		if(isSuccess([this.codeError,this.pwdError,this.confirmPwdError])){
                    this.openLoading('正在提交');
                    useRetrieveAppPwdSubmit(this.tel,Encrypt(this.pwd),Encrypt(this.confirmPwd)).then(res=>{
                        if(res.code=="000"){
                            this.$router.push('/login');
                        }else{
                            Toast(res.msg);
                        }
                        this.closeLoading();
                    })
                }
        	}
        },
        mixins:[formatUtils],
        components: {}
    }
</script>

<style lang="scss" scoped>
.backpwd{
	margin: 1.5rem;
	margin-top:3.5rem;
    text-align: center;
	margin-top:1rem;
	.input_group{
		margin: 0.5rem 0rem;
		position:relative;
		text-align: left;
		input{padding:0.3rem 1rem;font-size:0.6rem}

	}
	.form-group{
		input{padding:0.3rem 1rem;font-size:0.6rem;width:57%;margin-right:1rem;}
	}
    .errorMsg {right: 30px;}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top:7px;background-size: 20px;left:0;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_eye_open{background:url('../../assets/login/login_show.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 7px;left:0;background-size: 20px;}
.link_area{min-height:1rem;margin-top:1.5rem;}
.a_link{color:#ff8e1d;font-size:0.6rem;}
}


</style>
