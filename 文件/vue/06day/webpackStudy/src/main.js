console.log('这个是导出的文件');

console.log('会自动刷新嘛？');

import './css/main.css'

import './css/main.less'

import './css/main.scss'

import 'bootstrap/dist/css/bootstrap.css'


class Preson {
    constructor() {
        
    }
    static info = {
        name: '张三',
        age: 18
    }
}
console.log(Preson.info);