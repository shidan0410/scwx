<template>
<div style="height:100%; overflow-y: auto">
  <div id="remind">
    <!-- <p style="color:#ff5722;font-size:0.7rem;margin:1rem 0" v-show="isShow">恭喜您实名绑卡成功！请完成风险评测</p>
    <p>本问卷旨在了解您可承受的风险程度等情况，借此协助您选择合适的产品或服务类别，以符合您的风险承受能力。</p>
    <p>风险承受能力评估是本公司向投资者履行适当性职责的一个环节，其目的是使本公司所提供的产品或服务与您的风险承受能力等级相匹配。</p>
    <p>1、投资失败风险：由于各种原因致使您最终未能成功投资目标项目而产生的投资款被退回且未获得任何收益的风险。</p>
    <p>本公司特别提醒您：本公司向投资者履行风险承受能力评估等适当性职责，并不能取代您自己的投资判断，也不会降低产品或服务的固有风险。同时，与产品或服务相关的投资风险、履约责任以及费用等将由您自行承担。</p>
    <p>本公司提示您：本公司根据您提供的信息对您进行风险承受能力评估，开展适当性工作。您应当如实提供相关信息及证明材料，并对所提供的信息和证明材料的真实性、准确性、完整性负责。</p>
    <p>本公司建议：当您的各项状况发生重大变化时，需对您所投资的产品及时进行重新审视，以确保您的投资决定与您可承受的投资风险程度等实际情况一致。</p>
    <p>本公司在此承诺，对于您在本问卷中所提供的一切信息，本公司将严格按照法律法规要求承担保密义务。除法律法规规定的有权机关依法定程序进行查询以外，本公司保证不会将涉及您的任何信息提供、泄露给任何第三方，或者将相关信息用于违法、不当用途。</p>
    <p style="text-indent:0;margin:1rem 0 0 0"><input type="checkbox" v-model="isAgree">本人已阅读<font color="#ff5722">《授权协议》</font>，且已理解其内容并承担相关风险。</p>
    <p style="text-indent:0;color:red" v-show="checkPro">请先同意《授权协议》</p> -->
   <!--  <a class="commonBtn link"  :href="from" >跳过</a> -->
    <p>在购买壹盐双创平台的双创项目产品或其他项目之前，请您先根据自身实际情况认真填写本测评， 以便我们在了解您的风险承受能力的基础上界定您的风险类型，进而帮助您根据自身的风险承受能力选择合适的产品。请您提供准确、完整的信息， 如果您选择不填写本问卷，则可能对您投资风险承受能力评估以及理财产品推荐带来不利影响，壹盐双创平台对因此产生的所有后果不承担任何责任。</p>
    <button class="commonBtn" @click="goRisk()">去评测</button>
    <router-link :to="{path:'/riskNotice',query:{title:'评测须知'}}" class="commonBtn link">评测须知</router-link>
   <!--  <router-link :to="{path:from,query:{productId:productId,productName:productName,title:_title}}" class="commonBtn link" v-show="isShow">跳过</router-link> -->
  </div>
  <div id="risk" style="display:none">
  <input type="hidden" id="testqId" :value="testqId">
  <test-item
    :id='1'
    :data-questionid = "testItems[0].questionId"
    :data-questiontp="testItems[0].questionTp"
    v-bind:question = "testItems[0]"
    v-bind:class="{'db':db }"
    v-bind:index=1
    v-on:changeQuestionState="changeQuestionState(testItems[0].questionId,1)">
  </test-item>

  <test-item
    :id="index+1"
    :data-questionid = "item.questionId"
    :data-questiontp="item.questionTp"
    v-for="(item,index) in testItems"
    v-if="index!=0"
    v-bind:class="{'dn':dn }"
    v-bind:question = "item"
    v-bind:index=index+1
    v-on:changeQuestionState="changeQuestionState(item.questionId,index+1)">
  </test-item>
   <div class="btnArea">
     <button id = "preBtn" disabled @click="preQuestion()">上一题</button>
     <button id = "nextBtn" disabled @click="nextQuestion()">下一题</button>
     <button id = "subBtn" disabled style="display:none" @click="subQuestion()">提交</button>
   </div>
   <p style="color:#647076;font-size:18px;text-align:center">{{q_index}}/20</p>
 </div>
