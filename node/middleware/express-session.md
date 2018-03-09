# express-session总结

## session概述

### 以提交表单为例，讲解session的生成过程：
```
1. 用户提交包含用户名和密码的表单，发送HTTP请求。
2. 服务器验证用户发来的用户名密码。
3. 如果正确则把当前用户名（通常是用户对象）存储到redis中，并生成它在redis中的ID。
    这个ID称为Session ID，通过Session ID可以从Redis中取出对应的用户对象， 敏感数据（比如authed=true）都存储在这个用户对象中。
4. 设置Cookie为sessionId=xxxxxx|checksum并发送HTTP响应， 仍然为每一项Cookie都设置签名。
5. 用户收到HTTP响应后，便看不到任何敏感数据了。在此后的请求中发送该Cookie给服务器。
6. 服务器收到此后的HTTP请求后，发现Cookie中有SessionID，进行放篡改验证。
7. 如果通过了验证，根据该ID从Redis中取出对应的用户对象， 查看该对象的状态并继续执行业务逻辑。
```

## express-session中间件
>**Note** Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
cookie上存储sessionid，不存储会话数据。会话数据存储在服务器端。

>**Note** Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.
>从1.5.0版本开始, express-session不再依赖cookie-parser,直接通过req/res读取/写入cookies。如果该模块和cookie-parser之间的secret不相同，则使用cookie-parser可能会导致问题

>**Warning** The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

**一旦我们将express-session中间件用use挂载后，我们可以很方便的通过req参数来存储和访问session对象的数据。req.session是一个JSON格式的JavaScript对象，我们可以在使用的过程中随意的增加成员，这些成员会自动的被保存到option参数指定的地方，默认保存到内存中去。**
```
var express = require('express');
var session = require('express-session');
var app = express();

// Use the session middleware 
app.use(session({ 
////这里的name值得是cookie的name，默认cookie的name是：connect.sid
  //name: 'hhw',
  secret: 'keyboard cat', 
  cookie: ('name', 'value', { path: '/', httpOnly: true,secure: false, maxAge:  60000 }),
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: true, 
  //强制“未初始化”的会话保存到存储。 
  saveUninitialized: true,  
  
}))
// 只需要用express app的use方法将session挂载在‘/’路径即可，这样所有的路由都可以访问到session。
//可以给要挂载的session传递不同的option参数，来控制session的不同特性 
app.get('/', function(req, res, next) {
  var sess = req.session//用这个属性获取session中保存的数据，而且返回的JSON数据
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>欢迎第 ' + sess.views + '次访问       ' + 'expires in:' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end();
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

app.listen(3000);
```

##
参考链接
* [阿里巴巴攻城师分享nodeJS精华：cookie 和 session](https://niefengjun.cn/blog/576c6f44353308f7389956822726645b.html) 
* [express 框架之session](http://www.cnblogs.com/chenchenluo/p/4197181.html) 
* [Node.js之session实践](https://github.com/fwon/blog/issues/12)
* [大话Session](http://www.cnblogs.com/shoru/archive/2010/02/19/1669395.html)
* [Express---express-session(八)](https://www.jianshu.com/p/5a0ccd1ee27e)