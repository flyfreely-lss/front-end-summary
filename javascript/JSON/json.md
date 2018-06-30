## 语法

1. 与JavaScript不同，JSON中对象的属性名任何时候都必须加双引号。

## 解析与序列化

1. 在序列化JavaScript对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为undefined的任何属性也都会被跳过。

2. 序列化之前的对象和反序列化后的对象是两个独立的、没有任何关系的对象。

3. 有时候，JSON.stringify()还是不能满足对某些对象进行自定义序列化的需求。在这些情况下，可以给对象定义toJSON()方法，返回其自身的JSON数据格式。

4. toJSON()可以作为函数过滤器的补充，因此理解序列化的内部顺序十分重要。假设把一个对象传入JSON.stringify()，序列化该对象的顺序如下。

    01. 如果存在toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，返回对象本身。

    02. 如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第1步返回的值。

    03. 对第2步返回的每个值进行相应的序列化。

    04. 如果提供了第三个参数，执行相应的格式化。

5. JSON has no functions as data types. You can only serialize strings, numbers, objects, arrays, and booleans (and null)
```
// 问题
function Person(age) {
    this.age = age;
    this.isOld = function (){
        return this.age > 60 ? true : false;
    }
}
// before serialize, ok
var p1 = new Person(77);
alert("Is old: " + p1.isOld());

// after, got error Object #<Object> has no method 'isOld'
var serialize = JSON.stringify(p1);
var _p1 = JSON.parse(serialize);
alert("Is old: " + _p1.isOld());

//解决方式
//自定义对象序列化
Person.prototype.toJson = function() {
    return JSON.stringify({age: this.age});
};

//自定义对象反序列化
Person.fromJson = function(json) {
    var data = JSON.parse(json); // Parsing the json string.
    return new Person(data.age);
};

//使用
var serialize = p1.toJson();
var _p1 = Person.fromJson(serialize);
```
参考：
* [Best way to serialize/unserialize objects in JavaScript?](https://codeday.me/bug/20170918/75537.html)

## 小结

1. JSON是一个轻量级的数据格式，可以简化表示复杂数据结构的工作量。JSON使用JavaScript语法的子集表示对象、数组、字符串、数值、布尔值和null。即使XML也能表示同样复杂的数据结果，但JSON没有那么烦琐，而且在JavaScript中使用更便利。

2. ECMAScript 5定义了一个原生的JSON对象，可以用来将对象序列化为JSON字符串或者将JSON数据解析为JavaScript对象。JSON.stringify()和JSON.parse()方法分别用来实现上述两项功能。这两个方法都有一些选项，通过它们可以改变过滤的方式，或者改变序列化的过程。