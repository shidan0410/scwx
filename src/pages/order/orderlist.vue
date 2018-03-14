<template>
    <div id="orderlist_wrapper" class="needsClick">
     <!-- <div class="searchArea" style="position: fixed;
    z-index: 99999;
    width: 100%;">
        <input type="text" v-model="searchVal" @keyup="checkSearchVal()">
        <span class="clearInput" v-show="clearInputShow" @click="clearInput()">×</span>
        <span class="icon-search" @click="search()"></span>
      </div>-->
      <!--头部滑动导航-->
      
      
       <SlideHeader @changeTabs="changeTabs" :tabsList="['全部','退款订单','支付成功','购买成功','认购成功']">
        
      </SlideHeader>
       <mt-loadmore style="padding-top: 2rem;" class="needsClick" v-if="!isEmpty" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="false">
          <user-tenders class="needsClick" v-bind:userTenders="userTenders" v-on:returnOrder="returnOrder" v-on:initlist="initList(1,'','')"></user-tenders>
          <div class="nomore needsClick" v-show="allLoaded">没有更多数据</div>
          <div slot="bottom" class="mint-loadmore-bottom needsClick">
            <span class="needsClick" id="bottomtext1" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }" style="font-size:0.6rem;color:#999"></span>
            <span class="needsClick" id="bottomtext2" v-show="bottomStatus === 'loading'" style="font-size:0.6rem;color:#999"><loading :styleObject="{'top':'0.3rem','left':'45%'}"></loading></span>
          </div>
      </mt-loadmore>

      <!--空项目-->
      <Empty :isEmpty="isEmpty"></Empty>
      <div id="popup_confirm" class="popup" v-show="isShowPopupConfirm" @touchmove.prevent>
          <div class="p_contant">
            <p class="p_title">确认撤单</p>
            <div class="form-group">
              <input type="number" v-model="code" maxlength="6" @blur="verifyCode()" placeholder="请输入手机验证码">
              <button @click="getCode()" id="getCode" style="width:4.5rem">获取验证码</button>
              <span class="icon_verify"></span>
             <!--  <span class="errorMsg" style="right:5rem;" v-if="codeError">{{codeError}}</span> -->
            </div>
            <payPwd @payData="payData" class="pwdInput"></payPwd>
            <div class="p_btn">
              <button class="cancel" @click="cancel()">取消</button>
              <button class="confirm" @click="confirmCancel()">确定</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import {getMyAppTenderList,getLoginVerifyCodeToBuy,returnOrder,loginVerifiedCodeToBuy} from '@/service/getData'
  import { Loadmore,Toast } from 'mint-ui'
  import userTenders from './list'
  import loading from '@/pages/loading'
  import Empty from '@/common/empty/empty'
  import SlideHeader from '@/common/slideHeader/slideHeader'
  import {returnOrderTimer,Encrypt,refreshOrderTimer} from '@/config/utils'
  import payPwd from '@/common/paypwd/payPwd'
  import {formatUtils} from '@/config/mixin'
  export default {
    data() {
      return {
        userTenders:[],//订单列表
        allLoaded:false,
        bottomStatus:'',
        curPage:1,//上拉次数
        totalGetCount:0,//总页数
        projectName:'',
        projectState:'',
        beginDate:'',
        endDate:'',
        projectState:'',
        isEmpty:false,
        loadFlag:false,
        searchVal:'',
        clearInputShow:false,
        isShowPopupTip:false,
        isShowPopupConfirm:false,
        code:'',
        codeError:'',
        paypwd:'',
        //撤单需要的参数
        proCode:'',
        tenderId:'',
        isVerifyCode:false,
      };
    },
    mixins:[formatUtils],
    components: {userTenders,loading,Empty,SlideHeader,payPwd},
    mounted:function(){
        /*加载订单列表*/
      this.initList(this.curPage,this.projectName,'');
      var a = ['全部','退款订单','支付成功','购买成功','认购成功']
    },
    methods:{
      //撤单获取手机验证码 sendType 6是认购申购 7是撤单
      getCode(){
        getLoginVerifyCodeToBuy(7).then(res=>{
          console.log(res);
          if(res.code=="000"){
              returnOrderTimer($("#getCode"));
          }
        })
      },
      refreshCod(){

      },
      //验证短信验证码
      verifyCode(){
        loginVerifiedCodeToBuy(this.code,7).then(res=>{
          if(res.code=="000"){
          }else{
            Toast(res.msg);
          }
          this.isVerifyCode = true;
          this.closeLoading();
        })
      },
      //获取输入的六位支付密码
      payData(str){
        // console.log(arr);
        // if(arr.length==6){
        //   var pwd = ''
        //   for(var i = 0;i<arr.length;i++){
        //     pwd+=arr[i];
        //   }
          this.paypwd = str;

        //}

      },
      //撤单弹框
      returnOrder(proCode,tenderId){
        window.scrollTo(0,0);
        document.documentElement.style.overflow='hidden';
        this.proCode = proCode;
        this.tenderId = tenderId;
        this.isShowPopupConfirm = true;
        
      },
      //取消撤单
      cancel(){
        this.isShowPopupConfirm = false;
        this.code="";
        this.paypwd='';
        refreshOrderTimer($("#getCode"));
        this.closeLoading();
      },
      //确定撤单
      confirmCancel(){
        this.openLoading();
        if(this.isVerifyCode){
            returnOrder(Encrypt(this.paypwd),this.proCode,this.tenderId).then(res=>{
                    if(res.code=="000"){
                      Toast("撤单成功");
                      this.initList(1,'','');
                      this.code="";
                      this.paypwd='';
                      this.closeLoading();
                      this.isShowPopupConfirm = false;
                      refreshOrderTimer($("#getCode"));
                    }else{
                      this.closeLoading();
                      Toast(res.msg);
                      //refreshOrderTimer($("#getCode"));
                      // this.codeError = true;
                      // this.code="";
                      // this.paypwd=[];
                    }
                    
            })
        }else{
          this.verifyCode();
        }
        // loginVerifiedCodeToBuy(this.code,7).then(res=>{
        //   if(res.code=="000"){
        //       this.codeError = false;
        //       returnOrder(Encrypt(this.paypwd),this.proCode,this.tenderId).then(res=>{
        //         if(res.code=="000"){
        //           Toast("撤单成功");
        //           this.initList(1,'','');
        //           this.code="";
        //           this.paypwd=[];
        //           this.isShowPopupConfirm = false;
        //           this.closeLoading();
        //         }else{
        //           Toast(res.msg);
        //           this.closeLoading();
        //           refreshOrderTimer($("#getCode"));
        //           this.codeError = true;
        //           this.code="";
        //           this.paypwd=[];
        //         }
                
        //     })
        //   }else{
        //     Toast(res.msg);
        //     this.closeLoading();
        //     refreshOrderTimer($("#getCode"));
        //     this.codeError = true;
        //     this.code="";
        //     this.paypwd=[];
        //   }

        // })
      },
      changeTabs(index) {
        /*切换tab的回调*/
        if(index>0){
          this.projectState = index-1;
        }else{
          this.projectState = "";
        }
        this.curPage = 1;//切换tab后，从第一页开始查询本此状态数据
        this.initList(1,'',this.projectState);
      },
      search(){
        //进入搜索页面
        this.$router.push('/searchOrder');
      },
      initList(curPage,projectName,projectState){
        getMyAppTenderList(curPage,projectName,projectState).then(res => {
          console.log(res)
          if(res.code=="000"){
            if(res.userTenders.length>0){
                this.userTenders = res.userTenders;
                this.totalGetCount = res.pageCount;
                this.isEmpty = false;
                this.$nextTick(() => {
                  if(parseInt($(".item_list_wrapper").css('height'))<$(window).height()){
                    this.allLoaded = true;
                  }else{
                    this.allLoaded = false;
                  }
                });
            }else{
                this.isEmpty = true;
            }
          }else if(res.code=="001"){
            this.isEmpty = true;
          }else{
            Toast('获取数据异常');
          }
        });
      },
      loadBottom(){//请求后台
        this.allLoaded = false;
        //传入记录类型 和 要请求的页码
        this.curPage +=1;
        getMyAppTenderList(this.curPage,this.projectName,this.projectState).then(res => {
              if(res.userTenders.length == 0){
                 $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
                  this.allLoaded = true;
                  this.loadFlag = true;
              }else{
                this.userTenders = this.userTenders.concat(res.userTenders);
                this.$refs.loadmore.onBottomLoaded();
              }
        });
      },
      handleBottomChange(status) {
          this.bottomStatus = status;
      }
    },
    filters:{},
  };

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  @import 'src/style/iconfont';

  #orderlist_wrapper{
    .searchArea{
        background:#ddd;
        padding:0.3rem 0.5rem;
        input{width:100%;font-size: 0.7rem;padding: 0.1rem;padding-left:0.7rem;color:#666;border-radius: 15px;outline:none;text-align:center}
        .clearInput{position: absolute;right: 2.5rem;top: 0.4rem;}
        .icon-search::before{
          color: #888;
          font-size: 0.8rem;
          position: relative;
          top: 0.12rem;
          left: 0.3rem;
        }
      }
    #item_list_wrapper{
      .item_list{
        .item_title_container{
          @include wh(100%,2.15rem);
          padding:0 0.75rem;
          @include border-1px($bc);
          .item_title{
            line-height: 2.15rem;
            font-weight: 600;
            margin-right: 0.85rem;
            font-size:0.65rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 80%;
            display: inline-block;
          }
          .status{
            font-size: 0.55rem;
            color: $main;
            float: right;
            line-height: 2.15rem;
          }

        }
        .item_info{
          font-size: 0.55rem;
          height:2.9rem;
          padding:0.5rem 0.75rem 0;
          @include border-1px($bc);
          .item_left{
            display: inline-block;
            position: relative;
            width:6.95rem;
            &:after{
              content: '';
              position: absolute;
              width:1px;
              height:1.67rem;
              right: 0;
              top:0.15rem;
              background: #ddd;
            }
            .min_price{
              color: #ff8e1d;
              font-size: 0.9rem;
              line-height: 1rem;
            }
            .min_price_tip{
              font-size: 0.55rem;
              line-height: 0.9rem;
              color: #999;
            }
          }
          .item_right{
            display: inline-block;
            padding-left: 0.4rem;
            .target_title{
              font-size: 0.65rem;
              line-height: 1rem;
              span{
                color: #999;
              }
              .item_stage{
                position: relative;
                color: #333;
                padding-left: 0.3rem;

              }
            }
            .account_done{
              font-size: 0.55rem;
              line-height: 1rem;
              color: #999;
              .progress_level{
                position: relative;
                color: #999;
                padding-left: 1rem;
                &:after{
                  content: '';
                  position: absolute;
                  left: 0.5rem;
                  top:0.1rem;
                  width:1px;
                  height: 0.55rem;
                  background: #ddd;
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
            @include wh(3.5rem,1.5rem);
            color: $main;
            border: 1px solid $main;
            text-align: center;
            line-height: 1.5rem;
            font-size: 0.6rem;
            border-radius: 5px;
            float: right;
          }
        }
        .split{
          @include wh(100%,0.5rem);
          background: #f4f3f1;
        }
      }
    }
    .emptyBg{
      font-size: 0;
      padding: 5rem 0.75rem 0;
      text-align: center;
      img{
        width:40%;
      }
      span{
        display: block;
        padding-top: 1.6rem;
        font-size: 0.75rem;
        color: #ccc;
      }
    }
  }
.form-group{
  margin:1rem;
  input {
      border-radius: 0;
      outline: none!important;
      width: 4rem;
      height: 100%;
      width: 60%;
      display: inline-block;
      border-bottom: 1px solid #ddd;
  }
}
//密码输入框
.pwdInput{
  margin:1rem;
  input{
    margin-right: 0.3rem!important;
  }
}
.popup{
    position:absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 105%;
    background: rgba(0,0,0,0.5);
    z-index: 3;
       
}
.p_contant{
      background-color: #fff;
      width: 93%;
      border-radius: 3px;
      font-size: 16px;
      margin:auto;
      margin-top: 4rem;
      padding-top: 1rem;
}
.p_title{
  text-align: center;
  margin:1rem;
  font-size: 0.65rem;
}
.p_txt{
      font-size: 0.6rem;
        color: #666;
        margin:1rem 0;
}
.p_btn{
        border-top: 1px solid #ddd;
        height: 2rem;
        line-height: 2rem;
        button{
          outline: none;
          width: 46%;
          background: none;
          height: 100%;
          color: #0076FF;
          font-size: 0.6rem;
        }
       
}
.cancel{
   border-right: 1px solid #ddd;
}
.confirm{

}
</style>
