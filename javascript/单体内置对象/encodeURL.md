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

### escape() && unescape()


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

## 实用相关函数

Unicode字符和ASCII字符