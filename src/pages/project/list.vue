<template>
  <div id="project_list_wrapper" class="needsClick">
    <div class="project_list needsClick" v-for="item in projectList">
      <router-link class="needsClick" :to="{path:'/detail?productName='+item.projectName+'&productId='+item.projectCode,query:{title:item.projectName}}">
      <div class="item_info needsClick">
        <div class="item_left needsClick">
          <img :src="item.appImg" alt="" class="needsClick">
        </div>
        <div class="item_right needsClick">
          <div class="target_title needsClick">{{item.projectName}}</div>
          <div class="account_done needsClick">
            <span class="_status needsClick" :class="formatZhBg(item.projectState)">{{formatZh(item.projectState)}}</span>
          </div>
          <ProgressCom :value="item.percentage * 100" style="margin: 0" class="needsClick" v-if="!item.showProjectFlag"></ProgressCom>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ProgressCom from '@/common/progress/progress'
  import {formatUtils} from '@/config/mixin'

  export default {
    data() {
      return {};
    },
    props:{
      projectList:{}
    },
    mixins: [formatUtils],
    mounted() {
    },
    methods: {},
    components: {ProgressCom}
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  #project_list_wrapper{
    .item_info{
      font-size: 0.55rem;
      padding:0.5rem 0.85rem 0.85rem 0.85rem;
      display: flex;
      .item_left{
        flex:0 0 4.65rem;
        position: relative;
        @include wh(4.65rem,3.1rem);
        img{
          @include wh(100%,100%);
        }
      }
      .item_right{
        flex:1;
        padding-left: 0.4rem;
        .target_title{
          font-size: 0.65rem;
          line-height: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          .item_stage{
            position: relative;
            color: #333;
            padding-left: 0.3rem;
          }
        }
        .account_done{
          font-size: 0.5rem;
          line-height: 1rem;
          margin-top: 0.2rem;
          ._status{
            padding: 0.01rem 0.3rem;
            border-radius: 25px;
            font-size: 0.55rem;
            margin-right: 0.8rem;
          }
          ._amount{
            i{
              font-size: 0.8rem;
              color: #282E37;
            }
          }
        }
      }
    }
  }
</style>
