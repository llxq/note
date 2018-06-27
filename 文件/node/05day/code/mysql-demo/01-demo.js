var mysql = require('mysql');

// 创建连接
var connection = mysql.createConnection({
    host: 'localhost',  // 连接本机
    use: 'me',   // 用户名
    password: 'secret',  // 密码
    database: 'my_db'   // 数据库名字
});

// 连接数据库
connection.connect();

// 执行数据操作
// 所有的增删查改都适用该 API 
connection.query('SELECT 1+1 AS solution', function (err, results, fields){
    if (err) {
        throw err;
    } else {
        console.log('The soluntion is', results[0].solution);
    }
});

// 关闭连接
connection.end();