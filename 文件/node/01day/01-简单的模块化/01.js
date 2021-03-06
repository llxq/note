// require 是一个方法
// 他就是用来加载模块的
/*
    在 Node中,模块具有三种
        具名模块：例如 fs、path
        用户自己编写的文件模块

    相对路径必须加 ./
    不在 ./ 会被认为是核心模块
    在 Node 中,没有全局作用域,只有模块作用域
        就是当前模块无法访问外部模块内容,外部模块也无法访当前模块内容
        默认是封闭的
    如何让模块与模块之间进行通信
*/
var foo="aaa";

console.log("开始执行 01.js");
require("./02.js");
console.log("01.js 执行完毕");

// 输出的结果还是 aaa,并不受其他模块影响
console.log("foo的值为：",foo);