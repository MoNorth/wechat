/**
 * 管理素材
 * 暂时不写
 */
// var token = require("./access_token");
// var request = require("request");

// function addMaterial(material,callback) {
// 	token.getToken(function(ok,result) {
// 		if(!ok)
// 		{
// 			callback(false,result);
// 			return;
// 		}
// 		var url = "https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=" + result;

// 		request({
// 			url: url,
// 			method : 'POST',
// 			form: material
// 		},function(err,res,body) {
// 			if(err)
// 			{
// 				callback(false,err);
// 				return;
// 			}
// 			body = JSON.parse(body);



// 		});

// 	});
// }