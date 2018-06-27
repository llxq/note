var fs = require('fs');
var dataPath = './db.json';

// 读取数据
function readAll(callback) {
    fs.readFile(dataPath, function (err, data) {
        if (err) {
            callback(err);
        }
        callback(null, JSON.parse(data).students)
    })
}

// 写入数据
function write(data, callback) {
    fs.writeFile(dataPath, data, function (err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// 读取全部数据
module.exports.read = function (callback) {
    readAll(callback);
}

// 打开修改界面
module.exports.update = function (id, callback) {
    readAll(function (err, data) {
        if (err) {
            callback(err);
        }
        var index = data.findIndex(function (item) {
            return parseInt(item.id) === parseInt(id);
        });
        callback(null, data[index])
    });
}

// 保存修改数据
module.exports.updateSave = function (dataJson, callback){
    readAll(function (err, data) {
        if (err) {
            callback(err);
        }
        var index = data.findIndex(function (item) {
            return parseInt(item.id) === parseInt(dataJson.id);
        });  
        dataJson.id = parseInt(dataJson.id)
        data[index] = dataJson;
        var dataFile = {
            students: data
        };
        // callback(null, dataFile)
        write(JSON.stringify(dataFile), function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
}

// 删除数据
module.exports.delete = function (id, callback) {
    readAll(function (err, data) {
        if (err) {
            callback(err)
        }
        var index = data.findIndex(function (item) {
            return parseInt(item.id) === parseInt(id);
        })
        data.splice(index, 1);
        var dataJson = {
            students: data
        };
        write(JSON.stringify(dataJson), function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });      
    });
}

// 增加数据
module.exports.add = function (students, callback) {
    readAll(function (err, data) {
        if (err) {
            return callback(err);
        }
        students.id = parseInt(data[data.length - 1].id + 1);
        data.push(students);
        var dataJson = {
            students: data
        }
        write(JSON.stringify(dataJson), function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
}