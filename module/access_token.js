/**
 * 获取,更新access_token
 */
var fs = require("fs");
var request = require("request");
var path = require("path");

var plus = true;//刷新token标示,防止多次刷新
var tokenPath = path.join(__dirname, "token.txt");

/**
 * 获取access_token
 * @param  {Function} callback 回调函数,两个参数,一个是标示,成功为true,失败为false.第二个返回access_token
 */
function getToken(callback) {
	/**
	 * 将access_token保存进文件,方便多台服务器操作.
	 */
	var token = fs.readFileSync(tokenPath, "utf-8");
	//
	//
	/**
	 * 将token保存进内存
	 */
	// var token = config.access_token;
	if (token)
	{
		// var tokenObj = token; 
		var tokenObj = JSON.parse(token);
		var date = (new Date()).getTime() - 0;
		/**
		 * 判断token是否过期,过期则刷新
		 */
		if(date < (tokenObj.time - 0))
		{
			callback(true, tokenObj.access_token);
		}
		else
			reflushToken(callback);
	}
	else {
		reflushToken(callback);
	}
}


function reflushToken(callback) {
	if (plus) {
		plus = false;
		request("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + config.appid + "&secret=" + config.appsecret,
			function(err, res, body) {
				plus = true;
				if (err) {
					callback(false, err);
					return;
				}
				var data = JSON.parse(body);
				if (data.errcode) {
					callback(false, data.errmsg);
					return;
				}

				var tokenstr = {};
				tokenstr.access_token = data.access_token;
				/**
				 * 加入时间戳,用于判别是否过期
				 * @type {Date}
				 */
				var date = new Date();
				tokenstr.time = date.getTime() - 0 + (data.expires_in - 60 * 10) * 1000;

				fs.writeFile(tokenPath, JSON.stringify(tokenstr), function(err) {
					if (err)
						callback(false, err);
					else
						callback(true, data.access_token);
				});
				// 
				// config.access_token = JSON.stringify(tokenstr);
				// callback(true, data.access_token);

			}
		);
	} else
		callback(false);

}

exports.reflushToken = reflushToken;
exports.getToken = getToken;