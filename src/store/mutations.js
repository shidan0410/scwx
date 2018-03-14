/**
 * Created by ylc on 2017/5/17.
 */
import {
  RECORD_PENSON_INFO,
  RECORD_TIPCARD,
  RECORD_RISKASSESSMENT,
  RECORD_ISVERIFY,
  RECORD_BANKCONTRACT,
  RECORD_BANKCD
} from './mutation-types.js'

import {
  setStore,
  getStore,
} from '../config/utils'

export default{
  [RECORD_PENSON_INFO](state, info) {/*记录用户信息*/
      state.personalInfo = info;
      setStore('personalInfo',info);
  },
  [RECORD_TIPCARD](state,tipcard) {/*记录是否绑卡*/
    state.tipCard = tipcard;
    setStore('tipcard',tipcard);
  },
  [RECORD_RISKASSESSMENT](state,riskAssessment){/*记录是否测评*/
    state.riskAssessment = riskAssessment;
    setStore('riskAssessment',riskAssessment);
  },
  [RECORD_ISVERIFY](state,isVerify){/*记录是否实名*/
    state.isVerify = isVerify;
    setStore('isVerify',isVerify);
  },
  [RECORD_BANKCONTRACT](state,bankContract){/*记录是否网银签约*/
    state.bankContract = bankContract;
    setStore('bankContract',bankContract);
  },
  [RECORD_BANKCD](state,bankCd){/*记录绑卡cd*/
    state.bankCd = bankCd;
    setStore('bankCd',bankCd);
  },
  saveTel(state,payload) {
    state.tel=payload.tel
  }


}
