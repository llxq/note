// 浏览器中的 JavaScript 是没有文件操作的能力的
// 但是 Node 中的 JavaScript 具有文件操作的能力

// fs 是 filesystem 的简写,就是文件系统的意思
// 在 node 中如果想要进行文件操作,就必须引入 fs 这个文件核心模块
// 在 fs 这个核心模块中,就提供了所有的文件操作相关的 API
// 例如：fs.readFile 就是读取文件的

// 1.使用 require 方法加载 fs 核心模块
var fs = require('fs');
/* 2.读取文件
  -> 第一个参数：需要读取的文件路径
  -> 第二个参数：回调函数
      -> 两个参数：
          -> error：
              -> 如果读取成功 error 就是 null
              -> 如果读取失败 error 就是错误对象
          -> data：
              -> 如果读取失败 data 就是 null
              -> 如果读取成功 data 就是读取到的数据
*/
fs.readFile("txtFile/hello.txt",function(error,data){
    //默认读取的是 二级制数据
    // 我们可以通过 tostring方法 将其转换为我们认识的字符
    console.log(data.toString());
});
