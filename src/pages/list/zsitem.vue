<template>

    <div class="list-content needsClick" v-if="!isEmpty">
      <mt-loadmore class="needsClick" :top-method="loadTop" :bottomDistance="50" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false">
        <Item :itemList="Gooditems" :isEmpty="Gooditems.length == 0" ></Item>
        <div v-show="loadFlag" class="nomore needsClick">没有更多数据</div>
        <div slot="bottom" class="mint-loadmore-bottom needsClick">
          <span class="needsClick" id="bottomtext1" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"  style="font-size:0.6rem;color:#999"></span>
          <span class="needsClick" id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
        </div>
        <div slot="top" class="mint-loadmore-top needsClick" >
            <span class="needsClick" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="margin-left: -1rem">
            <loading class="needsClick" :styleObject="{'top':'0.3rem'}"></loading>
          </span>
          <span v-show="topStatus === 'loading'" class="needsClick"></span>
        </div>
      </mt-loadmore>
    </div>

</template>

<script type="text/ecmascript-6">
  import {ProductList} from '@/service/getData'
  import { Checklist,Navbar, TabItem  } from 'mint-ui';
  import $ from 'jquery'
  import {formatUtils} from '@/config/mixin'
  import loading from '@/pages/loading'
  import Item from '@/common/item/item'


  const ERR_OK = '000';
  export default {
    data() {
      return {
        Gooditems:[],/*融资项目列表*/
        allLoaded:false,
        topStatus:'',
        bottomStatus:'',
        pageNo:1,
        goodPage:1,//上拉次数
        totalGetCount:0,//总页数
        isEmpty:false,//筛选空项目
        loadFlag:false,
      };
    },
    components:{loading, Checklist,Navbar, TabItem, Item },
    mixins: [formatUtils],
    mounted() {
      /*初始化产品列表*/
      this.initList();
    },
    methods:{
      initList() {
        ProductList('',this.goodPage,'',1).then(res =>{
          if(res.code === ERR_OK){
            this.Gooditems = res.productGoodList;
            this.$nextTick(() => {
              if(parseInt($(".mint-loadmore-content").css('height'))<$(window).height()){
                this.allLoaded = true;
              }else{
                this.allLoaded = false;
              }
              console.log(this.allLoaded);
            });
          }
        })
      },
      loadTop() {
        this.loadFlag = false;
        setTimeout(() => {
          ProductList('',this.goodPage,'',1).then(res=>{
              if(res.productGoodList.length == 0){
                $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)')
                this.allLoaded = true;
                this.loadFlag = true;
              }else{
                this.Gooditems.push = res.productGoodList;
                this.$refs.loadmore.onTopLoaded();
              }
          });
        }, 1000);
      },
      loadBottom(){//请求后台
        this.allLoaded = false;
        setTimeout(() => {
          //传入记录类型 和 要请求的页码
          this.goodPage +=1;
          ProductList('',this.goodPage,'',1).then(res=>{
              if(res.productGoodList.length == 0){
                $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)')
                this.allLoaded = true;
                this.loadFlag = true;
              }else{
                for (let i = 0; i < res.productGoodList.length; i ++) {
                  this.items.push(res.productGoodList[i]);
                }
                this.$refs.loadmore.onBottomLoaded();
              }
          });
        }, 1000);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      }
    },
  };

</script>

<style lang="scss">
  @import 'src/style/mixin';

  .mint-loadmore{
    min-height:100%;
    width: 100%;
  }

  #list{
    @include wh(100%,100%);
    .swiper-slide{
      text-align: center;
    }
    .mint-navbar{
      .mint-tab-item{
        flex: 0 0 25%;
        .mint-tab-item-label{
          font-size: 0.65rem;
          color: #4A4A4A;
          line-height: 0.9rem;
        }
        &.is-selected{
          border-bottom: none;
          .mint-tab-item-label{
            border-bottom: 2px solid #FF8E1D;
          }
        }
      }
    }
    .mint-loadmore-content{
      margin-bottom: 2.45rem;
    }
    .list-content{
      height:calc(100% - 2rem);
      padding-top: 2.3rem;
    }

  }

</style>
