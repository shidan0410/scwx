import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import risk from '@/pages/risk/risk'
import remindFromCard from '@/pages/risk/remindFromCard'
import risktip from '@/pages/risk/riskTip'
import riskNotice from '@/pages/risk/notice'//评测须知
/*双创项目*/
import list from '@/pages/list/list'
import detail from '@/pages/list/detail'
import proCast from '@/pages/list/proCast'
import proProgress from '@/pages/list/proProgress'
import productInfo from  '@/pages/list/productInfo'
import proInformation from '@/pages/list/proInfo'
/*购买*/
import createOrder from '@/pages/purchase/createOrder'
import payOrder from '@/pages/purchase/payOrder'
import buyResult from '@/pages/purchase/buyResult'

/*关于双创*/
import aboutsc from '@/pages/aboutsc/aboutsc'
// import partner from '@/pages/aboutsc/partner'
import who from '@/pages/aboutsc/who'
import big from '@/pages/aboutsc/big'
import found from '@/pages/aboutsc/found'
import good from '@/pages/aboutsc/good'
import idea from '@/pages/aboutsc/idea'
import feedback from '@/pages/aboutsc/feedback'

/*订单中心*/
import order from '@/pages/order/orderlist'
import orderdetail from '@/pages/order/orderdetail'
import cancelOrder from '@/pages/order/cancelOrder'
//import searchOrder from '@/pages/order/search'

/*查询*/
import search from '@/pages/order/search'

/*交易记录*/
import record from '@/pages/record/record'
import allrecord from '@/pages/record/allrecord'
import searchRecord from '@/pages/record/searchRecord'

/*邀请*/
import invite from '@/pages/invite/invite'
/*测试*/
import test from '@/pages/order/test'

/*投资指南*/
import investGuide from '@/pages/investInfo/investGuide'
import newPeopleGuide from  '@/pages/investInfo/newPeopleGuide'
import tzbk from  '@/pages/investInfo/tzbk'
import plat from  '@/pages/investInfo/plat'
import module from  '@/pages/investInfo/module'
import investor from  '@/pages/investInfo/investor'
import leadInvestor from  '@/pages/investInfo/leadInvestor'
import financier from  '@/pages/investInfo/financier'
import financierInfo from  '@/pages/investInfo/financierInfo'
import riskInfo from  '@/pages/investInfo/risk'
import questions from  '@/pages/investInfo/questions'

/*公告*/
import tip from '@/pages/index/tip'
import tipDetail from '@/pages/index/tipDetail'

import bank from '@/pages/bank/bank'
import registeProtocol from '@/pages/registeProtocol'
import userProtocol from '@/pages/userProtocol'

/*登录*/
import login from '@/pages/login/login'
import register from '@/pages/register/register'
import register2 from '@/pages/register/register2'
import backpwdone from '@/pages/login/backpwd'
import backpwdtwo from '@/pages/login/backPwdTwo'
import loginRegister from '@/pages/login/loginRegister'

/*个人中心*/
import identifyInvest from '@/pages/identifyInvest/identifyInvest'
import identifyInvestForm from '@/pages/identifyInvest/identifyInvestForm'
import project from '@/pages/project/project'
import usercenter from '@/pages/user/userCenter'
import userlist from '@/pages/user/userInfo/userList'
import editTel from '@/pages/user/userInfo/editTel/editTel'
import editLoginPassword from '@/pages/user/userInfo/editLoginPassword'
import editPayPassword from '@/pages/user/userInfo/editPayPassword'
import bindEmail from '@/pages/user/userInfo/bindEmail'
import verifyCard from '@/pages/register/verifyCard'
import bindCard from '@/pages/bank/bindCard'
import bindCardSuccess from '@/pages/bank/bindCardSuccess'//添加银行卡成功
import bankList from '@/pages/bank/bankList'
import dowloadapp from '@/pages/dowloadapp'
import followWechat from '@/pages/register/followWechat'
import message from '@/pages/message/message'
import backMessage from '@/pages/backMessage/backMessage'
import licenseAgreement from '@/pages/licenseAgreement'
import investorAgreement from '@/pages/investorAgreement'

