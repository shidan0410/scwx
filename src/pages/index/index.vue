<template>
  <div ref="itemswrapper">
    <div id="index">
      <div id="swiper-container" v-if="count" class="bannerSwiper swiper-container" >
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in bannerList" v-if="item.bannerAppUrl">
            <a v-if="item.bannerAppLink" :href="item.bannerAppLink" style="display: block;width: 100%;height: 100%;">
              <img :src="item.bannerAppUrl" style="width:100%;height:100%;">
            </a>
            <img v-else :src="item.bannerAppUrl" style="width:100%;height:100%;">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>

      <div id="tip_wrapper" v-show="homeNoticeList.length">
        <a href="###">
          <span class="icon-tip"></span>
          <div id="tip_container">
            <div class="tipTitle"></div>
            <div class="swiper-container tipSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="result in homeNoticeList"> <router-link :to="{ path:'/tipDetail',query:{'noticeId':result.noticeId,title:'公告详情'}}">{{ result.noticeTitle }}</router-link></div>
              </div>
            </div>
          </div>
          <router-link :to="{ path:'/tip',query:{title:'平台公告'}}" style="float: right;position: relative; top: -1.42rem;right: 0.7rem;"><span class="icon-menu"></span></router-link>
        </a>
      </div>
      <!--<div class="split" v-show="homeNoticeList.length"></div>-->

      <div id="item_select_wrapper">
        <div class="item_select_title">
          <!--<span class="icon-star"></span>-->
          <span>精选融资项目</span>
        </div>
        <mt-loadmore class="needsClick" :top-method="loadTop" ref="loadmore">
          <!--精选项目-->
          <Item :itemList="items"></Item>
          <div class="item_select_title">
            <!--<span class="icon-star"></span>-->
            <span>精选展示项目</span>
          </div>
          <Item :itemList="Gooditems"></Item>
          <div slot="bottom" class="mint-loadmore-bottom needsClick">
            <span class="needsClick" id="bottomtext1" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"  style="font-size:0.6rem;color:#999"></span>
            <span class="needsClick" id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
          </div>
          <div slot="top" class="mint-loadmore-top needsClick" >
            <span class="needsClick" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="margin-left: -1rem">
               <loading class="needsClick" :styleObject="{'top':'0.3rem'}"></loading>
            </span>
            <span class="needsClick" v-show="topStatus === 'loading'"></span>
          </div>
        </mt-loadmore>
      </div>
    </div>



    <!--空项目-->
    <Empty :isEmpty="isEmpty"></Empty>

    <foot-guide></foot-guide>
  </div>
</template>

<script type="text/ecmascript-6">
  import {projectGet,getNoticeList,bannerList,isAuthentica} from '@/service/getData'
  import {formatUtils} from '@/config/mixin'
  import Swiper from 'swiper/dist/js/swiper.min.js'
  import 'swiper/dist/css/swiper.css'
  import { Loadmore } from 'mint-ui'
  import loading from '@/pages/loading'
  import footGuide from '@/common/footer/footer'
  import Empty from '@/common/empty/empty'
  import Item from '@/common/item/item'
//  import payPWD from '@/common/payPwd/payPwd'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        items:[],//首页精选项目
        Gooditems:[],
        homeNoticeList:[],//首页滚动公告
        bannerList:[],//首页banner
        isEmpty:false,
        allLoaded:false,
        topStatus:'',
        bottomStatus:''
      };
    },
    mixins: [formatUtils],
    mounted() {
      this.initData();
    },
    components: {Loadmore, loading, footGuide ,Empty, Item},
    computed: {
      count() {
        for (let i = 0; i<this.bannerList.length; i++){
          if(this.bannerList[i].bannerAppUrl.length > 0){
            return true;
            break;
          }
        }
      }
    },
    filters:{
      _filters(val) {
          console.log(val);
      }
    },
    methods:{
      loadTop(e) {
        setTimeout(() => {
          this.initData();
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      loadBottom(e) {
        this.initData();
        this.$refs.loadmore.onBottomLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      initData(){
        //获取精选项目
        projectGet().then(res => {
          if(res.code === ERR_OK){
            if(res.productList == 0){
              this.isEmpty = true;
            }else{
              this.items = res.productList;
              this.Gooditems = res.productGoodList;
              this.isEmpty = false;
            }
          }
        }).then(res =>{

        }).catch(res =>{

        })
        //获取首页滚动公告
        getNoticeList().then(res => {
          if(res.code === ERR_OK){
            this.homeNoticeList = res.noticeList;
            this.$nextTick(() => {
              this._initSwiper();
            });
            if(navigator.userAgent.match('Android')){
              $('#tip_container').css('padding-top','0.1rem');
            }
          }
        })
        //获取首页banner
        bannerList().then(res => {
          if(res.code === ERR_OK){
            this.bannerList = res.bannerList;
            this.$nextTick(() => {
              this._initSwiperSlide();
            });
          }
        })

      },
      _initSwiper() {
        var mySwiper = new Swiper ('.tipSwiper', {
          direction: 'vertical',
          autoplay : 4000,
          loop:true,
          speed: 600
        })
      },
      _initSwiperSlide() {
        var mySwiper2 = new Swiper ('.bannerSwiper', {
          autoplay : 4000,
          pagination: '.swiper-pagination',
          loop:true,
          speed: 600
        })
      }
    },
    filters:{
    },

  };
</script>

<style lang="scss">
  @import 'src/style/mixin';
  @import 'src/style/iconfont';

  .swiper-pagination-bullet-active{
    background: #fff!important;
  }
  .swiper-pagination-bullet{
    background: #b9c9fe!important;
  }
  #index{
    font-size: 0;
    @include wh(100%,100%);
    overflow:hidden;
    padding-bottom: 80px;
    #swiper-container{
      height: 7.5rem;
      .mint-swipe {
        .mint-swipe-item{
          img{
            @include wh(100%,auto);
          }
        }
      }
    }
    .split{
      @include wh(100%,0.25rem);
      background: $bc;
    }
    #tip_wrapper{
      position: relative;
      padding-left: 0.75rem;
      @include wh(100%,1.85rem);
      background: #fff;
      overflow: hidden;
      .icon-tip{
        /*display: inline-block;*/
        position: absolute;
        left:0.75rem;
        top:0.4rem;
        padding-right: 0.25rem;
        &:before{
          color: #a0a0a0;
          font-size: 0.7rem;
        }
      }
      a{
        color: #4A4A4A;
        #tip_container{
          /*display: inline-block;*/
          width: 90%;
          padding-left: 1rem;
          .tipTitle{
            font-size: 0.56rem;
            line-height:1.85rem;
            float: left;
          }
          .tipSwiper{
            font-size: 0.56rem;
            height:1.85rem;
            .swiper-wrapper{
              .swiper-slide{
                color: #999;
                line-height: 1.85rem;
                font-size: 0.56rem;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:1;
              }
            }
          }
        }
      }
    }
    #item_select_wrapper::before{
      display: block;
      content: ' ';
      @include wh(100%,0.75rem);
      background:#f7f7f7;
      margin-bottom: 0.7rem;
    }
    #item_select_wrapper{
      //margin-top: 0.8rem;
      .item_select_title{
        padding-left: 0.55rem;
        font-size: 0.8rem;
        line-height: 0.85rem;
        color: #666666;
        margin-bottom: 0.5rem;
        .icon-star::before{
          color: rgb(207, 173, 110);
          font-size: 1.2rem;
          position: relative;
          top:0.12rem;
        }
      }

    }
  }
</style>
