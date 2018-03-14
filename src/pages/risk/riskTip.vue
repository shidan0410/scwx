<template>
   <div class="riskTip">
   	  <div class="riskimg">
        <img v-if="riskLevel==1" src="../../assets/risk/1.png">
        <img v-if="riskLevel==2" src="../../assets/risk/2.png">
        <img v-if="riskLevel==3" src="../../assets/risk/3.png">
        <img v-if="riskLevel==4" src="../../assets/risk/4.png">
        <img v-if="riskLevel==5" src="../../assets/risk/5.png">
      </div>
     <!--  <p style="line-height:0.8rem;padding-top:1rem">根据您填写的《投资者风险承受能力问卷》，本公司对您的风险承受能力进行了综合评估，现得到评估结果如下：</p> -->
      <p class="riskRes">风险评估类型：<span :style="{color:getColor(riskLevel)}">"{{riskHand}}"</span></p>
      <p class="riskRes">投资行为分类：<span :style="{color:getColor(riskLevel)}">"{{profitExpectation}}"</span></p>
     <!--  <p class="title" style="margin-bottom:0.3rem">评估时间：<span class="time">{{riskDate}}</span></p>
      <p class="title">投资建议：</p>
      <p class="tip">建议您根据自身风险承受能力和自身投资经验，谨慎选择投资项目</p> -->
      <button v-show="!isBindCard" class="commonBtn" style="margin-top:5rem;" @click = "goNext('风险评测','/risk')">重新评测</button>
      <div v-show="isBindCard" style="margin-top:2rem;">
       <!--  <route-link to="{path:'/bindCard',query:{title:'银行卡管理'}}" class="commonBtn tranBtn">绑定银行卡</route-link> -->
        <button class="commonBtn tranBtn" @click = "goNext('银行卡管理','/bindCard')">绑定银行卡</button>
        <button class="commonBtn" @click = "goNext('双创项目','/list')">继续查看项目</button>
      </div>
      <div class="showNum" v-show="isBindCard">
        <span style="background:#ddd;color:#666;border-top:1px solid #ddd;">剩余({{riskNum}})次</span>
        <span style="background:#ff8f1f;color:#fff;" @click = "goNext('风险评测','/risk')">重新测评</span>
      </div>
      <!-- <button class="commonBtn" @click = "goHome()" v-else>返回首页</button> -->
   </div>
</template>
<script type="text/ecmascript-6">
import $ from 'jquery'
import {UnUnicode} from '@/config/utils'
import {getUserState} from '@/service/getData'
import {Toast} from 'mint-ui'
  export default {
    data:function(){
      return{
        riskLevel:0,
        riskHand:'',
        riskLevelDesc:'',
        profitExpectation:'',
        isBindCard:false,
        riskNum:'',
        UserStateInfos:'',
        level_color:'',
        //进入详情需要的参数
        productId:'',
        productName:''
      }
    },
    methods:{
      goNext(title,url){
        if(title=="风险评测"&&parseInt(this.UserStateInfos.userInfo.raNumber)>=3){
          Toast('评测次数已达3次');
        }else{
          this.$router.push({path:url,query:{title:title}})
        }
            
      },
      goHome(){
        this.$router.push({path:'/index',query:{title:'壹盐双创'}})

      },
      getUserState(){
         getUserState().then(res =>{/*初始化获取用户状态*/
          if(res.code == "000"){
            this.UserStateInfos = res;
            window.localStorage.setItem('UserStateInfos',JSON.stringify(res));
            var r_num = 3-this.UserStateInfos.userInfo.raNumber
            this.riskNum = r_num>0?r_num:0;
            this.riskLevel = this.UserStateInfos.riskLevel;
            this.riskHand = this.UserStateInfos.riskHand;
            this.profitExpectation = this.UserStateInfos.profitExpectation

            if(this.UserStateInfos.tipCardFlag=="1"){
              this.isBindCard = false;
            }else{
              this.isBindCard = true;
            }
          }
        })
      },
      getColor(level){
        switch(level){
          case '1':
            return '#8BC34A ';
            break;
          case '2':
            return '#8BC34A ';
            break;
          case '3':
            return '#FF8000';
            break;
          case '4':
            return '#FA3F3F';
            break;
          case '5':
            return '#FA3F3F';
            break;
          default:
            return '';
            break;
        }
      }

    },
    async beforeMount(){
      this.productId = this.$route.query.productId||'';
      this.productName = UnUnicode(this.$route.query.productName)||'';
    },
    mounted:function(){
      this.getUserState();
    },

  };
</script>
<style lang="scss" scoped>
  $psize:0.75rem;
  .riskTip{
  	text-align: center;
  	margin:auto;
  	padding-top:1.5rem;
  	.riskimg{
  		width: 100%;
      text-align: center;
      margin-bottom:1rem;
      img{width:8rem;}
  	}
  	p{font-size:0.6rem;padding:0.2rem 0;}
  	.riskRes{text-align: center;margin-bottom: 0.5rem;letter-spacing:0.05rem;font-size: 0.7rem;}
  	// .title{color:#999;}
  	// .time{color:#333;}
  	// .tip{margin-bottom:2.5rem;line-height:1rem;}
  	.commonBtn{width: 9rem;outline:none;font-size:0.7rem;height:1.75rem;line-height:1.75rem;border:1px solid #ff8f1f;color:#fff;border-radius:0.85rem;background:#ff8f1f;margin:0.5rem 0;}
  	.tranBtn{background:#fff;color:#ff8f1f}
    .showNum{
      position: fixed;
      bottom: 0;
      height: 2.5rem;
      line-height: 2.5rem;
      width: 100%;
      text-align: center;
      background:#ddd;
      span{display: inline-block;text-align: center;width: 49%;font-size:0.7rem;line-height: 2.8rem;}
    }
  }
</style>
