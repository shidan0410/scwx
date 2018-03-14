<template>
 <div id="productInfo">
    <!--  <h1>{{projectMainTitle}}</h1> -->
     <div v-for="item in productIntroduceList">
       <div class="leadCast">
         <span class="leadCast_title">{{ item.introduceName }}</span>
         <p v-html="UnUnicode(item.introduceValues)"></p>
       </div>
       <span class="split"></span>
     </div>
     <!--空项目-->
     <Empty :isEmpty="!productIntroduceList.length"></Empty>
 </div>
</template>

<script type="text/ecmascript-6">
  import {productDetail} from '@/service/getData'
  import {formatUtils} from '@/config/mixin'
  import Empty from '@/common/empty/empty'

  export default {
    data() {
      return {
      };
    },
    props: {
      productIntroduceList: {},
      projectMainTitle:'',
    },
    mixins: [formatUtils],
    mounted() {

    },
    methods: {
//      buyFn() {
////        console.log(this.productinfo.state == 1 || this.productinfo.state == 2)
//        if(this.productinfo.state == 1 || this.productinfo.state == 2){//募集期和开发期可以购买
//          var json = {};
//          json.platformProjectsFullNm = this.productinfo.platformProjectsFullNm;
//          json.riskLvl = this.productinfo.riskLvl;
//          json.allotmentShares = this.productinfo.allotmentShares;
//          json.dvidMd = this.productinfo.dvidMd;
//          json.productId = this.productinfo.productId;
//          json.salesQuota = this.productinfo.addAmount;//最小追投金额
//          json.productcontracts = this.productinfo.productcontracts;//产品合同PDF
//          json.productsignbook = this.productinfo.productsignbook;//电子签名约定书PDF
//          json.investmentconfirmation = this.productinfo.investmentconfirmation;//投资确认书PDF
//          json.productprospectus = this.productinfo.productprospectus;//产品合同PDF
//          //JsObject.showToast("dd");
//          ///JsObject.showToast(JSON. (json));
//          JsObject.ConfirmOrder(JSON.stringify(json));
//        }else{
//            //其它产品状态不可购买
//        }
//
//      },
//      gotoWebView(title,url) {
//        console.log(url)
//        JsObject.startWebview(title,url)
//      },
//      openId(){
////       this.productinfo.state = '3'
//          if(this.isProgress == 'bind'){
//            //实名绑卡
//            JsObject.openIDCard();
//          }else if(this.isProgress == 'bindCard'){
//            //银行卡绑定
//            JsObject.bandBankCard();
//          }
//
//      }
    },
    components: {Empty}
  };

</script>

<style lang="scss">
  @import 'src/style/mixin';
  $fz:0.75rem;
  $fc:#333;

  #productInfo{
    padding-bottom: 2.2rem;
    font-size: 0;
    min-height:27rem;
    height:auto;
    h1{
      font-size: .7rem;
      line-height: .95rem;
      color: #666666;
      padding: 0.6rem 0.75rem 0.4rem;
    }
    .disable{
      background: #e6e6e6!important;
      color: #999!important;
    }
    .leadCast{
      padding: 0.4rem 0.75rem 1.1rem;
      .leadCast_title{
        font-size: $fz;
        color: $fc;
        line-height: 1.45rem;
        font-weight: 600;
      }
      h3{
        font-size: 0.7rem;
        color:$fc;
        font-weight:600;
        line-height: 0.9rem;
        margin:0.3rem 0;
      }
      p{
        font-size: 0.65rem;
        color: #666;
        line-height:1rem;
        text-align: auto;
      }
      img{
        padding: 0.5rem 0 0.4rem;
        width:100%;
      }
      .img_title{
        display: block;
        width:100%;
        text-align: center;
        font-size: 0.55rem;
        color: #999;
        margin-bottom: 0.5rem;
      }
    }
    .cast{
      padding-top: 0;
    }
    .split{
      display: block;
      @include wh(100%,0.45rem);
      background: #f4f3f1;
    }
    #reward{
      padding: 0.4rem 0.75rem 1.1rem;
      .reward_title{
        font-size: $fz;
        color: $fc;
        line-height: 1.45rem;
        font-weight: 600;
      }
      ul{
        padding-top: 0.3rem;
        li{
          font-size: 0.65rem;
          color: #666;
          line-height: 1rem;
          span{
            color: $main;
          }
        }
      }
    }
    #team{
      padding: 0.4rem 0.75rem 1.1rem;
      .team_title{
        font-size: $fz;
        color: $fc;
        line-height: 1.45rem;
        font-weight: 600;
      }
      ul{
        padding-top: 0.4rem;
        li{
          margin-bottom: 0.75rem;
          .img_wrapper{
            margin-right: 0.75rem;
            display: inline-block;
            width: 3.5rem;
            height:4.7rem;
            /*background:url("../../assets/proDetail/avatar.png") no-repeat top center;*/
            /*background-size: cover;*/
          }
          .team_con{
            vertical-align: top;
            display: inline-block;
            width:10rem;
            h3{
              font-size: 0.7rem;
              color: #333;
              font-weight: 600;
              line-height: 1.5rem;
            }
            span{
              display: block;
              font-size: 0.5rem;
              color: #666;
              line-height: 0.85rem;
            }
          }
        }
      }
    }
    #risk_info{
      padding: 0.4rem 0.75rem 1.1rem;
      .risk_title{
        font-size: $fz;
        color: $fc;
        line-height: 1.45rem;
        font-weight: 600;
      }
      p{
        padding-top: 0.3rem;
        font-size: 0.65rem;
        color: #666;
        line-height:1rem;
      }
      dl{
        dt{
          color: $main;
          font-size: 0.65rem;
          padding-top: 0.5rem;
          padding-bottom: 0.3rem;
          text-align: center;
        }
        dd{
          color: #333;
          font-size: 0.65rem;
          line-height: 1rem;
        }
      }
    }
  }
</style>