</div>

</template>
<script type="text/ecmascript-6">
  import { Indicator } from 'mint-ui';
  import testItem from './testItem'
  import {getRiskQuestions,newriskSubmit} from '@/service/getData'
  import $ from 'jquery'
  import {formatUtils} from '@/config/mixin'
  import { ToUnicode} from '@/config/utils'

  export default {
    name: 'risk',
    data:function(){
      return {
        rangeValue:1,
        checkFlg:true,
        dn:true,
        db:true,
        testqId:'',
        testItems:[],
        //进入详情需要的参数
        productId:'',
        productName:'',
        isShow:false,
        from:'',//标记从什么页面过来
        isAgree:false,
        checkPro:false,
        _title:'',//标记title
        q_index:1//题号
        }
    },
    mixins:[formatUtils],
    async beforeMount(){
      this.productId = this.$route.query.productId || '';
      this.productName = this.$route.query.productName||'';
      this.isShow = this.$route.query.isShow||'';
      this.from = "/"+this.$route.query.from || '';
      this._title = this.$route.query.title||'';
      console.log(this.from)
    },
    components:{
      Range,testItem
    },
    mounted:function(){
      // baguetteBox.run('.baguetteBoxOne');
      getRiskQuestions().then(res=>{
        console.log(res);
        this.testqId = res.testqId;
        this.testItems = res.list;
      })

    },
    methods:{
      goRisk:function(){
        $("#remind").css('display','none');
        $("#risk").css('display','block');
        // if(this.isAgree){//同意授权协议
        //   $("#remind").css('display','none');
        //   $("#risk").css('display','block');
        //   this.checkPro = false
        // }else{
        //     this.checkPro = true
        // }

      },
      controlRange:function(){
        console.log(this.testItems);
      },
      changeNumber:function(){

      },
      changeQuestionState: function(id,index) {
        //console.log('子组件访问了父组件的方法');
        //console.log(id+","+index);

        if(index==this.testItems.length){
          $("#subBtn").removeAttr('disabled').addClass('active');
        }else{
          $("#nextBtn").removeAttr('disabled').addClass('active');
        }
      },
      controlBtn:function(index,length){
         $("#nextBtn").css('display','inline-block');
          $("#subBtn").css('display','none');
        //当前是第一题时，‘上一题’按钮不可用
        if(index==1)$("#preBtn").attr('disabled','disabled').removeClass('active');

        //做完第一题往下走，‘上一题’按钮可点击
        if(index>1)$("#preBtn").removeAttr('disabled').addClass('active');

        //当前显示最后一题时，‘下一题’按钮变成‘提交’按钮
        if(index==length){
          $("#nextBtn").css('display','none');
          $("#subBtn").css('display','inline-block');
        }
        this.q_index = index;
      },
      // 上一题
      preQuestion:function(){
        var activeEle = $(".db")[0];
        var index = parseInt($(activeEle).attr('id'));
        $(activeEle).removeClass('db').addClass('dn');
        $(activeEle).prev().removeClass('dn').addClass('db');
        this.controlBtn((index-1),this.testItems.length);
        $("#nextBtn").removeAttr('disabled').addClass('active');;
      },
      // 下一题
      nextQuestion:function(){

        var activeEle = $(".db")[0];
        var index = parseInt($(activeEle).attr('id'));
        $(activeEle).removeClass('db').addClass('dn');
        $(activeEle).next().removeClass('dn').addClass('db');
        this.controlBtn((index+1),this.testItems.length);

        //点下一题时，要判断下一道题是否做过了，做过的题，‘下一题’按钮可点击
        var liArray = $("#"+(index+1)).find('li');
        for(var i=0;i<liArray.length;i++){
          if($(liArray[i]).hasClass('selectedActive')){
             $("#nextBtn").removeAttr('disabled').addClass('active');
             break;
          }
          $("#nextBtn").attr('disabled','disabled').removeClass('active');
        }

      },
      //提交答案
      subQuestion:function(){
        //答案格式｛1:C,y;2:A,D;3:C;4:B｝;
        // Indicator.open({
        //   text: '正在提交...',
        //   spinnerType: 'fading-circle'
        // });
        this.openLoading();
        var totalScore = 0;
        var result = '';
        var testArray = $(".test");
        for(var i=0;i<testArray.length;i++){
          var qId = $(testArray[i]).data('questionid');
          var qTp = $(testArray[i]).data('questiontp');
          result+=qId+":";
          var liArray = $(testArray[i]).find('li');
          if(qTp=='1'){//多选
            for(var j=0;j<liArray.length;j++){
              if($(liArray[j]).hasClass('selectedActive')){
                var answer = $(liArray[j]).data('answer');
                result+=answer+','
              }
            }
            result = result.substring(0,result.length-1);
          }else{//单选
            for(var j=0;j<liArray.length;j++){
              if($(liArray[j]).hasClass('selectedActive')){
                var answer = $(liArray[j]).data('answer');
                result+=answer;
                break;
              }
            }

          }
          result+=";"
        }
        result = result.substring(0,result.length-1);
        console.log(result);
        newriskSubmit($("#testqId").val(),result).then(res=>{
          console.log(res);
          if(res.code=="000"){
            var riskLevel = res.riskLevel;
            var riskHand = ToUnicode(res.riskHand);
            var profitExpectation = ToUnicode(res.profitExpectation);
            var productName = ToUnicode(this.productName);
            // var param = 'riskLevel='+riskLevel+'&riskHand='+riskHand+'&productId='+this.productId+'&productName='+productName+'&profitExpectation='+profitExpectation;
            this.$router.push({path:'/risktip?',query:{title:'风险评测'}})
          }else{
            Toast(res.msg);
          }
          this.closeLoading();
        });

      }

    }
  };

