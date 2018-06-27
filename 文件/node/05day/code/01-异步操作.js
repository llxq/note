// function add(x, y) {
//     console.log(1);
//     setTimeout(function () {
//         console.log(2);
//         var ret = x + y;
//         return ret;
//     }, 1000);
//     console.log(3);
// }

// console.log(add(1,2));

// // 输出结果为 1 3 undefined  2

var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request', function (req, res) {
    res.setHeader("Content-Type", "text/html;charset=UTF-8");
    fs.readFile("./02-封装Ajax.html", function (err, data) {
        if (err) {
            res.setHeader("Content-Type", "text/plain;charset=UFT-8");
            res.end("文件读取错误");
        } else {
            // data 默认是二进制 使用 tostring 转换
            // res.end()  支持两种数据类型,一种是二进制,一种是字符串

            // charset=UTF-8   一定要大写！！！！！

            res.setHeader("Content-Type", "text/html;charset=UTF-8");
            res.end(data);
        }
    });
});
server.listen(3000, function () {
    console.log('客户端启动');
});