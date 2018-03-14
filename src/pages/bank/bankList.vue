<template>
  <div class="banklist_wrapper">
    <div class="title">
      <span>支持银行</span>
      <span>单笔限额</span>
      <span>单日限额</span>
      <span>签约</span>
    </div>
    <ul>
      <li v-for="item in banklist">
        <span>{{ item.bankNm }}</span>
        <span>{{ tenTh(item.singleLimitAmt) }}万</span>
        <span>{{ tenTh(item.dayLimitAmt) }}万</span>
        <span
          v-if="item.bankId === '0100' || item.bankId === '0316' || item.bankId === '0310' || item.bankId === '0305' || item.bankId === '0301'"
        >
         <a href="javascript:;" @click="Toast('如需签约，请至电脑网页端')">查看签约流程</a>
        </span>
      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'
  import {selSupportBankList} from '@/service/getData'
  import {Toast} from 'mint-ui';

    export default {
      data() {
        return {
          banklist:[]
        };
      },
      mixins: [formatUtils],
      mounted() {
        selSupportBankList().then(res=>{
          if(res.code=='000'){
            this.banklist = res.bankCdList;
          }else{
//            Toast('获取支持银行卡列表失败');
          }

        })
      },
      methods: {
        Toast(txt) {
          Toast(txt)
        }
      },
      components: {Toast}
    }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  .banklist_wrapper{
    padding: .75rem .75rem 0;
    -webkit-box-sizing: border-box;
    .title{
      @include wh(100%,1.95rem);
      background:#ECEBEB ;
      span{
        width:23%;
        text-align: right;
        line-height: 1.95rem;
        display: inline-block;
        font-size: .65rem;
        color: #666;
      }
    }
    ul{
      padding: .5rem 0;
      border-bottom: 1px solid #ecebeb;
      border-left: 1px solid #ecebeb;
      border-right: 1px solid #ecebeb;
      margin-bottom: .5rem;
      li{
        span{
          text-align: right;
          display: inline-block;
          font-size: .65rem;
          color: #333;
          line-height: 1.1rem;
          width:23%;
          a{
            color: #ff8e1d;}
        }
      }
    }

  }
</style>
