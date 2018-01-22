# 引用类型 - Function类型
> 每个函数都是Function类型的实例，而且与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。

## 函数的定义方式
> 解析器在向执行环境中加载数据时，解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码，才会真正被解释执行。

### 方式一：函数声明
```
function sum(num1, num2){
  reuturn num1 + num2;
}
```

### 方式二：函数表达式
```
var sum = function(num1, num2){
  return num1 + num2;
}
```

### 方式三：使用Function构造函数
```
var sum = new Function('num1', 'num2', 'return num1 + num2');  // 不推荐
```
