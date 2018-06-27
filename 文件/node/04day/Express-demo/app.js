var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('这个是服务器响应的请求');
})

app.get('/login', function (req, res) {
    res.send('这个事login页面');
})

// 当以 /public/ 开头的时候，去 ./public/  目录中找到对应的资源
// app.use('/public/', express.static('./public/'));

// 当没有第一个参数的时候，则以通过省略 /public 的方式来访问，直接访问里面的文件就可以访问
// 127.0.0.1:3000/main.js     类似于这样访问
// app.use(express.static('./public/'));

// 这种则表示 /a/ 是 ./public 的别名
// 以 127.0.0.1:3000/a/main.js 来访问
app.use('/a/', express.static('./public/'));

app.listen(3000, function () {
    console.log('express is running.....');
})