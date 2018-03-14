<template>
  <section id='foot_guide'>
    <router-link :to="{path: '/index'}" class="guide_item">
      <span class="icon-main"></span>
      <span>首页</span>
    </router-link>
    <router-link :to="{path:'/list',query:{title:'双创项目'}}" class="guide_item">
      <span class="icon-items"></span>
      <span>双创项目</span>
    </router-link>
    <!--<router-link :to="{path:'/investGuide',query:{title:'投资指南'}}" class="guide_item">-->
      <!--<span class="icon-items"></span>-->
      <!--<span>投资指南</span>-->
    <!--</router-link>-->
    <a class="guide_item" @click="goDetail('/usercenter','我的')" id="items">
      <span class="icon-user"></span>
      <span class="items_active">我的</span>
    </a>
  </section>
</template>

<script>
  import {formatUtils} from '@/config/mixin'
  import $ from 'jquery'

  export default {
    data(){
      return{

      }
    },
    mixins: [formatUtils],
    async beforeMount(){

    },
    mounted(){
      if(this.$route.query.params){
        $('#items').addClass('router-link-active');
      }
    },
    computed: {
//      gotoAddress() {
//        console.log(localStorage.loginFlag==true)
//        if(localStorage.loginFlag==true){
//          return '/usercenter'
//        }else{
//            return '/login'
//        }
//      },
//      gotoTitle() {
//          if(this.gotoAddress == '/usercenter'){
//              return '我的'
//          }else{
//              return '登录'
//          }
//      }
    },
    methods: {
//      gotoAddress(url,title) {
//        if(localStorage.loginFlag=="true"){
//          //return true
//          this.$router.push({path:url,query:{title:title}});
//        }else{
//          this.$router.push({path:'/login',query:{title:'登录'}});
//        }
//      },
//      gotoAddress(path){
//        this.$router.push(path);
//
//      }
    },

  }

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  #foot_guide{
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%,2.45rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
  }
  .guide_item{
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    span:nth-child(1){
      padding-top: 0.4rem;
    }
    .icon_style{
      @include wh(.8rem, .8rem);
      margin-bottom: .2rem;
      margin-top: .3rem;
      fill: #ccc;
    }
    span{
      margin-top: 0.25rem;
      @include sc(.45rem, #999);
    }
  }

  .router-link-active{
    span{
      color: $main;
    }
  }

</style>
