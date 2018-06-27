var express = require('express');
var app = express();
var path = require('path');
var router = require('./routes');
var bodyParse = require('body-parser');
var session = require('express-session');

// app.use('/public', express.static('./public/'));
// app.use('/node_modules', express.static('./node_modules/'));

app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/views', express.static(path.join(__dirname, './views/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));

// 修改加载的时候的目录
app.set('views', path.join(__dirname, './views/')); // 默认就是该目录

// 在express中加载 art-template 模块
app.engine('html', require('express-art-template'));

// 配置解析表单 post 请求插件
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

// 在 Express 中，默认是不支持 session 和 cookie 的
// 我们可以使用 第三方包：express-session 来解决
app.use(session({
    secret: 'userInfo',  //这个参数代表的是 给标识加密加上 这个字符串
    resave: false,
    saveUninitialized: true   // 这个参数表示是否在加载的时候就分配一个钥匙
}))

// 挂载路由
app.use(router);

// 配置一个处理 404 的中间件
app.use(function (req, res) {
    res.render('404.html');
})

// 错误处理中间件
// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

app.listen('5000', function () {
    console.log('runing......');
})