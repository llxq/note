var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request', function (req, res) {
    var filrPath = 'C:/Users/Administrator/Desktop/文件/node/01day/resource';
    var url = req.url;
    if (url === '/' || url === '/favicon.ico') {
        fs.readdir('C:/Users/Administrator/Desktop/文件/node/01day/resource', function (err,files) {
            if (err) {
                return res.end('404 Not Found');
            }
            files.forEach(function (item) {
                // 这里拼接 HTML 页面即可  在 HTML 页面中标识一个标识符
                // 直接用 替换即可
            });
            return;
        });
    } else {
        filrPath = filrPath + url;
    }    
        fs.readFile(filrPath,function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
});
server.listen('5000', function () {
    console.log('客户端可以连接了......');
});