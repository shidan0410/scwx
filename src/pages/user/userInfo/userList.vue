<template>
  <div class="user_info_wrapper">
    <div class="content">

     <div class="uploadWrapper" @click="uploadImg();">
       <div class="mu-avatar">
        <div class="mu-avatar-inner">
          <img :src="uploadImgUrl" v-if="uploadImgUrl">
          <img src="" v-else>
        </div>
      </div>
       <span class="icon-arrow"></span>
     </div>

      <ul>
        <li class="boder_items" @click="geToPath('/editTel','修改手机号')">
          <span class="title">手机号</span>
          <span class="icon-arrow"></span>
          <span class="edit_title">{{userInfo.mobile ? userInfo.mobile : '修改'}}</span>
        </li>
        <li class="boder_items" @click="geToPath('/bindEmail','绑定邮箱')">
          <span class="title">邮箱</span>
          <span class="icon-arrow"></span>
          <span class="edit_title">{{userInfo.email ? userInfo.email : '未绑定'}}</span>
        </li>
      </ul>

      <ul>
          <li class="boder_items" @click="geToPath('/editLoginPassword','修改登录密码')">
            <span class="title">登录密码</span>
            <span class="icon-arrow"></span>
            <span class="edit_title">{{userInfo.userPwd ? '修改' : ''}}</span>
          </li>
        <li class="boder_items" @click="geToPages()">
          <span class="title">支付密码</span>
          <span class="icon-arrow"></span>
          <span class="edit_title">{{userInfo.userPayPwd ? '修改' : ''}}</span>
        </li>
      </ul>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'
  import {getStore,chooseImage} from '@/config/utils'
  import { Toast } from 'mint-ui';
  import wx from 'weixin-js-sdk'

  const  ERR_OK = '000';

  export default {
    data() {
      return {
        userInfo:{},
        uploadImgUrl:'',
        UserStateInfos:{},/*用户状态*/
      };
    },
    mixins: [formatUtils],
    computed: {},
    mounted() {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.uploadImgUrl = this.userInfo.userIconFileId;
      this.UserStateInfos = JSON.parse(window.localStorage.getItem('UserStateInfos'));
    },
    methods: {
      geToPages() {
        if(this.UserStateInfos.investorFlag == '0'){  /*未完成合格投资人认证*/
          this.$router.push({path:'/identifyInvest',query:{title:'认证合格投资人'}});
        }else if(this.UserStateInfos.riskFlag == '0'){  /*未完成风险测评*/
          this.$router.push({path:'/risk',query:{title:'风险测评'}});
        }else if(this.UserStateInfos.tipCardFlag == '0'){/*未绑卡*/
          this.$router.push({path:'/bindCard',query:{title:'银行卡管理'}})
        }else{
          this.$router.push({path:'/editPayPassword',query:{title:'修改支付密码'}});
        }
      },
      uploadImg() {
        /*选择图片上传*/
        var _self = this;
        chooseImage(function (res) {
          if(res.code == '000'){
            _self.uploadImgUrl = res.path;
          }
        });
      },
      geToPath(url,title) {
        this.$router.push({path:url,query:{title:title}})
      }
    },
    components: {
      Toast
    }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

.user_info_wrapper{
  .content{
    .uploadWrapper{
      width:100%;
      .icon-arrow{
        float: right;
        right: 0.6rem;
        top: 1.35rem;
      }
      .mu-avatar {
        margin: .7rem 0.75rem;
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
    }

    ul{
      position: relative;
      padding-top: 0.5rem;
      font-size: 0;
      &::before{
        content: '';
        width:100%;
        height:0.5rem;
        background: #f4f3f1;
        position: absolute;
        top:0;
        left:0;
      }
      li{
        padding:0 0.65rem 0 0.8rem;
        height:2.2rem;
        line-height: 2.2rem;
        &.boder_items{
          @include border-1px(#d7d7d7);
          &::after{
            left:0.8rem;
            bottom:0;
            width:95%;
          }
        }
        .icon-arrow{
          float: right;
          position: relative;
          top: 0.63rem;
          &::before{
            font-size: 0.7rem;
            color: #adadad;
          }
        }
        .title{
          font-size: 0.7rem;
          color: #666;
          font-weight: 600;
        }
        .usersInfo{
          font-size: 0.6rem;
          color: #999;
          padding-left: 0.75rem;
        }
        .verified{
          float: right;
          color: $main;
          font-size: 0.6rem;
          padding-right: 0.2rem;
        }
        .edit_title{
          float: right;
          font-size: 0.6rem;
          color:#333;
          padding-right: 0.2rem;
        }
      }
    }
  }
}
</style>
