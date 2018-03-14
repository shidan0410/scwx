<template>
    <div class="progress">
      <router-link :to="{path:'/identifyInvestForm',query:{title:'认证合格投资人'}}" v-if="isVerify" class="tips_detail">认证合格投资人后查看</router-link>
      <div class="container" v-else>
        <div class="progressItem" v-for="(item,index) in productProgressList" >
          <div class="times">
            <span class="date">{{item.time.slice(5,10)}}</span>
            <span class="year">{{item.time.slice(0,4)}}</span>
          </div>
            <div class="itemDetail">
              <p class="detail">{{item.introduceValues}}</p>
              <div style="clear:both;"></div>
              <div class="baguetteBoxOne" v-for="img in item.imgPathList">
                <a :href="img" v-if="img"><img class="fl" :src="img" ></a>
              </div>
              <div style="clear:both;"></div>
            </div>
            <div class="dot"></div>
        </div>

      <!--空项目-->
      <Empty :isEmpty="!productProgressList.length"></Empty>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import baguetteBox from 'baguetteBox.js'
  import Empty from '@/common/empty/empty'

  export default {
    data() {
      return {

      };
    },
    components: {Empty},
    props:{
      productProgressList:{},
      isVerify:''
    },
    mounted:function(){
//      console.log(this.isVerify);
      $(".figcaption").each(function(i){
        var divH = $(this).height();
        var $p = $("p", $(this)).eq(0);
        while ($p.outerHeight() > divH) {
            $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            $(this).parent().find('.progressMore').css('display','block');
        };
      });

    },
    updated:function(){
      baguetteBox.run('.baguetteBoxOne');
    }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';
  @import "src/style/baguetteBox";

  .progress{
      min-height: 27rem;
    .container{
      padding:0.75rem;
    }
      .progressItem{
         position:relative;
         border-left: 2px solid #ddd;
         margin-left: 2.6rem;
          padding-bottom: 1.7rem;
        .times{
          position: absolute;
          left:-2.75rem;
          span{
            display: block;
          }
          .date{
            color: #647076;
            font-size:0.75rem;
            line-height: 1rem;
          }
          .year{
            font-size:0.55rem;
            line-height: .75rem;
            color: #88969F;
          }

        }
        &:nth-child(1){
          .dot{
            /*&:after{*/
              /*content: '';*/
              /*position: absolute;*/
              /*top:0rem;*/
              /*left:0.35rem;*/
              /*width:3px;*/
              /*height:1.5rem;*/
            /*}*/
          }
        }
        .itemDetail{
          margin-left: .6rem;
          background: #fff;
          /*padding: 0.5rem;*/
          border-radius: 0.5rem;
          .detail{
            line-height:0.85rem;
            font-size: .6rem;
            color: #777777;
          }
          .summary{
            color:#333333;
            font-size:0.6rem
          }
          .progressImgs img{
            width:2rem;
            margin:0.25rem;
          }
        }
       /* .dot{
          position:absolute;
          height:.7rem;
          width:.7rem;
          border-radius:100%;
          background:#6fd712;
          top:0;
          left:-0.55rem;
          border:0.1rem solid #f5f5f5;
        }*/
        .dot{
          position:absolute;
          height:.7rem;
          width:.7rem;
          border-radius:100%;
          background: #FFFFFF;
          border: 2px solid #FF8E1D;
          top:0;
          left:-0.37rem;
        }
      }
  }
  .fl{float:left}
  .figcaption {
    height: 2rem;
  }
  .figcaption p {
      margin: 0;
      line-height: 1.5rem;
  }
  .baguetteBoxOne{
    margin-top: .5rem;
    img{
      width:3.6rem;
      margin-right: 0.48rem;
      margin-top: 0.5rem;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }
</style>

