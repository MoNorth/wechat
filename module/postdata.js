/**
 * 获取微信服务器post的数据,及与客户的交互
 */


var xml_bodyparser = require("express-xml-bodyparser");

config.app.use(xml_bodyparser());

function getPost(req,res,next) {
	if(!res.body)
	{
		//e
	}

	var data = res.body.xml;

	if(!data)
	{
		//e
	}

	// switch(data.)



}


config.app.post('/',function(req,res,next) {
	console.log(req.body);
	res.send("");
});