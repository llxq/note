
// app.js 入门模块
/*
    职责：
        创建服务
        做一些服务相关配置
          模板引擎
          body-parser 解析表单 post 请求体
          提供静态资源服务
        挂载路由
        监听端口启动服务
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// 开发 public 中的文件
app.use('/public/', express.static('./public/'));

// 配置使用 art-template 模板引擎
// 第一个参数表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// 可以修改第一个参数，改为当前要渲染的文件的后缀名的文件
// express-art-template  是专门用来在 express 中把 art-template 整合到 express 中的
// 虽然外面不需要记载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'));


// express 为 response 响应对象提供了一个方法：render
// render 方法默认是不可以使用的，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据});
// 第一个参数不能写 路径，默认会在项目中的 view 目录中查询该模板文件
// 也就是说 express 有一个规定：开发人员把所有的视图文件都放到 views 目录中
// app.get('/', function (req, res) {
//     // readFile 的第二个参数是表示编码格式，就是告诉浏览器按照utf8的编码格式读取
//     fs.readFile("./db.json", 'utf8', function (err, data) {
//         if (err) {
//             return res.render('404.html');
//         }
//         res.render('index.html', {
//             comments: JSON.parse(data).comments
//         });
//     });

// })

// 使用 art-template 模板引擎
// app.get('/admin', function (req, res) {
//     res.render('admin/index.html', {
//         title:'这个他妈的能进来吗'
//     });
// })

// 如果想要修改默认的 view 目录，则可以这样设置
// app.set('views', '默认的路径')


// app.get('/post', function (req, res) {
//     res.render('post.html');
// })

// 配置 bodyParser 中间件 (插件：专门用来解析表单 post请求体)
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// 


// 当以 post 方式请求 /post 的时候，执行指定处理函数
// app.post('/post', function (req, res) {
//     // 1. 获取表单 post 请求数据
//     // 2. 处理
//     // 3. 发送响应

//     // 请求的时候把数据加进 db.json中
//     var comment = req.body;
//      comment.dateTime = new Date().toLocaleString();
//     fs.writeFile('./db.json', comment, function (err) {
//         if (err) {
//             return res.render('404.html');
//         } 
//         res.redirect('/');
//     })  
//     // res.statusCode = 302;
//     // res.setHeader('location', '/');
    
// })

// app.get('/pinglun', function (req, res) {
//     var comment = req.query;
//     comment.dateTime = new Date().toLocaleString();
//     comments.unshift(comment);

//     // res.statusCode = 302;
//     // res.setHeader('location', '/')
//     res.redirect('/');
// })

var router = require('./index.js');

// 直接调用配置好的 路由容器
app.use(router);

app.listen(3000, '0.0.0.0', function () {
    console.log('express is running.....');
})