var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request', function (req, res) {
    var filrPath = 'C:/Users/Administrator/Desktop/文件/node/01day/resource';
    var url = req.url;
    if (url === '/' || url === '/favicon.ico') {
        filrPath = filrPath + '/1.jpg';
    } else {
        filrPath = filrPath + url;
    }    
        fs.readFile(filrPath,function (err, data) {
            if (err) {
                console.log('文件不存在');
                return;
            }
            res.end(data);
        });
});
server.listen('5000', function () {
    console.log('客户端可以连接了......');
});