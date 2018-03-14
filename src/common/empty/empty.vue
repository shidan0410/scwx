<template>
  <!--空项目-->
  <div class="emptyBg" v-if="isEmpty">
    <img src="../../assets/empty_icon.png" alt="">
    <span>暂无内容</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    props:{
      isEmpty:false
    },
    mounted() {
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss">
  .emptyBg{
    font-size: 0;
    padding: 3rem 0.75rem 0;
    text-align: center;
    img{
      width:40%;
    }
    span{
      display: block;
      padding-top: 1.6rem;
      font-size: 0.75rem;
      color: #ccc;
    }
  }
</style>
