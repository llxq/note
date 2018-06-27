{
    let a, b, c;
    [a, b] = [1, 2];
    console.log(a, b);
}


{
    let a, b, c;
    [a, b, ...c] = [1, 2, 3, 4, 5, 6];
    console.log(a, b, c);

    // ... 数组的可变参数
    // 1 2 [ 3, 4, 5, 6 ]
}

{
    let a, b;
    ({a, b} = {a: 1, b: 2});
    console.log(a, b);

}

// 数组结构赋值
{
    let a, b, c;
    [a, b, c = 3] = [1, 2];
    // 输出 1 2 3
    console.log(a, b, c);
}

{
    let a = 0;
    let b = 1;
    [a, b] = [b, a];
    // 输出 1 0
    console.log(a, b);
}

{
    function f() {
        return [1, 2];
    }
    let a, b;
    [a, b] = f();
    // 输出 1 2
    console.log(a, b);
}

{
    function f() {
        return [1, 2, 3, 4, 5];
    }
    let a, b;
    [a,,,b] = f();
    // 输出 1 4
    console.log(a, b);
}

{
    function f() {
        return [1, 2, 3, 4, 5];
    }
    let a, b;
    [a,...b] = f();
    // 输出 1 [2,3,4,5]
    console.log(a, b);
}

{
    let o = {
        p: 42,
        q: true
    }
    let {p, q} = o;
    // 输出结果为 42 true
    console.log(p, q);
}

{
    // 这个 a = 10，则代表的是默认值，等号右边 赋值
    let {a = 10, b = 5} = {a: 3}
    // 输出结果 3 5
    console.log(a, b);
}

{
    let met = {
        title: 'abc',
        data: [{
            title: 'test',
            date: '520'
        }]
    }
    let {title: newTitle, data: [{title: dataNewTitle}]} = met;
    // 输出结果为 abc test
    console.log(newTitle, dataNewTitle);
}

{
    function show({a, b}) {
        console.log(a, b);
    }
    show({
        a: 1,
        b: 2
    })
}