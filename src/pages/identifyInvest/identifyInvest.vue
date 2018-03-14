<template>
  <div id="identifyInvest_wrapper">
    <div class="users">
      <!--头像-->
      <div class="mu-avatar">
        <div class="mu-avatar-inner">
          <img :src="userInfo.userIconFileId" v-if="userInfo.userIconFileId">
        </div>
      </div>

      <div class="u_infos">
        <div class="u_iphone">
         {{userInfo.userName?userInfo.userName:userInfo.mobileFull}}
        </div>
        <span class="u_isVerify">
          用真正的创新定义财富
        </span>
      </div>
    </div>

    <!--没有认证合格投资人-->
    <div class="content" v-if="UserStateInfos.investorFlag == 0">
      <p>完成合格投资人认证，才有权查看所有股权类产品的全部信息及有权认购该产品，认证合格投资人即代表默认知晓股权投资所带来的高风险。表示能承担高风险所带来的经济损失。</p>
      <router-link :to="{ path:'/identifyInvestForm',query:{title:'认证合格投资人'}}"><button class="btn_default">去认证</button></router-link>
    </div>

    <!--已完成合格投资人认证-->
    <div class="content" v-else>
      <div class="containers">
        <img src="../../assets/pay_result_ok.png" alt="">
        <h3>合格投资人</h3>
        <h4>有风险识别能力和风险承担能力的投资人</h4>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        UserStateInfos:'',
        userInfo:''
      };
    },
    mounted() {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.UserStateInfos = JSON.parse(window.localStorage.getItem('UserStateInfos'));
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  #identifyInvest_wrapper{
    padding: 0 0.75rem;
    .users{
      padding: 0.5rem 0;
      @include border-1px(#E3E3E3);
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
          font-size: 0.7rem;
          color: #282E37;
          padding: 0.3rem 0 0 0.25rem;
        }
        .u_isVerify{
          padding: 0.1rem 0.25rem;
          color: #999;
          font-size: 0.5rem;
        }
      }
    }
    .content{
      padding-top: 1.3rem;
      p{
        font-size: 0.65rem;
        line-height: 0.8rem;
        color: #282E37;
        padding-bottom: 2.55rem;
      }
      a{
        text-align: center;
        display: block;
        button{
          width:13rem;
        }
      }
      .containers{
        text-align: center;
        img{
          width:5.5rem;
        }
        h3{
          font-size: 0.7rem;
          line-height: 0.95rem;
          color: #282E37;
          padding: 0.8rem  0 0.7rem;
        }
        h4{
          font-size: 0.55rem;
          line-height: 0.9rem;
          color: #999999;
        }
      }


    }

  }
</style>
