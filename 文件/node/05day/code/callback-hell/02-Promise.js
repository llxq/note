var fs = require('fs');
// 在 EcmaScript 6 中新增了一个 API：Promise
// Promise 是一个构造函数

// 创建一个 Promise 容器
// Promise 容器一旦创建，就开始执行里面的代码
// Promise 不是异步的   只是里面的任务是异步的 
var p1 = new Promise(function (resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            // 失败了，容器中的任务失败了
            // console.log(err);
            // 调用 reject 就相当于是调用了 then 方法的第二个参数函数
            reject(err);      // 把容器的状态变从 pending为 Rejected
        } else {
            // 容器中的任务成功了
            // console.log(data);
            // 也就是说这里调用的 resolve 方法实际上就是 then 方法传递的那个 function
            resolve(data);    // 把容器的状态从 pending 变为 resolved
        }
    })
});

// p1 就是那个承诺 (Promise)
// 当 p1 成功了 然后(then) 做指定的操作
p1.then(function (data) {
    console.log(data);
    // 这个 function 就是 Promise中的resolve 函数
    //    console.log(data);
    // 当前函数中 return 的结果就可以在 then 中的 function 接收到
    //       这里return 什么，后面就是接收到的什么
    //       如果没有 return 后面接收到的就是 undefined
    // 我们可以 return 一个 Promise 对象
    // 当 return 一个 Promise对象的时候，后面的 then 中的方法的第一参数会作为 当前方法返回的 resolve 函数的值，第二个为 reject 的值
    return new Promise(function (resolve, reject) {
        fs.readFile('./data/b.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}, function (err) {
    // 第一个的reject
    console.log('读取文件失败了', err);    // 读取文件失败了
}).then(function (data) {
    // 这里获取的就是上一个 then 返回的值
    console.log(data);
    return new Promise(function (resolve, reject) {
        fs.readFile('./data/c.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}, function (err) {
    // 这个是第二个的 reject

}).then(function (data) {
    // 这个是第二个的 resolve
   console.log(data);
}, function (err) {

    // 第三个 reject
    console.log(err);
});