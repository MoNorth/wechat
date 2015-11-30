/**
 * 菜单操作
 * 设置菜单
 * 获取菜单等
 */


var fs = require("fs");
var token = require("./access_token");
var path = require("path");
var menuPath = path.join(__dirname, "menu.json");
var request = require("request");


//表示,防止多次加载菜单
var plus = true;


/**
 * 获取菜单
 * @param {Function} callback 回调函数,两个参数,第一个为标示,true标示成功,false表示失败,第二个为错误内容,ok为成功
 */
function setMenu(callback) {
	if (!plus)
		return;
	plus = false;
	/**
	 * 获取菜单文件menu.js
	 */
	fs.readFile(menuPath, "utf-8", function(err, data) {
		if (err) {
			callback(false, err);
			return;
		}
		/**
		 * 获取access_token
		 */
		token.getToken(function(ok, result) {
			if (!ok) {
				callback(false, result);
				return;
			}
			var url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + result;

			/**
			 * 利用request模块进行post请求
			 */
			request({
				url: url,
				method : 'POST',
				form: data

			}, function(err, res, body) {
				plus = true;
				if (err) {
					callback(false, err);
					return;
				}
				body = JSON.parse(body);
				switch (body.errcode) {
					case 0:
						callback(true,body.errmsg);
						break;
					case 42001:
					/**
					 * access_token过期,其他的错误没有列出,可根据需求自行增加                                                                                                    [description]
					 */
						token.reflushToken(function(ok,result){
							if(!ok)
								callback(false,result);
							else
								setMenu(callback);

						});
						break;
					default:
						callback(false,body.errmsg);
				}

			});
		});
	});


}

function getMenu(callback) {
	token.getToken(function(ok,result) {
		if(!ok)
		{
			callback(false,result);
			return;
		}
		var url = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=" + result;
		request(url,function(err,res,body) {
			if(err)
			{
				callback(false,err);
				return;
			}
			callback(true,JSON.parse(body));

		});
	})
}

exports.setMenu = setMenu;
exports.getMenu = getMenu;