<template>
<div class="backpwd">
	<div class="input_group">
		<input type="password" id="phone_num" v-model="buypwd" @blur="" placeholder="请输六位支付密码">
		<span class="icon_pwd"></span>
		<span class="errorMsg" v-if="buypwdError">{{buypwdError}}</span>
	</div>
	<div class="form-group">
        <input type="number" v-model="code" @keyup="" maxlength="6" placeholder="请输入手机验证码">
        <button @click="getCode($event)">获取验证码</button>
        <span class="icon_verify"></span>
        <span class="errorMsg" style="right:5rem;" v-if="codeError">{{codeError}}</span>
      </div>
	<button id="loginBtn" class="btn_disabled" :class="btn_state_change(buypwdError,codeError)" style="margin-top:1.5rem" @click="nextStep()">
		确定
	</button>
</div>
</template>

<script type="text/ecmascript-6">
import {verifyTel,verifyCode,isHight,timer,isSuccess,Encrypt} from '@/config/utils'
import { Toast } from 'mint-ui';
import {sendShortMessage,getVerifyCode,returnOrder} from '@/service/getData'
import {formatUtils} from '@/config/mixin'
// import JE from 'jsencrypt'
    export default {
        data() {
            return {
            	buypwd:'',
            	buypwdError:'',
            	code:'',
            	codeError:'',
                productId:'',
                tenderId:''
            };
        },
        async beforeMount(){
          this.productId = this.$route.query.productId || '';
          this.tenderId = this.$route.query.tenderId||'';
        },
        mounted() {
        },
        mixins:[formatUtils],
        methods: {
            getCode(event){
                this.openLoading();
                sendShortMessage("08").then(res=>{
                    console.log(res);
                    if(res.code=="000"){
                        timer(event.target);
                    }else{
                        Toast(res.msg);
                    }
                    this.closeLoading()
                })

            },
            nextStep(){
                var arr = [this.buypwd,this.code];
                if(isHight(arr)){
                //项目的id,订单id,验证码，密码
                //console.log(Encrypt(this.buypwd));
                this.openLoading();
                returnOrder(this.productId,this.tenderId,this.code,Encrypt(this.buypwd)).then(res=>{
                    console.log(res)
                    if(res.code=="000"){
                        this.$router.push({path:'/orderlist',query:{title:'订单中心'}});
                    }else{
                        Toast(res.msg);
                    }
                    this.closeLoading();
                })
            }

            },
        	btn_state_change(buypwdError,codeError){
                var arr = [this.buypwd,this.code];
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
		input{padding:0.3rem 1rem;font-size:0.6rem}

	}
	.form-group{
		input{padding:0.3rem 1rem;font-size:0.6rem;width:62%;margin-right:1rem;}
	}
.icon_pwd{background:url('../../assets/login/login_password.png');position: absolute;height: 23px;width: 20px;top:7px;background-size: 20px;left:0;}
.icon_verify{background:url('../../assets/login/login_verify.png');position: absolute;height: 23px;width: 20px;top: 4px;left:0;background-size: 20px;}
.link_area{min-height:1rem;margin-top:1.5rem;}
.a_link{color:#ff8e1d;font-size:0.6rem;}
}


</style>
