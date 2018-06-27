// app application 应用程序
// 把当前模块所有的依赖项都声明在文件模块的最上面

// 我们为了方便的统一处理这些静态资源，所以我们约定所有的静态资源都存放在 public 目录中 
// 可以控制哪些资源是否被用户访问

//  / index.html
// public  整个 public 目录中的资源都允许被访问

var http = require('http');
var fs = require('fs');
var template = require('art-template');
var urlObj = require('url');

// 评论信息
var comments = [
 {
    name: '张三',
    message: '今天天气不错',
    dateTime: new Date().toLocaleString()
 },
 {
    name: '张三2',
    message: '今天天气不错',
    dateTime: new Date().toLocaleString()
 },
 {
    name: '张三3',
    message: '今天天气不错',
    dateTime: new Date().toLocaleString()
 },
 {
    name: '张三4',
    message: '今天天气不错',
    dateTime: new Date().toLocaleString()
 }];

// http://127.0.0.1:3000/pinglun?name=qqq&message=qweqweqwe
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 所以我们判断 完整url路径来判断请求是不行的
// 我们只需要判定如果请求路径是 /pinglun 的时候 那我就认为提交了表单

// 直接在里面传回调函数 会自动帮我们执行 on方法
http.createServer(function (req, res) {
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 是把当前客户端传过来的参数 变为对象
    var parseObj = urlObj.parse(req.url, true);
    var url = parseObj.pathname;
    if (url === '/') {
        fs.readFile('./view/index.html', function (err,data) {
            if (err) {
                return res.end('404 Not Found 1');
            }
            res.end(template.render(data.toString(),{comments: comments}));
        });
    } else if (url.indexOf('/public/') === 0){
        // 如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源，所以我们可以直接把请求路径来当做文件来进行直接读取
        fs.readFile('.' + url, function (err, data) {
            if (err) {
                return res.end('404 Not Found 2'); 
            }
            res.end(data);
        });
    } else if (url === '/post'){
        // 如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源，所以我们可以直接把请求路径来当做文件来进行直接读取
        fs.readFile('./view/post.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found 2'); 
            }
            res.end(data);
        });
    } else if (url === '/pinglun'){
        // 这个时候无论 /pinglun 后面是什么都可以不用担心
        // 当前 url 不包含 ? 后面的数据
        // res.end(JSON.stringify(parseObj.query))
        // 使用 url模块的 parse 方法把请求中的查询字符串给解析成为了一个对象
        // 1.获取表单的提交数据
        // 2.生成日期到数据对象中，存储到数组中
        // 3.让用户重定向跳转到主页
        //      当用户重新请求的时候 我们数组中的数据已经发生变化

        // 给当前对象添加一个属性
        var comment = parseObj.query;
        comment.dateTime = new Date().toLocaleString();

        comments.unshift(comment);

        // 服务器端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以让用户看到留言了
        
        // 如何通过服务器让客户端重定向
        //  1. 将状态码设置为 302 临时重定向
        //  2. 在响应头中通过 Location 告诉客户端往哪重定向
        //      setHeader.statusCode
        //  3. 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location 的值，这个时候我们就能看到客户端自动跳转了
        res.statusCode=302;
        res.setHeader('Location','/');
        res.end();
    } else {
        // 把其他的请求都处理成 404
        fs.readFile('./view/404.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found 3');
            } 
            res.end(data);
        });
    }
}).listen('3000', function () {
    console.log('running.....');
});