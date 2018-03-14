/**
 * Created by ylc on 2017/5/17.
 */
import fetch from '@/config/fetch'

// var weixin = (url) => fetch('POST','http://localhost:9000/weixin/weixinJSCheck.do',{url:url})
var weixin = (url) => fetch('POST','http://localhost:9000/SCLogin/getLoginVerifyCode.do +',{url:url})
/*上传微信图片*/
var WXSaveHeadpic = (mediaId) => fetch('POST','SCLogin/weixin/WXSaveHeadpic.do',{mediaId:mediaId})
/*获取手机动态码（需验证图形验证码）类型（1：个人注册；2：企业注册；3：修改电话号码；4：手机认证找回密码；5：贷款申请）*/
var getVerifyCodeToImg = (userPhone,imgCode,sendType) => fetch('POST','loginOut/getVerifyCodeToImg.do',{userPhone:userPhone,imgCode:imgCode,sendType:sendType})
/*获取手机动态码（登录外获取验证码）*/
var getVerifyCode = (userPhone,sendType) => fetch('POST','loginOut/getVerifyCode.do',{userPhone:userPhone,sendType:sendType})
/*重置密码获取短信验证码*/
var getVerifyAppCodeToImg = (userPhone,sendType) => fetch('POST','loginOut/getVerifyAppCodeToImg.do',{userPhone:userPhone,sendType:sendType})
/*校验手机动态码 （登录外验证）*/
var loginOutVerifiedCode = (userPhone,phoneCode,sendType) => fetch('POST','loginOut/loginOutVerifiedCode.do',{userPhone:userPhone,phoneCode:phoneCode,sendType:sendType})

/*登录内获取短信验证码*/
var getLoginVerifyCode = (sendType) => fetch('POST','SCLogin/getLoginVerifyCode.do',{sendType:sendType})
/*登录内验证验证码*/
var loginVerifiedCode = (phoneCode,sendType) => fetch('POST','SCLogin/loginVerifiedCode.do',{phoneCode:phoneCode,sendType:sendType})
var verifiedCodeUpdMoblie = (userPhone,phoneCode,sendType) => fetch('POST','SCLogin/verifiedCodeUpdMoblie.do',{userPhone:userPhone,phoneCode:phoneCode,sendType:sendType})
/*中证获取验证码*/
var sendShortMessage = (sendType) => fetch('POST','SCLogin/sendShortMessage.do',{sendType:sendType})

/*认购和撤单发送短信验证码*/
var getLoginVerifyCodeToBuy = (sendType) => fetch('POST','SCLogin/getLoginVerifyCodeToBuy.do',{sendType:sendType})
/*认购验证短信验证码*/
var loginVerifiedCodeToBuy = (phoneCode,sendType) => fetch('POST','SCLogin/loginVerifiedCodeToBuy.do',{phoneCode,sendType})
/*获取是否实名认证，网银签约，风险测评*/
var getUserState = () => fetch('POST','SCLogin/getUserState.do',{})

/*首页banner*/
var bannerList = () => fetch('POST', 'loginOut/selProductBannerList.do', {});
var companionList = () => fetch('POST','companionList.do',{});
/*精选项目*/
var projectGet = () => fetch('POST', 'loginOut/selAppProductList.do', {});

/*项目详情*/
  var productDetail = (productId) => fetch('POST','SCLogin/getProductDetail.do' , {
    productId
});

var realNameAuthenty = (idCard,investment,realName) => fetch('POST','/SCLogin/realNameAuthenty.do',{realName:realName,investment:investment,idCard:idCard});

/*订单中心列表*/
var getMyAppTenderList = (curPage,projectName,projectState) => fetch('POST','SCLogin/getMyAppTenderList.do',{curPage:curPage,projectName:projectName,projectState:projectState});
var AppOrderDetails = (orderId) => fetch('POST','SCLogin/AppOrderDetails.do',{orderId:orderId});
var appDelCloseOrder = (orderId) =>fetch('POST','SCLogin/appDelCloseOrder.do',{orderId:orderId});
var appCancelOrder = (orderId) => fetch('POST','SCLogin/appCancelOrder.do',{orderId:orderId});
var likeUserTender = (proName) => fetch('POST','SCLogin/likeUserTender.do',{proName:proName});

