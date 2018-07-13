const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 连接数据库，如果当前指定要连接的库没有的话，会自动创建
mongoose.connect('mongodb://localhost/productInfo');

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// 开放接口
app.use(express.static('03day'));
app.use(express.static('lib'));

// 创建表结构，表名称，数据结构
const products = mongoose.model('product', new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    ctime: {
        type: Date,
        default: Date.now()
    }
}))

// new products({
//     name: '保时捷'
// }).save((err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })

// 查询数据
// products.find((result, err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })


function getAll(callback) { // 查询数据
    products.find((err, result) => {
        if (err) {
            return callback({
                status: 0,
                message: err.message
            })
        }
        return callback({
            status: 1,
            message: result
        })
    })
}

function insertData(data, callback) { // 添加数据
    if (data.name) {
        new products({
            name: data.name
        }).save((err, result) => {
            if (err) {
                return callback({
                    status: 0,
                    message: err.message
                })
            } else {
                return callback({
                    status: 1,
                    message: 'ok'
                })
            }
        });
    } else {
        return callback({
            status: 0,
            message: '插入的数据不能为空！'
        })
    }

}

function deleteData(_id, callback) { // 删除数据
    products.remove({
        _id: _id
    }, (err, result) => {
        if (err) {
            return callback({
                status: 0,
                message: err.message
            })
        } else {
            return callback({
                status: 1,
                message: 'ok'
            })
        }
    })
}

function findData(regExp, callback) { // 模糊查询
    products.find({
        name: {
            $regex: new RegExp(regExp)
        }
    }, (err, result) => {
        if (err) {
            return callback({
                status: 0,
                message: err.message
            })
        }
        return callback({
            status: 1,
            message: result
        })
    })
}


// 接收请求
// 请求全部数据
app.get('/all', (req, res) => {
    getAll(result => {
        res.send(result);
    })
})

// 接收添加数据请求
app.post('/insert', (req, res) => {
    insertData(req.body, result => {
        res.send(result);
    })
})

// 删除数据
app.get('/delete', (req, res) => {
    deleteData(req.query._id, result => {
        res.send(result);
    })
})

// 模糊查询
app.get('/findData', (req, res) => {
    findData(req.query.reg, result => {
        console.log(result);
        res.send(result)
    });
})


app.listen('3000', () => {
    console.log('3000 runing');
})