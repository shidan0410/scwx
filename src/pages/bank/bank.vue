<template>
    <div id="bank_wrapper">
      <ul v-if="!isAdd">
        <li v-for="item in list">
          <img :src="item.bankCd | imgFilter">
          <span class="bankCard">{{ item.bankCode }}</span>
          <span class="sign" v-if="signFlag == 0">网银签约</span>
          <span class="sign" v-else>已签约</span>
        </li>
      </ul>

      <div class="sign_wrapper" v-if="signFlag == 0">
        <p>为了确保您的资金安全，需要您通过对应的银行官网完成银行卡签约。</p>
        <a href="javascript:;" @click="Toast('如需签约，请至电脑网页端')">查看签约流程</a>
      </div>

      <!--<div class="add_wrapper" v-show="isAdd">-->
        <!--<div class="add_container" @click="bandBankCard()">-->
          <!--<span class="icon-add">+</span>-->
          <!--<span>添加银行卡</span>-->
        <!--</div>-->
      <!--</div>-->

    </div>
</template>

<script type="text/ecmascript-6">
  import {queryBankCard} from '@/service/getData'
  import {Toast} from 'mint-ui';

  const ERR_OK = '000';
  export default {
    data() {
      return {
        list:[],
        signFlag:''
      };
    },
    mounted() {
      queryBankCard().then(res =>{
        if(res.code == ERR_OK){
          if(res.bankList.length == 0){

          }else{
            this.list = res.bankList;
            this.signFlag = res.signFlag;
          }
        }
      })
    },
    filters:{
      imgFilter(value) {
        return require('../../assets/bank/'+ value +'.png')
      }
    },
    computed:{},
    methods: {
      Toast(txt) {
        Toast(txt)
      }
    },
    components: {Toast}
  }
</script>

<style lang="scss">
  #bank_wrapper{
    padding: 0.2rem 0.3rem 0;
    .add_wrapper{
      height:4.75rem;
      font-size: 0;
      .add_container{
        height:100%;
        border:2px dashed #eaeaea;
        padding:0 1rem;
        border-radius: 10px;
        background: #f4f3f1;
        text-align: center;
        span{
          font-size: .7rem;
          line-height:4.75rem;
          color: #529aeb;
          font-weight: 600;
        }
        .icon-add{
          font-size: 1rem;
          margin: 0 0.1rem;
        }
      }
    }
    ul{
      li{
        position: relative;
        .sign{
            position: absolute;
            right: 0.9rem;
            top: 1.4rem;
            font-size: 0.5rem;
            color: #fff;
        }
        img{
          width:100%;
        }
        .bankCard{
          position: absolute;
          top:2.8rem;
          left:4rem;
          font-size: 0.65rem;
          color: #fff;
        }
      }
    }
    .sign_wrapper{
      padding: .5rem .6rem 0;
      p{
        font-size: .6rem;
        line-height: .9rem;
        color: #999999;
      }
      a{
        display: block;
        width:7.7rem;
        height:1.9rem;
        margin: 2.6rem auto 1.3rem;
        background-color: #ff8e1d;
        color: #fff;
        font-size: .65rem;
        text-align: center;
        line-height: 1.9rem;
        border-radius: 25px;
      }
    }
  }
</style>
