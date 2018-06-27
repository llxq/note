var express = require('express');

var fs = require('fs');

var app = express();

// 中间件：处理请求的，本质就是个函数

// 在 Express 中，对中间件有几种分类

// 当请求进来的时候，会从第一个中间件开始匹配
//      如果匹配则进来
//          如果请求进入中间件之后，没有调用 next 则请求会停在当前中间件
//          如果调用了 next 则继续向后找到第一个匹配的中间件
//      如果不匹配，则继续判断匹配下一个中间件

// 不关心请求路径和请求方法的中间件
// 也就是说任何请求都会进入这个中间件
// 中间件本身就是一个方法，该方法接收三个参数
//      Request：请求对象
//      Response：响应对象
//      next：下一个中间件
// 当一个请求进入中间件之后，如果不调用 next 则会停留在当前中间件
// next 是一个方法，用来调用下一个中间件的
// next 方法也是需要匹配的 (不是调用紧挨着的那个)


// app.use(function (req, res, next) {
//     console.log('请求  1  进来了'); 
//     // 默认是不会执行后面的 use方法的
//     // 使用 next方法可以改变
//     next();
//     // 没有 next 是不会向后执行的
// })

// app.use(function (req, res, next) {
//     console.log('请求  2  进来了');    
//     next();
// })

// app.use(function (req, res, next) {
//     console.log('请求  3  进来了');    
//     res.send('this is 3');
// })


// 关心请求路径的 中间件
// 以 /xxx 开头的路径中间件

// app.use(function (req, res, next) {
//     console.log('请求  3  进来了');    
//     next();
// })

// app.use('/a', function (req, res, next) {
//     console.log('a');
// })

// app.use('/b', function (req, res, next) {
//     console.log('b');
// })

// 如果没有能匹配的中间件，则 Express 会默认输出 cannot Get 路径。 
// 除了以上中间件之外，还有一种最常用的
// 严格匹配请求方法和请求路径的中间件

// app.get('/', function (req, res, next) {
//     console.log('/');
// })

// app.get('/a', function (req, res, next) {
//     console.log('/a');
// })

app.get('/a', function (req, res, next) {
    fs.readFile('./6/a/a/', function (err, data) {
        if (err) {
            // return res.status(5000).send('Server error')

            // 如果 next 传入了参数，则直接往后找到带有 四个参数 的应用程序的中间件
            // 当发生错误的时候，我们可以调用 next 传递错误对象
            // 然后就会被全局错误处理中间件匹配到并处理
            next(err);
        }
    })
})

// 错误处理，一定要写四个参数
app.use(function (err, req, res, next) {
    // 当 next 传入参数了 则会调用这个带有四个参数的中间件
    // err 代表的是 错误信息
    // console.log(err);
    res.status(500).send(err.message);
})

app.listen('3000', function () {
    console.log('runing....');
})