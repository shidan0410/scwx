<template>
<div class="bindCardSuccess">
	<div class="bind_img">
    <img src="../../assets/pay_result_ok.png" alt="">
    <h3>恭喜您，绑卡成功！</h3>
  </div>
  <p v-if="oidTenderId">您的银行卡必须经过银行网银签约才能支付订单，请查看银行签约说明</p>
  <p v-else>您的银行卡必须经过银行网银签约才能支付订单，请查看银行签约说明</p>
  <div><button @click="Toast('如需签约，请至电脑网页端')">查看签约流程</button></div>
</div>
</template>

<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';
    export default {
        data() {
            return {
              oidTenderId:''
            };
        },
        mounted() {
          this.oidTenderId = this.$route.query.oidTenderId || '';
        },
        methods: {
          Toast(txt) {
            Toast(txt)
          }
        },
        components: {Toast}
    }
</script>

<style lang="scss" scoped>
.bindCardSuccess{
  padding: 2.85rem 1.65rem 0;
  .bind_img{
    text-align: center;
    img{
      width:4.8rem;
    }
    h3{
      font-size: .65rem;
      padding: .9rem 0 .7rem;
      color: #666666;
    }
  }
  p{
    font-size: .55rem;
    line-height: .9rem;
    color: #999999;
    margin-bottom: 2.4rem;
  }
  div{
    text-align: center;
    button{
      background: #FF8E1D;
      border-radius: 22px;
      width:7.7rem;
      height: 1.9rem;
      font-size: .7rem;
      color: #fff;
    }
  }

}

</style>
