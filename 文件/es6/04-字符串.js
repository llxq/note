{
    // 输出 a a
    console.log('a', `\u0061`);

    // 输出 口7   因为只能识别 两个字节 20BB 的值，而后面的7被当做一个字节输出了
    console.log('a', `\u20BB7`);

    // 这个方式可以输出大于 两个自己的字符
    // 输出 吉
    console.log('a', `\u{20BB7}`);
}

// es7 的

{
    let str ='woaini';

    // 判断指定字符串是否包含指定字符
    console.log(str.includes('r'));

    // 判断指定字符串是否是以指定字符开始的
    console.log(str.startsWith('wo'));

    // 判断指定字符串是否是以指定字符结尾的
    console.log(str.endsWith('ni'));
}

{
    let str = 'abc';

    // 将指定字符串复制指定份数
    console.log(str.repeat(2));
}

{
    let name = 'list';
    let info = 'hello world';
    let m = `i am ${name},${info}`;
    console.log(m);
}

{
    let str1 = '1';

    // 规定指定字符串的长度，如果不够长则使用第二个参数的值来补全(这个是向前补)
    let str = str1.padStart(2, '0');
    console.log(str);

    // 规定指定字符串的长度，如果不够长则使用第二个参数的值来补全(这个是向后补)
    let str2 = str1.padEnd(2, '0');
    console.log(str2);
}

{
    
}