<template>
  <div class="bankContract_wrapper">
    <div class="title">
      <!--<img src="../../assets/icons.png" alt="">-->
      <p>恭喜您实名绑卡成功！<br>
        请完成风险评测</p>
    </div>
    <div class="content">
      <h1>如何进行网银签约</h1>
      <ul>
        <li>1、在电脑浏览器中输入网址：{{ bankList[numIndex].bankUrl }}</li>
        <li>2、选择对应的归属银行，查看签约流程</li>
        <li>3、按照签约流程步骤操作，直至签约成功。</li>
        <li>4、如遇到疑问，请电话咨询客服 4001-021-400</li>
      </ul>
      <div id="swiper-container" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in bankList[numIndex].imgList"><img :src="item" style="width:100%;"></div>
        </div>
      </div>
      <a href="javascript:;" @click="skip();" class="skip">跳过</a>
      <router-link :to="{path:'/risk'}"><button class="btn_default">风险评测</button></router-link>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper/dist/js/swiper.min.js'
  import 'swiper/dist/css/swiper.css'

  export default {
      data() {
        return {
          bankCd:'',
          numIndex:0,
          productId:'',
          bankList:[{
            'bankCd':'0301',
            'bankName':'中国交通银行',
            'bankUrl':'http://www.bankcomm.com/BankCommSite/default.shtml',
            'imgList':[require('../../assets/bank/jt/jiaotong_1@2x.png'),require('../../assets/bank/jt/jiaotong_2@2x.png'),require('../../assets/bank/jt/jiaotong_3@2x.png'),require('../../assets/bank/jt/jiaotong_4@2x.png'),require('../../assets/bank/jt/jiaotong_5@2x.png'),require('../../assets/bank/jt/jiaotong_6@2x.png')]
          },
          {
            'bankCd':'0305',
            'bankName':'中国民生银行',
            'bankUrl':'http://www.cmbc.com.cn/',
            'imgList':[require('../../assets/bank/ms/minsheng_01@2x.png'),require('../../assets/bank/ms/minsheng_02@2x.png'),require('../../assets/bank/ms/minsheng_03@2x.png'),require('../../assets/bank/ms/minsheng_04@2x.png'),require('../../assets/bank/ms/minsheng_05@2x.png')]
          },
          {
            'bankCd':'0103',
            'bankName':'中国农业银行',
            'bankUrl':'http://www.abchina.com/cn/',
            'imgList':[require('../../assets/bank/ny/nongye_01@2x.png'),require('../../assets/bank/ny/nongye_02@2x.png'),require('../../assets/bank/ny/nongye_03@2x.png'),require('../../assets/bank/ny/nongye_04@2x.png')]
          },
          {
            'bankCd':'0310',
            'bankName':'浦发银行',
            'bankUrl':'http://www.spdb.com.cn/',
            'imgList':[require('../../assets/bank/pf/pufa_01@2x.png'),require('../../assets/bank/pf/pufa_02@2x.png'),require('../../assets/bank/pf/pufa_03@2x.png'),require('../../assets/bank/pf/pufa_04@2x.png'),require('../../assets/bank/pf/pufa_05@2x.png')]
          },
          {
            'bankCd':'0100',
            'bankName':'中国邮政储蓄银行',
            'bankUrl':'http://www.psbc.com/cn/index.html',
            'imgList':[require('../../assets/bank/yz/youzheng_01@2x.png'),require('../../assets/bank/yz/youzheng_02@2x.png'),require('../../assets/bank/yz/youzheng_03@2x.png'),require('../../assets/bank/yz/youzheng_04@2x.png'),require('../../assets/bank/yz/youzheng_05@2x.png')]
          },
          {
            'bankCd':'0316',
            'bankName':'浙商银行',
            'bankUrl':'http://www.czbank.com/cn/index.shtml',
            'imgList':[require('../../assets/bank/zs/zheshang_01@2x.png'),require('../../assets/bank/zs/zheshang_02@2x.png'),require('../../assets/bank/zs/zheshang_03@2x.png'),require('../../assets/bank/zs/zheshang_04@2x.png'),require('../../assets/bank/zs/zheshang_05@2x.png'),require('../../assets/bank/zs/zheshang_06@2x.png'),require('../../assets/bank/zs/zheshang_07@2x.png')]
          }]
        };
      },
      async beforeMount() {
        this.bankCd = this.$route.query.bankCd;
        this.productId = this.$route.query.productId || '';
        for (let i = 0;i < this.bankList.length;i++){
          if(this.bankList[i].bankCd == this.bankCd){
              this.numIndex = i;
              break;
          }
        }
        console.log(this.numIndex)
      },
      mounted() {
        this._initSwiperSlide();
      },
      methods: {
        skip() {
          if(this.productId){
              this.$router.push('/detail?productId='+this.productId);//跳转至项目详情
          }else{
            this.$router.push({path:'/userCenter',query:{title:'个人中心'}});//跳转至个人中心
          }
        },
        _initSwiperSlide() {
          var mySwiper = new Swiper ('.swiper-container', {
//            autoplay : 4000,
            pagination: '.swiper-pagination',
//            loop:true,
            speed: 600
          })
        }
      },
      components: {}
    }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  .bankContract_wrapper{
    padding: 1.5rem 2rem 0;
    font-size: 0;
    .title{
      text-align: center;
      img{
        display: inline-block;
        width: 40%;
      }
      p{
        display: inline-block;
        font-size: .75rem;
        color: $main;
        line-height: 1rem;
      }
    }
    .content{
      margin-top: 1.4rem;
      h1{
        line-height: 1.75rem;
        font-size: .7rem;
        position: relative;
        margin-bottom: .55rem;
        @include border-1px($main);
        &::before{
          content: "";
          @include wh(2.2rem,4px);
          background: $main;
          position: absolute;
          left:0;
          bottom:-1px;
        }
      }
      ul{
        li{
          line-height:.8rem;
          font-size: .55rem;
          color: #999;
          line-height: 1rem;
        }
      }
      #swiper-container{
        @include wh(11.9rem,7rem);
        background: #e4e4e4;
        margin-top: .55rem;
      }
      .skip{
        display: block;
        width:100%;
        margin: 2rem 0 .5rem;
        font-size: .6rem;
        text-align: center;
        text-decoration: underline;
      }
    }
  }
</style>