/*项目列表*/
var ProductList = (projectsStatus,goodPage,industryType,page) => fetch('POST','loginOut/selAppProductList.do' , {
    projectsStatus:projectsStatus || '',
    goodPage:goodPage,
    industryType:industryType || '',
    page:page
});
// 交易记录
var getRecordList = (projectType,curPage,projectName) => fetch('POST','SCLogin/dealAppRecord.do',{projectType:projectType,curPage:curPage,projectName:projectName});

/*我的项目*/
var myAppProject = (curPage,projectState) => fetch('POST','SCLogin/myAppProject.do',{curPage,projectState})

/*购买************************************/
/*查询时间是否过期*/
var overTimeJudge = () => fetch('POST','SCLogin/overTimeJudge.do',{})
/*初始购买信息*/
var initBuy = (productId) => fetch('POST','SCLogin/initOrderInfo.do',{productId:productId})
/*查询银行代扣限额*/
var selBankQuota = (bankId) => fetch('POST','SCLogin/selBankQuota.do',{bankId:bankId})
/*提交购买*/
var buyProduct = (amount,productId) => fetch('POST','SCLogin/createOrder.do',{
  amount:amount,
  productId:productId
})
/*确认支付*/
var payOrderConfirm = (amount,bankNoIndex,paymentPwd,productId,tenderId,verificationCode) => fetch('POST','SCLogin/payOrderConfirm.do',{amount,bankNoIndex,paymentPwd,productId,tenderId,verificationCode})
/*查询用户订单待支付信息*/
var waitOrderInfo = (tenderId) => fetch('POST','SCLogin/waitOrderInfo.do',{tenderId:tenderId})
/*查询用户银行卡列表*/
var selBankList = () => fetch('POST','SCLogin/selBankList.do',{})

/************************************************/
/*跟投人查询*/
var selProductInvestor = ( productId,sumNum ) => fetch('POST','SCLogin/getProductInvestor.do', { productId:productId,sumNum:sumNum});

/*邀请信息*/
var getInviteLink = () => fetch('POST','SCLogin/getInviteLink.do',{});

/*获取二维码信息*/
var getInviteQR = () => fetch('POST','SCLogin/getNewInviteQR.do', {});

/*获取测评题*/
var getRiskQuestions = () => fetch('POST','SCLogin/getRiskQuestions.do',{});
var newriskSubmit = (testqId,res) => fetch('POST','SCLogin/newRiskSubmit.do',{testqId:testqId,answer:res});

/*获取首页滚动公告*/
/*获取公告列表*/
var getNoticeList = (sumNum,type) => fetch('POST','loginOut/getNoticeList.do',{sumNum:sumNum || 1,type:1})

/*获取公告详情*/
var getNoticeDetail = (noticeId,type) => fetch('POST','loginOut/getNoticeDetail.do',{noticeId:noticeId,type:1})

/*撤单操作*/
 var returnOrder = (payPwd,projectCode,tenderId) => fetch('POST','SCLogin/returnOrder.do',{payPwd:payPwd,projectCode:projectCode,tenderId:tenderId})

/*银行卡列表查询*/
var queryBankCard = () => fetch('POST','SCLogin/queryBankCard.do',{})

/*设置用户的邀请人*/
var setIntroducerMobile = (userPhone) => fetch('POST','SCLogin/setIntroducerMobile.do',{userPhone:userPhone})

/*验证推荐人手机号是否存在*/
var checkIntroducerPhone = (txtIntroducerPhone) => fetch('POST','loginOut/checkIntroducerPhone.do',{txtIntroducerPhone:txtIntroducerPhone})

/*注册*********************************/
/*验证手机号是否已注册*/
var checkMobile = (userPhone) => fetch('POST','loginOut/checkMobile.do',{userPhone:userPhone})
var getImgVerifyCode = () => fetch('POST','getImgVerifyCode.do',{})
var verifiedPicCode = (imgCode) => fetch('POST','verifiedPicCode.do',{imgCode:imgCode})
/*注册第一步提交*/
var registFirstSubmit = (password,registerCode,userPhone) => fetch('POST',' loginOut/registFirstSubmit.do',{password:password,registerCode:registerCode,userPhone:userPhone})

/**************************/
/**登录**/
var login = (username,password,imgCode)=>fetch('POST','loginOut/userLogin.do',{username,password,imgCode})
/*退出*/
var signOut = () => fetch('POST','SCLogin/signOut.do',{})

