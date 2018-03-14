<template>
<div id="aboutsc_wrapper">
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in items">
        <span :class="item.iconclass" class="icon"></span>
        <span class="title">{{ item.title }}</span>
        <component :is="item.slotName" :partnersList="partnersList"  >
          <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>

      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
<!---->
  <foot-guide></foot-guide>
</div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper/dist/js/swiper.min.js'
  import 'swiper/dist/css/swiper.css'
  import partner from '@/pages/aboutsc/partner'
  import who from '@/pages/aboutsc/who'
  import big from '@/pages/aboutsc/big'
  import good from '@/pages/aboutsc/good'
  import found from '@/pages/aboutsc/found'
  import idea from '@/pages/aboutsc/idea'
  import feedback from '@/pages/aboutsc/feedback'
  import {companionList} from '@/service/getData'
  import headTop from '@/common/header/header'
  import footGuide from '@/common/footer/footer'


  export default {
    data() {
      return {
        partnersList:[],
        items: [
          {
            'title': '我们是谁',
            'src': '/who',
            'iconclass':'icon-who',
            'slotName':'who'
          },
          {
            'title': '权威背景',
            'src': '/big',
            'iconclass':'icon-big',
            'slotName':'big'
          },
          {
            'title': '项目优质',
            'src': '/good',
            'iconclass':'icon-select',
            'slotName':'good'
          },
          {
            'title': '资金安全',
            'src': '/found',
            'iconclass':'icon-found',
            'slotName':'found'
          },
          {
            'title': '投资理念',
            'src': '/idea',
            'iconclass':'icon-idea',
            'slotName':'idea'
          },
          {
            'title': '回报丰厚',
            'src': '/feedback',
            'iconclass':'icon-feedback',
            'slotName':'feedback'
          },
          {
            'title': '合作伙伴',
            'src': '/partner',
            'iconclass':'icon-partner',
            'slotName':'partner'
          }
        ]
      }
    },
    mounted() {
      companionList().then(res => {
//        console.log(res);
        if(res.code == '000'){
          this.partnersList = res.companionList;
          this.$nextTick(() => {
            this.swiper();
          });
        }
      })

    },
    methods: {
      swiper() {
        let _self = this;
        let mySwiper = new Swiper ('.swiper-container', {
//        effect : 'flip',
              loop: true,
              autoHeight: true,
              // 如果需要分页器
              pagination: '.swiper-pagination',
              onSlideChangeEnd: function(swiper){
                if(swiper.activeIndex == 0){
                  var num = 6;
                }else{
                  var num = (Math.abs(swiper.activeIndex-1))%7;
                }
//                let url = _self.items[num].src;
//                window.location.href = '#'+ url +'';
//            console.log(swiper.activeIndex+'-------'+num); //切换结束时，告诉我现在是第几个slide
          }
        })
      }
    },
    components: {
      partner,who,big,good,found,idea,feedback,headTop,footGuide
    }
  };

</script>

<style lang="scss">
  @import 'src/style/mixin';

.icon-partner{
  width:1.7rem;
  height:1.45rem;
  margin-top: 0.1rem;
  background: url("../../assets/aboutsc/icon-partner.png") no-repeat center;
  -webkit-background-size:100%;
  background-size:100%;
}
#aboutsc_wrapper{
  min-height:100%;
  .swiper-container{
    font-size: 0;
    /*@include wh(100%,10rem);*/
    width:100%;
    min-height:100%;
    .swiper-wrapper{
      min-height:100%;
      .swiper-slide{
        position: relative;
        /*@include wh(100%,100%);*/
        width:100%;
        height:auto;
        background: url("../../assets/aboutsc/title_bg.jpg") no-repeat top center;
        background-size: 100%;
        .icon{
          position: absolute;
          /*top: 1.8rem;*/
          /*left:5.6rem;*/
          top:2rem;
          left:5.25rem;
          &:before{
            font-size: 1.6rem;
            color: #c5a662;
          }
        }
        .title{
          color: #c5a662;
          font-size: 0.75rem;
          position: absolute;
          top:2.4rem;
          left:7.35rem;
        }
      }

    }
  }
.swiper-pagination-bullets {
    bottom: auto!important;
    width: 60%;
    margin: auto;
    margin-left: 20%;
    background: #d9e1e7;
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
    height: 0.25rem;
    top:5.53rem;

}
  .swiper-pagination-bullet{
    width: 14.28%;
    height:0.05rem;
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
    margin: 0!important;
    background: #d9e1e7!important;
  }

  .swiper-pagination-bullet-active{
    height:0.25rem;
    background: #fff!important;
    position: relative;
    // top:0.03rem;
    -webkit-box-shadow: 0 4px 10px #d9e1e8;
    box-shadow: 0 4px 10px #d9e1e8;
  }
}

</style>
