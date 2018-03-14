<template>
  <div id="tipWrapper" class="needsClick">
    <mt-loadmore class="needsClick" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false" >
        <ul class="needsClick">
          <li class="needsClick" v-for="(item,index) in list">
            <router-link class="needsClick" :to="{ path:'/tipDetail',query:{'noticeId':item.noticeId,title:'公告详情'}}">
            <div class="title_wrapper needsClick">
              <!--<span class="icon-tip needsClick"></span>-->
              <span class="circle needsClick"></span>
              <div class="titleContainer needsClick">
                <h1 class="needsClick">{{ item.noticeTitle }}</h1>
                <p class="needsClick" v-html="item.noticeMsg"></p>
              </div>
            </div>
            <div class="time_container needsClick">
              <span class="time needsClick">{{ item.noticeTime }}</span>
              <span class="icon needsClick"><span class="icon-arrow needsClick"></span></span><span class="detail_btn needsClick">查看详情</span>
              <!--<router-link :to="{ path: '/tipDetail', query:{ noticeId:item.noticeId }}"><span class="icon"><span class="icon-arrow"></span></span><span class="detail_btn">查看详情</span></router-link>-->
            </div>
            </router-link>
          </li>
        </ul>
        <div v-show="loadFlag" class="nomore needsClick">没有更多数据</div>
        <div slot="bottom" class="mint-loadmore-bottom needsClick">
          <span class="needsClick" id="bottomtext1"v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"  style="font-size:0.6rem;color:#999"></span>
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
</template>

<script type="text/ecmascript-6">
  import {getNoticeList} from '@/service/getData'
  import { Loadmore } from 'mint-ui';
  import $ from 'jquery'
  import loading from '@/pages/loading'


  export default {
    data() {
      return {
        list:[],
        allLoaded:false,
        topStatus:'',
        bottomStatus:'',
        pageNo:1,
        sumNum:1,//上拉次数
        totalGetCount:0,//总页数
        loadFlag:false
      }
    },
    mounted() {
      this._initData();
    },
    updated(){},
    methods:{
      _initData() {
        getNoticeList(this.sumNum).then(res=>{
          for (let i = 0; i < res.noticeList.length; i ++) {
            this.list.push(res.noticeList[i]);
          }
          this.$nextTick(() => {
            if(parseInt($("ul").css('height'))<$(window).height()){
              this.allLoaded = true;
            }else{
              this.allLoaded = false;
            }
          });
        });
      },
      loadTop(e) {
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        this.sumNum = 1;
        setTimeout(() => {
          this._initData();
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      loadBottom(){//请求后台
        this.allLoaded = false;
        setTimeout(() => {
          //传入记录类型 和 要请求的页码
          this.sumNum +=1;
          getNoticeList(this.sumNum).then(res=>{
            if(res.noticeList.length == 0){
              $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)')
                this.allLoaded = true;
                this.loadFlag = true;
                console.log(this.allLoaded)
            }else{
              for (let i = 0; i < res.noticeList.length; i ++) {
                this.list.push(res.noticeList[i]);
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
    components: {
      Loadmore,
      loading
    }
  };

</script>

<style lang="scss">
  @import 'src/style/mixin';

  #tipWrapper{
    /*padding-top:0.5rem;*/
    background: #f4f3f1;
    font-size: 0;
    ul{
      li{
        background: #fff;
        position: relative;
        margin-top: 0.5rem;
        box-shadow: 0 2px 4px 0 rgba(227,226,226,0.50);
       /* &::after{
          content: '';
          position: absolute;
          width:100%;
          height:0.5rem;
          background: #f4f3f1;
          bottom: -0.5rem;
        }*/
        .title_wrapper{
          height:4.2rem;
          overflow: hidden;
          padding: 0.45rem 0.75rem 0.7rem 0.75rem;
          @include border-1px($bc);
          &::after{
            width: 86%;
            left: 7%;
          }
          .circle{
            @include wh(0.35rem,0.35rem);
            background-color: $main;
          }
          span{
            display: inline-block;
            vertical-align: top;
            margin-right: 0.3rem;
            position: relative;
            top: 0.45rem;
            @include wh(1.2rem,1.2rem);
            text-align: center;
            line-height: 1.26rem;
            background: #f4f3f1;
            -webkit-border-radius:50%;
            -moz-border-radius:50%;
            border-radius:50%;
           /* &::before{
              display: block;
              position: relative;
              top:.15rem;
              left: 0.15rem;
              content: "";
              @include wh(.85rem,.85rem);
              background: url("../../assets/icons/h-horn.png") no-repeat center;
              background-size:100%;
            }*/
            &.active{
              background: #ff8f1f;
              &::before{
                color: #fff;
              }
            }
          }
          .titleContainer{
            display: inline-block;
            width:88%;
            h1{
              font-size: 0.7rem;
              color: #282E37;
              line-height: 1.25rem;
              overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:1;
              padding-bottom: 0.2rem;
            }
            p{
              font-size: 0.6rem;
              color: #979797;
              line-height: 0.8rem;
              overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:2;
            }
          }
        }
        .time_container{
          padding: 0.4rem 1.2rem 0.4rem 1.2rem;
//          @include border-1px($bc);
          .time{
            font-size: 0.55rem;
            line-height: 1.4rem;
            color: #647076;
          }
          .detail_btn{
            float: right;
            font-size: 0.55rem;
            line-height: 1.4rem;
            color: #647076;
          }
          .icon{
            float: right;
            .icon-arrow{
              padding-right: 0.4rem;
              padding-left: 0.5rem;
              display: inline-block;
              top: 0.45rem;
              right: -0.2rem;
              width: 0.5rem;
              height: 0.5rem;
              &:before{
                color: #647076;
                font-size: 0.55rem;
                line-height: 1.4rem;
                position: relative;
                top: -0.05rem;
              }
            }
          }
        }
      }
    }
  }

</style>
