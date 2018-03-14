/**
 * Created by ylc on 2017/5/17.
 */


import { baseUrl } from './env'
import 'fetch-detector'
import 'fetch-ie8'
import { Encrypt } from './utils'
require('es6-promise/auto');
require('sha1');

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method == 'fetch'){
    let requestConfig = {
      // credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      mode: "cors",
      cache: "default"
    }

    if (type == 'POST'){
      let str = '';

      var openid = localStorage.openid;
      var imeiId;

      

      // JsObject.showToast("-------"+location.search)
      var _url = window.location.hash; 
 
      if(_url.indexOf("type") != -1){/*判断从app打开*/
        imeiId = JsObject.getIMEI_ID();
        // JsObject.showToast("-------"+imeiId)
      }else{
        imeiId = Encrypt(openid);
      }
      
      var tokenId = localStorage.tokenid||'';
      // console.log(openid);
      //console.log(imeiId);
      //console.log(tokenId);
      if(url.indexOf('SCLogin') > -1){//登录内接口
        data.TOKENID = tokenId;
      }
      data.IMEIID = imeiId;
      Object.keys(data).forEach(key => {
        str += key + '=' + data[key] + '&';
      });
      Object.defineProperty(requestConfig, 'body', {
        value:str
      });
    }

    try {
      var response = await fetch(url,requestConfig);
      var responseJson = await response.json();
      // console.log("-------------"+JSON.stringify(responseJson))
      if(responseJson.code == '999'){
        window.location.href = '#/loginRegister';
        document.title = "登录"
      }
    } catch (error) {
      throw new Error(error)
    }

    return responseJson
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
