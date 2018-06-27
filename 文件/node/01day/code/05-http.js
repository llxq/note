// 在 Node 中专门提供了一个核心的模块：http
// http 这个模块就是用来创建编写服务器的

// 1. 加载 http 核心模块
var http = require("http");

// 2. 使用 http.createServer() 方法创建一个 Web服务器
//    返回一个 Server 实例
var server=http.createServer();

// 3. 发送请求
//    注册 request 请求事件
//    当客户端请求过来，就会自动触发服务器端的 request 请求事件，然后执行第二个回调函数
server.on("request",function(){
    console.log("接收到了客户端请求");
});

// 4. 绑定端口号，启动服务器
server.listen(8899,function(){
    console.log("服务器启动成功了,可以通过 http:location//127.0.0.1:8899/来进行访问");
});