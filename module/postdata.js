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
	console.log(resultstr);
	this.send(resultstr);
}



exports.retext = function(callback) {
	text = callback;
};
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
	switch (data.msgtype) {
		case 'text':
			text(true, req, res, data);
			break;
		default:
			defaultMsg(true, req, res, data);

	}



}


config.app.post('/', getPost);