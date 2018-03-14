<template>
    <mt-popup v-model="isShowRisk" closeOnClickModal="false">
      <div class="riskTip" >
        <h3>风险提示</h3>
        <div class="riskimg">
          <img v-if="proLvl=='1'" src="../../assets/risk/1.png">
          <img v-if="proLvl=='2'" src="../../assets/risk/2.png">
          <img v-if="proLvl=='3'" src="../../assets/risk/3.png">
          <img v-if="proLvl=='4'" src="../../assets/risk/4.png">
          <img v-if="proLvl=='5'" src="../../assets/risk/5.png">
        </div>
        <div class="content">
          <p class="riskRes">当前项目风险为 <span style="color: #ee2020;">"{{formatRisk(proLvl)}}"</span></p>
          <p class="riskRes" style="margin-bottom:1.3rem;">已超出您的风险承受能力 <span style="color: #ff8f1f;">"{{formatRisk(userLvl)}}"</span></p>
          <div class="title">如何降低风险</div>
          <ul>
            <li class="first">
              <span class="icon"><img src="../../assets/risk/icon_risk_1.png" alt=""></span>
              <span>多渠道、多方面地了解项目</span>
            </li>
            <li>
              <span class="icon"><img src="../../assets/risk/icon_risk_2.png" alt=""></span>
              <span>投资多个项目，分散投资</span>
            </li>
            <li>
              <span class="icon"><img src="../../assets/risk/icon_risk_3.png" alt=""></span>
              <span>选择切合风险承受力的项目</span>
            </li>
          </ul>
          <a href="javascript:;" class="commonBtn" @click="closeWindow();">知晓并认购</a>
        </div>
      </div>
    </mt-popup>


</template>
<script type="text/ecmascript-6">
  import {formatUtils} from '@/config/mixin'
  import { Popup } from 'mint-ui';

  export default {
    data:function(){
      return{

      }
    },
    props:{
      isShowRisk:'',
      userLvl:'',
      proLvl:''
    },
    components:{Popup},
    mixins: [formatUtils],
    methods:{
      closeWindow() {
        this.$emit('closeWindow');
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';

  .mint-popup{
    border-radius: 8px;
  }

  .riskTip{
    margin:auto;
    font-size: 0;
    @include wh(13rem,22rem);
    h3{
      @include wh(100%,1.9rem);
      line-height: 1.9rem;
      font-size: .8rem;
      color: #A4AAB3;
      text-align: center;
      border-bottom: 2px solid #E3E3E3;
      margin-bottom: 1rem;
    }
    .riskimg{
      width: 100%;
      text-align: center;
      padding: 0 2.25rem;
      -webkit-box-sizing: border-box;
      img{
        width:100%;
      }
    }
    .content{
      padding: .7rem 1.5rem 0;
      .title{
        font-size: .6rem;
        color: #666666;
        text-align: center;
        position: relative;
        &:after{
          content: '';
          width:2rem;
          height:2px;
          position: absolute;
          top: .3rem;
          right: .2rem;
          background-color: #E3E3E3;
        }
        &:before{
          content: '';
          width:2rem;
          height:2px;
          position: absolute;
          top: .3rem;
          left: .2rem;
          background-color: #E3E3E3;
        }
      }
      .riskRes{
        text-align: center;
        letter-spacing:0.05rem;
        font-size: .65rem;
        color: #666;
        line-height: 1rem;
        span{
          font-size: .7rem;
        }
      }
      ul{
      /*  @include border-1px(#ff8f1f);*/
        position: relative;
        li{
          line-height: 1.1rem;
          color: #999;
          font-size: 0.6rem;
          margin-bottom: .8rem;
          padding-left: .25rem;
          &.first{
            padding-top: .7rem;
          }
          .icon{
            width:1.3rem;
            display: inline-block;
            position: relative;
            top:.3rem;
            img{
              width:80%;
            }
          }

        }
      }
      .commonBtn{
        position: absolute;
        bottom:0;
        left: 0;
        margin-top: 3.4rem;
        outline:none;
        font-size:0.7rem;
        width:100%;
        height:1.75rem;
        line-height:1.75rem;
        border:1px solid #ff8f1f;
        color:#fff;
        background:#ff8f1f;
        text-align: center;
      }
    }
  }
</style>
