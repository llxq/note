var express = require('express');
var router = express.Router();
var User = require('./models/user');
var md5 = require('blueimp-md5');

router.get('/', function (req, res, next) {
    res.render('index.html', {
        user: req.session.user
    });
})

// 登录界面
router.get('/login', function (req, res, next) {
    res.render('login.html');
})

// 登录请求
router.post('/login', function (req, res, next) {
    // 登录
    User.findOne({
        email: req.body.email,
        password: md5(md5(req.body.password) + 'lxq')
    }, function (err, user) {
        if (err) {
            // return res.status(500).json({
            //     err_code: 500,
            //     message: err.message
            // });
            return next(err); // 终止路由，并且返回报错信息
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid'
            });
        }

        req.session.user = user;
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        });

    })
})

// 注册界面
router.get('/register', function (req, res, next) {
    res.render('register.html');
})

// 注册请求
router.post('/register', function (req, res, next) {
    // 判断该用户是否已经存在，之后注册
    var body = req.body;
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            // return res.status(500).json({
            //     err_code: 500,
            //     message: err.message
            // });
            return next(err);
        }
        if (data) {
            return res.status(200).json({
                // 1 表示邮箱或者账户已存在
                err_code: 1,
                message: 'email or nickname aleady exitsts'
            });
        }
        // res.status(200).send(JSON.stringify({
        //     success: true,
        // }));

        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password) + 'lxq');
        new User(body).save(function (err, user) {
            if (err) {
                // return res.status(500).json({
                //     // 500 表示服务端错误
                //     err_code: 500,
                //     message: err.message
                // });
                return next(err)
            }

            // 保存 session
            req.session.user = user;

            // express 提供了一个方法可以把对象自动转换为 json对象，再发送给客户端
            res.status(200).json({
                // 0 表示成功
                // 500 表示服务端错误
                // 1 表示邮箱或者账户已存在
                err_code: 0,
                message: 'ok'
            });
        });
    })
})

// 退出
router.get('/logout', function (req, res, next) {
    // 清除登录状态
    req.session.user = null;
    // 重定向
    res.redirect('/login');
})

// 设置界面  基本信息
router.get('/profile', function (req, res, next) {
    res.render('./settings/profile.html')
})

// 设置界面 账户信息
router.get('/admin', function (req, res, next) {
    res.render('./settings/admin.html')
})

// 删除 session
// delete req.session.xxx

module.exports = router;