<template>
  <div class="needsClick" id="item_list_wrapper">
    <a class="item_list needsClick"
       v-for="item in itemList"
       @click="goDetail('/detail?productName='+item.projectFullName+'&productId='+item.productId,item.projectFullName,item.projectFullName)"
    >
      <div class="item_bg needsClick" :class="{marginNone : !type}">
        <div class="bg_container needsClick" :class="[type ? 'br' : '']">
          <img class="needsClick" :src='item.smallImgPath' alt="" v-if="type"/>
          <img class="needsClick" :src="item.imgPath" v-else-if="!item.linkUrl"/>
          <video class="needsClick" :src="item.linkUrl" controls="controls" v-else></video>
        </div>
        <!--项目状态-->
        <span class="risk_level needsClick" :class="formatZhBg(item.projectState || item.state)">{{formatZh(item.projectState || item.state)}} </span>
      </div>
      <!--项目标题内容-->
      <div class="item_title_container needsClick">
        <span class="item_title needsClick">{{item.projectMainTitle }}</span>
        <p class="item_cons needsClick">{{item.summaryText }}</p>
      </div>
      <!--项目标签-->
      <div class="items_tips needsClick">
        <!--<span class="locationIcon"></span>-->
        <div class="address needsClick" v-show="item.projectAdds">
          <i class="icon-address needsClick" style="top: .3rem;position: relative;"></i>
          <span class="needsClick">{{ item.projectAdds }}</span>
        </div>
        <div class="tips needsClick">
          <ul class="needsClick">
            <li class="needsClick" v-for="result in item.projectCharacter">{{ result }}</li>
          </ul>
        </div>
      </div>

      <ProgressCom v-if="item.showProjectFlag == 0 && item.percentage" :value="Number(item.percentage)" style="margin:0 0.55rem;" class="needsClick"></ProgressCom>
      <ProgressCom v-if="item.showProjectFlag == 0 && item.buyProgress" :value="Number(item.buyProgress)" style="margin:0 0.55rem;" class="needsClick"></ProgressCom>

      <div class="item_infos needsClick" v-show="item.showProjectFlag == 0">
        <span  class="needsClick"> 募集 <i>{{item.salesQuota ? item.salesQuota + '万' : '不限'}}</i></span>
        <span  class="needsClick"> 最低起投 <i>{{item.minPayAmt ? item.minPayAmt + '万' : '不限'}}</i></span>
        <span  class="needsClick" v-if="item.projectState == 0 || item.state == 0"> 开始时间 <i>{{item.issBgnTime || item.issBgnDt}}</i></span>
        <span  class="needsClick" v-if="item.projectState == 1 || item.projectState == 2 || item.state == 1 || item.state == 2"> 剩余天数 <i>{{item.remainDays ? item.remainDays : 0}}天</i></span>
        <!--<span  class="needsClick" v-if="item.projectState == 6 || item.state == 6" style="text-align: center;"> <i>{{item.issBgnTime}}</i></span>-->
      </div>
    </a>

    <!--空项目-->
    <Empty :isEmpty="isEmpty" class="needsClick"></Empty>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'
  import ProgressCom from '@/common/progress/progress'
  import Empty from '@/common/empty/empty'

  export default {
    data() {
      return {};
    },
    mixins: [formatUtils],
    props:{
      itemList:{},
      type:{/*首页列表  双创项目列表  项目详情列表 false */
        default:true
      },
      isEmpty:{
        default:false
      }
    },
    mounted() {

    },
    methods: {
      goDetail(url,title) {
        return this.type ? this.$router.push({path:url,query:{title:title}}) : '';
      }
    },
    components: {
      ProgressCom,Empty
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  @import 'src/style/iconfont';

  #item_list_wrapper{
    .locationIcon{background:url('../../assets/location.png') no-repeat;position: absolute;height: 17px;width: 20px;top: 2px;background-size: 20px;left:8px;background-size: 80%;}
    .item_list{
      position: relative;
      margin-bottom: 1.8rem;
      display: block;
      width:100%;
      min-height: 5.35rem;
      &::after{
        position: absolute;
        bottom:-1.5rem;
        content: '';
        width:100%;
        height:.5rem;
        background: #f5f5f5;
      }
      .item_bg{
        position: relative;
        border-radius: 8px;
        margin:0 0.55rem;
        &.marginNone{
          margin: 0;
          border-radius: 0;
        }
        .bg_container{
          overflow: hidden;
          @include wh(100%,7.8rem);
          &.br{
            border-radius:8px;
          }
          img{
            @include wh(100%,100%);
            display: block;
          }
          video{
            width:100%;
          }
        }
        .risk_level{
          position: absolute;
          right:12px;
          bottom: -9px;
          padding: 5px 17px;
          border-radius: 25px;
          font-size: 0.55rem;
        }
      }
      .item_title_container{
        padding:0 0.55rem;
        font-size: 0;
        margin-top: 0.65rem;
        .item_title{
          font-size: 0.6rem;
          color: #333333;
          font-weight:600;
        }
        .item_cons{
          font-size: 0.55rem;
          line-height: 1rem;
          color: #777777;
          margin: 3px 0 0.55rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .items_tips{
        padding:0 0.55rem;
        position:relative;
        .address{
          display: inline-block;
          margin-right: 1.8rem;
          /*margin-left:0.5rem;*/
          span{
            font-size: 0.5rem;
            color: #999;
          }
        }
        .tips{
          display: inline-block;
          ul{
            li{
              display: inline-block;
              padding: 3px 6px;
              font-size: 0.5rem;
              border: 1px solid #FF8E1D;
              border-radius: 33px;
              color: #FF8E1D;
              margin-right: 0.4rem;
            }
          }
        }

      }
      .item_infos{
        padding:0 0.55rem;
        /*margin-bottom: 1.8rem;*/
        margin-top: 0.6rem;
        span{
          display: inline-block;
          /*width:30.333%;*/
          font-size: 0.5rem;
          color: #999;
          i{
            color: #666;
          }
          &:nth-child(1){
            margin-right: 1.2rem;
          }
          &:nth-child(2){
            margin-right: 1.5rem;
          }
        }
      }
    }
  }
</style>
