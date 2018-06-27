var http=require("http");
var server=http.createServer();
var fs=require("fs");
server.on("request",function(req,res) {
    //req：获取客户端信息
    //res：发送给客户端数据
    var url=req.url;
    if(url==='/html'){
        res.setHeader("Content-Type","text/html;charset=UTF-8");
        fs.readFile("../resource/机器猫.html",function(err,data) {
            if(err){
                res.setHeader("Content-Type","text/plain;charset=UFT-8");
                res.end("文件读取错误");
            }else{
                // data 默认是二进制 使用 tostring 转换
                // res.end()  支持两种数据类型,一种是二进制,一种是字符串
                
                // charset=UTF-8   一定要大写！！！！！

                res.setHeader("Content-Type","text/html;charset=UTF-8");
                res.end(data);
            }
        });
    }else if (url==="/") {
        res.setHeader("Content-Type","text/plain;charset=UTF-8");
        res.end("请输入正确的后缀名");
    }else if(url==="/jpg"){
            res.setHeader("Content-Type","text/html;charset=UTF-8");
            fs.readFile("../resource/1.jpg",function(err,data) {
            if(err){
                res.setHeader("Content-Type","text/plain;charset=UFT-8");
                res.end("文件读取错误");
            }else{
                //图片就不需要指定编码了,因为我们常说的编码一般指的是：字符编码
                res.setHeader("Content-Type","image/jpeg");
                res.end(data);
            }
        });
    }
});
server.listen(3000,function() {
    console.log("客户端连接成功");
});