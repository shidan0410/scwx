<template>
  <div id="form_amount_wrapper">
    <div class="init_order_wrapper">
      <div class="bg_wrapper">
        <img :src="waitOrderInfo.appSmallImg" alt="">
      </div>
      <div class="itmes_info">
        <h3>{{ waitOrderInfo.projectName }}</h3>
        <h4>（{{ waitOrderInfo.projectCode }}）</h4>
        <div>订单金额 <span>{{ waitOrderInfo.tenderAmount }}元</span></div>
      </div>
    </div>
    <!--头部信息-->
    <div class="main_content">
      <BindBankDom :waitOrderInfo="waitOrderInfo"  v-if="waitOrderInfo.bankCd"></BindBankDom>
      <UnBindBankDom :waitOrderInfo="waitOrderInfo" :oidTenderId="oidTenderId" v-else></UnBindBankDom>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  import {formatUtils} from '@/config/mixin'
  import {waitOrderInfo} from '@/service/getData'
  import BindBankDom from './bindBankDom'
  import UnBindBankDom from './unBindBankDom'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        waitOrderInfo:{},/*待支付订单信息*/
        oidTenderId:'',
        tipCardFlag:'',
      };
    },
    props:{
      productId:''
    },
    mixins: [formatUtils],
    async beforeMount(){
       this.oidTenderId = this.$route.query.oidTenderId || '';

       /*有没有绑卡*/
//       this.tipCardFlag = this.$route.query.tipCardFlag || '';
//      this.tipCardFlag = JSON.parse(window.localStorage.getItem('UserStateInfos')).tipCardFlag;
    },
    mounted() {
      waitOrderInfo(this.oidTenderId).then(res =>{
        if(res.code == ERR_OK){
          this.waitOrderInfo = res.waitOrderInfo;
        }
      })
    },
    filters:{

    },
    methods: {


    },
    components: {Toast,BindBankDom,UnBindBankDom }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  #form_amount_wrapper{
    padding: 0.6rem 0 0;
    .init_order_wrapper{
      display: flex;
      padding: 0 0.6rem;
      .bg_wrapper{
        height: 3.25rem;
        flex:0 0 4.8rem;
        margin-right: 0.45rem;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .itmes_info{
        flex: 1;
        h3{
          font-size: .65rem;
          line-height: .9rem;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        h4{
          font-size: .65rem;
          color: #282E37;
          margin: .35rem 0;
        }
        div{
          font-size: .65rem;
          color: #9EAABD;
          line-height: .7rem;
          span{
            font-size: .7rem;
            color: #000019;
          }
        }
      }
    }
    .main_content{
      margin-top: 1.45rem;
    }
  }
</style>
