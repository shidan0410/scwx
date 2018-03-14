<template>
  <div class="identify_wrapper">
    <div class="input_wrapper">
      <div class="form_group">
        <span><img src="../../assets/ic_name.png"></span>
        <input type="text" placeholder="请输入您的姓名" v-model="realName">
      </div>
      <div class="form_group">
        <span><img src="../../assets/ic_id_card.png" alt=""></span>
        <input type="text" placeholder="请输入您的身份证号码" v-model="idCard">
      </div>
    </div>
    <!--选择条件-->
    <div class="choose_box">
      <div class="tip">
        <span>选择符合您条件的信息</span>
      </div>
      <dl>
        <dd @click="chooseFn($event)" data-attr="1">我的金额资产超过100万元</dd>
        <dd @click="chooseFn($event)" data-attr="2">我的年收入超过30万元</dd>
        <dd @click="chooseFn($event)" data-attr="3">我是专业的风险投资人</dd>
        <dd @click="chooseFn($event)" data-attr="4">不符合上述任何一个条件(只可浏览项目,不可投资)</dd>
      </dl>
    </div>

    <!--协议-->
    <div class="agreement">
      <label class="" >
        <input type="checkbox" :checked="isAgree" >
        我已阅读<a href="javascript:;" @click="slideToggle()">《相关协议》</a>且理解上述内容，并承担相关风险
      </label>
      <!--<router-link :to="{path:'/riskInfo'}">《风险揭示书》</router-link>和<router-link :to="{path:'/userProtocol'}">《用户服务协议》</router-link>-->
    </div>

    <div class="submit">
      <button :class="{btns_submit:state}" @click="adminInfo();">认证并测评</button>
    </div>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
      cancelText=""
    >
    </mt-actionsheet>

  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {realNameAuthenty} from '@/service/getData'
  import {setStore} from '@/config/utils'
  import { Toast, MessageBox, Actionsheet } from 'mint-ui';
  export default {
    data() {
      return {
          state:false,
          idCard:'',
          realName:'',
          productId:'',
          arr:'',//投资选择
          UserStateInfos:'',
          isAgree:true,
          actions:[
            {name:'相关协议'},
            {method:this.routerFn1,name:'业务管理规则'},
            {method:this.routerFn2,name:'投资人规则'},
            {method:this.routerFn3,name:'授权协议'},
            {method:this.routerFn4,name:'合格投资人声明承诺'},
            {method:this.routerFn5,name:'风险揭示书'},
          ],
          sheetVisible:false
      };
    },
    async beforeMount(){
      this.idCard = this.$route.query.idCard;
      this.realName = this.$route.query.realName;
      this.productId = this.$route.query.productId;
    },
    mounted() {
      this.UserStateInfos = JSON.parse(window.localStorage.getItem('UserStateInfos'));
    },
    methods: {
      routerFn1() {
        this.$router.push({path:'/module',query:{title:'业务管理规则'}})
      },
      routerFn2() {
        this.$router.push({path:'/investor',query:{title:'投资人规则'}})
      },
      routerFn3() {
        this.$router.push({path:'/licenseAgreement',query:{title:'授权协议'}})
      },
      routerFn4() {
        this.$router.push({path:'/investorAgreement',query:{title:'合格投资人声明承诺'}})
      },
      routerFn5() {
        this.$router.push({path:'/riskInfo',query:{title:'风险揭示书'}})
      },
      slideToggle() {
        this.sheetVisible = !this.sheetVisible;
      },
      adminInfo() {
        var _self = this;
        if(this.state){//button高亮时提交信息
//          $('.active').each(function (i,item) {
//            var dataNum = $(item).attr('data-attr');
//            _self.arr.push(dataNum)
              _self.arr = $('dd.active').attr('data-attr');
//          })
//          console.log(this.arr)
          realNameAuthenty(this.idCard,this.arr,this.realName).then(res=>{
            if(res.code=="000"){
              if(this.UserStateInfos.riskFlag=="1"){
                //风险测评过，进入个人中心或详情
                if(this.productId){
                  //进详情,待开发
                }else{
                  //进个人中心
                  this.$router.push({path:'/usercenter',query:{title:'我的'}});
                }
              }else{
                //去风险测评
                this.$router.push({path:'/risk',query:{title:'风险测评'}});
              }
            }else{
              Toast(res.msg);
            }
          });

        }
      },
      chooseFn(event) {
        if($(event.target).attr('data-attr') == 4){
          MessageBox({
            message: '很抱歉，您暂时不符合本平台的合格投资者条件。',
            showCancelButton: true
          });
        }
        $('dd').removeClass('active');
        $(event.target).toggleClass('active');
        var isHeight = $('dd').hasClass('active');
        if(isHeight){
          this.state = true;
        }else{
          this.state = false;
        }
      }
    },
    components: {MessageBox,Actionsheet}
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  .identify_wrapper{
    .input_wrapper{
      padding: 0.7rem 0.7rem;
      .form_group{
        padding: .4rem 0;
        @include border-1px(#e6e6e6);
        margin-bottom: 0.2rem;
        span{
          display: inline-block;
          vertical-align: top;
          width:1rem;
          position: relative;
          top: .15rem;
          img{
            width:100%;
          }
        }
        input{
          display: inline-block;
          background: transparent;
          font-size: .7rem;
          color: #333;
          outline: none;
        }
      }
    }
    .choose_box{
      font-size: 0;
      /*margin: 0.7rem 0 0;*/
      padding: 0.7rem 0.7rem 0;
      .tip{
        text-align: center;
        span{
          font-size: 0.65rem;
          color: #282E37;
        }
        .icon-mark{
          position: relative;
          top:.1rem;
          left: -0.2rem;
          &::before{
            font-size: .8rem;
            color: $main;
          }
        }
      }
      dl{
        font-size: .6rem;
        text-align: center;
        line-height: 2rem;
        dd{
          margin-top: 0.5rem;
          border: 1px solid #AABECA;
          color: #778892;
          &.active{
            color:#647076;
            background-color: #E9F1F6;
            border: 1px solid #AABECA;
          }
        }
      }
    }
    .agreement{
      padding: 0.7rem 0.7rem;
      color: #999;
      font-size: .5rem;
      text-align: center;
      margin: .3rem 0 0.75rem;
      a{
        color: $main;
        font-size: .5rem;
      }
      label{
          /*a{*/
            /*color: #ff8e1d;*/
          /*}*/
        }
      input[type=checkbox] {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        width: 10px;
        height: 1px;
        outline: none;
        margin-right: .3rem;
        margin-bottom: .8rem;
      }
      input[type=checkbox]::before{
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        width: .6rem;
        height: .6rem;
        line-height:.6rem;
        text-align: center;
        color:white;
        font-size:16px;
        background-color:#fff;
        border: 1px solid #FF8E1D;
        border-radius: 4px;
      }
      input[type=checkbox]:checked::before {
        color:white;
        background-color:#FF8E1D;
        content: '√';
      }



    }
    .submit{
      /*padding:0 .75rem;*/
      position: absolute;
      bottom:0;
      left:0;
      @include wh(100%,2.15rem);
      button{
        @include wh(100%,100%);
        font-size: .75rem;
        color: #999999;
      }
      .btns_submit{
        background: $main;
        color:#fff;
      }
    }
  }
</style>
