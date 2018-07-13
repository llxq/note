const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// 开放接口
app.use(express.static('03day'));
app.use(express.static('lib'));
// app.get('/', (req, res) => {
//     // console.log(req.query);
//     res.render('08-hashchange.html')
// })

app.get('/index', (req, res) => {
    console.log(req.query.callback);
    res.jsonp({ex: '哈哈哈哈'});  
})
app.get('/introduce', (req, res) => {
    console.log(req.query);
    res.send('<h1>introduce page!</h1>')
})
app.get('/contactUs', (req, res) => {
    console.log(req.query);
    res.send('<h1>contactUs page!</h1>')
})

app.get('/getscript', (req, res) => {
    console.log(req.query.callback);
    let data = {
        name: 'lxq',
        age: 18,
        gender: 'girl'
    }
    res.send(`${req.query.callback}(${JSON.stringify(data)})`);
})

app.post('/index', (req, res) => {
    console.log(req.body);
    res.send()
})

app.get('/jsonp', (req, res) => {
console.log(req.body);
res.jsonp('返回了 jsonp 数据')
})

app.listen('3000', () => {
    console.log('3000 runing');
})