/*基本信息*/
/*个人中心查询用户投资数量和投资数量*/
var selPresonMsgToApp = () => fetch('POST','SCLogin/selPresonMsgToApp.do',{})
/*设置个人中心敏感信息是否可见0:不可见  1：可见*/
var setPresonSensitiveInfor = (setEye) => fetch('POST','SCLogin/setPresonSensitiveInfor.do',{setEye:setEye})
/*取用户基本信息*/
var queryPersonalInfo = () => fetch('POST','SCLogin/queryPersonalInfo.do',{})
/*保存新手机号*/
var saveNewUserPhone = (newUserPhone) => fetch('POST','SCLogin/saveNewUserPhone.do',{newUserPhone:newUserPhone})
/*保存头像*/
var uploadHeadImage = (file) => fetch('POST','SCLogin/uploadHeadImage.do',{file:file})
/*发送邮件*/
var sendUserEmail = (userEmail) => fetch('POST','SCLogin/sendUserEmail.do',{userEmail:userEmail})
/*保存登录密码*/
var updRetrievePwd = (password,newPassword) => fetch('POST','SCLogin/updRetrievePwd.do',{password:password,newPassword:newPassword})
/*修改支付密码*/
var updNewPayPassword = (payPassword,newPayPassword) => fetch('POST','SCLogin/updNewPayPassword.do',{payPassword:payPassword,newPayPassword:newPayPassword})

//银行卡绑定（发送验证码）
var CheckBankCode = (bankCode,bankIdCard,bankMobile,bankUserName) =>fetch('POST','SCLogin/CheckBankCode.do',{bankCode,bankIdCard,bankMobile,bankUserName})

//绑卡发送验证码
var selSupportBank =(bankId) =>fetch('POST','SCLogin/selSupportBank.do',{bankId:bankId})
var selSupportBankList = () => fetch('POST','/SCLogin/selSupportBankList.do',{})
var registNextConfirm = (verificationCode,payPassword) => fetch('POST','SCLogin/registNextConfirm.do',{verificationCode:verificationCode,payPassword:payPassword})

/*登录时忘记密码，找回密码功能*/
var useRetrievePwd = (userPhone,phoneCode) =>fetch('POST','loginOut/useRetrievePwd.do',{userPhone:userPhone,phoneCode:phoneCode})
var useRetrieveAppPwdSubmit =(userPhone,password,confirmPassword)=>fetch('POST','loginOut/useRetrieveAppPwdSubmit.do',{userPhone:userPhone,password:password,confirmPassword:confirmPassword})
/*消息中心*/
var PCselMessageList = (curPage,msgType) =>fetch('POST','SCLogin/PCselMessageList.do',{curPage,msgType})
/*消息反馈*/
var addFeedback = (contactInfo,content) => fetch('POST','SCLogin/addFeedback.do',{contactInfo,content})

/**我要融资*/
var addFinancing = (name, mobile, email, companyName, regisTime, regisAddress, industry,type) => fetch('POST', 'loginOut/addFinancing.do', {
    name,
    mobile,
    email,
    companyName,
    regisTime,
    regisAddress,
    industry,
    type
})


export {
  getUserState,loginVerifiedCode,getLoginVerifyCode,
	loginOutVerifiedCode,getVerifyCode,getVerifyCodeToImg,
	updNewPayPassword,updRetrievePwd,selPresonMsgToApp,
	sendUserEmail,uploadHeadImage,saveNewUserPhone,
	queryPersonalInfo,registFirstSubmit,checkMobile,
	checkIntroducerPhone,setIntroducerMobile,projectGet,
	productDetail,getMyAppTenderList,AppOrderDetails,likeUserTender,selProductInvestor,
	getInviteLink,getInviteQR,getRecordList,getRiskQuestions,
	newriskSubmit,getNoticeList,getNoticeDetail,
	queryBankCard,bannerList,companionList,getImgVerifyCode,login,sendShortMessage,
  	verifiedPicCode,selSupportBank,initBuy,selBankQuota,buyProduct,selBankList,registNextConfirm,
  	useRetrievePwd,useRetrieveAppPwdSubmit,selSupportBankList,signOut,setPresonSensitiveInfor,returnOrder,
    weixin,verifiedCodeUpdMoblie,WXSaveHeadpic
    ,overTimeJudge,waitOrderInfo,myAppProject,realNameAuthenty,getLoginVerifyCodeToBuy,payOrderConfirm,
  CheckBankCode,getVerifyAppCodeToImg,loginVerifiedCodeToBuy,appDelCloseOrder,appCancelOrder,ProductList
  ,PCselMessageList,addFeedback,addFinancing

}






