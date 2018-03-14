<template>
  <div>
    <div id="invest_guide_wrapper">
      <div class="img_bg">
        <img src="../../assets/logo.png" alt="">
      </div>
     <ul>
       <li><a @click="goNext('/aboutsc','关于双创')" >关于双创</a></li>
       <li><a @click="goNext('/newPeopleGuide','新手指引')" >新手指引</a></li>
       <li><a @click="goNext('/tzbk','投资百科')" >投资百科</a></li>
       <li><a @click="goNext('/questions','常见问题')" >常见问题</a></li>
       <li><a @click="goNext('/module','业务管理规则')" >业务管理规则</a></li>
       <li><a @click="goNext('/leadInvestor','领投人规则')" >领投人规则</a></li>
       <!--<li><a @click="goNext('/leadInvestor','跟投人规则')" >跟投人规则</a></li>-->
       <li><a @click="goNext('/financier','融资人规则')" >融资人规则</a></li>
       <li><a @click="goNext('/financierInfo','信息披露规则')">信息披露规则</a></li>
       <li><a @click="goNext('/riskInfo','风险揭示书')">风险揭示书</a></li>
       <li><a @click="goNext('/investor','投资人规则')" >投资人规则</a></li>
       <!--<li><a @click="goNext('/plat','平台操作指引')" ></a></li>-->
     </ul>
    </div>

    <foot-guide></foot-guide>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import footGuide from '@/common/footer/footer'

  export default {
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
      goNext(url,title) {
        $('body,html').animate({
          scrollTop:0
        })
        this.$router.push({path:url,query:{title:title}})

      }
    },
    components: {
      footGuide
    }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  #invest_guide_wrapper{
    font-size: 0;
    .img_bg{
      @include wh(100%,6.8rem);
      img{
        width:100%;
        height:auto;
      }
    }
    ul{
      padding: 0 0 0.75rem 0.75rem;
      li{
        @include border-1px(#E3E3E3);
        font-size: 0.7rem;
        line-height: 1.9rem;
        color: #666666;
        position: relative;
        a{
          display: block;
          width:100%;
          height:100%;
        }
        &:before{
          content: '';
          position: absolute;
          top: 0.2rem;
          right: 0.75rem;
          width: 0.9rem;
          height: 1.5rem;
          background: url("../../assets/icons/list-right-arrow.png") no-repeat center;
          background-size: 100%;
          color: #647076;
          font-size: 0.55rem;
          line-height: 1.4rem;
        }
      }
    }

  }
</style>
