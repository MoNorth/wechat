/**
 * 获取微信服务器post的数据,及与客户的交互
 */


var xml_bodyparser = require("express-xml-bodyparser");

config.app.use(xml_bodyparser({explicitArray:false,trim:true}));

var tool = require("./tool");


var text = function(ok, req, res, result) {
	console.log("text");
	res.send("");
}


var click = function(ok,req,res,result) {
	console.log("click");
	res.send("");
}

var defaultMsg = function(ok, req, res, result) {
	console.log(result);
	res.send("");
}

var sendText = function(data) {
	var result = {
		ToUserName : this.result.fromusername,
		FromUserName : this.result.tousername,
		CreateTime : Math.floor((new Date()).getTime()/1000),
		MsgType : 'text',
		Content : data
	};
	var resultstr = tool.jsonToXml(result);
	// console.log(resultstr);
	this.send(resultstr);
}


var sendNews = function(data) {
	if(!data.length || typeof data.length != "number")
	{
		this.send("");
		console.log("输入图文信息错误");
		return;
	}
	if(data.length > 10)
	{
		this.send("");
		console.log("输入图文信息过长");
		return;
	}
	var result = {
		ToUserName : this.result.fromusername,
		FromUserName : this.result.tousername,
		CreateTime : Math.floor((new Date()).getTime()/1000),
		MsgType : 'news',
		ArticleCount : data.length,
		Articles : {
			item : data
		}
	}
	var resultstr = tool.jsonToXml(result);
	console.log(resultstr);
	this.send(resultstr);
}


var events = function(ok,req,res,result) {
	switch(result.event)
	{
		case 'CLICK':
			click(ok,req,res,result);
			break;
		default:
			defaultMsg(ok, req, res, result);
	}
}


var switchdata = function(sdata,req,res,result,callback,defaultText) {
	if(sdata in callback)
			{
				if(typeof callback[sdata] === "function")
				{
					callback[sdata].call(this,req,res,result);
				}
				else if(typeof callback[sdata] === "string")
					res.sendText(callback[sdata]);
				else if(typeof callback[sdata] === "object")
					res.sendNews(callback[sdata]);
			}
			else
				if(typeof defaultText === "function")
					defaultText.call(this,req,res,result);
				else if(typeof defaultText === "string")
					res.sendText(defaultText);
				else if(typeof defaultText === "object")
					res.sendNews(defaultText);
}



exports.retext = function(callback,defaultText) {
	if(typeof callback === "function")
	{
		text = callback;
		return;
	}
	if(typeof callback === "object")
	{
		text =  function(ok,req,res,result) {
			switchdata(result.content,req,res,result,callback,defaultText);
		}
	}
};


exports.reclick = function(callback,defaultText) {
	if(typeof callback === "function")
	{
		click = callback;
		return;
	}
	if(typeof callback === "object")
	{
		click =  function(ok,req,res,result) {
			switchdata(result.eventkey,req,res,result,callback,defaultText);
		}
	}
}


exports.redefaultMsg = function(callback) {
	defaultMsg = callback;
};


function getPost(req, res, next) {
	if (!req.body) {
		//e
		console.log("no res.body");
		res.send("");
		return;
	}

	var data = req.body.xml;

	if (!data) {
		//e
		console.log("no res.body.xml");
		res.send("");
		return;
	}
	res.result = data;
	res.sendText = sendText;
	res.sendNews = sendNews;
	if(config.session)
	{
		if(require("./session").hasSession(req,res))
			return;
	}
	switch (data.msgtype) {
		case 'text':
			text(true, req, res, data);
			break;
		case 'event':
			events(true,req,res,data);
			break;
		default:
			defaultMsg(true, req, res, data);

	}



}


config.app.post('/', getPost);