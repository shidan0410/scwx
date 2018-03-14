<template>
<div class="good_wrapper">
  <div class="item_title">
    <h1>海量国家双创项目资源</h1>
  </div>
  <div class="content">
    <h3>10万家以上优质企业资源</h3>
    <p>平台所有项目均来自在双创板进行挂牌的优质股权项目，同时盐商集团为打造“双创”扶持闭环，搭建青年创新创业日常展示交流、资源对接、项目孵化等平台，引导青年开展创新性强、前瞻性好的创业项目，扶持培育科技含量高、商业模式新的创业团队，已连续4年成功赞助推出中国青年“双创”大赛，目前项目库已有10万家以上企业资源，包括大赛获奖企业百余家，如科瑞克医疗、蓝鲸传媒、摩拜单车等。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/3good_icon1.png" alt="">
    </div>
  </div>
  <!--专业投研严选高成长项目-->
  <div class="item_title">
    <h1>专业投研严选高成长项目</h1>
  </div>
  <div class="content">
    <h3>丰富的国内外私募股权投研经验</h3>
    <p>壹盐双创团队成员均拥有丰富的股权投研经验及项目投资经验，平均从业年限8年以上，已建立全面成熟的投资决策制度。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/3good_icon2.png" alt="">
    </div>
  </div>
  <!--多重评估体系-->
  <div class="item_title">
    <h1>多重评估体系</h1>
  </div>
  <div class="content">
    <h3>多维度、双道评估防线</h3>
    <p>平台项目皆经过运营数据、团队情况、信用记录、产品潜力、资质和知识产权、商业模式等多个维度的评估，并设立盐商集团和中证报价系统两道评估防线。</p>
    <div class="img_con">
      <img src="../../assets/aboutsc/3good_icon3.png" alt="">
      <img src="../../assets/aboutsc/2big_table1.png" alt="" style="width: 90%;padding-top: 1rem;">
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

  .good_wrapper{
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
