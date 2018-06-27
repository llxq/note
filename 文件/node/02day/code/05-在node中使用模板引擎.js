// 安装 art-template

// 安装方法
//     npm install-template
//     该命令在哪执行就会把包下载到哪里,默认会下载到 node_modules 目录中
//     node_modules 不要改，也不支持

// 在 Node 中使用 art-template 模板引擎
// 模板引擎最早就是诞生于服务器领域，后来才发展到了前端

// 1. 安装  npm install-template
// 2. 在需要使用的文件模块中加载 art-template
//     只需要使 require('art-template')
//     参数中的 art-template 就是你下载的包的名字
//     也就是说你 npm install 的名字是什么，require中的参数就是什么
// 3. 查文档，使用模板引擎的 API

var template = require('art-template');
var fs = require('fs');
var http=require('http');
var server = http.createServer();
server.listen('3000', function () {
    console.log('可以开始访问了');
});

// var tplStr=`
// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <title></title>
//     </head>
//     <body>
//         <P>大家好，我叫：{{ name }}</P>
//         <p>我今年 {{ age }} 岁了</p>
//         <h1>我来自 {{ province }}</h1>
//         <p>我喜欢：{{each hobbies}} {{$value}} {{/each}}</p>
//     </body>
// </html>
// `;

// var ret = template.render(tplStr,{
//     name: '王八蛋',
//     age: 18,
//     province: '中国',
//     hobbies: [
//         '打游戏','写代码','看电影'
//     ]
// });
// console.log(ret);


// template.render('模板字符串','替换对象')
// var ret = template.render('hello {{ name }}',{
//     name: 'lp'
// });
// 输出的结果就是 hello lp
// console.log(ret);


fs.readFile('./tpl.html', function (err,data) {
    if (err) {
        return console.log('读取文件失败');
    }
    // data 默认是二进制数据
    // 模板引擎的 render 接收的是字符串 所以需要把二进制数据转换为字符串 才能给模板引擎使用
    var ret = template.render(data.toString(),{
        name: '王八蛋',
        age: 18,
        province: '中国',
        hobbies: [
            '打游戏','写代码','看电影'
        ]
    });

    // 发送给浏览器
    server.on('request',function (req,res) {
        res.end(ret);
    });
    // console.log(ret);
});