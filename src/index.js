var Server = require('./server/server')
var express = require('express')
var app = express()
var sessionMiddleware = session({
    secret: 'xiegou',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        host: allConfig.rd_redishost,
        port: allConfig.rd_redisport,
        pass: allConfig.rd_redispass
    })
})
app.use(express.static(__dirname + '/public/dist/'))
app.use(cookieParser())
app.use(sessionMiddleware)
app.use(bodyParser.json({
    limit: '2mb'
}))
app.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true
}))
app.use(authority.setCrossDomain)
app.use(require('./server/filter/accessTrace')())
require('./server/controllers/routes')(app)
var appServer = new Server(app)
appServer.start()

