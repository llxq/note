var express = require('express');
var app = express();
var path = require('path');

// app.use('/public', express.static('./public/'));
// app.use('/node_modules', express.static('./node_modules/'));

app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/views', express.static(path.join(__dirname, './views/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));

// 修改加载的时候的目录
app.set('views', path.join(__dirname, './views/')); // 默认就是该目录

// 在express中加载 art-template 模块
app.engine('html', require('express-art-template'));

app.get('/', function (req, res) {
    res.render('index.html');
})

app.listen('3000', function () {
    console.log('runing......');
})