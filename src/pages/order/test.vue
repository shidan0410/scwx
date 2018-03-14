<template>
   <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="text1" :bottomDropText="text2" :bottomLoadingText="text3">
	  <ul>
	    <li v-for="item in 30">{{ item }}</li>
	  </ul>
	  <!-- <div slot="top" class="mint-loadmore-top">
	      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
	      <span v-show="topStatus === 'loading'">Loading...</span>
      </div> -->
      <!-- <div slot="bottom" class="mint-loadmore-bottom">
	      <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">下面</span>
	      <span v-show="bottomStatus === 'loading'">Loading...</span>
      </div> -->
	</mt-loadmore>
</template>

<script type="text/ecmascript-6">
import { Loadmore } from 'mint-ui';
  export default {
    data() {
      return {
      	allLoaded:'',
      	topStatus:'',
      	bottomStatus:'',
      	text1:'上拉刷新1111',
      	text2:'释放更新222',
      	text3:'加载中....333'
      };
    },
    methods:{
    	loadBottom() {
    		this.allLoaded = false;
		  this.$refs.loadmore.onBottomLoaded();
		},
		handleTopChange(status) {
          this.bottomStatus = status;
      	},
    }
  };

</script>

<style lang="scss">
  @import 'src/style/mixin';

</style>
