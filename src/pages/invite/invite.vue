<template>
<div>
  <div style="position:fixed;width: 100%;background: #fff;z-index: 99999;">
    <ul class="register_wrapper">
      <li><a class="btn_info" :class="[ isActive == 'code' ? 'active' : '']">
        邀请信息
      </a></li>
      <li><a class="btn_info" :class="[ isActive == 'info' ? 'active' : '']">
        邀请记录
      </a></li>
      <li><a class="btn_info" :class="[ isActive == 'invite' ? 'active' : '']">
        我的邀请人
      </a></li>
    </ul>
  </div>

  <div class="btn_register_content content" v-if="isActive == 'code'">
    <invite-info :invCode="invCode"></invite-info>
  </div>
  <div class="btn_info_content content" v-if="isActive == 'info'">
    <invite-register :introducerPresonList="introducerPresonList"></invite-register>
  </div>
  <div class="btn_invite_content content" v-if="isActive == 'invite'">
    <invition :introducerMap="introducerMap" v-on:message="fromChild" ></invition>
  </div>


</div>

</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import inviteInfo from '@/pages/invite/inviteinfo'
  import inviteRegister from '@/pages/invite/inviteregister'
  import invition from '@/pages/invite/invition'
  import {getInviteLink} from '@/service/getData'

  const ERR_OK = '000';

  export default {
    data() {
      return {
        introducerPresonList:[],//被邀请人注册
        introducerMap:[],//我的邀请人
        invCode:'',//邀请好友链接
        isActive:'code'
      };
    },
    mounted() {
      getInviteLink().then(res => {
        if(res.code === ERR_OK){
          this.introducerPresonList = res.introducerPresonList;/*邀请记录*/
          this.introducerMap = res.introducerMap;/*我的邀请人*/
          this.invCode = res.invCode;
        }
      })
      this.tabClick();
    },
    methods:{
      fromChild(data) {
        this.introducerMap = data;
      },
      tabClick() {
        var _self = this;
        $('.register_wrapper li').click(function() {
          let index = $(this).index();
          if(index == 0){
            _self.isActive = 'code'
          }else if(index == 1){
            _self.isActive = 'info'
          }else{
            _self.isActive = 'invite'
          }
        })

      }
    },
    components: {inviteInfo,inviteRegister,invition}
  };
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .register_wrapper{
    font-size: 0;
    color: #999;
    box-shadow: 0 2px 1px 0 rgba(225,225,225,0.50);
    @include border-1px($bc);
    li{
      display: inline-block;
      @include wh(33.33%, 2.25rem);
      text-align: center;
      .btn_info {
        position: relative;
        font-size: 0.65rem;
        color: #282E37;
        padding: .2rem 0;
        line-height: 1.8rem;
        &:after {
          height: 1.25rem;
          top: 0.5rem;
          right: 0;
        }
        &.active{
          color: $main;
          border-bottom: 2px solid $main;
        }
      }
    }

  }
  .content{
    padding-top: 2.25rem;
  }
</style>
