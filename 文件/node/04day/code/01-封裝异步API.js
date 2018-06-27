// 如果想要得到一个方法的 异步方法中的值
function fn(callback) {
    setInterval(function () {
        var data = 'hello';
        callback(data);
    })
}

// 如何获取上面 异步方法中的 data
// setInterval 方法是异步请求的
// 需要通过 回调函数来获取，没有别的方法
fn(function (data){

})