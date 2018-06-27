var url = require('url');
// var obj = url.parse('http://127.0.0.1:3000/pinglun?name=qqq&message=qweqweqwed');
// console.log(obj);
/*Url {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: '127.0.0.1:3000',
    port: '3000',
    hostname: '127.0.0.1',
    hash: null,
    search: '?name=qqq&message=qweqweqwed',
    query: 'name=qqq&message=qweqweqwed',
    pathname: '/pinglun',
    path: '/pinglun?name=qqq&message=qweqweqwed',
    href: 'http://127.0.0.1:3000/pinglun?name=qqq&message=qweqweqwed' }
*/

// pathName：就是 ? 前面的 /pinglun

// 把用户传入的数据转换为对象
var obj = url.parse('http://127.0.0.1:3000/pinglun?name=qqq&message=qweqweqwed',true);
console.log(obj.query.name);
//query: { name: 'qqq', message: 'qweqweqwed' },

