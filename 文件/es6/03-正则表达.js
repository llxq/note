{
    let regex = new RegExp('lxq', 'i');
    let regex2 = new RegExp(/lxq/i);
    console.log(regex.test('lxq520'), regex2.test('lxq520'));

    // es6 写法
    // es6 中允许第一个参数填写修饰符，第二个参数也填写修饰符
    // 第二个修饰符 会覆盖第一个修饰符
    let regex3 = new RegExp(/lxq/ig, 'i');
    console.log(regex3.test('lxq520'));
}

{
    let str = 'abc_ab_lake';
    let a1 = /b+/g;
    // 这个只能查找第一个是否符合当正则
    let a2 = /b+/y;

    console.log('第一个：', a1.exec(str), '第二个：', a2.exec(str));
}