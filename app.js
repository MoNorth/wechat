/**
 * Test Main Page
 * Create by north
 */

var express = require("express");
var app = express();
var wechat = require("./module/wechat");
var token = require("./module/access_token");

wechat(app,'','','');
// token.reflushToken();




app.listen(8080);