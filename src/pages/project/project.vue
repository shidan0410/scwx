<template>
  <div id="projectlist_wrapper" class="needsClick">
    <div class="mark">当前项目仅能查看，如需编辑请至电脑网页端</div>
    <mt-loadmore class="needsClick" v-if="!isEmpty" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false">
      <List class="needsClick" v-bind:projectList="projectList"></List>
      <div class="nomore needsClick" v-show="allLoaded">没有更多数据</div>
      <div slot="bottom" class="mint-loadmore-bottom needsClick">
        <span class="needsClick" id="bottomtext1" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }" style="font-size:0.6rem;color:#999"></span>
        <span class="needsClick" id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
      </div>
    </mt-loadmore>

    <!--空项目-->
    <Empty :isEmpty="isEmpty"></Empty>

  </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import {myAppProject} from '@/service/getData'
  import { Loadmore,Toast } from 'mint-ui'
  import List from './list'
  import loading from '@/pages/loading'
  import Empty from '@/common/empty/empty'

  export default {
    data() {
      return {
        projectList:[],
        allLoaded:false,
        bottomStatus:'',
        curPage:1,//上拉次数
        projectState:'',/*项目状态*/
        totalGetCount:0,//总页数
        isEmpty:false,
        loadFlag:false,
      };
    },
    mounted() {
      this.initList();
    },
    methods: {
      initList(){
        myAppProject(this.curPage,this.projectState).then(res => {
          if(res.code=="000"){
            if(res.projectList.length>0){
              this.projectList = res.projectList;
              this.totalGetCount = res.projectList;
              this.isEmpty = false;
              this.$nextTick(() => {
                if(parseInt($(".item_list_wrapper").css('height'))<$(window).height()){
                  this.allLoaded = true;
                }else{
                  this.allLoaded = false;
                }
              });
            }else{
              this.isEmpty = true;
            }
          }else if(res.code=="001"){
            this.isEmpty = true;
          }else{
            Toast('获取数据异常');
          }
        });
      },
      loadBottom(){//请求后台
        this.allLoaded = false;
        //传入记录类型 和 要请求的页码
        this.curPage +=1;
        myAppProject(this.curPage,this.projectState).then(res => {
          if(res.projectList.length == 0){
            $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
            this.allLoaded = true;
            this.loadFlag = true;
          }else{
            this.projectList = this.projectList.concat(res.projectList);
            this.$refs.loadmore.onBottomLoaded();
          }
        });
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      }
    },
    components: {List,loading,Empty}
  }
</script>

<style lang="scss">
  .mark{
    font-size: .55rem;
    height:1.4rem;
    line-height: 1.4rem;
    text-align: center;
    background-color: #FFEBD7;
    color: #FF8E1D;
  }
</style>
