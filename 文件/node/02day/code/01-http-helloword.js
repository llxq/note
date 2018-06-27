var http = require('http');

// 创建 Server
var server = http.createServer();

// 监听 Server 的 request 请求事件，设置请求处理函数
server.on('request', function (req,res) {
    //req：请求
    //res：响应
    var address = req.socket.remoteAddress;
    var url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        res.end('ip为：' + address + 'hello world');
    } else {
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        res.end('ip为：' + address + '404 Not Found');
    }
});

// 绑定端口号
server.listen('3000', function () {
    console.log('runing.....');
});