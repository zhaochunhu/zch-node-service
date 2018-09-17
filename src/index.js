//var Server = require('./server/server')
var express = require('express')
// var session = require('express-session')
// var powerexpress = require('power-express')(express)
// var bodyParser = require('body-parser')
// var cookieParser = require('cookie-parser')
// var RedisStore = require('connect-redis')(session)
// global.logger = require('./server/log/logFactory').getLogger()
// var app = powerexpress()
// var authority = require('./server/filter/authority')
// var dataService = require('./server/service/dataService.js')
// dataService.getConfigData().then(function (allConfig) {
//   console.info('配置参数加载成功...')
//   // 开发测试用
//   var sessionMiddleware = session({
//     secret: 'xiegou',
//     resave: false,
//     saveUninitialized: true,
//     store: new RedisStore({
//       host: allConfig.rd_redishost,
//       port: allConfig.rd_redisport,
//       pass: allConfig.rd_redispass
//     })
//   })
//   app.use(express.static(__dirname + '/public/dist/'))
//   // App 全局配置
//   app.use(cookieParser())
//   app.use(sessionMiddleware)
//   app.use(bodyParser.json({
//     limit: '2mb'
//   }))
//   app.use(bodyParser.urlencoded({
//     limit: '2mb',
//     extended: true
//   }))

//   // 开发时放开
//   app.use(authority.setCrossDomain)
//   app.use(require('./server/filter/accessTrace')())

//   // 上线时放开
//   // app.use(authority.check); //后台登录权限验证拦截器
//   require('./server/controllers/routes')(app)

//   var appServer = new Server(app)
//   appServer.start()
// }).catch((error) => {
//   console.info(error)
// })

