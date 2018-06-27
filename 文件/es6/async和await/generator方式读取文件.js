const fs = require('fs');

const readFile = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

// 使用 generator 方式读取文件
function * gen() {
    yield readFile('../data/01.txt');
    yield readFile('../data/02.txt');
    yield readFile('../data/03.txt');
}

let g1 = gen();
g1.next().value.then(res => {
    console.log(res.toString());
    return g1.next().value;
}).catch(err => {
    console.log(err);
}).then(res => {
    console.log(res.toString());
    return g1.next().value;
}).catch(err => {
    console.log(err);
}).then(res => {
    console.log(res.toString());
}).catch(err => {
    console.log(err);
});