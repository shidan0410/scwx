<template>
<div id="who_wrapper">
  <div class="item_title">
    <h1>平台介绍</h1>
  </div>
  <div class="content">
    <h3>壹盐双创</h3>
    <p>壹盐双创(www.yiyanstart.com)于2017年上线，是中国首家面向大众的中国青年创新创业金融综合服务平台。壹盐双创联合中国共青团中央、中证报价系统、中国证券业协会和多家金融机构，共同致力于双创板投融资综合金融服务，以金融创新、普惠大众为己任，持续推进股权投资大众化、标准化，为小微企业提供快速发展过程中的资本与资源支持，为投资人提供更优投资渠道。同时提供展示宣传、流动性支持、众创学院、孵化培育、专项创投基金支持等优质增值服务。</p>
    <p>凭借盐商集团的雄厚资本力量和投研团队，壹盐双创未来将打造创新创业投融资一体的金融服务平台，挖掘双创板股权交易市场的新业态。目前公司已获得国资央企太平国发战略入股。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/who_1.png" alt="">
    </div>
  </div>
  <!--我们的团队-->
  <div class="item_title">
    <h1>我们的团队</h1>
  </div>
  <div class="content">
    <h3>壹盐双创</h3>
    <p>壹盐双创核心团队来自国内外一流互联网公司及银行、券商、基金公司，投资团队成员平均从业年限8年以上，拥有丰富的股权投研经验及项目投资经验；管理运营团队由创业者和金融科技、金融机构管理人员构成，具备国际化的金融服务理念及行业领先的风险管控能力；顾问团队由成功的企业家、投资人和行业专家组成。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/who_2.png" alt="">
    </div>
  </div>
  <!--平台介绍-->
  <div class="item_title">
    <h1>壹盐理念</h1>
  </div>
  <div class="content">
  <h3>有远见，创未来</h3>
  <p style="text-indent:0;">品牌定位：打造国内领先的双创板综合金融服务平台</p>
  <p style="text-indent:0;">品牌价值：投资你的未来</p>
  <p style="text-indent:0;">品牌理念：实现双创梦想 成就客户价值</p>
  <p style="text-indent:0;">品牌愿景：用专业的金融服务支持大众创新万众创业，成为双创事业的领航者和实践者</p>

    <h3>我们在做的，是盐商精神的传承</h3>
    <p>当今世界经济复苏乏力，中国经济面临转型之困、经济负担下行压力，我国经济当前发展形势不容乐观，面临一系列困境。再加之由来已久的“made in china”的低端仿造山寨之风，中国一直位处世界经济产业链条和价值链条的最底端，长期扮演世界工厂的“打工者”的角色，攫取的市场份额与付出的高额劳动并不相称。</p>
    <p>受制于当前发展现实，我国经济发展亟须寻找新型动能，以增强韧性与活力，积攒力量蓄势待发，由此“大众创业，万众创新”便顺势而起。为践行盐商集团普惠金融的社会责任，筑梦每一个为梦想而努力的中小企业和个人，盐商集团首个双创板投融资综合服务平台—壹盐双创为此诞生。壹盐双创旨在打造中国青年创新创业投融资一体的金融服务平台，挖掘双创板股权交易市场的新业态，实现青年创业项目与资本市场的低成本、高效率对接金融需求。</p>
    <h3 style="padding-top: 0.5rem;">每一次创新，只为生活更美好</h3>
    <p>创业之心，赤子之情，团结一致，催生了源远流长的盐文化，盐虽平常，却是人们生活不可或缺的一部分。壹盐双创将盐商商道，盐民精神体现于于我们每一个产品和项目：勇于探索、善于经营、精于团结、长于包容、乐于奉献、敢于创新 。</p>
    <p>我们珍视每一个客户的价值。</p>
    <p>每一位投资人，都是壹粒盐，你们投资的不只是创业者的梦想，而是对现实生活的未雨绸缪，更是承兑未来的无限可能。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/who_3.png" alt="">
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

#who_wrapper{
  padding: 0 0 0 .75rem;
  padding-top: 0.3rem;
  margin-top: 7rem;
  .item_title{
    position: relative;
    font-size: 0.7rem;
    color: #333;
    line-height: 1.85rem;
    font-weight: 600;
    z-index: 2;
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
    z-index: 2;
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
