<template>
    <div class="progress">
        <!-- <div class="progressItem">
            <div class="itemDetail">
              <p style="line-height:1.1rem;color:#333;font-size:0.6rem">{{proProgress.tenderStName}}</p>
            </div>

            <div class="dot-g"></div>
        </div> -->
        <div class="progressItem" v-for="item in proProgress.progresses">
            <div class="itemDetail">
              <p class="time">{{item.time}}</p>
              <!-- <p class="summary">已募集10000万</p> -->
              <p class="detail">{{item.introduceValues}}</p>
              <div style="clear:both;"></div>
              <div class="baguetteBoxOne" v-for="img in item.imgPathList">
                <a :href="img"><img class="fl" :src="img" alt=""></a>
              </div>
              <div style="clear:both;"></div>

            </div>
            <div class="dot"></div>
        </div>
      <!--空项目-->
        <div class="emptyBg" v-if="proProgress.progresses.length<=0">
          <img src="../../assets/empty_icon.png" alt="">
          <span>暂无内容</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import baguetteBox from 'baguetteBox.js'
  export default {
    data() {
      return {};
    },
    props:{proProgress:{}},
    mounted:function(){
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

<style lang="scss" scoped>
  @import 'src/style/mixin';
   @import "src/style/baguetteBox";
  .progress{
      height: inherit;
      padding:0.5rem;
      background:#f5f5f5;
      padding-bottom:2rem;
      .progressItem{
         position:relative;
         min-height:2rem;
         padding: 0.5rem 0;
         border-left: 2px solid #ddd;
         margin-left: 0px;
          &:nth-child(1){
          .dot{
            &:after{
              content: '';
              position: absolute;
              background: #f5f5f5;
              top: -1.82rem;
              left: 0.35rem;
              width: 3px;
              height: 1.7rem;
            }
          }
        }
        .itemDetail{
          min-height: inherit;
          margin-left: 1rem;
          background: #fff;
          padding: 0.5rem;
          border-radius: 0.5rem;
          p{margin:0.25rem 0;line-height:0.75rem}
          .time{color:#999999;font-size:0.55rem}
          .summary{color:#333333;font-size:0.6rem}
          .detail{color:#666;font-size:0.55rem}
          .progressImgs img{width:2rem;margin:0.25rem;}
        }
        .dot-g{position:absolute;height:1rem;width:1rem;border-radius:100%;background:#6fd712;top:1.75rem;left:-0.55rem;border:0.1rem solid #f5f5f5;}
        .dot{position:absolute;height:1rem;width:1rem;border-radius:100%;background:#ff8f1f;top:1.75rem;left:-0.55rem;border:0.1rem solid #f5f5f5;}
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
</style>

