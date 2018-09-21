'use strict'
var Q = require('q')
var request = require('request')
var https = require('http')
var redisDao = require('../storage/redisDao')
var commonUtil = require('../helpers/commonUtil')
var constants = require('../helpers/constants')

class NoticeTemplate {
  init (config) {
      constants = config
  }

  // 优惠券到期提醒模板
  newOrderNotice (touser, url, orderId, state, remark) {
    console.log('模版信息发红')
    // 获取微信令牌并发送模版信息
    var appKey = constants.WeixinConstants.APPID
    console.log('appKey:' + appKey)

    return redisDao.get('' + appKey + 'access_token').then(function (data) {
      console.log('access_token', data)
      console.info(data)
      if (data) {
        var deferred = Q.defer()
        var access_token = data
        var data = {
          'touser': touser,
          // 临时使用优惠券到账的模板,等 优惠券到期提醒申请成功之后再更换
          'template_id': constants.TemplateConstants.WX_TEMPLATE_NEWORDER,
          'url': url,
          'topcolor': '#FF0000',
          'data': {
            'first': {
              'value': '有新的订单待处理',
              'color': '#000000'
            },
            'OrderSn': {
              'value': orderId,
              'color': '#000000'
            },
            'OrderStatus': {
              'value': state,
              'color': '#000000'
            },
            'remark': {
              'value': remark,
              'color': '#000000'
            }
          }
        }
        logger.info(JSON.stringify(data))
        request.post({
          url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token,
          form: JSON.stringify(data)
        }, function (error, response, body) {
          console.log('body', body)
          if (!error) {
            var data = JSON.parse(body)
            console.log('data', data)
            deferred.resolve(data.result)
          } else {
            console.info('推送优惠券提醒失败')
            console.info(body)
            deferred.reject(new Error(err))
          }
        })
        return deferred.promise
      }else {
        return Q(false)
      }
    })
  }
}

module.exports = new NoticeTemplate()
