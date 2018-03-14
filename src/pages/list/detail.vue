<template>
    <div id='proInfo_container'>

      <Item :itemList="productInfo" :type="false"></Item>
        <!--<div class="split"></div>-->
        <!--没有完成合格投资人认证和展示项目不显示tab-->
        <ul class="btn_nav_wrapper"  id="btn_nav_wrapper" v-show="showProjectFlag != 1">
          <li><a @click='tabClickFn($event);' href='javascript:;' class="btn_intr" :class="[ isActive === 'intr' ? 'active' : '']">
            项目介绍
            </a></li>
          <li><a @click='tabClickFn($event);' href='javascript:;' class="btn_info" :class="[ isActive === 'info' ? 'active' : '']">
            融资信息
          </a></li>
          <li><a @click='tabClickFn($event);' href='javascript:;' class="btn_progress" :class="[ isActive === 'progress' ? 'active' : '']">
            项目进展
          </a></li>
          <li><a @click='tabClickFn($event);' href='javascript:;' class="btn_procast" :class="[ isActive === 'procast' ? 'active' : '']">
            跟投人
          </a></li>
        </ul>
        {{isVerify}}
        <div class="btn_intr_content content" v-if="isShow === 'intr'" style="padding-bottom: 2.2rem;">
          <pro-info :productIntroduceList="productIntroduceList" :projectMainTitle="projectMainTitle"></pro-info>
        </div>
        <div class="btn_info_content content" v-else-if="isShow === 'info'">
          <pro-information :productTrading="productTrading" :isVerify="isVerify"></pro-information>
        </div>
        <div class="btn_progress_content content" v-else-if="isShow === 'progress'">
          <productprogress :productProgressList="productProgressList" :isVerify="isVerify"></productprogress>
        </div>
        <div class="btn_procast_content content" v-else>
          <pro-cast :productId="productId" :isVerify="isVerify"></pro-cast>
        </div>

        <div id="buy_nav" v-if="showProjectFlag != 1 && state != 3 && state != 4 && state != 5 && state != 6 && state != 7">
          <a href="javascript:;" @click="goView();" class="buy_btn" v-if="isVerify || isRisk" style="width: 100%;"><!--没有完成合格投资人认证-->
            认证合格投资人查看更多信息
          </a>

          <a class="yr_tip" v-if="state == '0'" style="width: 100%;"><!--预热期显示开始时间-->
            {{ issBgnDt}} 起售
          </a>

          <div v-if="state == '1' || state == '2'"><!--认购期可以购买项目-->
            <a href="javascript:;" class="tips_buy">{{tenTh(minPayAmt)}}万起认购 {{tenTh(addAmt)}}万累加</a>
            <a href="javascript:;" class="buy_btn" @click="checkOverTimeJudge();">我要认购</a>
          </div>
        </div>

      </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {productDetail,overTimeJudge} from '@/service/getData'
  import { Toast } from 'mint-ui';
  import {formatUtils} from '@/config/mixin'
  import {setStore} from '@/config/utils'
  import proInfo from '@/pages/list/productInfo'/*项目介绍*/
  import productprogress from '@/pages/list/proProgress'/*项目进展*/
  import proInformation from '@/pages/list/proInfo'/*融资信息*/
  import proCast from '@/pages/list/proCast'/*跟投人*/
  import Item from '@/common/item/item'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        productId:'',//项目ID
        productInfo:[],//产品信息
        projectMainTitle:'',
        productIntroduceList:[],//项目介绍
        productTrading:[],//融资信息
        productProgressList:[],//项目进展
        isShow:'intr',//项目介绍，项目进展显示 隐藏
        isActive:'intr',//active状态切换
        isVerify:false,//是否完成合格投资人认证
        showProjectFlag:0,/*判断是不是展示项目 1是展示项目*/
        state:'',/*项目状态*/
        minPayAmt:'',//最低认购金额（元）
        addAmt:'',//最小追加金额（元）
        issBgnDt:'',//开始时间
        isRisk:false/*是否风险测评*/
      };
    },
    mixins: [formatUtils],
    async beforeMount(){
      this.productId = this.$route.query.productId || '';/*获取产品id*/
    },
    mounted() {
      productDetail(this.productId).then(res => {
        if(res.code === ERR_OK){
          this.state = res.productInfo.state;
          this.minPayAmt = res.productInfo.minPayAmt;
          this.addAmt = res.productInfo.addAmt;
          this.issBgnDt = res.productInfo.issBgnDt;
          this.projectMainTitle = res.productInfo.projectMainTitle;

          res.productInfo.minPayAmt = res.productInfo.minPayAmt / 10000;
          this.productInfo.push(res.productInfo);/*产品信息*/
          this.productIntroduceList = res.productIntroduceList;/*项目介绍*/
          this.productTrading = res.productTrading;/*融资信息*/
          this.productProgressList = res.productProgressList;/*项目进展*/
          if(res.productInfo.showProjectFlag == 1){/*展示项目*/
            this.showProjectFlag = 1;
          }else if(res.authFlag == 0){//认证标识（0：未认证；1：已认证）  未认证合格投资人 || 展示项目  只显示项目介绍
            this.isVerify = true;
          }else{
            if(res.riskFlag == 0){/*没有风险测评*/
              this.isRisk = true;
            }else{
              this.isRisk = false;
            }
            this.isVerify = false;
          }
//          this._initNav();
        }
      })

    },
    updated() {
      this._initNav();
    },
    methods: {
      goView() {
        if(this.isVerify){/*未认证合格投资人*/
          this.$router.push({path:'/identifyInvestForm',query:{title:'认证合格投资人'}})
        }else if(this.isRisk){/*没有风险测评*/
          this.$router.push({path:'/risk',query:{title:'风险测评'}})
        }
      },
      _initNav() {
          var _self = this;
          var tit = document.getElementById('btn_nav_wrapper');
        //安卓设备
          if(navigator.userAgent.match('Android')){
            var titleTop = tit.offsetTop;
            var parentTop = tit.offsetParent.offsetTop;
            //滚动事件
            window.onscroll = function(){
              //获取当前滚动的距离
              var btop = document.body.scrollTop||document.documentElement.scrollTop;
              //如果滚动距离大于导航条据顶部的距离
              if(btop > titleTop){
                //为导航条设置fix
                tit.classList.add("fix");
              }else{
                //移除fixed
                tit.classList.remove("fix");
              }
            }
          }else{
            tit.classList.add("tab-box-sticky");
          }
      },
      tabClickFn(event){
        var tit = document.getElementById('btn_nav_wrapper').offsetTop;
        $('body,html').animate({
          scrollTop:tit
        })
        var txt = $.trim($(event.target).html());
        var tip = '';
        switch (txt) {
          case '项目介绍':
            tip = 'intr';
            break;
          case '融资信息':
            tip = 'info';
            break;
          case '项目进展':
            tip = 'progress';
            break;
          default:
            tip = 'procast';
            break;
        }
        this.isShow = tip;
        this.isActive = tip;
      },
      checkOverTimeJudge() {
        /*判断是否在购买时间*/
        overTimeJudge().then(res =>{
          if(res.code == ERR_OK){
            this.$router.push({path:'/createOrder?productId='+this.productId,query:{title:'创建订单'}})
          }else{
            Toast(res.msg);
          }
        })
      }
    },
    components:{
      proInfo,
      productprogress,
      proInformation,
      proCast,
      Item,
      Toast

    }
  };

