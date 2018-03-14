<template>
    <div class="record_wrapper">
      <div class="tab tab_all" id="tabArea">
        <SlideHeader @changeTabs="changeTabs" :tabsList="['全部','支付','退款']" :count="3"></SlideHeader>
        <mt-loadmore class="needsClick" v-if="!isEmpty" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false">
          <div class="all needsClick" style="padding-top: 3rem;">
            <record-list class="needsClick" v-bind:records="list"></record-list>
          </div>
          <div class="nomore needsClick" v-show="allLoaded">没有更多数据</div>
          <div slot="bottom" class="mint-loadmore-bottom needsClick">
            <span class="needsClick" id="bottomtext1"v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"  style="font-size:0.6rem;color:#999"></span>
            <span class="needsClick" id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
          </div>
        </mt-loadmore>

        <div class="emptyBg" v-if="isEmpty">
            <img src="../../assets/empty_icon.png" alt="">
            <span>暂无内容</span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import recordList from './allrecord'
  import {getRecordList} from '@/service/getData'
  import { Loadmore,Toast } from 'mint-ui'
  import $ from 'jquery'
  import loading from '@/pages/loading'
  import {formatUtils} from '@/config/mixin'
  import SlideHeader from '@/common/slideHeader/slideHeader'


  export default {
    data() {
      return {
        projectType:'',/*交易信息状态（空位全部，1支付，2退款）*/
        searchVal:'',/*项目名称*/
        curPage:1,//上拉次数
        list:['1'],
        allLoaded:false,
        topStatus:'',
        bottomStatus:'',
        pageNo:1,
        totalGetCount:0,//总页数
        isEmpty:false,
        loadFlag:false,
        clearInputShow:false
      };
    },
    mixins:[formatUtils],
    components: {recordList,loading,SlideHeader},
    mounted:function(){
      this.initList();/*初始化交易记录列表*/
    },
    methods:{
      changeTabs(index) {
        /*切换tab的回调*/
        console.log(index);
        this.projectType = index == 0 ? '' : index;
        this.curPage = 1;
        this.initList();
      },
      checkSearchVal(){
        if(this.searchVal){
          this.clearInputShow = true
        }
      },
      clearInput(){
        this.searchVal = '';
        this.clearInputShow = false
      },
      search(){
        this.initList();//查询所有状态，搜索请求第一页，searchVal为查询条件
      },
      initList(){//交易信息状态，页码，查询条件(项目名称)
        getRecordList(this.projectType,this.curPage,this.searchVal).then(res=>{
        if(res.code=="000"){
          if(res.dealRecordList.length>0){
            this.totalGetCount = res.dealRecordtPage;
            this.list = res.dealRecordList;
            this.isEmpty = false;
            this.$nextTick(() => {
                if(parseInt($(".record_container").css('height'))<$(window).height()){
                  this.allLoaded = true;
                }else{
                  this.allLoaded = false;
                }
            });
          }else{
            this.isEmpty = true;
          }
        }else if(res.code == '001'){
          this.isEmpty = true;
        }else{
          Toast("获取数据异常");
        }
       });
      },
      loadBottom(){//请求后台
        this.allLoaded = false;
        //传入记录类型 和 要请求的页码
        this.curPage +=1;
        getRecordList(this.projectType,this.curPage,"").then(res=>{
            if(res.dealRecordList.length == 0){
              $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
              this.allLoaded = true;
            }else{
              for (let i = 0; i < res.dealRecordList.length; i ++) {
                this.list.push(res.dealRecordList[i]);
              }
              this.$refs.loadmore.onBottomLoaded();
            }
        });
      },
      handleBottomChange(status) {
          this.bottomStatus = status;
      },
    }
  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .searchArea{
        background:#ddd;
        padding:0.3rem 0.5rem;
        input{width:88%;font-size: 0.7rem;padding: 0.1rem;padding-left:0.7rem;color:#666;border-radius: 15px;outline:none;}
        .clearInput{position: absolute;right: 2.5rem;top: 0.4rem;}
        .icon-search::before{
          color: #888;
          font-size: 0.8rem;
          position: relative;
          top: 0.12rem;
          left: 0.3rem;
        }
      }
  .tab{
    background:#fff;
    .tab-menu{
      display: flex;
      line-height: 2rem;
      border-bottom: 1px solid #ddd;
      /*margin-bottom: 1rem;*/
      li{
        flex:1;text-align:center;font-size:0.75rem;color:#999;
        &:nth-child(1){
          @include border-vertical-1px($bc);
          &:after{
            height:60%;
            top:20%;
            right:0;
          }
        }
        &:nth-child(2){
          @include border-vertical-1px($bc);
          &:after{
            height:60%;
            top:20%;
            right:0;
          }
        }
      }
      li.active {color: #ff8f1f;}
    }
  }
  .emptyBg{
      font-size: 0;
      padding: 5rem 0.75rem 0;
      text-align: center;
      img{
        width:40%;
      }
      span{
        display: block;
        padding-top: 1.6rem;
        font-size: 0.75rem;
        color: #ccc;
      }
    }

</style>
