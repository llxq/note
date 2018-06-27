var foo="2222";

// 将foo对象放置在 exports对象中
exports.foo="这是被加载的";

exports.add=function(x,y){
    return x+y;
}
function sub(x,y) {
    return x-y;
}
exports.sub=sub;