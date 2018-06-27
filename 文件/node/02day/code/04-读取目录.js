var fs = require('fs');
fs.readdir('C:/Users/Administrator/Desktop/文件/node/01day/resource', function (err, files) {
    if (err) {
        console.log('目录不存在');
    } else {
        // files 就是所有的文件名字
        console.log(files);
    }
});