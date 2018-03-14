<template>
  <div class="buyresult_wrapper">
    <img src="../../assets/pay_result_ok.png" alt="" v-if="result.code == '000'">
    <img src="../../assets/pay_result_fail.png" alt="" v-else>
    <div v-if="result.code == '000'">
      <p>恭喜您认购成功</p>
      <span class="title">认购金额：<span>{{ formatAmount(result.tenderAmtApp) }}元</span> </span>
    </div>
    <div v-else>
      <p>抱歉，认购失败</p>
      <span class="title">{{ result.msg }}</span>
    </div>

    <router-link
      :to="{path:'/orderlist',query:{title:'订单中心'}}"
      v-if="result.code == '000'"
    >
      查看订单
    </router-link>
    <router-link
      :to="{path:'/list',query:{title:'双创项目'}}"
      v-if="result.code == '000'"
    >
      查看更多项目
    </router-link>
    <!--<router-link-->
      <!--:to="{path:'/list',query:{title:'双创项目'}}"-->
      <!--v-if="result.code == '000'"-->
    <!--&gt;-->
      <!--查看签约流程-->
    <!--</router-link>-->
    <!--<router-link-->
      <!--:to="{path:'/list',query:{title:'双创项目'}}"-->
      <!--v-if="result.code == '000'"-->
    <!--&gt;-->
      <!--查看其它项目-->
    <!--</router-link>-->
    <!--<router-link-->
      <!--:to="{path:'/list',query:{title:'双创项目'}}"-->
      <!--v-if="result.code == '000'"-->
    <!--&gt;-->
      <!--继续购买-->
    <!--</router-link>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'

    export default {
      data() {
        return {
          result:{}
        };
      },
      beforeMount() {
        this.result = JSON.parse(window.localStorage.getItem('buyresult'));
      },
      mixins: [formatUtils],
      mounted() {
      },
      methods: {
      },
      components: {}
    }
</script>

<style lang="scss">
  .buyresult_wrapper{
    padding: 4rem 3.85rem 0;
    font-size: 0;
    text-align: center;
    img{
      width:5.75rem;
    }
    div{
      margin-bottom: 2.4rem;
      p{
        font-size: .75rem;
        color: #666;
        font-weight: 500;
        line-height: 1.35rem;
        margin-top: .8rem;
      }
      .title{
        font-size: .6rem;
        color: #999;
        line-height: 1rem;
        span{
          color: #333;
        }
      }
    }

    a{
      display: block;
      width:7.7rem;
      height:1.9rem;
      margin: 0 auto 1.3rem;
      background-color: #ff8e1d;
      color: #fff;
      font-size: .65rem;
      text-align: center;
      line-height: 1.9rem;
      border-radius: 25px;
    }
  }
</style>
