<template>
<div class="idea_wrapper">
  <div class="item_title">
    <h1>独创“盐商领投+机构跟投”模式</h1>
  </div>
  <div class="content">
    <h3>借助联合投资体，获得连带收益</h3>
    <p>该模式让用户可以参与领投人组织的联合投资体。壹盐双创的投资管理团队在挑选投资项目和投后管理上经验丰富，同时可有效整合银行、券商、创投机构等金融资源进行跟投，用户在每个投资项目中只需要投资一小笔资金，就可以借助联合投资体，获得连带收益，有效控制信息不对称可能带来的风险。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/5idea_icon1.png" alt="">
    </div>
  </div>

  <!--投资收益盐商劣后-->
  <div class="item_title">
    <h1>投资收益盐商劣后</h1>
  </div>
  <div class="content">
    <h3>最大程度保障投资人收益</h3>
    <p>投资收益结算阶段投资人将作为优先受益人，盐商集团作为劣后受益人承担较大风险，最大程度保障投资人收益。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/5idea_icon2.png" alt="">
    </div>
  </div>

  <!--量化分散投资控制风险-->
  <div class="item_title">
    <h1>量化分散投资控制风险</h1>
  </div>
  <div class="content">
    <h3>平衡单个项目风险获得整体收益</h3>
    <p>投资人可选多个项目进行量化分散投资，以有效平衡单个项目风险，获得整体收益。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/5idea_icon3.png" alt="">
    </div>
  </div>






</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    components: {}
  };

</script>

<style lang="scss">
  @import "src/style/mixin";

  .idea_wrapper{
    padding: 0 0 0 .75rem;
    padding-top: 0.3rem;
    margin-top: 7rem;
    .item_title{
      position: relative;
      font-size: 0.7rem;
      color: #333;
      line-height: 1.85rem;
      font-weight: 600;
      @include border-1px(#d7c39e);
      &:before{
        content: '';
        position: absolute;
        bottom:0;
        @include wh(2.95rem,0.075rem);
        background:#d7c39e ;
      }
    }
    .content{
      padding-top: 0.25rem;
      padding-right: 0.75rem;
      h3{
        color: #666;
        font-size: 0.6rem;
        line-height: 1.35rem;
      }
      p{
        font-size: 0.5rem;
        color: #999;
        line-height: 0.8rem;
        text-indent: 2em;
      }
      .img_con{
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 1.5rem;
        img{
          width:50%;
        }
      }
    }
  }


</style>