import partner from '@/pages/partner/partner'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    { path: '/followWechat',component: followWechat},//关注微信
    { path: '/',components: {default:index, dowloadapp:dowloadapp}},
    { path: '/index',components: {default:index, dowloadapp:dowloadapp}},//首页
    { path: '/list',components: {default:list}},//列表页
    { path: '/detail', components: {default:detail, dowloadapp:dowloadapp}},//项目详情页
    { path: '/proCast',component: proCast},//项目跟投人
    { path: '/proProgress',components:{default:detail, product:proProgress}},//项目进展
    { path: '/productInfo', components:{default:detail, product:productInfo}},//项目介绍
    { path: '/risk',component: risk},//风险测评
    { path: '/risktip',component: risktip},//风险测评
    { path: '/riskNotice',component:riskNotice},//评测须知
    {path:'/remindFromCard',component:remindFromCard},//绑卡后且不需要网银签约进入此页面
    { path: '/aboutsc',components: {default:aboutsc}},
    // { path:'/partner',components:{default:aboutsc,}},
    { path:'/who',components:{default:aboutsc}},
    { path:'/big',components:{default:aboutsc}},
    { path:'/found',components:{default:aboutsc, aboutsc:found}},
    { path:'/good',components:{default:aboutsc, aboutsc:good}},
    { path:'/idea',components:{default:aboutsc, aboutsc:idea}},
    { path:'/feedback',components:{default:aboutsc, aboutsc:feedback}},
    { path:'/orderlist',component:order},//订单列表
    { path:'/orderdetail',component:orderdetail},//订单详情
    {path:'/cancelOrder',component:cancelOrder},
    { path:'/search',component:search},//查询列表
    { path:'/record',component:record},//交易记录
    { path:'/searchRecord',component:searchRecord},//交易记录
    { path:'/invite',components:{default:invite}},//认购交易记录
    {path:'/test',component:test},
    { path:'/proInformation',component:proInformation},
    {path:'/investGuide',components:{product:investGuide}},//投资指南
    { path:'/newPeopleGuide',component:newPeopleGuide},//新手指引
    { path:'/tzbk',component:tzbk},//投资百科
    { path:'/plat',component:plat},//平台操作指引
    { path:'/module',component:module},//业务管理模式
    { path:'/investor',component:investor},//投资人规则
    { path:'/leadInvestor',component:leadInvestor},//领投人规则
    { path:'/financier',component:financier},//融资人规则
    { path:'/financierInfo',component:financierInfo},//融资人信息披露规则
    { path:'/riskInfo',component:riskInfo},//风险揭示书
    { path:'/questions',component:questions},//常见问题
    { path: '/tip',component:tip},//公告
    { path: '/tipDetail',component:tipDetail},//公告详情
    { path:'/bank',component:bank},//银行卡管理
    {path:'/userProtocol',component:userProtocol},
    {path:'/registeProtocol',component:registeProtocol},//注册协议
    {path:'/login',component:login},//登录
    {path:'/register',component:register},//注册
    {path:'/register2',component:register2},//注册
    {path:'/backpwdone',component:backpwdone},//找回密码
    {path:'/backpwdtwo',component:backpwdtwo},//找回密码
    {path:'/usercenter',component:usercenter},//个人中心
    {path:'/userlist',component:userlist},//基本信息
    {path:'/verifyCard',component:verifyCard},//实名绑卡
    {path:'/bindCard',component:bindCard},
    {path:'/bindCardSuccess',component:bindCardSuccess},
    {path:'/editTel',component:editTel},//修改手机号
    {path:'/editLoginPassword',component:editLoginPassword},//修改登录密码
    {path:'/editPayPassword',component:editPayPassword},//修改支付密码
    {path:'/bindEmail',component:bindEmail},//绑定邮箱
    {path:'/project',component:project},/*我的项目*/
    {path:'/identifyInvest',component:identifyInvest},//认证投资人
    {path:'/createOrder',component:createOrder},//创建订单
    {path:'/payOrder',component:payOrder},//支付订单
    {path:'/buyResult',component:buyResult},//确认购买结果
    {path:'/bankList',component:bankList},//支持银行
    {path:'/message',component:message},/*消息中心*/
    {path:'/backMessage',component:backMessage},/*意见反馈*/
    {path:'/identifyInvestForm',component:identifyInvestForm},/**/
    {path:'/investorAgreement',component:investorAgreement},/**/
    {path:'/loginRegister',component:loginRegister},//登录注册页
    {path:'/licenseAgreement',component:licenseAgreement},
    {path:'/partner',component:partner},//合作伙伴
  ]
})
























