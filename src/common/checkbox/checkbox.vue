<template>
  <div class="agree-box">
    <label class="" >
    <input type="checkbox" :checked="isAgree"  @change="changeInfo();">
      我已阅读并同意<a :href="productprospectus">《融资计划书》</a>
      <!--<span>sssssssssssss</span>-->
      <!--<div>-->
        <!--<slot name="agree"></slot>-->
      <!--</div>-->
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      };
    },
    props:{
      isAgree:{
        default: true
      },
      productprospectus:''
    },
    mounted() {
    },
    methods: {
      changeInfo() {
        this.$emit('changeInfo')
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  .agree-box{
    label{
      font-size: .55rem;
      a{
        color: #ff8e1d;
      }
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
    div{
      margin-left: .3rem;
      display: inline-block;
      vertical-align: top;
      position: relative;
      top:.1rem;
      font-size: .55rem;
      color: #999999;
      a{
        color: #FF8E1D;
      }
    }
  }

</style>
