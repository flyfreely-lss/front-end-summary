# 常用方法总结

## 迭代方法

### `Array.every(function(currentValue, index, arr), thisValue)`

> 注意：`every()`不会对空数组进行检测。
> 
> 注意：`every()`不会改变原始数组。
> 
> every() 方法使用指定函数检测数组中的所有元素：
 * 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
 * 如果所有元素都满足条件，则返回 true。

#### 用途
查询数组中的项是否满足某个条件。

#### 参数
* currentValue 必须。当前元素的值
* index 可选。当前元素的索引值
* arr 可选。当前元素属于的数组对象

* thisValue 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"

#### 返回值
布尔值。传入的函数必须每一项都返回`true`，这个方法才返回`true`，否则返回`false`。

#### 举例
```
var numbers = [1, 2, 3, 4. 5, 4, 3, 2, 1];

var result = numbers,every(function(item, index, array){
  return item > 2;
});

console.log(result); // false
```

### `Array.some(function(currentValue, index, arr), thisValue)`
#### 用途
查询数组中的项是否满足某个条件。

#### 参数
* currentValue 必须。当前元素的值
* index 可选。当前元素的索引值
* arr 可选。当前元素属于的数组对象

* thisValue 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"

#### 返回值
布尔值。传入的函数必须每一项都返回`true`，这个方法才返回`true`，否则返回`false`。

#### 举例
```
var numbers = [1, 2, 3, 4. 5, 4, 3, 2, 1];

var result = numbers,every(function(item, index, array){
  return item > 2;
});

console.log(result); // false
```