const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// 开放接口
app.use(express.static('views'))

// app.get('/', (req, res) => {
//     // console.log(req.query);
//     res.render('08-hashchange.html')
// })

app.get('/index', (req, res) => {
    console.log(req.query);
    res.send('<h1>Index page!</h1>')
})
app.get('/introduce', (req, res) => {
    console.log(req.query);
    res.send('<h1>introduce page!</h1>')
})
app.get('/contactUs', (req, res) => {
    console.log(req.query);
    res.send('<h1>contactUs page!</h1>')
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('1111')
})

app.listen('3000', () => {
    console.log('3000 runing');
})