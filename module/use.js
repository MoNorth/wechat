function use (fun_name,callback) {
	var wechat = require("./wechat");
	var extend = require("./extend");
	switch(fun_name)
	{
		case 'authentication':
		{
			//微信认证
			config.app.get('/',require("./authentication"));
			break;
		}
		case 'setToken':
		{
			/**
			 *如果你是第一次请求,需要加载下列函数,不是则可忽略
			 */
			var access_token = require("./access_token");
			access_token.getToken(callback);
			break;
		}
		case 'setMenu':
		{
			/**
			 * 加载菜单,可以忽略
			 */
			var menu = require("./menu");
			menu.setMenu(callback);
			break;
		}
		case 'postData':
		{
			
			
			var postdata = require("./postdata");
			extend(wechat.prototype,postdata);

			break;
		}
		case 'session':
		{
			var session = require("./session");
			extend(wechat,session);
		}
		case 'active' : 
		{
			var active = require("./active");
			extend(wechat,active);
		}
	}
}

module.exports = use;