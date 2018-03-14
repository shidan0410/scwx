<template>
  <div id="user_wrapper">
    <!--头部信息-->
    <div class="user_header_wrapper">
      <router-link :to="{ path:'/userlist',query:{title:'个人信息'}}">
      <!--头像-->
      <div class="mu-avatar">
        <div class="mu-avatar-inner">
          <img :src="userInfo.userIconFileId"  v-if="userInfo.userIconFileId">
        </div>
      </div>
      <div class="u_infos">
        <div class="u_iphone">{{ userInfo.mobile}}</div>
        <span class="u_isVerify">{{ UserStateInfos.authFlag == 1 ? '已实名' : '未实名' }}</span>
      </div>
      <span class="icons"></span>
      </router-link>
    </div>

    <div class="content">
      <!--绑卡签约测评状态-->
      <ul class="state_wrapper">
        <router-link :to="{ path:'/orderlist',query:{title:'订单中心'}}">
          <li>
            <span class="icon-bind icon"></span>
            <span class="state_words">订单中心</span>
          </li>
        </router-link>
        <router-link :to="{ path:'/record',query:{title:'交易记录'}}">
          <li>
            <span class="icon-sign icon"></span>
            <span class="state_words">交易记录</span>
          </li>
        </router-link>
        <a href="javascript:;" @click="goPages(1)">
          <li>
            <span class="icon-bank icon"></span>
            <span class="state_words">银行卡管理</span>
          </li>
        </a>
      </ul>
      <!--列表-->
      <ul class="user_list_item">
          <li class="border_1px" @click="goPages(2)">
            <span><img src="../../assets/user/1@2x.png"/></span>
            <span class="item_title">风险测评</span>
            <span class="icon-arrow"></span>
          </li>

          <li @click="goView('/identifyInvest','认证合格投资人')">
            <span><img src="../../assets/user/2@2x.png"/></span>
            <span class="item_title">合格投资人认证 <i>{{ UserStateInfos.investorFlag == 1 ? '已完成合格投资人' : '未完成合格投资人' }}</i></span>
            <span class="icon-arrow"></span>
          </li>

          <li class="border_1px" @click="goView('/project','我的项目')" v-show="UserStateInfos.myProjectFalg == 1">
            <span><img src="../../assets/user/3@2x.png"/></span>
            <span class="item_title">我的项目</span>
            <span class="icon-arrow"></span>
          </li>
      </ul>

      <ul class="user_list_item">
          <li class="border_1px" @click="goView('/message','消息中心')">
            <span><img src="../../assets/user/4@2x.png"/></span>
            <span class="item_title">消息中心</span>
            <span class="icon-arrow"></span>
          </li>

          <li class="border_1px" @click="goView('/invite','我的邀请')">
            <span><img src="../../assets/user/5@2x.png"/></span>
            <span class="item_title">我的邀请</span>
            <span class="icon-arrow"></span>
          </li>

          <li @click="goView('/backMessage','意见反馈')">
            <span><img src="../../assets/user/6@2x.png"/></span>
            <span class="item_title">意见反馈</span>
            <span class="icon-arrow"></span>
          </li>
      </ul>

      <ul class="user_list_item">
        <li style="text-align: center" @click="loginOutFn();">
          <span class="item_title">退出</span>
        </li>
      </ul>

      <div class="services">
        <span>客服电话：</span>
       <!--  <a href="tel:15238339534">12345678910</a> -->
        <span class="tel"><a href="tel:4001021400" style="color:#ff8e1d">4001-021-400</a></span>
      </div>

    </div>
    <!--底部导航-->
    <foot-guide></foot-guide>

    </div>

</template>