</script>

<style lang="scss">
  @import 'src/style/mixin';

  $fc:#333;
  $tc:#999;
  .tab-box-sticky {
    position: -webkit-sticky;
    position: sticky;
    top:-1px;
    left: 0;
    z-index: 99;
    background: #fff;
  }

  .fix{
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    background: #fff;
    margin-top: 0!important;
    z-index: 1000;
  }

  .product_info_content,product_cast_content{
    position: absolute;
    width:100%;
    height:100%;
    z-index: 1000;
    top:0;
    left:0;
  }

  #proInfo_container{
    font-size: 0;
    .split{
      width:100%;
      height:.5rem;
      background: #f5f5f5;
    }
    #tip_content{
      @include wh(100%,1.5rem);
      background: #ffeddc;
      padding: 0 0.75rem;
      .icon-mark:before{
        font-size: 1rem;
        color: #ff8f1f;
        position: relative;
        top:0.2rem;
      }
      .con{
        padding-left: 0.2rem;
        color: #ff8f1f;
        font-size: 0.5rem;
        line-height: 1.5rem;
      }
    }
    .video_wrapper_img{
      @include wh(100%,7.5rem);
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
        height: auto;
        min-height:100%;
      }
    }
    .video_wrapper{
     /* @include wh(100%,7.5rem);*/
      position: relative;
      iframe{
        width:100%;
        height:200px;
      }

      .play{
        /*&:after{
          content: '';
          position: absolute;
          z-index:100;
          top: 3rem;
          left: 7.2rem;
          -webkit-border-radius:50%;
          -moz-border-radius:50%;
          border-radius:50%;
          @include wh(1.7rem,1.7rem);
          border:0.25rem solid rgba(255,255,255,.3);
        }
        &:before{
          content: '';
          position: absolute;
          z-index:100;
          top: 3.5rem;
          left: 8.1rem;
          width: 0;
          height: 0;
          border: 0.6rem solid;
          border-color: transparent transparent transparent rgba(255,255,255,.3);
        }*/
      }
      video{
        position: relative;
        @include wh(100%,100%);
        /*background:transparent url('../../assets/proDetail/poster.png') 50% 50% no-repeat;*/
        /*background:transparent url('../../assets/proDetail/poster.png') 50% 50% no-repeat;*/
      }
      /*&:after{
        content: '';
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        @include wh(100%,7.5rem);
        background: rgba(0,0,0,.5);
        z-index:5;
      }*/
    }

    .btn_nav_wrapper{
      color: #999;
      box-shadow: 0 2px 1px 0 rgba(225,225,225,0.50);
      font-size: 0;
      li{
        padding: 0.6rem 0;
        width:25%;
        display: inline-block;
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        a{
          padding-bottom: 0.2rem;
          font-size: 0.65rem;
          color: #4A4A4A;
          &.active{
            color: $main;
            border-bottom: 2px solid $main;
          }
        }

      }
      .btn_intr{
        position: relative;
        &:after{
          height:1.25rem;
          top:0.5rem;
          right:0;
        }
      }
      .btn_info{
        position: relative;
        &:after{
          height:1.25rem;
          top:0.5rem;
          right:0;
        }
      }
      .btn_progress{
        position: relative;
        &:after{
          height:1.25rem;
          top:0.5rem;
          right:0;
        }
      }
    }

    .isShowInfo{
      a{
        font-size: 0.75rem;
        @include wh(33.33%,2rem);
        display: inline-block;
        text-align: center;
        line-height: 2rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    #buy_nav{
      position: fixed;
      @include wh(100%,2.2rem);
      background: #fff;
      bottom:0;
      left:0;
      box-shadow: 0 0 5px #f3f3f3;
      border-top:1px solid #f3f3f3;
      z-index: 999999;
      a{
        display: inline-block;
        @include wh(50%,2.2rem);
        overflow: hidden;
      }
      .tips_buy{
        background: #FFFFFF;
        border: 1px solid #E3E3E3;
        font-size: 0.6rem;
        line-height:2.2rem;
        color: #999999;
        text-align: center;
      }
      .buy_btn{
        text-align: center;
        line-height:2.2rem;
        padding: 0 0.75rem;
        font-size: 0.75rem;
        color: #fff;
        background: $main;
      }
      .yr_tip{
        text-align: center;
        line-height:2.2rem;
        padding: 0 0.75rem;
        font-size: 0.75rem;
        color: #999;
        background:#e3e3e3;
      }
    }
  }


</style>
