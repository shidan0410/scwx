<template>
    <div style="min-height:10rem">
      <div class='proCast' v-for="proCast in proCasts">
        <div class="wrap paddingLR">
            <div class="col clf">
                <div class="castAvatar left">
                <img :src="proCast.iconfile" alt="">
                </div>
                <div class="castMsg left">
                    <p><span class='name'>{{proCast.userName}} </span>  <span class='time right'>{{proCast.insDate}}</span></p>
                    <p class='numWrap'>支持 <span class='num'>{{ amountFilter(proCast.amount) }} </span> </p>
                </div>
            </div>
        </div>
    </div>
  <!--空项目-->
    <div class="emptyBg" v-if="proCasts.length<=0">
        <img src="../../assets/empty_icon.png" alt="">
        <span>暂无跟投人</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'

  export default {
    data() {
      return {};
    },
    mixins: [formatUtils],
    props:{proCasts:{}}

  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .proCast{
    @include wh(100%,100%);
        .tit{
            height:2.2rem;
            @include font(0.85rem, 2.2rem);
            color:$fc;
            text-align:center;
        }

        .col{
            height:3.15rem;
            padding:.5rem 0;
            border-bottom:1px solid $bc;

        .castAvatar{
            width:2.2rem;
            height:2.2rem;

            border-radius:100%;
            overflow:hidden;
            img{
                width:100%;
            }
        }
        .castMsg{
          height:100%;
          width:12.3rem;
          padding-left:.5rem;

          .name{
            font-size:.75rem;
          }
          .time{
            padding-top:.35rem;
            color:$fc9;
            font-size:.55rem;
          }

          .numWrap{
              padding-top:.3rem;
             font-size:.55rem;
             color:$fc9;
            .num{
             font-size:.75rem;
            }
          }

        }

        }
     }
</style>
