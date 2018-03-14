<template>
  <header id='head_top'>
      <span class="head_goback icon-arrow" v-if="goback" @click="$router.go(-1)"></span>
      <span class="title_header">{{ headtitle }}</span>
      <span v-if="headtitle == '双创项目'" class="select_icon" @click="selectParentFn();">{{ txt }}<span :class="[ txt == '筛选' ? 'icon-listseclect':'icon-close']" style="position:relative;top: 0.08rem;margin-left: 0.25rem;color: #d2d2d2;"></span></span>
  </header>
</template>

<script>
//  import {mapState, mapActions} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    mounted(){

    },
    props:{
      headtitle:String,
      txt:{
        type:String,
        default:'筛选'
      },
      goback:{
        default:false
      }
    },
    computed: {

    },
    methods: {
      selectParentFn() {
        this.$emit('selectFnFromChild');
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  @import 'src/style/iconfont';

  #head_top{
    font-size: 0;
    height:2rem;
    background:#ff8e1d;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
    @include border-1px(#ccc);
    .head_goback{
      position: absolute;
      left: 0.4rem;
      top: 0.58rem;
      &::before{
        font-size: .9rem;
        color: #fff;
      }
    }
    .title_header{
      width:100%;
      padding: 0 20%;
      display: inline-block;
      font-size: 0.8rem;
      color: #fff;
      line-height: 2rem;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-box-sizing: border-box;
    }
    .select_icon{
      position: absolute;
      text-align: right;
      top:0.7rem;
      right:0.75rem;
      font-size: 0.6rem;
      color: #fff;
      /*line-height: 2rem;*/
      /*margin-right: 0.75rem;*/
      .icon-listseclect{
        &:before{
          color: #fff;
        }
      }
    }
  }



</style>
