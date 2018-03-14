<template>
<div class="found_wrapper">
  <div class="item_title">
    <h1>对接中证报价系统</h1>
  </div>
  <div class="content">
    <h3>提供私募市场的检测、统计分析</h3>
    <p>中证机构间报价系统股份有限公司（简称中证报价系统）于2013年2月27日成立，注册资本75亿人民币，是中国证监会批准并授权中国证券业协会按照市场化原则管理的金融机构。</p>
    <p style="padding-top:0.5rem;">中证报价系统，是在国家指导下设立的提供以非公开募集方式设立产品的报价、发行与转让服务的系统平台；也是管理和公布机构间私募产品报价与服务系统相关信息，提供私募市场的监测、统计分析服务的权威认证机构，是双创板的运营主体。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/4mony_icon1.png" alt="">
    </div>
  </div>
  <!--不触碰用户资金-->
  <div class="item_title">
    <h1>不触碰用户资金</h1>
  </div>
  <div class="content">
    <h3>直接存入为您单独设立的资金账户</h3>
    <p>壹盐双创对接的是中证报价系统，每一笔投资资金直接存入中证报价系统为您单独设立的资金账户里，由中证报价系统全权监管。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/4mony_icon2.png" alt="">
    </div>
  </div>

  <!--资金直投项目-->
  <div class="item_title">
    <h1>资金直投项目</h1>
  </div>
  <div class="content">
    <h3>由中证报价系统统一结算直投于挂牌项目</h3>
    <p>资金募集完毕后将会由中证报价系统直接投资于挂牌项目；假如项目融资宣告失败，您的投资资金会由原支付渠道返还。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/4mony_icon3.png" alt="">
    </div>
  </div>
  <!--工商登记可变更-->
   <div class="item_title">
    <h1>工商登记变更可见</h1>
  </div>
  <div class="content">
    <h3>随时掌握投资人的股权变更等股东信息</h3>
    <p>中国青年创新创业金融综合服务平台建立了工商对接绿色通道，为项目办理变更手续提供便利，投资人进行投资后,在工商管理系统中均能查询，您可随时掌握投资人的股权变更等股东信息。</p>
    <div class="img_con">
    <img src="../../assets/aboutsc/4mony_icon4.png" alt="">
      <img src="../../assets/aboutsc/4mony_table1.png" alt="" style="width: 90%;padding-top: 1rem;">
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

  .found_wrapper{
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
