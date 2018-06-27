// 1. 安装
// 2. 引包
var express = require('express');

// 3. 创建你的服务器应用程序
//    也就是原来的 http.createServer()
var app = express();

// 当服务器收到 get 请求 / 的时候，执行回调函数
app.get('/', function (req,res) {

    // 获取 get 请求的参数   获取的是个对象
    console.log(req.query);

    res.send('hellow express');
})
app.get('/about', function (req,res) {
    res.send('你好 我是express');
})

// 在 Express 中，开发资源就是一个 API 的事
// 公开指定目录
// 只要这样做了，就可以通过 /public/xx 的方式访问 public 中的所有资源
app.use('/public', express.static('./public/'));

// 相当于是 server.listen
app.listen('3000', function () {
    console.log('app is running.....');
})

// 模板引擎也可以使用 Express

// 在 Express 中使用模板引擎有更好的方式：res.render(文件名，{文件对象})
// 但是需要自己手动去配置