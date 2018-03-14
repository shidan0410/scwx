<template>
    <div class="test" style="height:20.6rem;overflow:hidden;overflow-y:auto;">
      <div class="title"><p>{{index}}、{{question.question}}</p></div>
      <ol class="answerItem" style="height:17rem;overflow: hidden;overflow-y: auto;">
        <li v-for="(item,index) in question.answerChooses" v-on:click = "selectedAnswer(index,question.questionTp)" :data-answer="item.answer">{{item.content}}
          <!--v-if="question.questionTp==1"-->
          <span v-if="question.questionTp==1" style="position: absolute;bottom: 17px;right: 16px;" class="labelId"></span>
          <span v-if="question.questionTp==1" style="position: absolute;bottom: 26px;right: 18px;" class="span_active"></span>
        </li>
      </ol>
    </div>
</template>
<script type="text/ecmascript-6">
import $ from 'jquery'
  export default {
    name:'test',
    data:function(){
      return {
        isActive:false
          // title:'测评第一题',
          // answer:[{text:'第一个选项'},{text:'第二个选项'},{text:'第三个选项'},{text:'第四个选项'}]
      }
    },
    props:{show:{},index:0,question:{},dn:true},
    methods:{
      selectedAnswer:function(index,q){
        console.log();

        if(q=="1"){//多选
          if($(event.target).hasClass("selectedActive")){
            $(event.target).removeClass("selectedActive");
            $($(event.target).find('span')[0]).removeClass('active');
            $($(event.target).find('span')[1]).css('display','none');
          }else{
            $(event.target).addClass("selectedActive");
            $($(event.target).find('span')[0]).addClass('active');
            $($(event.target).find('span')[1]).css('display','block');
          }
        }else{//单选
         $(event.target).siblings().removeClass('selectedActive');
          $(event.target).addClass("selectedActive");
        }
        var index = $(event.target).parent().parent().attr('id');
        this.$emit('changeQuestionState');
      }
    }
    
  };
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';
  $psize:0.75rem;

  .test{
    min-height: 2.5rem;
    //border-radius:0.25rem;
    margin:1rem;
    .title{
      //background: #45b886;
      
      border-radius:0.25rem 0.25rem 0 0;
      min-height: 2.25rem;
      line-height: 2.25rem;
      font-size:0.6rem ;
      // padding:$psize;
      margin-bottom: 0.5rem;
      p{line-height:1rem;color:#647076;span{color:#647076;}}
    }
    .answerItem{
      border:0.05rem solid #E9F1F6;
      border-radius:0.25rem;
      li{
        line-height: 1rem;
        padding:0.75rem;
        // margin: 1rem 0;
        font-size: 0.6rem;
        position: relative;
      }
      li.selectedActive{
        background:#E9F1F6;
      }
    }

  }
  .labelId{
    width: 20px;
    height: 20px;
    border-radius: 4px;
    /* background-color: #009688; */
    position: relative;
    border: 1px solid #ddd;
}
 .labelId.active{
  border: 1px solid #FF8E1D;
  background:#FF8E1D
}
.span_active {
    content: '\A0';
    display: inline-block;
    border: 1px solid #fff;
    border-top-width: 0;
    border-right-width: 0;
    width: 14px;
    height: 8px;
    -webkit-transform: rotate(-50deg);
    position: absolute;
    /* left: 6px; */
    /* bottom: 4px; */
    border-radius: 0;
}

  .dn{display:none}
  .db{display:block}

</style>
