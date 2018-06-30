/*简单例子*/
// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done');
//   });
// }
//
// timeout(100).then((value) => {
//   console.log(value);
// });
//
// /*Pomise新建后会立即执行*/
// let promise = new Promise((resolve, reject)=> {
//   console.log('Promise');
//   resolve();
// });
//
// promise.then(() => {
//   console.log('resolved.');
// });
//
// console.log('Hi!');

/*一个异步操作的结果是返回另一个异步操作*/
// const p1 = new Promise(function (resolve, reject) {
//   setTimeout(() => reject(new Error('fail')), 3000)
// });
//
// const p2 = new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(p1), 1000)
// });
//
// p2
//   .then(result => console.log(result))
//   .catch(error => console.log(error));



Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.reject(callback().then(() => {throw reason}))
  );
};

Promise.resolve(2).then(() => {}, () => {});
Promise.resolve(2).finally(() => {});