// require 方法有两个作用
/*
    1. 加载文件模块并执行里面的代码
    2. 拿到文件模块导出的接口对象
*/
// 在每个文件模块中都提供了一个接口对象：expotrs
//   expotrs 默认是一个空对象 {}
//   每个模块都有一个 exports对象
//   我们需要把所有需要被外部访问的成员动态的挂载在 expoters对象中

var res=require("./02");

console.log(res.foo);
console.log(res.add(100,150));
console.log(res.sub(100,10));