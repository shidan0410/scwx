<template>
<div class="backpwd">
    <h1 style="text-align:left">找回密码</h1>
	<div class="input_group" style="margin-top:3rem;">
		<input type="tel" id="phone_num" v-model="tel" @keyup="verify_tel()"  maxlength="11" placeholder="请输入手机号">
		<span class="icon_phone"></span>
		<span class="errorMsg" v-if="telError">{{telError}}</span>
	</div>
	<div class="form-group">
        <span class="icon_verify"></span>
        <input class="form__input" v-model="imgCode" @keyup="" placeholder="请输入图形验证码">
        <img src="" id="m_imgCode" @click="getImgCode()">
         <span class="errorMsg" style="right:4.5rem;" v-if="imgCodeError">{{imgCodeError}}</span>
    </div>
	<button id="loginBtn" class="btn_disabled" :class="btn_state_change(imgCode)" style="margin-top:1.5rem" @click="nextStep()">
		确定
	</button>
</div>
</template>

<script type="text/ecmascript-6">
import {verifyTel,verifyCode,isHight,timer,isSuccess} from '@/config/utils'
import { Toast } from 'mint-ui';
import {getImgVerifyCode,useRetrievePwd,verifiedPicCode,loginOutVerifiedCode} from '@/service/getData'
import {formatUtils} from '@/config/mixin'
// import JE from 'jsencrypt'
    export default {
        data() {
            return {
            	tel:'',
            	telError:'',
            	imgCode:'',
            	imgCodeError:'',
            };
        },
        mounted() {
            this.tel = this.$store.state.tel;
            this.getImgCode();
        },
        mixins:[formatUtils],
        methods: {
            //获取图片验证码
            getImgCode(){
                getImgVerifyCode().then(res=>{
                    if(res.code=="000"){
                        $('#m_imgCode').attr('src',"data:image/png;base64,"+res.msg);
                    }else{
                        alert('获取图形验证码失败');
                    }
                })
            },
            //验证图片验证码
            verifiedPicCode(){
                if(this.imgCode.length>0){
                    verifiedPicCode(this.imgCode).then(res=>{
//                        console.log(res)
                        if(res.code=="000"){
                            //图片验证码通过，进入下一步
                            this.$router.push({path:'/backPwdTwo',query:{title:'找回密码'}});
                        }else{
                            Toast(res.msg);
                        }
                    })
                }else{
                    Toast("图片验证码为空");
                }

            },
        	verify_tel(){
                if(this.tel.length==11){
                    var result = verifyTel(this.tel);
                    this.telError = result;
                    if(!this.telError){
                         //重置密码手机号校验
                        useRetrievePwd(this.tel).then(res=>{
                            if(res.code=="000"){
                                this.telError="";
                            }else{
                                this.telError = res.msg;
                            }
                        });
                    }
                }else{
                   this.telError="";
                }


        	},
            nextStep(){
                //this.verify_tel();
                //console.log([this.telError,this.codeError]);
                // if(isSuccess([this.imgCodeError])){
                //     this.openLoading();
                //     useRetrievePwd(this.tel,this.code).then(res=>{
                //         console.log(res)
                //         if(res.code=="000"){
                //             console.log(res);
                //             this.$router.push({path:'/backPwdTwo',query:{title:'找回密码'}});
                //         }else{
                //            Toat(res.msg);
                //         }
                //         this.closeLoading();
                //     })
                // }
                this.verifiedPicCode();

            },
        	btn_state_change(imgCode){
                console.log(imgCode)
                var arr = [imgCode];
               // console.log(isHight(arr));
				if(isHight(arr)){
					return 'btn_default'
	        	}
        		return ''
        	}
        },
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
		input{padding: 0 0 0.3rem 1rem;font-size:0.6rem}

	}
	.form-group{
		input{
            padding: 0.3rem 1rem;
            font-size: 0.6rem;
            width: 60%;
            margin-right: 1rem;
            float: left
            // position: relative;
            // top: -16px;
        }
	}
.icon_phone{background:url('../../assets/login/login_tel.png');position: absolute;height: 23px;width: 20px;top: 3px;background-size: 20px;left:0;}
.icon_eye{background:url('../../assets/login/login_hide.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_eye_open{background:url('../../assets/login/login_show.png');position: absolute;height: 23px;width: 20px;top: 0;right:0;background-size: 20px;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 4px;left:0;background-size: 20px;z-index:2}
.link_area{min-height:1rem;margin-top:1.5rem;}
.a_link{color:#ff8e1d;font-size:0.6rem;}
}


</style>
