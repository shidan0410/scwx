<template>
  <div class="edit_tel_wrapper">
    <div class="content" v-if="step == 1">
      <div class="oldPhone">
        <div>当前手机号码：</div>
        <div class="tel">{{ personalInfo.mobile }}</div>
      </div>
      <button class="btn_default" @click="changeTel();" style="margin-top: 3.45rem;">换绑定手机号</button>
      <p>为确保账户安全，换绑前需要验证当前手机号</p>
    </div>

    <EditTelSecond v-else-if="step == 2" @changeCurrent="changeCurrent"></EditTelSecond>

    <EditTelThree v-else></EditTelThree>

  </div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'
  import { Toast } from 'mint-ui';
  import EditTelSecond from './editTelSecond'
  import EditTelThree from './editTelThree'

  export default {
    data() {
      return {
        personalInfo:'',
        step:1
      }
    },
    mixins: [formatUtils],
    beforeMount() {
      this.personalInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    },
    mounted() {},
    methods: {
      changeTel() {
        this.step = 2;
      },
      changeCurrent(number) {
        this.step = number;
      }
    },
    components: {
      Toast,EditTelSecond,EditTelThree
    }
  }
</script>

<style lang="scss">

  .edit_tel_wrapper{
    .content{
      padding: 3.5rem 1.55rem;
      .btn_default,.btn_disabled{
        margin-top:1.5rem;
        outline: none;
      }
      p{
        text-align: center;
        font-size: .6rem;
        line-height: .9rem;
        margin-top: .5rem;
        color: #999999;
      }
      .oldPhone{
        padding-left: 3.2rem;
        div{
          font-size:.6rem;
          color: #666666;
          line-height: .9rem;
        }
        .tel{
          margin-top: .45rem;
          font-size: 1rem;
          line-height: 1.2rem;
          color: #282E37;
        }
      }

    }
  }

</style>
