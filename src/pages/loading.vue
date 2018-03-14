<template>
  <span class="loading_con" :style="styleObject">
     <img src="../assets/rotate.png" alt="" >
     <img src="../assets/rotate_icon.png" alt="">
  </span>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props:{
          styleObject:{}
        },
        mounted() {
        },
        methods: {},
        components: {}
    }
</script>

<style lang="scss">
  .loading_con{
    position: relative;
    img{
      width:1.5rem;
      position: absolute;
      &:nth-child(1){
        z-index: 3;
        -webkit-animation: rotate 1s infinite linear;
      }
      &:nth-child(2){
        z-index: 2;
      }
      &:nth-child(3){
        z-index: 1;
      }
    }
  }
  @keyframes rotate{
    0%{
      -webkit-transform: rotate(0);
    }
    100%{
      -webkit-transform: rotate(360deg);
    }
  }
</style>



