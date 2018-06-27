var http=require("http");
var server=http.createServer();

// request 请求事件处理函数,需要接收两个参数
//    Request 请求对象
//      请求对象可以可以获取客户端的一些请求信息,例如请求路径
//    Response 响应对象
//      响应对象可以用来给客户端发送响应消息
server.on("request",function(request,resopnse){
    // 获取请求路径
    //console.log("收到客户端的请求,请求路径是："+request.url);

    // Response 对象有一个方法, write 可以用来给客户端发送响应数据
    // write 可以使用多次,但是最后一定要使用 end 来结束响应,否则客户端会一直等待

    // request.url 获取到的是端口号之后的那一部分路径
    // 也就是说所有的 url 都是以 '/' 开头的
    var url=request .url;

    // 获取请求的客户端的端口号
    console.log("请求的客户端的端口号是：",resopnse.socket.remotePort);

    // 获取当前请求的客户端的 ip地址
    console.log("请求的客户端的ip地址是",resopnse.socket.remoteAddress);
    
    // if(url=='/'){
    //         resopnse.end("index page");
    // }else if(url=='/login'){
    //     resopnse.end("login page");
    // }else{
    //     resopnse.end('404 Not Found');
    // }

    if(url==="/products"){
        var products=[
            {
                name:'苹果 X',
                price:10000
            },
            {
                name:'苹果 X',
                price:10000
            },
            {
                name:'苹果 X',
                price:10000
            },
            {
                name:'苹果 X',
                price:10000
            }
        ];
        resopnse.end(JSON.stringify(products));
    }

    //resopnse.write("nodejs");
    // 使用 write 方法的时候比较麻烦,推荐使用更简单的方法,直接在 end 的同时发送数据
    //resopnse.end("发送的数据");

    // 结束响应
    // resopnse.end(); 
});
server.listen(3000,function(){
    console.log("服务器启动了,可以通过 http://127.0.0.1:3000/ 进行访问");
});