var koa = require('koa');
//一个工具类
var util = require('util');
var route = require('koa-route');
var request = require('request');
//这个用于作为用户id
var globalUserId = 1;
var app = new koa()
var uri = 'http://127.0.0.1:8000/buy?userid=%d';
var timeout = 30 * 1000;//超时30s
//设置路由
app.use(route.get('/buy',function *(){
  var num = globalUserId ++;
  request({
    method:'GET',
    timeout:timeout,
    uri:util.format(uri,num)
  },function(error,req_res,body){
    if(error){
      this.status = 500
      this.error = error
    }else if(req_res.status != 200){
      this.status = 500
    }else{
      this.body = body
    }
  })
}))
app.listen(6000,function(){
  console.log('server listen on 6000');
})