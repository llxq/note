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

readFile('../data/01.txt').then(res => {
    console.log(res.toString());
    return readFile('../data/02.txt');
}).catch(err => {
    console.log(err.toString());
}).then(res => {
    console.log(res.toString());
    return readFile('../data/03.txt');
}).catch(err => {
    console.log(err.toString());
}).then(res => {
    console.log(res.toString());
}).catch(err => {
    console.log(err);
});