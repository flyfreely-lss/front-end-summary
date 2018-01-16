> 感谢阮一峰老师的教程：[http://www.ruanyifeng.com/blog/2010/02/url_encoding.html](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
> 
> 本教程对URL编码进行了总结，以方便后来查看。

## URL字符规定
> "...Only alphanumerics, the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."
>
> "只有字母和数字`[0-9a-zA-Z]`、一些特殊符号`"$-_.+!*'(),"[不包括双引号]`、以及某些保留字，才可以不经过编码直接用于URL。"

* ASCII 字母和数字：`[0-9a-zA-Z]`

* ASCII 标点符号： - _ . ! ~ * ' ( )
 
* 在 URI 中具有特殊含义的 ASCII 标点符号：; / ? : @ & = + $ , #

* escape不会编码的特殊 ASCII 标点符号：* @ - _ + . / 

## 常见的URL中使用汉字的四种情况
### 情况1：网址路径中包含汉字
例如：http://zh.wikipedia.org/wiki/春节

### 情况2：查询字符串包含汉字
例如：http://www.baidu.com/s?wd=春节

### 情况3：Get方法生产的URL中包含汉字


### 情况4：Ajax调用的URL包含汉字
例如：
```
url = url + "?q=" +document.myform.elements[0].value;  // 假定用户在表单中提交的值是"春节"这两个字
http_request.open('GET', url, true);
```

## 使用Javascript对URL进行编/解码
> URI方法`escape()`、`encodeURIComponent()`、`decodeURI()`和`decodeURIComponent()`用于替换已经被ECMA-262第三版废弃的`escape()` 和 `unescape()`方法。URI方法能够编码所有Unicode字符，而原来的方法只能正确地编码ASCII字符。因此在实际开发时间中，特别是在产品级的代码中，一定要使用URI方法，不要使用`escape()`和`unescape()`方法。

### escape() && unescape()
`escape()`不能直接用于URL编码，它的真正作用是对字符串进行编码，并返回一个字符串的Unicode编码值。


### encodeURI() && decodeURI()

`encodeURI()`主要用于对整个URI进行编码，不会对本身属于URI的特殊字符进行编码，例如：
```
var uri = "http://www.wrox.com/illegal value.htm#start";

// "http://www.wrox.com/illegal%20value.htm#start"
console.log(encodeURI(uri));
```

`decodeURI()`只能对使用`encodeURI()`替换的字符进行解码。举例：
```
var uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start";

// http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
console.log(decodeURI(uri));
```


### encodeURIComponent() && decodeURIComponent()

`encodeURIComponent()`主要用于对URI中的某一段进行编码，会对它发现的任何非标准字符进行编码。例如：
```
var uri = "http://www.wrox.com/illegal value.htm#start";

// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start"
console.log(encodeURIComponent(uri));
```

`decodeURIComponent()`能够解码使用`encodeURIComponent()`编码的所有字符，即它可以解码任何特殊字符的编码。举例：
```
var uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start";

// http://www.wrox.com/illegal value.htm#start
console.log(decodeURIComponent(uri));
```

## 使用
**1. 如果只是编码字符串，和URL没有啥关系，那么用escape。**

**2. 如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。**

**3. 当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。**


## 相关实用函数
* 向现有URL的末尾添加查询字符串参数：
```
// url: 要添加参数的url
// name: 参数的名称
// value: 参数的值
function addURLParam(url, name, value) {
	url += (url.indexOf("?") == -1 ? "?" : "&");
	url += encodeURLComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

// 使用示例
var url = "example.php";
url = addURLParam(url, "name", "Nicholas");
```