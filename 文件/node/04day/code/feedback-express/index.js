// index.js 路由模块
/*
    index.js 路由模块
    职责：
        处理路由
        根据不同的方法+请求路径设置具体的请求处理函数
*/


var fs = require('fs');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    fs.readFile("./db.json", 'utf8', function (err, data) {
        if (err) {
            return res.render('404.html');
        }
        res.render('index.html', {
            comments: JSON.parse(data).comments
        });
    });

})
router.get('/post', function (req, res) {
    res.render('post.html');
})
router.post('/post', function (req, res) {
    var comment = req.body;
    comment.dateTime = new Date().toLocaleString();
    fs.readFile("./db.json", 'utf8', function (err, data) {
        if (err) {
            return res.render('404.html');
        }
        var dataJson = JSON.parse(data).comments;
        dataJson.unshift(comment);
        dataJson = '{ "comments":' + JSON.stringify(dataJson) + '}';
        fs.writeFile('./db.json', dataJson, function (err) {
            if (err) {
                return res.render('404.html');
            } 
            res.redirect('/');
        });
    });  
})
module.exports = router;