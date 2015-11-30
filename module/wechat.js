/**
 * wechat主文件
 */


require("./config");
var access_token = require("./access_token");


var authentication = require("./authentication");

var menu = require("./menu");

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
	//微信认证
	app.get('/',authentication);


	/**
	 *如果你是第一次请求,需要加载下列函数,不是则可忽略
	 */
	access_token.getToken(function(ok,result) {
		console.log(result);
	});
	/**
	 * 加载菜单,可以忽略
	 */
	menu.setMenu(function(ok,result) {
		console.log(result);
	});
	/**
	 * 获取菜单
	 */
	// menu.getMenu(function(ok,result) {
	// 		console.log(result);
	// 	});


};






module.exports = wechat;

