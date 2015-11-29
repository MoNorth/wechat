/**
 * wechat主文件
 */


var crypto = require('crypto');


var config = {
	app: null,
	appid: '',
	appsecret: '',
	token: ''
}

/**
 * 
 * 初始化文件
 * @param  {string}   app     [express对象]
 * @param  {string}   appid     [微信所获取的appid]
 * @param  {string}   appsecret [微信所获取的appsecret]
 * @param  {string}   token     [你的token]
 * @param  {Function} callback  [回调函数,两个参数,err和result]
 * @return {object}             [返回wechat的函数接口]
 */
var wechat = function(app, appid, appsecret, token, callback) {
	config.app = app;
	config.appid = appid;
	config.appsecret = appsecret;
	config.token = token;

	app.get('/',authentication);

};

function isLegel(signature, timestamp, nonce, token) {
	var array = new Array();
	array[0] = timestamp;
	array[1] = nonce;
	array[2] = token;
	array.sort();
	var hasher = crypto.createHash("sha1");
	var msg = array[0] + array[1] + array[2];
	hasher.update(msg);
	msg = hasher.digest('h<span></span>ex'); //计算SHA1值
	console.log(msg);
	console.log(signature);
	if (msg === signature) {
		return true;
	} else {
		return false;
	}
}

var authentication = function(req, res, next) {
	// //
	//        $signature = $_GET["signature"];
	//        $timestamp = $_GET["timestamp"];
	//        $nonce = $_GET["nonce"];
	//        
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


module.exports = wechat;

