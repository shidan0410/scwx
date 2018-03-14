<template>
<div class="allrecord">
  <ul class="record_container">
    <li v-for="record in records">
        <div class="item_container">
          <div class="time_title">
            <span class="time">{{record.transactionDate}}</span>
            <a href="javascript:;" style="display:block;float:right;width:20px;height:20px;" 
              @click="gotoWebView('订单详情','/orderdetail?oidTenderID='+record.tenderId)">
              <span class="icon icon-arrow"></span>
            </a>
          </div>

          <div class="item_info needsClick">
            <div class="item_left needsClick">
              <img :src="record.tenderImg" alt="">
            </div>
            <div class="item_right needsClick">
              <div class="target_title needsClick">{{record.projectName}}</div>
              <div class="account_done needsClick">
                <span v-if="record.moneyNum<0" class="_amount ">支付金额 <i> {{record.moneyNum}}</i></span>
                <span v-else class="_amount ">退款金额 <i> {{record.moneyNum}}</i></span>
              </div>
            </div>
          </div>

       <!--   <div class="info">
            备注：认购{{record.projectName}}产品{{record.amount}}元 {{record.idCardName}}（尾号{{record.idCardNum}}）
          </div>
          <div class="split"></div>-->

        </div>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'

  export default {
    data() {
      return {

      };
    },
    mixins: [formatUtils],
    props:{records:{}},
    methods: {
      gotoWebView(title,url) {
        this.$router.push({path:url,query:{title:title}});
      },
      // checkMoney(money){
      //   if(money<0){
      //     return true;
      //   }
      // }
    },
    components: {}
  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .allrecord{
    font-size: 0;
    ul{
      li{
        .item_container{
          .time_title{
            height:1.45rem;
            line-height: 1.45rem;
            padding:0 0.75rem;
            .time{
                line-height: 1.5rem;
                font-size: .6rem;
                color: #9EAABD;
                display: inline-block;
            }
            .icon{
              height: 15px;width: 15px;display:block;top: .3rem;
            }
            .icon-arrow{
              // &:before{
              //   line-height: 2rem;
              // }
            }
            /*.icon{*/
              /*float: right;*/
              /*font-size: 0.55rem;*/
              /*color: #999;*/
            /*}*/
          }
        }
        .item_info{
          font-size: 0;
          padding:0 0.75rem 0;
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
              line-height: .9rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              .item_stage{
                position: relative;
                color: #333;
                padding-left: 0.3rem;

              }
            }
            .account_done{
              font-size: 0.5rem;
              line-height: .9rem;
              margin-top: 0.5rem;
              ._amount{
                font-size: 0.65rem;
                color: #9EAABD;
                i{
                  color: #000019;
                }
              }
            }
          }

        }
        .info{
          height:1.5rem;
          font-size: 0.55rem;
          padding-left: 0.75rem;
          line-height: 1.5rem;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 92%;
          display: inline-block;
        }
        .split{
          @include wh(100%,0.5rem);
          background: #f4f3f1;
        }
      }
    }
  }

</style>
