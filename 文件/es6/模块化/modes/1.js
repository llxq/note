// node ：module.exports = 需要导出的东西
// node：exports.名字 = 需要导出的东西

// es6：export 需要导出的东西
// console.log('1模块 加载了');
// export const a = 12;
// export const b = 20;
// export const c = 520;

const a = 12;
const b = 20;
const c = 520;

// export {
//     a,
//     b,
//     c
// }


// 可以起别名
export {
    a as aaa,
    b as bbb,
    c as ccc
}