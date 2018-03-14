<template>
  <div id="app">
    <router-view name="dowloadapp"></router-view>
    <router-view name="default"></router-view>
    <keep-alive><router-view name="product"></router-view></keep-alive>
  </div>

</template>

<script>
  import {UnUnicode,genRandomStr} from '@/config/utils'
  import {login} from '@/service/getData'
  import {formatUtils} from '@/config/mixin'

  export default {
    data() {
      return {
        openid:'',
        username:'',
        pwd:'',
        isShow:false,
        showTime:604800000
      };
    },
    mixins: [formatUtils],
    async beforeMount(){
      // /*从地址中获取openid存到本地*/
      // if(this.$route.query.openid){
      //   localStorage.openid = this.$route.query.openid;
      //   /*从公众号菜单进入，先登录*/
      //   var user = localStorage.user;
      //   var pwd = localStorage.pwd;
      //   console.log('用户名'+localStorage.user+","+localStorage.pwd);
      //   //if(user){//登录过
      //   //this.$router.push("/login");
      //   //}else{//去登录
      //   login(user,pwd).then(res=>{
      //     if(res.code=="000"){
      //       this.$router.push('/index');
      //       localStorage.tokenid = res.tokenId||'';
      //       localStorage.user = user;
      //       localStorage.loginFlag = true;
      //       console.log('登录操作成功');
      //     }else{
      //       localStorage.loginFlag = false;
      //       console.log(res.msg);
      //     }
      //   })
      //   //}
      // }
       
       if( this.$route.query.WX ) {//从公众号菜单进入
          if(!localStorage.openid){//如果不存在 说明是第一次进入或者清除了缓存，重新生成
            localStorage.openid = genRandomStr(10);
          }
         console.log("-------------"+localStorage.openid);
         /*从公众号菜单进入，先登录*/
         var user = localStorage.user;
         var pwd = localStorage.pwd;
         console.log('用户名'+localStorage.user+","+localStorage.pwd);
         //if(user){//登录过
         //this.$router.push("/login");
         //}else{//去登录
         login(user,pwd).then(res=>{
           if(res.code=="000"){
             this.$router.push('/index');
             localStorage.tokenid = res.tokenId||'';
             localStorage.user = user;
             localStorage.loginFlag = true;
             console.log('登录操作成功');
           }else{
             localStorage.loginFlag = false;
             console.log(res.msg);
           }
         })
       }
    },
    mounted(){

    },
    methods:{
    },
    beforeUpdate() {
      if(this.$route.query.title){
        document.title = UnUnicode(this.$route.query.title);
      }else{
        document.title = '壹盐双创'
      }
      /*关闭loading层*/
      this.closeLoading();

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
#app {
  width:100%;
  height:100%;
}
</style>
