/**
 * Test Main Page
 * Create by north
 */

var express = require("express");
var app = express();
var wechat = require("./module/wechat");
var token = require("./module/access_token");

wechat(app,'wx2d99e56a3326b348','d4624c36b6795d1d99dcf0547af5443d','northk');
// token.reflushToken();




app.listen(8080);