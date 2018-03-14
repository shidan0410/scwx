<template>
  <div class="purchase_wrapper">
    <div class="init_order_wrapper">
      <div class="bg_wrapper">
        <img :src="initOrderData.projectImg" alt="">
      </div>
      <div class="itmes_info">
        <h3>{{initOrderData.projectFullName}} （{{productId}}）</h3>
        <div>起投金额 <span>{{initOrderData.minAmount > 10000 ? formatAmount(tenTh(initOrderData.minAmount)) : tenTh(initOrderData.minAmount)}}</span> 万元</div>
        <div>最小追投 <span>{{initOrderData.addAmount > 10000 ? formatAmount(tenTh(initOrderData.addAmount)) : tenTh(initOrderData.addAmount)}}</span> 万元</div>
      </div>
    </div>

    <div class="investor_infos">
      <span>投资人信息</span>
      <span>{{initOrderData.userName}}</span>
      <span>{{initOrderData.idCard}}</span>
    </div>

    <div class="leadInvestor_infos" v-if="initOrderData.leadName">
      <span>领投人信息</span>
      <span>{{initOrderData.leadName}}</span>
    </div>

    <div class="account_infos">
      <h4>投资金额</h4>
      <div>
        <button class="minusPlus" :class="[purchaseMoney > initOrderData.minAmount ? 'active' : '']" @click="minus()">-</button>
        <input type="text" class="moneyInput" :value="purchaseMoney + '元' "  @blur="checkAmount();"/>
        <button class="minusPlus" :class="[purchaseMoney < initOrderData.maxAmount ? 'active' : '']" @click="plus()">+</button>
      </div>
    </div>

    <dl>
      <dt>特别提醒</dt>
      <dd>1、股权/收益权投资属于高风险投资，无法向您承诺保障投
        资本金及收益，建议您在风险承受能力范围内选择适当金
        额投资。
       </dd>
      <dd>2、您可在冷静期内撤单，冷静期为当日14:50分前。</dd>
    </dl>

    <div class="check_wrapper">
      <Checkbox :isAgree="isAgree" @changeInfo="changeInfo" :productprospectus="initOrderData.productprospectus">
      <!--<span slot="agree">-->
        <!--我已阅读并同意<a>《融资计划书》</a>-->
      <!--</span>-->
      </Checkbox>
    </div>

    <button class="buy_btn" @click="buyHandle();">认 购</button>

    <RiskWarn
      :isShowRisk="isShowRisk"
      :userLvl="initOrderData.userLvl"
      :proLvl="initOrderData.proLvl"
      @closeWindow="closeWindow()"
    ></RiskWarn>

  </div>
</template>

