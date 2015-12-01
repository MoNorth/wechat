function extend (that,obj) {
	for(var i in obj)
	{
		that[i] = obj[i];
	}
}
module.exports = extend;