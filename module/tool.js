var xml2js = require("../node_modules/express-xml-bodyparser/node_modules/xml2js");
var buildXml = new xml2js.Builder();


var jsonToXml = function(json) {
	return buildXml.buildObject({xml:json}).replace(/<\?xml.*?\?>\s*/,"");
}


exports.jsonToXml = jsonToXml;



var addCDATA = function(obj) {
	for(var i in obj)
	{
		if(typeof obj[i] !== "number")
			obj[i] = '<![CDATA[' + obj[i] + ']]>';
	}
	return obj;
}
exports.addCDATA = addCDATA;