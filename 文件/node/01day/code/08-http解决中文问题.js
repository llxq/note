var http=require("http");
var server=http.createServer();
server.on("request",function(req,res) {
    console.log("响应成功");

    // 在服务器端默认发送的数据,是 UTF-8 编码内容
    // 但是浏览器不知道你是 UTF-8 编码内容
    // 在浏览器不知道服务器响应内容的编码的情况下,浏览器会按照当前操作系统的默认编码格式去解析
    // 中文操作系统默认是 JBK
    // 解决方法

    // res.setHeader("Content-Type","text/html;charset=UTF-8");
    // res.end("这个是响应回的数据");

    var url=req.url;
    if(url==="/plain"){
        res.setHeader("Content-Type","text/plain;charset=UTF-8");
        res.end("这个响应的是文本类型的数据");
    }else if (url==="/html") {
        res.setHeader("Content-Type","text/html;charset=UTF-8");
        res.end("<p>这个响应的是HTML文本类型的数据<a href='#'>点我</a></p>");
    }
});
server.listen("3000",function () {
    console.log("请求成功");
});