/**
 * 微信认证
 */

//引入加密模块
var crypto = require('crypto');



/**
 * 计算shal值
 * @param  {string}  signature 
 * @param  {string}  timestamp 
 * @param  {string}  nonce     
 * @param  {string}  token     你自己的token
 * @return {Boolean}           认证成功与否
 */
function isLegel(signature, timestamp, nonce, token) {
	var array = new Array();
	array[0] = timestamp;
	array[1] = nonce;
	array[2] = token;
	array.sort();
	var hasher = crypto.createHash("sha1");
	var msg = array[0] + array[1] + array[2];
	hasher.update(msg);
	msg = hasher.digest('hex'); //计算SHA1值
	if (msg === signature) {
		return true;
	} else {
		return false;
	}
}


/**
 * 微信认证中间件
 * 
 */
var authentication = function(req, res, next) {      
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var echostr = req.query.echostr;
	if(isLegel(signature,timestamp,nonce,config.token))
	{
		console.log("ok");
		res.send(echostr);

	}
	else
	{
		console.log("error");
		res.end("");
	}
}

module.exports = authentication;