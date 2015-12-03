# 微信后台开发nodejs模块
由于本人手闲,开发了基于nodejs express的用于开发微信的一个模块件,写的不好,见笑了.
然而并没有写完,先凑合着用吧.
## git clone 地址
[https://github.com/MoNorth/wechat.git](https://github.com/MoNorth/wechat.git)
```bash
git clone https://github.com/MoNorth/wechat.git
```
## 安装
```bash
npm install wechat-node
```
## 使用
**由于本项目是基于express写的,所以使用前请大家先安装express 4.X模块 `npm install express`**
### 初始化
```javascript
var express = require("express");
var app = express();
var wechat_node = require("wechat-node");
var wechat = new wechat_node(app,"YOU APPID","YOU SECRET","YOU TOKEN");
/**
 * 你的代码
 */
app.listen(8080);//监听端口与IP随意,这块只是示例.
```
### 基本组件
#### 微信认证
如果你的服务器并没有与微信服务器进行过交互,也就是还没有进行认证的话,这块就得加载这个模块,如果已经认证过了,就不需要了.当然,加了也没事.
```javascript
wechat.use("authentication");
```
#### 加载access_token
`access_token`在本项目中有两种存储方式,一种是存在内存中,一种是存在`moudle/token.txt`,为什么是`txt`文件呢,可能是当时手误,请忽略,我会改正的.现在的情况而言,我本没有选择去加载在内存中,因为要经常调试,服务器一直开开关关,保存在内存中的话再次开启又要重新加载,实属下下策,所以目前默认是加载在文件中,目前没有些配置的方法,以后肯定会有,当然我也在`access_token.js`文件中写出来了,取消注释即可.下面贴出调用方法.

```javascript
wechat.use("setToken",callback);
```
对于第二个参数callback,请参考设置菜单的那个,一样的.对于此项的加载是针对于第一次调试的,如果你已经有过请求access_token,则不需要此项,加上只会多请求一次.
#### 加载菜单
由于微信规定,在使用自定义菜单的时候,隔夜才能生效,如果要立即生效,请把微信号取消关注后,重新关注即可.

在文件`node_moudles/wechat-node/moudle/menu.json`中,可以进行自由配置菜单,下面贴出一则示例.

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
wechat.use("setMenu",callback);
```
第二个参数`callback`,是加载完成后微信服务器所返回的信息.有两个参数,`ok`和`result`如果成功,`ok`则为`true`,`result`为`ok`,如果失败,`ok`为`false`,`result`为错误信息.
#### 数据处理
这块是重点,由于要进行微信端与服务器端的数据交互,所以有了此模块,这个模块将把你的交互变得十分简单.但由于时间问题(到现在开发不过几天),所以只处理了一些,我这块没有写的,还需要大家自行处理.当然,要应用此模块,需要先导入一下.

```javascript
wechat.use("postData");
```
##### 发送消息
先写发送吧,本来应该是先写接受的,但是由于接受后总要回复个啥,所以就把发送先写了吧.在本项目中,只有被动回复,也就是用户发了个啥,然后自动回一条东西.所以说不完善,还请大家谅解,接下来会改善的.
###### 文本消息
由于是被动回复消息,所以回复会在你的消息处理函数中,必然会存在`res`对象,回复功能我也写进`res`对象了.

```javascript
res.sendText("你好");
```
这样就回复了一句`你好`给用户.
###### 图文消息
图文消息的回复必须是数组,这块应该有重点 **必须是数组**

```javascript
res.sendNews([
    {
      Title : "demo",//图文消息标题
      Description : "demo",//图文消息描述
      PicUrl : "demo",//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
      Url : "demo"//点击图文消息跳转链接
    },
    {
      Title : "demo",//图文消息标题
      Description : "demo",//图文消息描述
      PicUrl : "demo",//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
      Url : "demo"//点击图文消息跳转链接
    },
    {
      //...
    }
  ])
```
多条图文消息信息，默认第一个对象的图片为大图,注意，如果图文数超过10，则将会无响应 
###### 空回复
空回复就是什么都不会,就是不响应,但也不能报错.

```javascript
res.send();
```

##### 接受消息
在这里我只做了常用的两种数据的接受,文本消息和按钮点击消息
###### 文本消息
本项目中对于文本消息的处理有两种方式,第一种是重写处理方法.

```javascript
wechat.retext(function(ok,req,res,result){
/**
 * 你的代码
 */
});
```
微信发送的数据已经全部封装进了result对象,下面贴出一个示例

```javascript
{
  tousername : "demo",//开发者微信号 
  fromusername : "demo",//发送方帐号（一个OpenID） 
  createtime : "demo",//消息创建时间 （整型
  msgtype : "demo",//text 
  content : "demo",//文本消息内容 
  msgid : "demo"//消息id，64位整型 
}
```
其实你只需要对其中的content进行处理就好了.里面就是用户发送来的字符串.

当然还有第二种处理方式,这就简单粗暴到爆了.第二种只需要两个参数,一个对象,一个默认就可以了,具体看代码.

```javascript
wechat.retext({
      "你好" : "你也好", //这种前者是用户发送的数据,后面是你的服务器自动回复的数据.
      "早上好" : [
                  {
                    Title : "demo",
                    Description : "demo",
                    PicUrl : "demo",
                    Url : "demo"
                  }
                ],//这是图文消息,格式遵从发送图文的格式.
      "下午好" : function(req,res,result)
                {
                  /**
                   * 你的代码
                   */
                }//这是方法处理,对于要加session呀之类都可以这样处理.
  },
    "默认回复"//这是第二个参数,是默认的,就是不在用户发的消息上述范围内既是默认,也可以加载机器人.当然,在这里字符串,数组(图文),函数都是可以的,同上.
  );
```
###### 点击事件消息
点击事件消息在做起来其实也和文本消息没什么区别,第一种是重写

```javascript
wechat.reclick(functin(ok,req,res,result)
  {
    /**
     - 你的代码
     */
  });
```
第二种类似于文本消息,只不过要处理的数据,不是用户发的数据,而是点击了的按钮的键

```javascript
wechat.reclick({
      "V1001_TODAY_MUSIC" : "你也好", //这里的键就是在你设置菜单时的键,忘了可以翻上去看看
            "V1001_GOOD"  : [
                              {
                                Title : "demo",
                                Description : "demo",
                                PicUrl : "demo",
                                Url : "demo"
                              }
                            ],
      "V1001_TODAY_MUSIC" : function(req,res,result)
                            {
                              /**
                               * 你的代码
                               */
                            }
  },
  "默认回复"
  );
```
###### 默认回复
默认恢复就是除了文本和点击事件消息的处理,这个处理只能重写,不写的话就是默认不处理

```javascript
wechat.redefaultMsg(function(ok,req,res,result)
  {
    /**
     * 你的代码
     */
  });
```
#### session处理
对于session相信开发者们都很熟悉,这里就不多做介绍了.这本项目中的应用就是记录用户上一次操作,从而相对应的事件.

通常session写在消息处理函数中,举例说明

```javascript
wechat.retext({
      "下午好" : function(req,res,result)
                {
                  wechat.createSession(result,function(req,res,result)
                    {
                      /**
                       * 这个函数是用来进行用户携session访问下会触发的函数.就是用户二次访问时的处理,可以进行二次session叠加.
                       */
                    });
                  
                }
  },
    "默认回复"
  );
```
当然这个在点击事件消息以及重写了消息处理函数中同样适用.session默认保存时间是60秒,你也可以改.

```javascript
wechat.setTime(5000);//参数为秒数.
```

### 其他函数
这里还有别的函数方便大家的使用,我简单介绍一下
#### 获取access_token

```javascript
wechat.getToken(function(ok,result){
  /**
   * 你的代码,result为获取到的access_token
   */
  })
```
#### 刷新access_token

```javascript
wechat.reflushToken(function(ok,result){
  /**
   * 你的代码,其中result为新的access_token,同事也会刷新本地保存的access_token.
   */
  });
```
当然,access_token是到时间自动获取刷新的,这块只是说特殊情况下这样.
#### 设置菜单

```javascript
wechat.setMenu(function(ok,result){
    /**
     * 你的代码,;这里result为错误信息,成功返回ok.
     */
  });
```
#### 获取菜单

```javascript
wechat.getMenu(function(ok,result){
  /**
   * 你的代码,这里result为你获取的菜单对象,格式为之前设置的格式.
   */
  });
```
#### 将json对象转换为微信可识别的xml对象

```javascript
var tool = require("node_modules/wechat-node/module/tool.js");
tool.jsonToXml({});//参数为你要转换的json,返回值为转换好的xml
```
## 使用示例
如果有兴趣的朋友,请大家关注我的博客,我接下来会在博客上发布一个小案列,通过案例让大家更加清楚地了解本项目.谢谢浏览.
博客地址 http://north.gitcafe.io


