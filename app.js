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
wechatapp.retext(function(ok,req,res,result) {
	console.log(result);
	res.sendText("nihaoya");
});


app.listen(8080);