</script>
<style lang="scss" scoped>
#app{overflow:hidden!important;background:#f0f;}
#remind{
  margin:0.75rem;
  p{font-size:0.6rem;color:#666;line-height:1rem;margin:0.2rem 0;text-indent:2em;}

}
.link{background:#fff!important;color:#ff8f1f!important;border:#fff!important;margin:0!important;text-align:center;display:block;text-decoration: underline;}
.commonBtn{outline:none;font-size:0.7rem;width:100%;height:1.75rem;line-height:1.75rem;border:1px solid #ff8f1f;color:#fff;border-radius:0.85rem;background:#ff8f1f;margin:1rem 0;}
#risk{
  width: 100%;
  //min-height: 26rem;
  height: 75%;
}
#number{
  margin:0.75rem;
  height: 1rem;
  line-height: 1rem;
  li{float:left;font-size:0.6rem;width:1rem;text-align:center;}
}
.swiper-container{
  min-height: 50px;
  position:relative;
  .swiper-wrapper{
    width: 100%;
   //height: 200px;
   .swiper-slide {
      -webkit-flex-shrink: 0;
      -ms-flex: 0 0 auto;
      flex-shrink: 0;
      width: 90%;
      height: 100%;
      position: relative;
    }
    .swiper-button-next, .swiper-button-prev {
      position: absolute;
      top: 70%;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      cursor: pointer;
      -moz-background-size: 27px 44px;
      -webkit-background-size: 27px 44px;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}
.btnArea{
  text-align: center;
  margin-bottom:1rem;
    button{
      display: inline-block;
      width: 5.75rem;
      height: 1.75rem;
      border-radius: 0.75rem;
      background: #fff;
      border: 1px solid #ddd;
      color: #999;
      margin:0 0.5rem;
      font-size: 0.75rem;
      outline: none;
    }
    .active{border: 1px solid #91A5B1;background:#91A5B1;color:#fff;outline:none}
}



</style>
