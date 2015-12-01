/**
 * wechat主文件
 */


require("./config");
var access_token = require("./access_token");


var authentication = require("./authentication");

var menu = require("./menu");

var extend = require("./extend");




/**
 * 
 * 初始化文件
 * @param  {string}   app     [express对象]
 * @param  {string}   appid     [微信所获取的appid]
 * @param  {string}   appsecret [微信所获取的appsecret]
 * @param  {string}   token     [你的token]
 * @return {object}             [返回wechat的函数接口]
 */
var wechat = function(app, appid, appsecret, token) {
	config.app = app;
	config.appid = appid;
	config.appsecret = appsecret;
	config.token = token;
	this.use = require('./use');

};

extend(wechat.prototype,access_token);
extend(wechat.prototype,menu);







module.exports = wechat;

