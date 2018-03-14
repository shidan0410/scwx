<template>
    <div class='proCast_wrapper'>
      <router-link :to="{path:'/identifyInvestForm',query:{title:'认证合格投资人'}}" v-if="isVerify" class="tips_detail">认证合格投资人后查看</router-link>
      <div v-else>
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
          @bottom-status-change="handleBottomChange"
          :auto-fill="false"
          v-if="!isEmpty">
          <div class="wrap" v-for="item in proCast">
            <div class="col clf">
              <div class="castAvatar left">
                <img :src="item.iconfile" alt="">
              </div>
              <div class="castMsg left">
                <p><span class='name'>{{item.userName}}</span><span class='time right'>支持{{item.amount}}元</span></p>
                <p class='numWrap'>{{item.insDate}}</p>
              </div>
            </div>
          </div>
          <div v-show="loadFlag" class="nomore">没有更多数据</div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span id="bottomtext1" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"  style="font-size:0.6rem;color:#999"></span>
            <span id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
          </div>
        </mt-loadmore>

        <!--空项目-->
        <Empty :isEmpty="!proCast.length"></Empty>
      </div>


    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {selProductInvestor} from '@/service/getData'
  import { Loadmore } from 'mint-ui';
  import {formatUtils} from '@/config/mixin'
  import loading from '@/pages/loading'
  import Empty from '@/common/empty/empty'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        proCast:[],
        allLoaded:false,
        topStatus:'',
        bottomStatus:'',
        pageNo:1,
        sumNum:1,//上拉次数
        totalGetCount:0,//总页数
        loadComplete:false,
        isEmpty:false,//筛选空项目
        loadFlag:false
      };
    },
    mixins: [formatUtils],
    props:{
      productId:'',
      isVerify:''
    },
    async beforeMount(){

    },
    updated(){
//      if(parseInt($(".btn_procast_content").css('height'))<$(window).height()){
//        this.allLoaded = true;
//      }
    },
    mounted() {
      selProductInvestor(this.productId,this.sumNum).then(res => {
        if(res.code === ERR_OK){
          if(res.produtInvestor.length == 0){
            this.isEmpty = true;
          }else{
            this.proCast = res.produtInvestor;
            this.isEmpty = false;
            this.$nextTick(() =>{
              if(parseInt($(".btn_procast_content").css('height'))<$(window).height()){
                this.allLoaded = true;
              }else{
                this.allLoaded = false;
              }
            })
          }
        }
      })
    },
    methods:{
      loadBottom(){//请求后台
        this.allLoaded = false;
        setTimeout(() => {
          //传入记录类型 和 要请求的页码
          this.sumNum +=1;
          selProductInvestor(this.productId,this.sumNum).then(res=>{
            this.loadComplete == true;
            if(res.produtInvestor.length == 0){
                this.allLoaded = true;
                this.loadFlag = true;
                $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
            }else{
              for (let i = 0; i < res.produtInvestor.length; i ++) {
                this.proCast.push(res.produtInvestor[i]);
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
    components:{
      Loadmore,
      loading,Empty
    }
  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .proCast_wrapper{
    @include wh(100%,100%);
    min-height:27rem;
    padding-bottom: 2.2rem;
      .tit{
          height:2.2rem;
          @include font(0.85rem, 2.2rem);
          color:$fc;
          text-align:center;
      }
      .col{
          height:3.15rem;
          padding:.7rem 0;
          margin: 0 1.1rem;
          border-bottom:1px solid #E6E6E6;
      .castAvatar{
          width:1.7rem;
          height:1.7rem;
          border-radius:100%;
          overflow:hidden;
          img{
              width:100%;
          }
      }
      .castMsg{
        height:100%;
        width:11.3rem;
        padding-left:.3rem;
        .name{
          font-size:.6rem;
          line-height: .9rem;
          color: #666;
        }
        .time{
          color:#666;
          font-size:.65rem;
          position: relative;
          top: .5rem;
        }
        .numWrap{
           font-size:.5rem;
            line-height: .9rem;
           color:#999;
        }
      }
      }
  }
</style>
