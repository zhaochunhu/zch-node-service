'use strict'
var ytx = require('node-ytx')
var redisDao = require('../storage/redisDao')
var logger = require('../log/logFactory').getLogger()

class SmsTemplate {
  /**
   *@apiDescription 短信提醒模板调用
   *@param   phone        string    需要短信通知的手机号码
   *@param   msgString    array     需要发送的短信内容模版的填充数据(如果需要将短信发送给多个人  格式：'10086,10086',......)
   *@param   msgType      string    发送短信所需要的模版类型
   *@return
   */
  smsNotice (appId, phone, msgString, msgType) {
    return new Promise(function (resolve, reject) {
      // 获取微信令牌并发送模版信息
      var config = {
        url: 'app.cloopen.com',
        port: 8883,
        version: '2013-12-26',
        appId: appId,
        accountSid: '8aaf0708554d8271015556b33ec70e72',
        accountToken: '4c5dda9799444ecc83465a1cae41370b'
      }
      ytx.init(config)
      ytx.smsTemplate(phone, msgString, msgType, function (error, data) {
        if (!error) {
          try {
            var json = JSON.parse(String(data))
            var statusCode = json.statusCode
            if (statusCode === '000000') {
              redisDao.set(phone, msgString)
              redisDao.expire(phone, 180) // 3m
              resolve({code: 100})
            } else if (statusCode === '160039' || statusCode === '160040') {
              logger.error('短信次数超过当天限制' + phone)
              resolve({code: 101})
            } else if (statusCode === '160013' || statusCode === '160042') {
              logger.error('号码格式不对或者该号码不支持' + phone) // 超出当日发送限额
              resolve({code: 102})
            }else if (statusCode === '112328') {
              logger.error('电话号码参数含有非法字符' + phone) // 超出当日发送限额
              resolve({code: 103})
            }else if (statusCode === '160050' || statusCode === '112326') {
              logger.error('短信发送失败' + phone)
              resolve({code: 104})
            }else if (statusCode === '160038') {
              logger.error('短信验证码发送过频繁' + phone)
              resolve({code: 105})
            }else {
              logger.error('短信发送失败' + phone)
              logger.error('短信发送失败原因' + JSON.stringify(json))
              resolve({code: 104})
            }
          } catch (error) {
            logger.error('调用发送短信异常:' + JSON.stringify(error))
            reject(error)
          }
        } else {
          logger.error('调用发送短信出错:' + JSON.stringify(error))
          reject(error)
        }
      })
    })
  }

  // 用户注册验证码
  * registerSms (phone, msgString) {
    var appId = '8a216da8555d110e0155720d01011d78'
    var msgType = '94842'
    var data = yield this.smsNotice(appId, phone, msgString, msgType)
    if (data.code) {
      return data
    } else {
      return false
    }
  }

  * forgetPassword (phone, msgString) {
    var appId = '8a216da8555d110e0155720d01011d78'
    var msgType = '94831'
    var data = yield this.smsNotice(appId, phone, msgString, msgType)
    if (data.code) {
      return data
    } else {
      return false
    }
  }

  * phoneLogin (phone, msgString) {
    var appId = '8a216da8555d110e0155720d01011d78'
    var msgType = '150970'
    var data = yield this.smsNotice(appId, phone, msgString, msgType)
    if (data.code) {
      return data
    } else {
      return false
    }
  }

  * newOrder (phone, msgString) {
    var appId = '8a216da855e8eb7b0155ed60419a0368'
    var msgType = '131863'
    var data = yield this.smsNotice(appId, phone, msgString, msgType)
    if (data.code) {
      return data
    } else {
      return false
    }
  }

}

module.exports = new SmsTemplate()
