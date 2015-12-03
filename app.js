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
	'你好':[
		{
			Title : "lalal",
			Description : "描述啦啦啦",
			PicUrl : "http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png",
			Url : "http://www.qq.com/"
		},
		{
			Title : "lalal",
			Description : "描述啦啦啦",
			PicUrl : "http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png",
			Url : "http://www.qq.com/"
		},
		{
			Title : "lalal",
			Description : "描述啦啦啦",
			PicUrl : "http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png",
			Url : "http://www.qq.com/"
		},
		{
			Title : "lalal",
			Description : "描述啦啦啦",
			PicUrl : "http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png",
			Url : "http://www.qq.com/"
		},
		{
			Title : "lalal",
			Description : "描述啦啦啦",
			PicUrl : "http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png",
			Url : "http://www.qq.com/"
		}
	],
	我们 : '我们怎么了',
	你妈逼 : '你个傻逼',
	hello : function(req,res,result) {
		wechatapp.createSession(result,function(req,res,result) {
			if(result.content === "你好")
				res.sendText("我一点也不好");
			else
				res.sendText("输错利润");
		});
		res.sendText("请在此输入");
	}
},'什么');


// wechatapp.reclick(function(ok,req,res,result) {
// 	switch(result.eventkey)
// 	{
// 		case 'V1001_GOOD':
// 			res.sendText("点赞");
// 			break;
// 		case 'V1001_TODAY_MUSIC':
// 			res.sendText("歌曲啊");
// 		default:
// 			res.sendText("什么啊");
// 	}
// })
wechatapp.reclick({
	'V1001_GOOD':
		function(req,res,result) {
			wechatapp.createSession(result,function(req,res,result) {
				if(result.content === "so")
					res.sendText("so too");
				else
					res.sendText("too");
			});
			res.sendText("请在此输入");
		}
},"点了歌曲");


// console.log(config.session);

app.listen(8080);