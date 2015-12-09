/**
 * 主动发送消息
 */
var token = require("./access_token");
var request = require("request");
var active = function(openid,content,callback) {
	if(typeof openid === "string")
		openid = [openid];
	token.getToken(function(ok, result) {
			if (!ok) {
				callback(false, result);
				return;
			}
			var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + result;
			for(var i in openid)
			{
				var data = {
				    "touser": openid[i],
				    "msgtype":"text",
				    "text":
				    {
				         "content":content
				    }
				};
				request({
					url: url,
					method : 'POST',
					form: JSON.stringify(data)
				},
				function(err,res,body) {
					if(err)
					{
						callback(false,err);
						return;
					}
				    body = JSON.parse(body);
					if(body.errcode === 0)
					{
						callback(true,body.errmsg);
					}
					else
						callback(false,body.errmsg);

				});
			}

		});
}


exports.active = active;