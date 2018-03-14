<template>
  <div class="dowloadapp" style="display:block" v-show="isShow">
    <img src="../assets/40.png"/>
    <div class="slogen">
      <p>壹盐双创<span class="ios-icon"></span><span class="android-icon"></span></p>
      <p>用真正的创新定义财富</p>
    </div>
    <button class="dowloadBtn" @click="dowloadapp()">立即下载</button>
    <span class="clearTip" @click="close()">×</span>
  </div>
  

</template>
<script>
  import {formatUtils} from '@/config/mixin'
  import {getCookie} from '@/config/utils'
  export default {
    data() {
      return {
        isShow:true
      };

    },
    mixins:[formatUtils],
    mounted() {
      if(getCookie('hide')){
        this.isShow = false;
      }else{
        this.isShow = true
      }
    },
    methods:{
      close(){
        this.isShow = false;
        this.closeTip();
      }
    }
 
  }
</script>

<style lang="scss">

  .dowloadapp{
    position: absolute;
    top: 0px;
    z-index: 222222;
    min-height: 1rem;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding:10px 20px;
    position:position;
    img{width:1.7rem;float:left}
  }
  .slogen{
    float:left;
    position:relative;
    margin-left: 0.5rem;
    p{font-size: 0.6rem;padding: 0.1rem;line-height:0.7rem}
  }
  .dowloadBtn{    float: right;
    padding: 0.3rem 0.7rem;
    border-radius: 0.3rem;
    background: #ff8e1d;
    color: #fff;
    margin-top: 0.2rem;
    margin-right: 1rem;}
    .clearTip{position: absolute;
    right: 15px;
    top: 18px;}
    .ios-icon{background:url('../assets/iosicon.png');position: absolute;height: 20px;width: 17px;top: 0px;background-size: 17px;right:40px;}
    .android-icon{background:url('../assets/androidicon.png');position: absolute;height: 20px;width: 17px;top: 0px;background-size: 17px;right:70px;}
</style>
