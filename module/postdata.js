/**
 * 获取微信服务器post的数据,及与客户的交互
 */


var xml_bodyparser = require("express-xml-bodyparser");

config.app.use(xml_bodyparser());

function getPost(req, res, next) {
	if (!res.body) {
		//e
		console.log("no res.body");
		res.send("");
	}

	var data = res.body.xml;

	if (!data) {
		//e
		console.log("no res.body.xml");
		res.send("");
	}

	switch (data.msgtype[0]) {
		case 'text':
			text(true, req, res, data);
			break;
		default:
			defaultMsg(true, req, res, data);

	}



}



var text = function(ok, req, res, result) {
	console.log(result);
	res.send("");
}

var defaultMsg = function(ok, req, res, result) {
	console.log(result);
	res.send("");
}


config.app.post('/', getPost);

exports.text = text;
exports.defaultMsg = defaultMsg;