<script type="text/ecmascript-6">
  import {setStore,getStore} from '@/config/utils'
  import {initBuy,buyProduct} from '@/service/getData'
  import { Toast,Spinner   } from 'mint-ui';
  import Checkbox from '@/common/checkbox/checkbox'
  import RiskWarn from './riskWarn'
  import {formatUtils} from '@/config/mixin'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        productId:'',
        initOrderData:{},/*初始化订单详情*/
        purchaseMoney:0,//输入金额
        isBuy:false,//输入金额确认后进入购买
        isAgree:true,
        isShowRisk:false,/*是否显示风险等级*/
      };
    },
    mixins:[formatUtils],
    async beforeMount(){
      this.productId = this.$route.query.productId || '';
    },
    components: {Checkbox,Toast,Spinner,RiskWarn},
    mounted() {
      initBuy(this.productId).then(res =>{/*初始化订单详情*/
        if(res.code == ERR_OK){
          this.initOrderData = res;
          this.purchaseMoney = res.minAmount;/*设置最小起投金额*/
          /*判断风险等级*/
          if(res.proLvl > res.userLvl){
            /*项目风险等级大于用户风险等级*/
            this.isShowRisk = true;
          }
        }
      })
    },
    methods: {
      changeInfo() {
        /*监听事件*/
        this.isAgree = !this.isAgree;
      },
      closeWindow() {
        this.isShowRisk = false;
      },
      minus() {/*减*/
        let min = Number(this.initOrderData.minAmount);
        let addAmount = Number(this.initOrderData.addAmount);
        if (this.purchaseMoney > min) {
            this.purchaseMoney = Number(this.purchaseMoney) - addAmount;
        }
      },
      plus() {/*加*/
        let max = Number(this.initOrderData.maxAmount);
        let addAmount = Number(this.initOrderData.addAmount);
        if (this.purchaseMoney < max){
          this.purchaseMoney = Number(this.purchaseMoney) + addAmount;
        }
      },
      checkAmount() {
        /*check输入的金额*/
        let min = Number(this.initOrderData.minAmount);
        let max = Number(this.initOrderData.maxAmount);
        let addAmount = Number(this.initOrderData.addAmount);
        if (this.purchaseMoney > min && this.purchaseMoney < max && this.purchaseMoney % addAmount == 0 ){
          console.log('succ');
        }else{
          Toast('输入金额有误')
        }
      },
      buyHandle() {
        /*勾选融资计划书后才能购买*/
        if(this.isAgree) {
          this.openLoading('认购中');
          /*确认认购创建订单*/
          buyProduct(this.purchaseMoney,this.productId).then(res =>{
            if(res.code == ERR_OK){
              /*跳转至支付订单*/
              this.$router.push({path:'/payOrder?oidTenderId='+res.orderMap.oidTenderId+'&tipCardFlag='+res.tipCardFlag,query:{title:'支付订单'}})
            }else{
              Toast(res.msg);
            }
            this.closeLoading();
          })
        }else{
          Toast('请阅读并同意《融资计划书》！')
        }
      }
    },

  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  .purchase_wrapper{
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
        }
      }
      .itmes_info{
        flex: 1;
        margin-bottom: 2.05rem;
        h3{
          font-size: .65rem;
          line-height: .9rem;
          margin-bottom: .5rem;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        div{
          font-size: .5rem;
          color: #9EAABD;
          line-height: .7rem;
          span{
            color: #000019;
            margin-left: .3rem;
          }
        }
      }
    }
    .investor_infos{
      padding: 0 0.6rem;
      line-height: .75rem;
      span{
        font-size: .65rem;
        color: #333;
        &:nth-child(1){
          font-size: .55rem;
          color: #9EAABD;
          margin-right: .9rem;
        }
      }
    }
    .leadInvestor_infos{
      padding: 0 0.6rem;
      margin: 2.3rem 0 0;
      span{
        font-size: .65rem;
        color: #333;
        &:nth-child(1){
          font-size: .55rem;
          color: #9EAABD;
          margin-right: .9rem;
        }
      }
    }
    .account_infos{
      padding: 0 0.6rem;
      margin-bottom: 1.15rem;
      margin-top: 1.85rem;
      h4{
        font-size: .55rem;
        color: #9EAABD;
        margin-bottom: .75rem;
      }
      div{
        padding: 0 .45rem;
        button{
          display: inline-block;
          vertical-align: top;
          @include wh(2rem,2rem);
          line-height: 1.5rem;
          background: #FFFFFF;
          border: 1px solid #E3E3E3;
          border-radius: 6px;
          font-size: 2rem;
          color: #E3E3E3;
          &.active{
            color: $main;
            border-color: $main;;
          }
        }
        input{
          display: inline-block;
          vertical-align: top;
          outline: none;
          @include wh(9.25rem,2rem);
          text-align: center;
          color: $main;
          padding: 0 .45rem;
          border-bottom: 1px solid #E3E3E3;
        }
      }
    }
    dl{
      padding-bottom: 1.15rem;
      @include border-1px(#E3E3E3);
      &::after{
        width: 100%;
        left: 0;
      }
      dt{
        padding: 0 0.6rem;
        font-size: .55rem;
        color: #9EAABD;
        margin-bottom: .3rem;
      }
      dd{
        padding: 0 0.6rem;
        font-size: .56rem;
        color: #778892;
        line-height: 1rem;
      }
    }
    .check_wrapper{
      padding: .7rem 0.6rem 0;
    }
    .buy_btn{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      height: 2rem;
      background: $main;
      color: #fff;
      line-height: 2rem;
      text-align: center;
      font-size: .8rem;
    }
  }

</style>
