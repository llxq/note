/*
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务 
 */
var fs = require('require');

// 文件路径
var dbPath = '../db.json';

 // 获取所有数据
 /**
  * 
  * callback 中的参数
  *     第一个参数是 err
  *         成功是 null
  *         错误是 错误对象
  *     第二个参数是 data
  *         成功是 数数组
  *         失败是 undefined
  */
exports.find = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(err, JSON.parse(data));
    })
}
// 调用的时候则 这样调用
// find(function (err, data) {
//     if (err) {
        
//     }
//     data 则是返回的数据
// })

// 添加保存数据
exports.save = function () {
    
}

// 更新数据
exports.update = function () {
    
}

// 删除数据
exports.delete = function () {
    
}