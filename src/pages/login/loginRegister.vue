<template>
<div class="login">
	<!--<img src='../../assets/logo.png' style="width:7rem" />-->
  <h1>您好！ 请登录/注册</h1>
	<div class="login_info">
		<div class="input_group">
			<input type="tel" id="phone_num" v-model="tel" @keyup="delError()" maxlength="11" placeholder="请输入手机号码">
			<span class="icon_phone"></span>
			<span class="errorMsg" v-if="telError">{{telError}}</span>
		</div>
	</div>

	<button class="btn_disabled" :class="btn_state_change(tel)" style="margin-top:1.5rem" @click="next()">
		登录/注册
	</button>
	<div id="popup" v-show="isShowPopup">
		<!-- <div style="height:100px;"></div> -->
		<div class="p_contant" style="margin-top:5rem;">
			<p class="p_title">填写验证码</p>
			<p class="p_txt">您的手机还未注册，请输入验证码后注册</p>
			<div class="form-group">
				<span class="icon_verify"></span>
				<input class="form_input" v-model="imgCode" placeholder="请输入图形验证码">
				<img src="" id="m_imgCode" @click="getImgCode()">
				<!-- <span class="errorMsg" style="right:4.5rem;" v-if="imgCodeError">{{imgCodeError}}</span> -->
			</div>
			<div class="p_btn">
				<button class="cancel" @click="cancel()">取消</button>
				<button class="confirm" @click="verifiedPicCode()">确定</button>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import {verifyTel,isHight,isSuccess} from '@/config/utils'
import { Toast,MessageBox  } from 'mint-ui';
import {checkMobile,getImgVerifyCode,verifiedPicCode} from '@/service/getData'
import {formatUtils} from '@/config/mixin';
import $ from 'jquery'

// import JE from 'jsencrypt'
    export default {
        data() {
            return {
            	tel:'',
            	telError:'',//要显示的错误信息
            	telState:'',//控制button是否高亮状态
            	isShowPopup:false,
            	imgCode:'',
            	imgCodeError:''
            };
        },
        mounted() {
			this.getImgCode();
        },
        mixins:[formatUtils],
        methods:{
        	getImgCode(){
        		getImgVerifyCode().then(res=>{
					if(res.code=="000"){
					    $('#m_imgCode').attr('src',"data:image/png;base64,"+res.msg);
					}else{
					    alert('获取图形验证码失败');
					}
				})
        	},
        	verifiedPicCode(){
//        		console.log(this.imgCode)
        		verifiedPicCode(this.imgCode).then(res=>{
//        			console.log(res)
        			if(res.code=="000"){
        				this.$router.push({path:'/register',query:{title:"注册"}});
        			}else{
        				Toast(res.msg);
        			}
        		})
        	},
        	cancel(){
        		this.isShowPopup = false
        	},
        	delError(){
        		this.telError = ""
        	},
        	btn_state_change(tel){
        		this.state = verifyTel(this.tel);
				if(!this.state){
					return 'btn_default'
	        	}
        		return ''
        	},
        	next(){
        		var result = verifyTel(this.tel);
        		if(!this.state){
        			//验证手机是否注册
					checkMobile(this.tel).then(res=>{
//						console.log(res);
						//将手机号保存，登录注册页面返显
						this.$store.commit('saveTel',{tel:this.tel});
//						console.log(res);
						if(res.code=='000'){
							//进入注册页面
							this.isShowPopup = true;
						}else if(res.code=='002'){
							//手机号已注册，进入登录页面
							this.$router.push('/login');
						}else{
							Toast(res.msg);
						}
					})

        		}else{
        			this.telError = this.state
        		}
        	}
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
#popup{
	position:absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 105%;
    background: rgba(0,0,0,0.5);

	.p_contant{
	    background-color: #fff;
	    width: 85%;
	    border-radius: 3px;
	    font-size: 16px;
	    margin:auto;
	    padding-top: 1rem;
	    .p_txt{
			font-size: 0.6rem;
		    color: #666;
		    margin:1rem 0;
		}
		.form-group{
			margin: 0 1rem 1rem 1rem;
			.form_input{
				width: 60%;
			    padding-left: 1rem;
			    float:left;
				input{
					border-radius: 0;
				    outline: none!important;
				    width: 4rem;
				    height: 0;
				    width: 80%;
				    display: inline-block;
				    border-bottom: 1px solid #ddd;
				    padding: 0.6rem 0;
				}
			}
			#m_imgCode{position: absolute;right: 0px;width: 3.9rem;height: 1.5rem;}
		}
	    .p_btn{
	    	border-top: 1px solid #ddd;
    		height: 2rem;
    		line-height: 2rem;
    		button{
    			font-size: 0.65rem;
    			outline: none;
			    width: 46%;
			    background: none;
			    height: 100%;
			    color: #0076FF;
    		}
    		.cancel{
    			border-right: 1px solid #ddd;
    		}
    		.confirm{

    		}
	    }
	}
	// .p_contant:before{
	// 	content: ' ';
	// 	display: block;
	// 	height: 5rem;
	// 	width: 100%;
	// }

}

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
			margin: 1rem 1rem;
			input{font-size: .6rem;
	          outline: none;
	          padding: 0.25rem 0 0.25rem 1rem;}
		}

	}

	.link_area{min-height:1rem;margin-top:1.5rem;}
	.a_link{color:#ff8e1d;font-size:0.6rem;}
.icon_phone{background:url('../../assets/login/login_tel.png');position: absolute;height: 23px;width: 20px;top: 7px;background-size: 20px;left:0;}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top:7px;background-size: 20px;left:0;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_eye_open{background:url('../../assets/login/login_show.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 7px;left:0;background-size: 20px;}
}
</style>
