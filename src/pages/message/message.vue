<template>
  <div class="message_wrapper">
    <!--头部滑动导航-->
    <SlideHeader @changeTabs="changeTabs" :tabsList="['系统消息','项目消息']" :count="2"></SlideHeader>

    <mt-loadmore
      class="needsClick"
      v-if="!isEmpty"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      @bottom-status-change="handleBottomChange"
      :auto-fill="false"
    >
        <ul class="list_container needsClick">
          <li class="needsClick" v-for="item in list">
            <div class="needsClick">
              <span class="icon-tip needsClick"></span>
            </div>
            <div class="needsClick">

             <span class="mess needsClick" @click="goView(item.styleTitle)">{{item.title | filtersTitle(item.styleTitle,item.title)}}</span>
              <span class="time needsClick">{{item.creatDate1}}</span>
            </div>
          </li>
        </ul>
      <div class="nomore needsClick" v-show="loadFlag">没有更多数据</div>
      <div slot="bottom" class="mint-loadmore-bottom needsClick">
        <span class="needsClick" id="bottomtext1"v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"  style="font-size:0.6rem;color:#999"></span>
        <span class="needsClick" id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
      </div>
    </mt-loadmore>


    <Empty :isEmpty="isEmpty"></Empty>
  </div>

</template>

<script type="text/ecmascript-6">
  import SlideHeader from '@/common/slideHeader/slideHeader'
  import { Loadmore,Toast } from 'mint-ui'
  import loading from '@/pages/loading'
  import {formatUtils} from '@/config/mixin'
  import {PCselMessageList} from '@/service/getData'
  import Empty from '@/common/empty/empty'

  export default {
    data() {
      return {
        list:[],
        allLoaded:false,
        topStatus:'',
        bottomStatus:'',
        curPage:1,
        type:1,
        totalGetCount:0,//总页数
        isEmpty:false,
        loadFlag:false,
      };
    },
    mixins:[formatUtils],
    mounted() {
      this.init();
    },
    filters:{
      filtersTitle(styleTitle,title) {
        if(!title){
          return styleTitle
        }else{
          return styleTitle.replace(/@/g,title.split(";")[0])
        }
      }
    },
    methods: {
      goView(val) {
        var id = val.split(";")[1];
        if(id){/*有项目*/
          this.$router.push({path:'/detail?productName='+val.split(";")[0]+'&productId='+id,query:{title:val.split(";")[0]}})
        }
      },
      init() {
        PCselMessageList(this.curPage,this.type).then(res=>{
          if(res.code=="000"){
            if(res.messageList.length>0){
              this.list = res.messageList;
              this.isEmpty = false;
              this.$nextTick(() => {
                if(parseInt($(".list_container").css('height'))<$(window).height()){
                  this.allLoaded = true;
                }else{
                  this.allLoaded = false;
                }
              });
            }else{
              this.isEmpty = true;
            }
          }else if(res.code == '001'){
            this.list = [];
            this.isEmpty = true;
          }
        });
      },
      changeTabs(index) {
        this.curPage = 1;
        this.type = index == 0 ? '1' : '2'
        this.init();
      },
      loadBottom(){//请求后台
        this.allLoaded = false;
        //传入记录类型 和 要请求的页码
        this.curPage +=1;
        PCselMessageList(this.curPage,this.type).then(res=>{
          if(res.messageList.length == 0){
            $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
            this.allLoaded = true;
          }else{
            for (let i = 0; i < res.messageList.length; i ++) {
              this.list.push(res.messageList[i]);
            }
            this.$refs.loadmore.onBottomLoaded();
          }
        });
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    },
    components: {SlideHeader,Loadmore,Toast,loading,Empty}
  }
</script>

<style lang="scss">
  .message_wrapper{
    .swiper-slide{
      text-align: center;
    }
    ul{
      padding: 2rem 0.75rem 0;
      li{
        padding: .75rem 0;
        box-shadow: 0 2px 4px 0 rgba(227,226,226,0.50);
        div{
          display: inline-block;
          vertical-align: top;
          .icon-tip{
            &:after{
              color: #282E37;
            }
          }
          .mess{
            display: block;
            font-size: .55rem;
            line-height: .9rem;
            color: #282E37;
          }
          .time{
            display: block;
            font-size: .55rem;
            line-height: .9rem;
            color: #999999;
          }
        }
      }
    }
  }
</style>
