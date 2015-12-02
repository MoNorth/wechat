/**
 * session
 */

var session = {};
var time = 60;
config.session = true;

var createSession = function(result,callback) {
	var date = Math.floor((new Date()).getTime()/1000);
	session[result.fromusername] = {
		callback : callback,
		time : date + time
	};
	for(var i in session)
	{
		
		if(session[i].time < date)
			delete session[i];
	}
	
}

var hasSession = function(req,res) {
	var result = res.result;
	if(result.fromusername in session)
	{
		if(session[result.fromusername].time > Math.floor((new Date()).getTime()/1000))
		{
			session[result.fromusername].callback.call(this,req,res,result);
			session[result.fromusername].time -= time;
			return true;
		}
	}

	return false;
}



var setTime = function(t) {
	if(t)
		time = t;	
}

exports.createSession = createSession;
exports.hasSession =hasSession;
exports.setTime = setTime;
