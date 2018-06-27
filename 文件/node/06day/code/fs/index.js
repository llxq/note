var fs = require('fs');
var path = require('path');

// 模块中的路径标识和文件操作中的相对路径标识不一致
// 模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响
require('./b');


// ./a.txt  相对于执行 node 命令所处终端路径
// Node就是这样设计的
// 就是说，在文件操作路径中，相对路径的设计的就是相对于执行 node 命令所处的路径

// 这个方法不可行，路径不能写死
// fs.readFile('C:/Users/Administrator/Desktop/文件/node/06day/code/fs/a.txt', 'utf8', function (err, data) {
//     if (err) {
//         throw err;
//     } else {
//         console.log(data);
//     }
// })

fs.readFile(path.join(__dirname, 'a.txt'), 'utf8', function (err, data) {
    if (err) {
        throw err;
    } else {
        console.log(data);
    }
})