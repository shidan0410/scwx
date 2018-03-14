<template>
<div id="partner_wrapper">
  <div class="item_title" style="margin-bottom: 0.5rem;">
    <h1>指导机构</h1>
  </div>
  <div class="content">
    <div class="img_con">
      <img src="../../assets/aboutsc/institution01.png" alt="">
      <h5>共青团中央</h5>
    </div>
  </div>
  <div class="content">
    <div class="img_con">
      <img src="../../assets/aboutsc/institution02.png" alt="">
      <h5>中证机构间报价系统股份有限公司</h5>
    </div>
  </div>
  <div class="item_title" style="padding-top: 1rem;">
    <h1>战略合作</h1>
  </div>
  <div class="partners">
    <img :src="item.imgUrl" alt="" v-for="item in partnersList">
  	<!--<img src="../../assets/aboutsc/partner-01.png"/>-->
  	<!--<img src="../../assets/aboutsc/partner-02.png"/>-->
  	<!--<img src="../../assets/aboutsc/partner-03.png"/>-->
  	<!--<img src="../../assets/aboutsc/partner-04.png"/>-->
  	<!--<img src="../../assets/aboutsc/partner-05.png"/>-->
  	<!--<img src="../../assets/aboutsc/partner-06.png"/>-->
  </div>
</div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {};
    },
    props:{
      partnersList:{}
    },
    mounted(){

    },
    components: {}
  };

</script>

<style lang="scss">
  @import "src/style/mixin";

#partner_wrapper{
  font-size: 0;
  /*height: 100%;*/
  padding: 0 0 0 .75rem;
  /*padding-top: 0.3rem;*/
  background-color: rgba(0,0,0,0);
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
    &:nth-child(1){
      margin-top: 1rem;
      h1{
        font-weight:500;
      }
    }
    &:nth-child(5){
      margin-top: 1.5rem;
      h1{
        font-weight:500;
      }
    }
    h1{
      font-size: 0.7rem;
      font-weight: 500;
    }
  }
  .content{
    padding-top: 0.25rem;
    // padding-right: 0.75rem;
    z-index:2;
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
      /*padding-bottom: 0.5rem;*/
      h5{
        font-size: 0.6rem;
        line-height: 1.3rem;
        color: #666;
      }
      img{
        width:1.75rem;
        margin:auto;
      }
    }
  }
  .partners{
  	background:#fff;
  	min-height: 10rem;
  	/*padding:1rem 0.82rem;*/
    padding:1rem 0;
  	img{
      width:30%;
  		border:1px solid #ddd;
      /*margin: 0 0.1rem 0.5rem;*/
      margin: 0 1.5% 0.5rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  	}
  }
}

</style>
