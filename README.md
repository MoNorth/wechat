# nodejs微信模板
前一阵又拿起了nodejs,原因就是刚好接手了一个微信后台开发的项目,我想来想去,觉得还是用nodejs做这个开发会比较方便.所以我也就试试它.网上有不少已经很完善的node-wechat模块,或许是我比较任性吧,就像自己写写.才开始了一点点.
## git clone 地址
[https://github.com/MoNorth/wechat.git](https://github.com/MoNorth/wechat.git)
```bash
git clone https://github.com/MoNorth/wechat.git
```
## 使用
```javascript
var express = require("express");
var app = express();
var wechat = require("./module/wechat");
var wechatApp = wechat(app,"YOU APPID","YOU SECRET","YOU TOKEN");
app.listen(8080);
```