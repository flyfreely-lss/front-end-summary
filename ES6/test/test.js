var a = 2;
{
  let a = 3;
  console.log(a);
}
console.log(a);

let getFinalPrice = (price, tax=0.7) => price + price * tax;
console.log(getFinalPrice(500));

let foo = (...args) => console.log(args);
foo(1, 2, 3, 4, 5, 6);

function getCar(make, model, value) {
  return {
    // 简写变量
    make,  // 等同于 make: make
    model, // 等同于 model: model
    value, // 等同于 value: value

    // 属性可以使用表达式计算值
    ['make' + make]: true,

    // 忽略 `function` 关键词简写对象函数
    depreciate() {
      this.value -= 2500;
    }
  };
}

let car = getCar('Barret', 'Lee', 40000);
console.log(car);

var parent = {
  foo() {
    console.log('Hello from the parent.');
  }
};
var child = {
  foo() {
    super.foo();
    console.log('Hello from the child.');
  }
};
Object.setPrototypeOf(child, parent);
child.foo();

let user = "lisa";
console.log(`Hi ${user}`);

let nicknames = ['di', 'boo', 'punkeye'];
nicknames.size = 3;
for(let nickname in nicknames) {
  console.log(nickname);
}

// Set
let set = new Set([1, 1, 2, 3]);
console.log(set.size);
console.log(set.has(1));
set.add('strings');
set.add({a: 1, b: 2});
set.forEach((item) => {
  console.log(item);
});

for(let item of set) {
  console.log(item);
}

// WeakSet
var ws = new WeakSet();
let obj = {};
let foo1 = {};

// ws.add(window);
ws.add(obj);

// ws.has(window);
ws.has(foo1);
//
// ws.delete(window);
// ws.has(window);

// 类
class Task {
  constructor() {
    console.log('Task instantiated!');
  }

  showId() {
    console.log(66);
  }

  static loadAll() {
    console.log('Loading all tasks...');
  }
}

console.log(typeof Task);
let task = new Task();
task.showId();
Task.loadAll();

// Symbol
var symbol = Symbol('Hello');
console.log(typeof symbol);
console.log(symbol);

// Iterators
let arr = [11, 12, 13];
var ite = arr[Symbol.iterator]();

console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
