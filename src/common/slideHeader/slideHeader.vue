<template>
  <div class="swiper-container slideHeader">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(result,index) in tabsList" @click="tabsChange(index);" :class="[currentIndex == index ? 'swiper-active' : '0']">
        <a href="javascript:;">{{ result }}</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper/dist/js/swiper.min.js'
  import 'swiper/dist/css/swiper.css'

  export default {
    data() {
      return {
        currentIndex:0
      };
    },
    props:{
      tabsList:{},
      count:{
        default:4
      }
    },
    mounted() {
      this.initSwiper();
    },
    methods: {
      initSwiper() {
        var _self = this;
        var mySwiper = new Swiper ('.slideHeader', {
          slidesPerView: _self.count,
            paginationClickable: true,
            spaceBetween: 10
//            roundLengths : true, //防止文字模糊
        })
      },
      tabsChange(index) {
        this.currentIndex = index;
        this.$emit("changeTabs",index)
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  .slideHeader{
    overflow:hidden;
    position:fixed;
    background: #fff;
    width:100%;
    padding: 9px 0.55rem 7px;
    margin-bottom: 0.5rem;
    -webkit-box-sizing: border-box;
    .swiper-wrapper{
      .swiper-slide{
        text-align: center;
        a{
          font-size: 0.65rem;
          line-height: 0.9rem;
          color: #4A4A4A;
          padding-bottom: 3px;
        }
      }
      .swiper-active{
        a{
          border-bottom: 2px solid $main;
        }
      }
    }
  }
</style>
