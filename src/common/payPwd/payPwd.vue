<template>
  <div class="box">
    <div class="passbox">
      <input type="tel" id="ipt" maxlength="6" @keyup="submit()"/>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!--<button @click="aaa()">按钮</button>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      };
    },
    mounted() {
      var ipt = document.querySelector("#ipt");
      var span = document.querySelectorAll(".passbox span");
      document.querySelector(".passbox").onclick = function(){
        ipt.focus();
      };
      ipt.focus();
      var num = new RegExp(/[0-9.]/);
      ipt.oninput = function(){
        var valth = this.value.length;
        for(var k=0;k<span.length;k++){
          span[k].innerText = '';
        }
        for(var i=0;i<valth;i++){
          if(!num.test(ipt.value[i])){
            ipt.value = ipt.value.substr(0,i);
            return false;
          }
          span[i].innerText =  '*';
        }
      }

    },
    methods: {
      submit() {
        var ipt = document.querySelector("#ipt");
        this.$emit("payData",ipt.value);
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  #ipt{
    opacity: 0;
    border: none;
    box-sizing: border-box;
  }
  #ipt:focus{
    outline: none;
  }
  .passbox{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 0 auto;
    border: #c3c3c3 1px solid;
    background: #FFF;
    cursor: pointer;
  }
  .passbox input{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -100;
    left: 0;
    top: 0;
  }
  .passbox span{
    padding: 0;
    width: 16.66%;
    height: 100%;
    float: left;
    background: #ffffff;
    text-align: center;
    font-size: 20px;
    border-right: #C3C3C3 1px solid;
    display: inline-block;
    box-sizing: border-box;
    line-height: 50px;
    margin:0;
  }
  .passbox span:last-child{
    border: none;
  }

  .input {
    display: flex;
    input {
      flex: 0 0 1.75rem;
      -webkit-flex:0 0 1.75rem;
      border: 1px solid #E3E3E3;
      -webkit-appearance: none;
      width: 1.75rem;
      height: 1.75rem;
      outline:none;
      font-family: inherit;
      font-size: 28px;
      font-weight: inherit;
      text-align: center;
      line-height: 2.1rem;
      color: #c2c2c2;
      margin-right: 0.5rem;
      background: rgba(255,255,255,0);
    }
    /*&:last-child {*/
    /*border-right: 1px solid #E3E3E3;*/
    /*}*/
  }
</style>
