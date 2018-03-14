/**
 * Created by ylc on 2017/5/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  personalInfo:{},//用户信息
  tipCard:'',//是否绑卡
  riskAssessment:'',//是否风险测评
  isVerify:'',//是否实名
  bankContract:'',//网银签约
  bankCd:'',//绑卡cd
  tel:''//存储登录注册时输入的手机号
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
