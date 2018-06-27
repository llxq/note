var express = require('express');
var router = express.Router();
var app = express();
var ret = require('./crud封装');
var bodyParser = require('body-parser')

// 配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'));
// 在表单中获取 post提交的数据
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

router.get('/', function (req, res) {
    // 读取封住好的数据
    ret.read(function (err, data) {
        if (err) {
            return res.render('404.html');
        }
        return res.render('index.html', {
            students: data
        });
    });
});
router.get('/add', function (req, res) {
    
    res.render('add.html');
});
router.post('/post', function (req, res) {
    ret.add(req.body, function (err) {
        if (err) {
            return res.render('404.html');
        }
        console.log(req.body);
        res.redirect('/');
    });
});
router.get('/delete', function (req, res) {
    // console.log(res.query.id);
    ret.delete(req.query.id, function (err) {
        if (err) {
            return res.render('404.html');
        }
        res.redirect('/');
    });
});
router.get('/update', function (req, res) {
    ret.update(req.query.id, function (err, data) {
        if (err) {
            return res.render('404.html');
        }
        res.render('update.html', {
            students: data
        });
    });
})
router.post('/update', function (req, res) {
    ret.updateSave(req.body, function (err) {
        if (err) {
            return res.render('404.html');
        }
        res.redirect('/');
        // console.log(data);
    });
})
module.exports = router;