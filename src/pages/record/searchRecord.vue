<template>
  <div class="search_wrapper">
    <form class="search_form">
      <span class="icon icon-arrow" @click="goBack()"></span>
      <label for="" class="search_input icon-search">
        <input type="text" id="searchInput" placeholder="" @input="handleInput" required v-model='inputVaule'>
      </label>
      <span class="search_submit" @click="search(inputVaule)">搜索</span>
    </form>

    <mt-loadmore class="needsClick" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false">
      <user-tenders v-bind:records="records"></user-tenders>
      <div class="nomore" v-show="allLoaded">没有更多数据</div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span id="bottomtext1" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }" style="font-size:0.6rem;color:#999"></span>
        <span id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
      </div>
    </mt-loadmore>

     <!--空项目-->
      <div class="emptyBg" v-show="isEmpty">
        <img src="../../assets/empty_icon.png" alt="">
        <span>暂无内容</span>
      </div>

    <div v-show="historytitle" class="search_history">
      <h3 class="search_history_title">搜索历史</h3>
      <ul class="search_ul">
        <li v-for="h in hisArrayRecord" @click="search(h)">
          <h4 class="search_name">{{h}}</h4>
          <!--<p class="search_address">{{item.value}}</p>-->
        </li>
      </ul>
      <div class="clear_history" @click="clearHis()" v-show="clearFlag">
        <span class="icon-clear"></span>
        <span style="color: #9a9a9a;">清空搜索历史</span>
      </div>
    </div>
    <!--<div class="search_none_place" v-if="searchNone">很抱歉！无搜索结果</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import { MessageBox } from 'mint-ui';
  import {getRecordList} from '@/service/getData'
  import { Loadmore } from 'mint-ui'
  import userTenders from './allrecord'
  import loading from '@/pages/loading'
  export default {
    data() {
      return {
        inputVaule:'',
        searchNone:false,
        historytitle:true,
        records:[],//订单列表
        allLoaded:false,
        bottomStatus:'',
        curPage:1,//上拉次数
        totalGetCount:0,//总页数
        beginDate:'',
        endDate:'',
        projectState:'',
        isEmpty:false,
        loadFlag:false,
        hisArrayRecord:['暂无搜索历史'],
        clearFlag:true
      };
    },
    mounted() {
      var _self = this;
      $("#searchInput").on('keypress',function(e) {
          var keycode = e.keyCode;
          var searchName = $(this).val();
          if(keycode=='13') {
//            alert("ssss")
            _self.search(_self.inputVaule);
//            JsObject.showToast('搜索键');
          }
      });
      if(localStorage.getItem('hisArrayRecord')){
        this.hisArrayRecord = localStorage.getItem('hisArrayRecord').split(',');
        this.clearFlag = true;
      }else{
        this.clearFlag = false;
      }
    },
    methods:{
      handleInput(){
        if(this.inputVaule.length<=0){
          this.historytitle = true;
          this.isEmpty = false;
        }
      },
      search(proName){
        console.log(proName);
        if(proName!="暂无搜索历史"){
          this.inputVaule = this.inputVaule||proName;
          getRecordList("",this.curPage,proName).then(res => {
              console.log(res);
              this.historytitle = false;//将搜索记录隐藏
              if(res.code=="000"){
                this.totalGetCount = res.dealRecordtPage;
                this.records = res.dealRecordList;
                this.isEmpty = false;
                this.$nextTick(() => {
                  if(parseInt($(".record_container").css('height'))<$(window).height()){
                    this.allLoaded = true;
                  }else{
                    this.allLoaded = false;
                  }
                  console.log(this.allLoaded)
                });
              }else if(res.code=="001"){
                this.records=[];
                this.totalGetCount = 0;
                this.isEmpty = true;
                console.log("dd");
              }else{

              }
              //保存搜索历史
              var hisArrayRecord = [];
              if(localStorage.getItem('hisArrayRecord'))hisArrayRecord=localStorage.getItem('hisArrayRecord').split(",");//获取已有的历史，变成数组格式
              if(this.inputVaule.length>0){
                if(hisArrayRecord.indexOf(this.inputVaule)==-1)hisArrayRecord.push(this.inputVaule);//将新纪录添加进去
                localStorage.setItem('hisArrayRecord',hisArrayRecord);
              }

          })
        }
      },
      goBack(){
        JsObject.back();
      },
      clearHis(){
        localStorage.setItem('hisArrayRecord',[]);
        this.hisArrayRecord = ["暂无搜索历史"];
        this.clearFlag = false;
      },
      loadBottom(){//请求后台
         this.allLoaded = false;
          //传入记录类型 和 要请求的页码
          this.curPage +=1;
          getRecordList("",this.curPage,this.inputVaule).then(res => {
                if(res.dealRecordList.length == 0){
                   $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
                  this.allLoaded = true;
                }else{
                  this.records = this.records.concat(res.dealRecordList);
                  this.$refs.loadmore.onBottomLoaded();
                }
          });
        },
      handleBottomChange(status) {
        this.bottomStatus = status;
      }
    },
    components: {
      userTenders,loading
    }
  };

</script>

<style lang="scss" scoped>
  @import "src/style/mixin";
  .icon-search{
    &:before{
      position: relative;
      left:-0.35rem;
      top:0.1rem;
      color: #9a9a9a;
      font-size: 0.6rem;
    }
  }
  .search_form{
    height: 2.25rem;
    padding: 0 0.75rem;
    @include border-1px($bc);
    font-size: 0.7rem;
    .icon-arrow{
      &:before{
        color: #999;
      }
    }
    .search_input{
      display: inline-block;
      margin-top: 0.4rem;
      margin-left: 0.8rem;
      padding: 0 0.4rem 0 0.8rem;
      @include wh(9.5rem,1.45rem);
      background: #e6e6e6;
      border-radius:25px;
      input{
        position: relative;
        width:90%;
        height:100%;
        background: transparent;
        outline: none;
      }
    }
    .search_submit{
      float: right;
      line-height: 2.25rem;
      color: #666;
    }
  }

  .search_history{
    .search_history_title{
      height:2.25rem;
      font-size:0.7rem;
      font-weight: 600;
      line-height: 2.25rem;
      @include border-1px($bc);
      padding-left: 0.75rem;
      &:before{
        position: absolute;
        right:0.75rem;
        color: #9a9a9a;
        -webkit-transform: rotate(180deg);
      }
    }
    .search_ul{
      li{
        height:2.25rem;
        @include border-1px($bc);
        margin: 0 0.75rem;
        line-height: 2.25rem;
        h4{
          font-size: 0.7rem;
          color: #555;
        }
        &:nth-last-child(1){
          margin: 0;
          padding-left: 0.75rem;
        }
      }
    }
    .clear_history{
      height:2.25rem;
      font-size: 0.7rem;
      line-height: 2.25rem;
      text-align: center;
      @include border-1px($bc);
      .icon-clear{
        &:before{
          color: #9a9a9a;
          position: relative;
          top:0.05rem;
        }
      }
    }
  }
  .emptyBg{
      font-size: 0;
      padding: 3rem 0.75rem 0;
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
