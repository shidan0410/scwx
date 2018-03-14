<template>
<div class="proInfo_wrapper">
  <router-link :to="{path:'/identifyInvestForm',query:{title:'认证合格投资人'}}" v-if="isVerify" class="tips_detail">认证合格投资人后查看</router-link>
  <div v-else>
  <dl>
    <dt>企业信息</dt>
    <dd><span>企业名称</span><span>{{productTrading.componyInfo.companyName}}</span></dd>
    <dd><span>企业法人</span><span>{{productTrading.componyInfo.companyPersonName}}</span></dd>
    <dd><span>企业成立时间</span><span>{{productTrading.componyInfo.companyHoldTime}}</span></dd>
    <dd><span>股东人数</span><span>{{productTrading.componyInfo.partnerNum}}</span></dd>
    <dd><span>企业组织机构代码</span><span>{{productTrading.componyInfo.companyCode}}</span></dd>
    <dd><span>企业注册地址</span><span>{{productTrading.componyInfo.companyRegistAdds}}</span></dd>
    <dd><span>企业行业类别</span><span>{{productTrading.componyInfo.companyTradeType}}</span></dd>
  </dl>
  <dl>
    <dt>项目信息</dt>
    <dd><span>项目名称</span><span>{{productTrading.productInfo.projectName}}</span></dd>
    <dd><span>风险等级</span><span>{{formatRisk(productTrading.productInfo.riskLvl)}}</span></dd>
    <dd><span>项目所在地</span><span>{{productTrading.productInfo.projectAdds}}</span></dd>
    <dd><span>产品代码</span><span>{{productTrading.productInfo.projectCode}}</span></dd>
    <dd><span>目标额度</span><span class="MAIN">{{productTrading.productInfo.targetAmt ? productTrading.productInfo.targetAmt + '万' : '不限'}}</span></dd>
    <dd><span>出让股份</span><span class="MAIN">{{productTrading.productInfo.sellingShare}}</span></dd>
    <dd><span>最低目标额度（万元）</span><span class="MAIN">{{productTrading.productInfo.minTargetAmt}}万元</span></dd>
    <dd><span>最低出让股份</span><span class="MAIN">{{productTrading.productInfo.minSellingShare}}</span></dd>
    <dd><span>最高目标额度（万元）</span><span class="MAIN">{{productTrading.productInfo.maxTargetAmt}}万元</span></dd>
    <dd><span>最高出让股份</span><span class="MAIN">{{productTrading.productInfo.maxSellingShare}}</span></dd>
    <dd><span>最低认购金额（元）</span><span class="MAIN">{{productTrading.productInfo.minPayAmt}}元</span></dd>
    <dd><span>最大认购金额（元）</span><span class="MAIN">{{productTrading.productInfo.maxPayAmt}}元</span></dd>
    <dd><span>最小追加金额（元）</span><span class="MAIN">{{productTrading.productInfo.addAmt}}元</span></dd>
    <dd><span>发行开始日期</span><span>{{productTrading.productInfo.issBgnDt}}</span></dd>
    <dd><span>发行结束日期</span><span>{{productTrading.productInfo.issEndDt}}</span></dd>
    <dd><span>产品募集说明书</span><span><a :href="productTrading.productInfo.productProspectus">查看PDF</a></span></dd>
  </dl>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import {productDetail} from '@/service/getData'
  import {formatUtils} from '@/config/mixin'

  export default {
    data() {
      return {
      };
    },
    mixins: [formatUtils],
    props:{
      productTrading:{},
      isVerify:''
    },
    async beforeMount(){

    },
    mounted() {

    },
    components: {},
    methods:{
      openFile(title,url) {
//        JsObject.openPdf(title,url);
      }
    }
  };

</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.proInfo_wrapper{
  padding-bottom: 2.2rem;
  min-height: 27rem;
  table{
    width: 90%;
    color:#999;
    margin:1rem auto 0;
    border: 1px solid #ddd;
    font-size: 0.6rem;
    margin-bottom: 1rem;
    tr{
      line-height: 1.5rem;
      td{border:1px solid #ddd;text-align:left;padding:0 0.5rem;}
      .c-title{width:44%;}
      .content{color:#333;a{color:#ff8f1f}}
    }
  }
  dl{
    &:nth-of-type(2){
      margin-top: 1rem;
    }
    padding: 0 .75rem;
    dt{
      font-size: 0.7rem;
      line-height: 1.1rem;
      color: #666666;
      margin-bottom: .3rem;
    }
    dd{
      padding: 0 .9rem;
      border-left: 1px solid #E3E3E3;
      border-right: 1px solid #E3E3E3;
      &:nth-child(2){
        padding-top:0.7rem;
        border-top: 1px solid #E3E3E3;
        border-radius: 2px 2px 0 0;
      }
      &:last-child{
        padding-bottom:0.7rem;
        border-bottom: 1px solid #E3E3E3;
        border-radius: 0 0 2px 2px;
      }
      span{
        font-size: 0.6rem;
        line-height: 0.9rem;
        color: #666666;
        display: inline-block;
        width:50%;
        line-height: 1.1rem;
        &:nth-of-type(1){
          text-align: left;
        }
        &:nth-of-type(2){
          text-align: right;
        }
        &.MAIN{
          color: $main;
        }
        a{
          color: $main;
          text-decoration: underline;
        }
      }
    }

  }
}

</style>
