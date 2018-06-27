var express = require('express');
var app = express();

// 开放 public 和 views 文件
app.use('/public/', express.static('./public/'));
app.use('/views/', express.static('./views/'));

var bodyParser = require('body-parser')

// 配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'));
// 在表单中获取 post提交的数据
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// 获取请求的页面
var router = require('./crud模板.js');

// 调用接口
app.use(router);

app.listen(3000, function () {
    console.log('服务端已启动....');
})
