<template>
	<div class="inviteregister">
    <div class="tips_len">
      您累计邀请注册 {{introducerPresonList.length}} 人
    </div>
    <ul v-if="introducerPresonList.length">
      <li v-for="item in introducerPresonList">
          <div class="item_info">
            <div class="item_left">
              <div class="username">{{ item.userName }}</div>
            </div>
            <div class="item_center">
              <div class="mobile">{{ item.mobile }}</div>
            </div>
            <div class="item_right">
              <div class="time">{{ item.insDate | timeFilter}}</div>
            </div>
          </div>
      </li>
    </ul>
    <!--空项目-->
    <div class="emptyBg" v-if="!introducerPresonList.length">
      <img src="../../assets/empty_icon.png" alt="">
      <span>当前暂无内容</span>
    </div>
	</div>

</template>

<script type="text/ecmascript-6">
  import {dateForm} from '@/config/utils'

  export default {
    data() {
      return {
        isEmpty:false
      };
    },
    props:{
      introducerPresonList:{}
    },
    mounted() {
      if(this.introducerPresonList.length){
        this.isEmpty = false;
      }else{
        this.isEmpty = true;
      }
    },
    updated() {
        if(this.introducerPresonList.length){
          this.isEmpty = false;
        }else{
          this.isEmpty = true;
        }
    },
    filters:{
      timeFilter(value) {
        return dateForm(value)
      }
    },
    components: {}
  };

</script>

<style lang="scss">
@import 'src/style/mixin';

.inviteregister{
	width:100%;
	height:100%;
  font-size:0;
  .tips_len{
    @include wh(100%,1.65rem);
    padding-left: 1.4rem;
    line-height: 1.65rem;
    font-size: .6rem;
    color: #647076;
    span{
      color: $main;
    }
  }
	ul{
    margin: 0 0.75rem;
    li{
      @include border-1px(#E3E3E3);
      .item_info {
        font-size: 0;
        height: 2.4rem;
        line-height: 2.4rem;
        text-align: center;
        .item_left {
          display: inline-block;
          position: relative;
          width: 25%;
          margin-left: 5%;
          text-align: left;
          .username {
            color: #282E37;
            font-size: 0.65rem;
          }
        }
        .item_center {
          display: inline-block;
          position: relative;
          width:40%;
          .mobile {
            color: #282E37;
            font-size: 0.6rem;
          }
        }
        .item_right {
          display: inline-block;
          position: relative;
          width: 30%;
          .time {
            color: #282E37;
            font-size: 0.6rem;

          }
        }
      }
    }
  }
}

</style>
