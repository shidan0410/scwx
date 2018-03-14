<template>
<div class="invite_wrapper">
  <ul v-if="Object.keys(introducerMap).length">
    <li>
      <div class="item_info">
        <div class="item_left">
          <div class="username">{{ introducerMap.userName }}</div>
        </div>
        <div class="item_center">
          <div class="mobile">{{ introducerMap.mobile }}</div>
        </div>
        <div class="item_right">
          <div class="time">{{ introducerMap.insDate | timeFilter}}</div>
        </div>
      </div>
    </li>
  </ul>
  <!--推荐人-->
  <form v-if="!Object.keys(introducerMap).length">
    <div class="userphone">
      <label for="userphone"></label>
      <input id="userphone" type="tel" v-model.trim="inputVal" placeholder="请输入邀请人手机号"/>
    </div>
    <div class="errors">
      <span>{{ errorTxt }}</span>
    </div>
    <input type="button" value="提交" :disabled="valid" @click="submitFn();"/>
  </form>

</div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {setIntroducerMobile,checkIntroducerPhone,getInviteLink} from '@/service/getData'
  import {dateForm} from '@/config/utils'
  import { Toast } from 'mint-ui';
import {formatUtils} from '@/config/mixin'
  export default {
    data() {
      return {
        inputVal:'',//输入的推荐人手机号
        errorTxt:'',//错误提示
        valid:false,
        data:{insDate: "2017-07-12", userName: "ssss", mobile: "18662320517"}
      };
    },
    mixins:[formatUtils],
    props:{
      introducerMap:{}
    },
    filters:{
      timeFilter(value) {
        return dateForm(value)
      }
    },
    mounted() {

    },
    methods: {
      submitFn() {
        this.valid = true;//提交button
        var regPhone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!this.inputVal){
            this.errorTxt = '请输入手机号';
            this.valid = false;
            return false;
        }else if(!regPhone.test(this.inputVal)){
            this.errorTxt = '请输入正确格式的手机号';
            this.valid = false;
            return false;
        }
        this.openLoading();
        checkIntroducerPhone(this.inputVal).then(res =>{
          if(res.code == '000'){
            setIntroducerMobile(this.inputVal).then(res =>{
              if(res.code == '000'){
//                Toast('提交成功');
//              window.location.href = 'http://10.10.8.167:8081/#/list';
//                window.location.reload();
                getInviteLink().then(res => {
                  if(res.code === '000'){
                    this.$emit('message',res.introducerMap);
                  }
                })
              }else if(res.code == '003'){
                this.errorTxt = '已有邀请人';

              }else if(res.code == '005'){
                this.errorTxt = '推荐人异常';
                this.valid = false;
              }
            })
          }else if(res.code == '001'){
            this.errorTxt = '格式错误';
            this.valid = false;
          }else if(res.code == '002'){
            this.errorTxt = '推荐人不存在';
            this.valid = false;
          }
          this.closeLoading();
        })
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  .toast{
    color: #fff;
  }
  .invite_wrapper{
    width:100%;
    height:100%;
    ul{
      font-size:0;
      li{
        .split{
          @include wh(100%,0.5rem);
          background: #f4f3f1;
        }
        .item_info {
          font-size: 0;
          height: 2.9rem;
          padding: 0.7rem 0 0;
          .item_left {
            display: inline-block;
            position: relative;
            width: 5.75rem;
            text-align: left;
            padding-left:  1.3rem;
            .username {
              color: #333;
              font-size: 0.65rem;
              line-height: 0.9rem;
            }
            .username_tip {
              font-size: 0.55rem;
              line-height: 0.9rem;
              color: #999;
            }
          }
          .item_center {
            display: inline-block;
            position: relative;
            /*width:2.35rem;*/
            text-align: left;
            padding-right: 0.8rem;
            margin-right: 1.5rem;
            .mobile {
              color: #666;
              font-size: 0.6rem;
              line-height: 0.9rem;
            }
            .mobile_tip {
              font-size: 0.55rem;
              line-height: 0.9rem;
              color: #999;
            }
          }
          .item_right {
            display: inline-block;
            position: relative;
            width: 3.55rem;
            text-align: left;
            .time {
              color: #666;
              font-size: 0.6rem;
              line-height: 0.9rem;
            }
            .time_tip {
              font-size: 0.55rem;
              line-height: 0.9rem;
              color: #999;
            }
          }
        }
      }
    }
    form{
      position: relative;
      padding: 5rem 0.75rem;
      width:100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      .userphone{
        position: relative;
        label{
          top:0.5rem;
          display: inline-block;
          position: absolute;
          width:0.75rem;
          height:0.95rem;
          background: url("../../assets/icon-phone.png") no-repeat center;
          background-size:100%;
        }
        #userphone{
          width:100%;
          padding:0.5rem 0 0.5rem 1rem;
          /*@include border-1px(#ccc);*/
          border-bottom:1px solid #e6e6e6;
          outline: none;
          font-size: 0.65rem;
          color: #999;
          &:focus{
            border-color: #ff8e1d;
          }
        }
      }
      input[type='button']{
        @include wh(100%,2rem);
        margin-top: 2rem;
        background:#ff8e1d ;
        color: #fff;
        font-size: 0.65rem;
        -webkit-border-radius:25px;
        -moz-border-radius:25px;
        border-radius:25px;
        outline: none;
      }
      .errors{
        position: absolute;
        top: 5.2rem;
        right: 0.75rem;
        span{
          color: red;
          font-size: 0.65rem;
        }
      }
    }
  }
</style>
