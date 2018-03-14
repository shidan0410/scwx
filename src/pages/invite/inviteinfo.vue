<template>
<div class="inviteInfo">
	<div class="img">
		<img :src="imgLink" class="img_url"/>
	</div>
	<button @click="share()">分享</button>
  <img src="../../assets/share_hint.png" alt="" v-show="showShare" @click="closeShare();" class="shareImg">
</div>
</template>

<script type="text/ecmascript-6">
  import {getInviteQR} from '@/service/getData'
  import {wxShareConfig} from '@/config/utils'
  import { url } from '@/config/env'

  const ERR_OK = '000';
  export default {
    data() {
      return {
        imgLink:'',
        showShare:false
      };
    },
    props:{
      invCode:''
    },
    mounted() {
      getInviteQR().then(res =>{
        if(res.code == ERR_OK){
          this.imgLink = 'data:image/jpg;base64,'+res.msg;
        }
      })
    },
    methods: {
      closeShare() {
        this.showShare = false;
      },
      share() {
        this.showShare = true;
        // 在需要配置分享内容的时候调用
        wxShareConfig('壹盐双创','我在双创板投融资平台壹盐双创发现了一个好项目，发展潜力巨大。价值投资时代，你选的超乎你想象。猛戳链接快人一步',this.invCode,require('../../assets/share.jpg'));
      }
    },
    components: {}
  };
</script>

<style lang="scss">
.inviteInfo{
	text-align:center;
  padding: 0 0.75rem;
  .img{
    margin-top: 1.1rem;
    margin-bottom:1.4rem;
    /*width:14rem;*/
    height:17rem;
    background: url('../../assets/invite.png') no-repeat center center;
    background-size: 100%;
    text-align: center;
    position: relative;
    .img_url{
      position: absolute;
      width:5.5rem;
      height:5.5rem;
      border:1px solid #cfad6e;
      top:50%;
      margin-top: -2.75rem;
      left:50%;
      margin-left: -2.75rem;
    }
  }
	button{
    position: absolute;
    bottom:0;
    left:0;
    background: #282E37;
    width:100%;
    height:1.9rem;
    line-height:1.9rem;
    margin:auto;
    font-size: .8rem;
    color: #FFFFFF;
    outline: none;
  }
  .shareImg{
    position: absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index: 100;
  }
}

</style>
