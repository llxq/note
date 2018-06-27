// find 方法：接收一个方法作为参数，方法内部返回一个条件
// 符合该条件的元素会作为 find 方法的返回值，如果遍历结束还没有符合该条件的元素，则返回 undefined
// 该方法会遍历所有元素，执行给定的带有条件返回值的函数


var arr = [
    {id: 1,name: '张三'},
    {id: 2,name: '李四'},
    {id: 3,name: '王五'}
]

// 重写 find 方法
// Array.prototype.myFind = function (callback) {
//     for (var i = 0; i < this.length; i++) {
//         if (callback(this[i], i)) {
//             return this[i];
//         }
//     }
// }
// console.log(arr.myFind(function (item, index) {
//     return item.id === 3;
// }));

// 重写 findIndex 
Array.prototype.myFindIndex = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i)) {
            return i;
        }
    }
}
// console.log(arr.myFindIndex(function (item, index) {
//     return item.id === 2;
// }));
// arr.myFindIndex(function (item, index){
//    if (item.id === 2) {
//        console.log(index);
//        return true;
//    }
// })
