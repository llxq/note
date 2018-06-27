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

// async 方式读取文件
async function fn() {
    let f1 = await readFile('../data/01.txt');
    console.log(f1.toString());
    let f2 = await readFile('../data/02.txt');
    console.log(f2.toString());
    let f3 = await readFile('../data/03.txt');
    console.log(f3.toString());
}
fn();