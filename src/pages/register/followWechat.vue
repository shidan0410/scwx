<template>
  <div class="follow">
   <p class="logo"><img src="../../assets/logo.png"></p>
   <p class='slogen'>用真正的创新定义财富</p>
   <img style="width:7rem" src="../../assets/wechatImg.png" />
   <p class='tip'>长按二维码关注公众号</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
.follow{
	padding: 3rem 2rem;
    text-align: center;
    background:url('../../assets/wechatbg.png');
    background-size:100%;
    width: 100%;
    height: 100%;
    .logo{
    	img{width:7rem;}
    }
    .slogen{
    	font-size: 0.7rem;
	    width: 100%;
	    margin: 1rem 0 4rem 0;
	    color:#666;
    }
    .tip{
    	font-size: 0.7rem;
	    width: 100%;
	    color:#666;
    }
}

</style>
