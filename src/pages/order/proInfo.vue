<template>
<div class="proInfo_wrapper">
	<table>
		<tr><td class="c-title">项目简称</td><td class="content">{{productDetailMap.platformProjectsShortNm}}</td></tr>
		<tr><td class="c-title">产品代码</td><td class="content">{{productDetailMap.productId}}</td></tr>
		<tr><td class="c-title">企业法人</td><td class="content">{{productDetailMap.legalPerson}}</td></tr>
		<tr><td class="c-title">企业组织机构代码</td><td class="content">{{productDetailMap.ivsNum}}</td></tr>
		<tr><td class="c-title">成立时间</td><td class="content">{{productDetailMap.estDt}}</td></tr>
	</table>
  <table>
    <tr><td class="c-title">行业类别</td><td class="content">{{productDetailMap.industry}}</td></tr>
    <tr><td class="c-title">风险等级</td><td class="content">{{formatRisk(productDetailMap.riskLvl)}}</td></tr>
    <tr><td class="c-title">股东人数</td><td class="content">{{shareholdersNumFilter(productDetailMap.shareholdersNum)}}人</td></tr>
    <tr><td class="c-title">出让股份</td><td class="content">{{allotmentSharesFilter(productDetailMap.allotmentShares)}}%</td></tr>
  </table>
  <table>
    <tr><td class="c-title">目标额度(万元)</td><td class="content">{{productDetailMap.salesQuota }}</td></tr>
    <tr><td class="c-title">最低认购额度(元)</td><td class="content">{{productDetailMap.minAmount }}</td></tr>
    <tr><td class="c-title">最大认购额度(元)</td><td class="content">{{productDetailMap.maxSubsAmt }}</td></tr>
    <tr><td class="c-title">发行开始日期</td><td class="content">{{productDetailMap.issBgnDt}}</td></tr>
    <tr><td class="c-title">发行结束日期</td><td class="content">{{productDetailMap.issEndDt}}</td></tr>
    <tr><td class="content" colspan="2" style="text-align:center">分红方式：{{diMType(productDetailMap.dvidMd)}}</td></tr>
  </table>
    <!--<table>-->
    <!--<tr><td class="c-title">目标额度(万元)</td><td class="content">{{productDetailMap.salesQuota | amountFilter}}</td></tr>-->
    <!--<tr><td class="c-title">最低认购额度(万元)</td><td class="content">{{productDetailMap.minAmount | amountFilter}}</td></tr>-->
    <!--<tr><td class="c-title">最大认购额度(万元)</td><td class="content">{{productDetailMap.maxSubsAmt |　amountFilter}}</td></tr>-->
    <!--<tr><td class="c-title">发行开始日期</td><td class="content">{{productDetailMap.issBgnDt}}</td></tr>-->
    <!--<tr><td class="c-title">发行结束日期</td><td class="content">{{productDetailMap.issEndDt}}</td></tr>-->
    <!--<tr><td class="content" colspan="2" style="text-align:center">分红方式：{{productDetailMap.dvidMd}}</td></tr>-->
  <!--</table>-->
 <!--  <table>
    <tr>
      <td class="c-title">产品合同</td>
      <td class="content">
        <a  v-if="productDetailMap.productcontracts.length>0"  :href="productDetailMap.productcontracts" style="text-decoration: underline;">产品合同PDF</a>
        <a v-else>无</a>
      </td>
    </tr>
    <tr>
      <td class="c-title">电子签名约定书</td>
      <td class="content">
        <a v-if="productDetailMap.productsignbook.length>0"  :href="productDetailMap.productsignbook" style="text-decoration: underline;">电子签名约定书PDF</a>
        <a v-else>无</a>
      </td>zs
    </tr>
    <tr>
      <td class="c-title">投资确认书</td>
      <td class="content">
        <a v-if="productDetailMap.investmentconfirmation.length>0"  :href="productDetailMap.investmentconfirmation" style="text-decoration: underline;">投资确认书PDF</a>
        <a v-else>无</a>
      </td>
      </tr>
    <tr>
      <td class="c-title">产品募集说明书</td>
      <td class="content">
        <a v-if="productDetailMap.productprospectus.length>0"  :href="productDetailMap.productprospectus"style="text-decoration: underline;">产品合同PDF</a>
        <a v-else>无</a>
      </td>
    </tr>
  </table> -->
</div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'


  export default {
    data() {
      return {};
    },
    mixins: [formatUtils],
    props:{productDetailMap:{}},
    components: {},
    methods:{}
  };

</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.proInfo_wrapper{
  table{
    width: 90%;
   color:#999;
    margin: auto;
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
}

</style>
