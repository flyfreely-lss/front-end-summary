# 常用方法总结

### [迭代方法](#%E8%BF%AD%E4%BB%A3%E6%96%B9%E6%B3%95)

* [Array.every()](#arrayeveryfunctioncurrentvalue-index-arr-thisvalue) - 对数组中的每一项运行给定函数，如果该函数对每一项都返回 `true`，则返回 `true`。
* [Array.some()](#arraysomefunctioncurrentvalue-index-arr-thisvalue) - 对数组中的每一项运行给定函数，如果该函数对任一项返回 `true`，则返回 `true`。
* [Array.filter()](#) - 对数组中的每一项运行给定函数，返回该函数会返回 `true` 的项组成的数组。
* [Array.forEach()](#) - 对数组中的每一项运行给定函数。这个方法没有返回值。
* [Array.map()](#) - 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

## 迭代方法

### `Array.every(function(currentValue, index, arr), thisValue)`

> `every()` 方法使用指定函数检测数组中的所有元素：
> * 如果数组中检测到有一个元素不满足，则整个表达式返回 `false` ，且剩余的元素不会再进行检测。
> * 如果所有元素都满足条件，则返回`true`。
>
> 注意：`every()`不会对空数组进行检测。
> 
> 注意：`every()`不会改变原始数组。


#### 用途
查询数组中的项是否满足某个条件。

#### 参数
* `currentValue` 必须。当前元素的值
* `index` 可选。当前元素的索引值
* `arr` 可选。当前元素属于的数组对象

* `thisValue` 可选。对象作为该执行回调时使用，传递给函数，用作`"this"`的值。
如果省略了`thisValue`，`"this"`的值为`"undefined"`

#### 返回值
布尔值。传入的函数必须每一项都返回`true`，这个方法才返回`true`，否则返回`false`。

#### 举例
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var result = numbers.every(function(item, index, array){
  return item > 2;
});

console.log(result); // false
```
##

### `Array.some(function(currentValue, index, arr), thisValue)`

> `some()` 方法会依次执行数组的每个元素：
> * 如果有一个元素满足条件，则表达式返回`true` , 剩余的元素不会再执行检测。
> * 如果没有满足条件的元素，则返回`false`。
>
> 注意：`some()`不会对空数组进行检测。
> 
> 注意：`some()`不会改变原始数组。

#### 用途
查询数组中的项是否满足某个条件。

#### 参数
* `currentValue` 必须。当前元素的值
* `index` 可选。当前元素的索引值
* `arr` 可选。当前元素属于的数组对象

* 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了`thisValue` ，`"this"` 的值为 `"undefined"`

#### 返回值
布尔值。对数组中的每一项运行给定函数，如果该函数对任一项返回`true`，则返回`true`。

#### 举例
```
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var result = numbers.some(function(item, index, array){
  return item > 2;
});

console.log(result); // true
```