<script type="text/ecmascript-6">
  import footGuide from '@/common/footer/footer'
  import {formatUtils} from '@/config/mixin'
  import {signOut,getUserState,queryPersonalInfo} from '@/service/getData'
  import { Toast} from 'mint-ui';
  import {getStore} from '@/config/utils'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        UserStateInfos:{},/*用户状态*/
        userInfo:{}
      };
    },
    components: {footGuide, Toast},
    mixins: [formatUtils],
    beforeMount() {
      getUserState().then(res =>{/*初始化获取用户状态*/
        if(res.code == ERR_OK){
          this.UserStateInfos = res;
          window.localStorage.setItem('UserStateInfos',JSON.stringify(res));
        }
      })
      //获取用户基本信息
      queryPersonalInfo().then(res =>{
        //记录用户信息
        if(res.code == ERR_OK){
          this.userInfo = res.user;
          window.localStorage.setItem('userInfo',JSON.stringify(res.user));
        }
      })
    },
    mounted() {
      // this._init();
    },
    computed: {

    },
    methods: {
      goView(url,title) {
        this.$router.push({path:url,query:{title:title}});
      },
      goPages(type){
//        console.log(this.UserStateInfos);
        if(this.UserStateInfos.investorFlag == '0'){  /*未完成合格投资人认证*/
          this.$router.push({path:'/identifyInvest',query:{title:'认证合格投资人'}});
        }else if(this.UserStateInfos.riskFlag == '0'){  /*未完成风险测评*/
          this.$router.push({path:'/risk',query:{title:'风险测评'}});
        }else if(type == 2){/*风险测评*/
          this.$router.push({path:'/riskTip',query:{title:'风险测评'}});
        }else if(type == 1 && this.UserStateInfos.tipCardFlag == '1'){/*已绑卡*/
          this.$router.push({path:'/bank',query:{title:'银行卡管理'}});
        }else {
          this.$router.push({path:'/bindCard',query:{title:'银行卡管理'}})
        }
      },
      loginOutFn() {
        /*退出*/
        signOut().then(res =>{
          if(res.code == ERR_OK){
            this.$router.push('/index');
            localStorage.user = '';
            localStorage.pwd = '';
            localStorage.loginFlag = false;
          }
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  @import 'src/style/iconfont';

  #user_wrapper{
    position: relative;
    width:100%;
    min-height: 100%;
    height:30rem;
    background: #f4f3f1;
    .user_header_wrapper{
      padding: 0.95rem 0.85rem;
      position: relative;
      z-index: 2;
      background: #ADC5D2;
      .icons{
        content: '';
        position: absolute;
        top: 1.65rem;
        right: .75rem;
        width: 1.3rem;
        height: 1rem;
        background: url("../../assets/arrow-fff.png") no-repeat center;
        background-size: 100%;
        color: #fff;
        font-size: 0.55rem;
        line-height: 1.4rem;
      }
      .mu-avatar {
        display: inline-block;
        height: 2.2rem;
        width: 2.2rem;
        color: #fff;
        background-color: #bdbdbd;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #FFFFFF;
        .mu-avatar-inner{
          display: flex;
          width: 100%;
          -webkit-box-align: center;
          align-items: center;
          height: 100%;
          -webkit-box-pack: center;
          justify-content: center;
          img{
            border-radius: 50%;
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .u_infos{
        display: inline-block;
        vertical-align: top;
        .u_iphone{
          color: #fff;
          padding: 0.3rem 0 0 0.25rem;
          font-size: 0.7rem;
        }
        .u_isVerify{
          padding: 0.1rem 0.5rem;
          margin-left: 0.25rem;
          background-color: #fff;
          border-radius: 25px;
          color: #91A5B1;
          font-size: 0.5rem;
        }
      }

    }
    .content{
      .state_wrapper{
        font-size: 0;
        background: #fff;
        li{
          display: inline-block;
          width:33.3333%;
          text-align: center;
          .icon-bind,.icon-sign,.icon-right{
            &::before{
              color: #c7c7c7;
              font-size: .8rem;
            }
          }
          .icon{
            display: block;
            margin: 0.9rem 0.2rem 0.3rem 1.8rem;
            width:1.75rem;
          }
          .state_words{
            font-size: 0.6rem;
            color: #535A5E;
            padding-left: 0.25rem;
            display: block;
            margin-bottom: 0.8rem;
          }
        }
      }
      .user_list_item{
        margin-top: 0.5rem;
        background: #fff;
        -webkit-border-radius:10px;
        -moz-border-radius:10px;
        border-radius:10px;
        font-size: 0;
        li{
          height:2.2rem;
          padding:0.75rem 0.55rem 0 0.55rem;
          i{
            font-size: .5rem;
            color: #C7C7CD;
          }
          &.border_1px{
            @include border-1px(#d7d7d7);
            &::after{
              width:86%;
              left:2.1rem;
              border-color: #E3E3E3;
            }
          }
          span{
            display: inline-block;
            img{
              width:56%;
            }
          }
          .item_title{
            font-size: 0.7rem;
            color: #555;
            vertical-align: top;
          }
          .icon-arrow{
            float: right;
            top:-0.1rem;
            /*-webkit-transform: rotate(180deg);*/
            &::before{
              font-size: .8rem;
            }
          }
        }
      }
      .services{
        padding-top: 0.9rem;
        text-align: center;
        span{
          font-size: 0.6rem;
          color: #666666;
        }
        .tel{
          color: $main;
        }
      }
    }
  }


</style>
