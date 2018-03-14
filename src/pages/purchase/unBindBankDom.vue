<template>
  <div class="unbind_wrapper">
    <h3>该订单为您保留  <i>30</i> 分钟</h3>
    <router-link class="addCard" :to="{path:'/bindCard?oidTenderId='+oidTenderId,query:{title:'银行卡管理'}}">
      <span>+ 添加银行卡</span>
      <!--<p>添加银行卡</p>-->
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    props:{
      oidTenderId:''
    },
    mounted() {
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss">
  .unbind_wrapper{
    h3{
      text-align: center;
      font-size: .65rem;
      line-height: 1.9rem;
      color: #282E37;
      margin-bottom: 1.3rem;
    }
    .addCard{
      display: block;
      margin: 0 .75rem;
      height: 2.85rem;
      border: 1px dashed #E3E3E3;
      border-radius: 8px;
      text-align: center;
      span{
        line-height: 2.85rem;
        font-size: .65rem;
        color: #FF8E1D;
      }
    }
  }
</style>
