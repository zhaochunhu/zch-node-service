/**
 * Created by tangnian on 14/11/10.
 */
var userRoutes = require('./userRoutes')
var productRoutes = require('./productRoutes')
var companyRoutes = require('./companyRoutes')
var groupRoutes = require('./groupRoutes')
var containerRoutes = require('./containerRoutes')
var containerProductRoutes = require('./containerProductRoutes')
var roleRoutes = require('./roleRoutes')
var pictureRoutes = require('./pictureRoutes')
var orderRoutes = require('./orderRoutes')
var platformRoutes = require('./platformRoutes')
var cityRoutes = require('./cityRoutes')
var adminRoutes = require('./adminRoutes')
var qiniuRoutes = require('./qiniuRoutes')
var ossUploadRoutes = require('./ossUploadRoutes')
var counterRoutes = require('./counterRoutes')
var storeRoutes = require('./storeRoutes')
var authorityRoutes = require('./authorityRoutes')
var miniAppRoutes = require('./miniAppRoutes')
var voucherRoutes = require('./voucherRoutes')
module.exports = function (app) {
  // 用户管理
  userRoutes(app)
  // 订单
  orderRoutes(app)
  // 角色管理
  roleRoutes(app)
  // 产品管理
  productRoutes(app)
  groupRoutes(app)
  containerProductRoutes(app)
  // 店铺管理
  companyRoutes(app)
  // 货柜管理
  containerRoutes(app)

  // 店铺图片资源管理
  pictureRoutes(app)
  // 平台配置管理
  platformRoutes(app)

  cityRoutes(app)

  // 后台用户管理
  adminRoutes(app)

  // 七牛上传
  qiniuRoutes(app)

  ossUploadRoutes(app)

  // 自增长
  counterRoutes(app)

  // 模版实例管理

  // 会员卡管理
  storeRoutes(app)

  // 权限管理
  authorityRoutes(app)

  miniAppRoutes(app)

  voucherRoutes(app)
}
