// 这个 main.js 是 js 文件的 入口文件

// 导入 jquery 文件
// 使用 import 导入 jquery 模块
// 浏览器不能解析 es6语法，所以这一行会有问题，浏览器不识别
import $ from 'jquery';

$(function () {
    $('li:odd').css('backgroundColor', 'green');
    $('li:even').css('backgroundColor', 'yellow')
})

// 使用 import 导入 css文件
import './css/index.css'

import './css/index.less'

import './css/index.scss';