<template>
<div class="feedback_wrapper">
  <div class="item_title">
    <h1>种子轮直投</h1>
  </div>
  <div class="content">
    <h3>为什么要投种子轮？</h3>
    <p>前期投资, 低投入、高收益；后期投资, 高投入、低收益。</p>
    <h3 style="padding-top: 0.8rem;">Facebook投资与收益时间轴</h3>
    <div class="img_con">
      <img src="../../assets/aboutsc/6reback_table1.png" alt="" style="width:100%;">
    </div>
  </div>

  <!--预期盈利更可观-->
  <div class="item_title">
    <h1>预期盈利更可观</h1>
  </div>
  <div class="content">
    <h3>种子轮投资Facebook 13年，回报收益高达55000倍</h3>
    <h4>Facebook成立初期，估值500万美元</h4>
    <h4>2004年Peter Thiel随手投资50万，一年不到暴涨20倍；</h4>
    <h4>2006年Facebook估值为5亿美元，两年100倍；</h4>
    <h4>2007年Facebook估值150亿，三年3000倍；</h4>
    <h4>2010年估值230亿，6年投资回报收益为4600倍；</h4>
    <h4>如今Facebook市值4000亿美元，13年投资回报收益大约55000倍。</h4>
    <div class="img_con">
      <img src="../../assets/aboutsc/6reback_icon2.png" alt="">
    </div>
  </div>

  <!--多种投资组合方式-->
 <!--  <div class="item_title">
    <h1>多种投资组合方式</h1>
  </div>
  <div class="content">
    <h3>股权分红、预售产品、企业回购、增资退出等</h3>
    <p>投资人可通过壹盐双创平台获得股权分红、预售产品、企业回购、增资退出等多种投资收益。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/6reback_icon3.png" alt="">
    </div>
  </div> -->
 <!--多种项目退出方式-->
  <div class="item_title">
    <h1>多种项目退出方式</h1>
  </div>
  <div class="content">
    <h3>股权分红、预售产品、企业回购、增资退出等</h3>
    <p>项目管理人会根据项目的运营情况，帮助投资人完成股权转让、IPO、分红、回购、并购、清算等多种退出选择。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/6reback_icon3.png" alt="">
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

  .feedback_wrapper{
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
      h4{
        font-size: 0.5rem;
        line-height: 1.4rem;
        color: #999;
      }
      p{
        font-size: 0.5rem;
        color: #999;
        line-height: 0.8rem;
        /*text-indent: 2em;*/
      }
      .img_con{
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 1.5rem;
        img{
          width:60%;
        }
      }
    }
  }

</style>
