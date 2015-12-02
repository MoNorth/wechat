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

## 2015年12月2日新增
### 新增说明
这次的更新,我将微信的认证,以及菜单的管理,全部做成了可单独使用的中间件,方便了使用.新增了对于文本信息的处理和文本信息的回复,具体使用方式请看下边
### 使用说明
#### 引入(由于本项目是基于express 4.X的,所以此项必须引入)
```javascript
var express = require("express");
var app = express();
var wechat = require("./moudle/wechat");//此处引入本项目.
var wechatapp = new wechat(app,"YOU APPID","YOU SECRET","YOU TOKEN");//初始化
```
####ok,那么接下来就介绍一下组件的使用
1. 使用微信认证(第一次与微信服务器链接需使用).

   ```javascript
   wechatapp.use("authentication");
   ```
   是要输入上述代码,即可引入微信认证.
2. 加载菜单,由于微信规定,在使用自定义菜单的时候,隔夜才能生效,如果要立即生效,请把微信号取消关注后,重新关注即可.
   在文件`moudle/menu.json`中,可以进行自由配置菜单,下面贴出一则示例.

   ```javascript
    {
       "button": [{
         "type": "click",
         "name": "今日歌曲",
         "key": "V1001_TODAY_MUSIC"
       }, {
         "name": "菜单",
         "sub_button": [{
           "type": "view",
           "name": "搜索",
           "url": "http://www.soso.com/"
         }, {
           "type": "view",
           "name": "视频",
           "url": "http://v.qq.com/"
         }, {
           "type": "click",
           "name": "赞一下我们",
           "key": "V1001_GOOD"
         }]
       }]
     }
   ```
   然后在你得主文件中加入下面这句话.

   ```javascript
   wechatapp.use("setMenu",callback);
   ```
   第二个参数`callback`,是加载完成后微信服务器所返回的信息.有两个参数,`ok`和`result`如果成功,`ok`则为`true`,`result`为`ok`,如果失败,`ok`为`false`,`result`为错误信息.
   
3. 第三项应该下载开头的,算了,这都是无伤大雅的事情.这一项为`_access_token`的加载.`access_token`在本项目中有两种存储方式,一种是存在内存中,一种是存在`moudle/token.txt`,为什么是`txt`文件呢,可能是当时手误,请忽略,我会改正的.现在的情况而言,我本没有选择去加载在内存中,因为要经常调试,服务器一直开开关关,保存在内存中的话再次开启又要重新加载,实属下下策,所以目前默认是加载在文件中,目前没有些配置的方法,以后肯定会有,当然我也在`access_token.js`文件中写出来了,取消注释即可.下面贴出调用方法.

   ```javascript
   wechatapp.use("setToken",callback);
   ```
   对于第二个参数callback,请参考设置菜单的那个,一样的.
4. 使用text处理,不多说了,先贴代码.

   ```javascript
   wechatapp.use("postData");
   ```
   在加载了`postData`之后,则就可以使用一些`wechatapp`的函数了.

   ```javascript
   wechatapp.retext();
   ```
   这个函数目前有两种使用方式,以后会继续完善.第一种是出入一个函数,类似于.

   ```javascript
   wechatapp.retext(function(ok,req,res,result){});
   ```
   这个函数中有四个参数,第一个标示状态,是否成功,第二三个就不用说了吧.第四个为接受的消息的内容,以处理为json对象.如下.

   ```javascript
   { tousername: 'gh_dddaf1dc8cac',
      fromusername: 'oAftgt8hb4G8ol72ouqq5yg1mguc',
      createtime: '1449038559',
      msgtype: 'text',
      content: 'urbr',
      msgid: '6223573221949042514' }

   ```
   在处理完消息后,可直接进行回复.使用以下语句.,如回复"你好".

   ```javascript
   res.sendText("你好");
   ```
   `reText`函数的第二种使用方式有两个参数,第一个为一个对象,键为用户发的消息,值为回复.第二个参数为默认回复的话.如下.

   ```javascript
   wechatapp.reText({
    '你好' : '你也好',
    'How are you?' : 'I\'m fine'
    },'你说什么,我不清楚');
   ```
5. 还有`redefaultMsg`函数,使用方法与`reText`相同.

6. 别的函数.

   ```javascript
   wechatapp.reflushToken(callback);//刷新token
   wechatapp.getToken(callback);//获取token
   wechatapp.setMenu(callback);//设置餐单
   wechatapp.getMenu(callback);//获取菜单
   ```
7. 工具函数

   ```javascript
   var tool = require("./moudle/tool.js");
   tool.jsonToXml({});//将json文件格式化为满足微信消息的xml格式
   var extend = require("./moudle/extend.js");
   extend(obj1,obj2);//将obj2的静态方法继承给obj1
   ```
