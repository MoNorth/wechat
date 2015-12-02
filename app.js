/**
 * Test Main Page
 * Create by north
 */

var express = require("express");
var app = express();
var wechat = require("./module/wechat");

var wechatapp = new wechat(app, 'wx2d99e56a3326b348', 'd4624c36b6795d1d99dcf0547af5443d', 'northk');
// token.reflushToken();
// wechatapp.getMenu(function(ok, result) {
// 	if (ok)
// 		console.log(result);
// });
// wechatapp.use("setToken",function(ok,result) {
// 	console.log(result);
// });
// 

// wechatapp.use("setMenu",function(ok,result) {
// 	console.log(result);
// });
wechatapp.use("postData");
// wechatapp.retext(function(ok,req,res,result) {
// 	console.log(result);
// 	res.sendText("nihaoya");
// });
// 
wechatapp.use("session");
wechatapp.retext({
	'你好':'你也好',
	我们 : '我们怎么了',
	你妈逼 : '你个傻逼',
	hello : function(req,res,result) {
		wechatapp.createSession(result,function(req,res,result) {
			if(result.content === "你好")
				res.sendText("我一点也不好");
		});
		res.sendText("请在此输入");
	}
},'什么');


// console.log(config.session);

app.listen(8080);