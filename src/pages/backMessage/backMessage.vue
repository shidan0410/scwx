<template>
  <div id="back_wrapper">
    <div class="input_group group">
      <label for="">您的意见<i>（少于300字）</i></label>
      <textarea rows="10" maxlength="300" placeholder="请输入您的意见和反馈，我们会在第一时间通知您" v-model.trim="content"/>
    </div>
    <div class="input_group group">
      <label for="">联系方式：</label>
      <input type="tel" placeholder="请留下您的邮箱或手机号" v-model.trim="contactInfo">
    </div>
    <button class="btn_disabled" :class="[contactInfo && content ? 'btn_default' : '']" @click="submit();">提交</button>
    <div class="infos">
      想获得更多壹盐双创资讯<br/>
      请关注微信公众号：
      <div>
        yiyanstart
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addFeedback} from '@/service/getData'
  import {Toast} from 'mint-ui';
  import {ToUnicode} from '@/config/utils'

  export default {
    data() {
      return {
        contactInfo:'',
        content:''
      };
    },
    mounted() {
    },
    methods: {
      submit() {
        if( this.contactInfo && this.content ){
          addFeedback(this.contactInfo,ToUnicode(this.content)).then(res=>{
//            alert(JSON.stringify(res))
            if(res.code == '000'){
              Toast('提交成功');
              var _self = this;
              setTimeout(function () {
                _self.$router.push({path:'/userCenter',query:{title:'个人中心'}})
              },500)
            }
          })
        }else{
          Toast('请输入您的意见和联系方式！')
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  #back_wrapper{
    padding: 1rem 0.75rem;
    .input_group{
      &:nth-child(1){
        font-size: 0.75rem;
        color: #282E37;
        i{
          color: #3F3F3F;
        }
        label{
          margin-bottom: 0.6rem;
        }
        textarea{
          margin-top: 0.6rem;
          margin-bottom: 1.8rem;
          font-size: 0.6rem;
         @include wh(100%,7.5rem);
          padding: 0.3rem;
          resize:none;
          outline: none;
        }
      }
      &:nth-child(2){
        position: relative;
        margin-bottom: 2rem;
        label{
          position: absolute;
          left:0;
          top:0.38rem;
          font-size: .65rem;
          color: #282E37;
        }
        input{
          padding: 0.3rem 0 0.3rem 3.3rem;
        }
      }
    }
    .infos{
      font-size: 0.65rem;
      line-height: 0.9rem;
      color: #999999;
      text-align: center;
      margin-top: 6rem;
      div{
        color: $main;
      }
    }
  }
</style>
