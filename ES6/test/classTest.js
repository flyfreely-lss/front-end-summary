class Foo {
  constructor() {
    return Object.create(null);
  }
}
new Foo() instanceof Foo;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}

var point = new Point(22, 33);
console.log(point.toString());
console.log(point.hasOwnProperty('x'));
console.log(point.hasOwnProperty('y'));
console.log(point.hasOwnProperty('toString'));
console.log(point.__proto__.hasOwnProperty('toString'));
console.log(Object.getPrototypeOf(Point));