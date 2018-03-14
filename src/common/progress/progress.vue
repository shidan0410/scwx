<template>
  <div id="progress_wrapper">
    <span class="txt rg" :style="[value >= 100 ? {left:'89%'} :  {left:''+ value +'%'}]">{{ value }}%</span>
    <mtProgress :value="value >= 100 ? '100' : value" :bar-height="3"></mtProgress>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Progress } from 'mint-ui';

  export default {
    data() {
      return {};
    },
    props:{
      value:''
    },
    mounted() {
    },
    methods: {},
    components: {
      mtProgress:Progress
    }
  }
</script>

<style lang="scss">
  #progress_wrapper{
    position: relative;
    margin: 0.3rem 0;
    .txt{
      position: absolute;
      z-index: 10;
      left:0;
      top:0.27rem;
      font-size: 0.45rem;
      padding: 0.1rem 0.2rem;
      text-align: center;
      color: #fff;
      margin-left: 0;
      border-radius: 100px;
    }
    .mt-progress-progress{
      background-color: #FF8E1D;
    }
  }
</style>
