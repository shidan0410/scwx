<template>
       <div id="item_list_wrapper" class="needsClick">
        <div class="item_list needsClick" v-for="item in userTenders">
            <div class="item_title_container needsClick">
              <span class="item_title needsClick">{{item.insDate}}</span>
              <span v-if="item.tenderStatusName=='待支付'" class="status needsClick">
                 <count-down :endTime="item.remainingTime" :tenderid="item.oidTenderID" :callback="callback" endText=""></count-down>
                 <span style="color: #ff8e1d;">{{textTip}}</span>
              </span>
              <span v-else class="status needsClick">{{item.tenderStatusName}}</span>
            </div>
            <div class="item_info needsClick">
              <div class="item_left needsClick">
                <img :src="item.smallImg" alt="">
              </div>
              <div class="item_right needsClick">
                <div class="target_title needsClick">{{item.productName}}</div>
                <div class="account_done needsClick">
                  <span class="_status" :class="formatZhBg(item.productStatus)">{{item.productStatusName}}</span>
                  <span class="_amount "><i>{{item.tenderAmount}}</i>元</span>
                </div>
              </div>
            </div>
            <div class="btn_box needsClick">
              <!--不同的状态按钮显示不同，以下用if else 区分-->
              <!--待支付-->
              <div v-show="item.tenderStatusName=='待支付'" :id="item.oidTenderID">
                <span style="color: #ff8e1d;" class="detail_btn" @click="goPay(item.oidTenderID)">付款</span>
                <span style="color: #ff8e1d;" class="detail_btn" @click="cancelOrder(item.oidTenderID)">取消订单</span>
              </div>

              <!--订单关闭-->
              <div v-show="item.tenderStatusName=='订单关闭'" class="detail_btn" @click="delOrder(item.oidTenderID)">删除</div>

              <!--支付成功-->
              <div v-show="item.tenderStatusName=='支付成功'"class="detail_btn" >
                <span v-if="item.isWithdraw=='0'" style="color: #ff8e1d;" @click="returnOrder(item.projectCode,item.oidTenderID);">14:50前可撤单</span>
                <span v-else style="color: #ff8e1d;" @click="goNext('订单详情','/orderdetail?oidTenderID='+item.oidTenderID)" >查看详情</span>
              </div>

              <!--购买成功(原型中有“可转让”功能，但后台接口还没添加这个字段)-->
              <div v-show="item.tenderStatusName=='购买成功'" class="detail_btn" @click="goNext('订单详情','/orderdetail?oidTenderID='+item.oidTenderID)">查看详情</div>

              <!--其他状态显示‘查看详情’按钮-->
              <div v-show="item.tenderStatusName=='订单确认中'||item.tenderStatusName=='退款成功'||item.tenderStatusName=='退款中'||item.tenderStatusName=='认购成功'" class="detail_btn" @click="goNext('订单详情','/orderdetail?oidTenderID='+item.oidTenderID)">查看详情</div>

            </div>
            <div class="split needsClick"></div>
        </div>

      </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox,Toast } from 'mint-ui';
  import {orderList,appCancelOrder,appDelCloseOrder} from '@/service/getData'
  import { Loadmore } from 'mint-ui'
  import {formatUtils} from '@/config/mixin'
  import {millisecondToDate} from '@/config/utils'
  import countDown from './countDownDemo'
  export default {
    data() {
      return {
        timer:'',
        t:'',
        textTip:'待支付',
        otherFlag:true,
      };
    },
    mixins: [formatUtils],
    props:{userTenders:{}},
    mounted:function(){
      //console.log(this.getTimeCount(1800));
    },
    methods:{
      //去支付
      goPay(oidTenderId){
        this.$router.push({path:'/payOrder?oidTenderId='+oidTenderId,query:{title:'支付订单'}})
      },
      //撤单
      returnOrder(proCode,orderId){
        // console.log("--------------------------")
        // console.log(proCode);
        // console.log(orderId);
        this.$emit('returnOrder', proCode,orderId);
      },
      //取消订单
      cancelOrder(orderId){
        MessageBox.confirm('您确认取消该订单?').then(action => {
          appCancelOrder(orderId).then(res=>{
            if(res.code=="000"){
               Toast('订单取消成功');
                this.$emit('initlist');
            }
          })
        })
      },
      //删除订单
      delOrder(orderId){
        MessageBox.confirm('您确认删除该订单?').then(action => {
          appDelCloseOrder(orderId).then(res=>{
            console.log(res);
            if(res.code=="000"){
              Toast('订单删除成功');
              this.$emit('initlist');
            }
          });
        })
      },
      callback(oidTenderID){
       // console.log("-----------------------"+oidTenderID);
       $("#"+oidTenderID).html("<span style='display: inline-block;"+
                                      "width: 4.5rem;"+
                                      "height: 1.5rem;"+
                                      "margin-left: 0.8rem;"+
                                      "color: #ff8e1d;"+
                                      "border: 1px solid #ff8e1d;"+
                                      "text-align: center;"+
                                      "line-height: 1.5rem;"+
                                      "font-size: 0.6rem;"+
                                      "float: right;'"+ 
                                      "class='detail_btn newDelBtn' data-oid='"+oidTenderID+"' onclick=''>删除</span>");
        this.textTip = "订单关闭";
        var _self = this;
        $('.newDelBtn').click(function(){
          //$(this).data('oid');
          _self.delOrder($(this).data('oid'));
        })
      },
      goNext(title,url){
        this.$router.push({path:url,query:{title:title}});
      }
    },
    filters:{},
    components: {
      MessageBox,countDown
    }
  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
    #item_list_wrapper{
      .item_list{
        .item_title_container{
          @include wh(100%,1.5rem);
          padding:0 0.75rem;
          .item_title{
            line-height: 1.5rem;
            font-size: .6rem;
            color: #9EAABD;
            display: inline-block;
          }
          .status{
            font-size: 0.55rem;
            color: $main;
            float: right;
            line-height: 1.5rem;
          }

        }
        .item_info{
          font-size: 0.55rem;
          padding:0.5rem 0.85rem 0.85rem 0.85rem;
          display: flex;
          @include border-1px($bc);
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
              margin-top: 0.7rem;
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
        .btn_box{
          height:2.5rem;
          @include border-1px($bc);
          padding-top: 0.5rem;
          padding-right: 0.75rem;
          .cancel_btn{
            display: inline-block;
            @include wh(3.5rem,1.5rem);
            border: 1px solid $bc;
            color: #999;
            text-align: center;
            line-height: 1.5rem;
            font-size: 0.6rem;
            border-radius: 5px;
            float: right;
            margin-right: 0.75rem;
          }
          .detail_btn{
            display: inline-block;
            @include wh(4.5rem,1.5rem);
            margin-left: 0.8rem;
            color: $main;
            border: 1px solid $main;
            text-align: center;
            line-height: 1.5rem;
            font-size: 0.6rem;
            float: right;
          }
        }
        .split{
          @include wh(100%,0.5rem);
          background: #f4f3f1;
        }
      }
    }
.newDelBtn{
  display: inline-block;
    width: 4.5rem;
    height: 1.5rem;
    margin-left: 0.8rem;
    color: #ff8e1d;
    border: 1px solid #ff8e1d;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.6rem;
    float: right;
}
</style>
