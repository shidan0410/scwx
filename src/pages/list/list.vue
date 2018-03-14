<template>
    <div id='list'>
      <!--头部滑动导航-->
      <SlideHeader @changeTabs="changeTabs" :tabsList="['融资项目','展示项目']" :count="2"></SlideHeader>

      <RZ v-if="currentIndex == 0"></RZ>
      <ZS v-else></ZS>


      <!--底部导航-->
      <foot-guide></foot-guide>

  </div>
</template>

<script type="text/ecmascript-6">
  import {ProductList} from '@/service/getData'
  import { Checklist,Navbar, TabItem  } from 'mint-ui';
  import $ from 'jquery'
  import {formatUtils} from '@/config/mixin'
  import loading from '@/pages/loading'
  import footGuide from '@/common/footer/footer'
  import Item from '@/common/item/item'
  import SlideHeader from '@/common/slideHeader/slideHeader'
  import RZ from './rzitem.vue'
  import ZS from './zsitem.vue'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        currentIndex:0,
      };
    },
    components:{loading, Checklist, footGuide,Navbar, TabItem, Item ,SlideHeader,RZ,ZS},
    mixins: [formatUtils],
    mounted() {
    },
    methods:{
      changeTabs(index) {
        /*切换tab的回调*/
        this.currentIndex = index;
//        this.initList();
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
