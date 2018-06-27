var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 连接本机 itcast 数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动创建
mongoose.connect('mongodb://localhost/itcast');

// 设计集合结构 (表结构)
// 字段名称就是表结构中的 属性名称
// 值
// 约束的目的就是为了保证数据的完整性，不要有脏数据
/*var blogScheme = new Schema({
    title: String,
    authour: String,
    meta: [{
        body: String,
        data: Date
    }],
    date: [{
        type: Date,
        default: Date.now
    }],
    meta: {
        votes: Number,
        favs: Number
    }
});*/

// 设计 数据表
var userName = new Schema({
    username: {
        type: String,   // 设置该对象的类型为 String 类型
        required: true  // 表示设置该对象必须有，不能为空
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

// 将文档结构 发布为模型
// mongoose.model方法  就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字字符串来表示你的数据库的名称
//       mongoose 会自动将大写名词的字符串生成 小写复数 的集合
//       例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构名称
//    返回值：模型构造函数
var User = mongoose.model('User', userName);

// 当我们有了模型构造函数之后，就可以使用这个构造函数对 Users 集合中的数据为所欲为了

// 增加数据
/*new User({
    username: 'admin',
    password: '123456',
    email: 'admin@admin.com'
}).save(function (err, ret) {
    if (err) {
        console.log('保存失败');
    } else {
        console.log('保存成功');
        console.log(ret);
    }
});*/

// 查询数据
/*User.find(function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret);
    }
})*/

// 根据 id 查询
// User.findById()

// 按条件查询全部符合的数据
/*User.find({
    password: '123'   // 多条件就使用 逗号 分隔查询
}, function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret);
    }
});*/

// 按条件查询
/*User.findOne({      // 不加条件的话 只查询第一个数据
    password: '123'   // 多条件就使用 逗号 分隔查询
}, function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret);
    }
});*/

// 删除数据
/*User.remove({
    username: 'admin',
    password: '123456'
}, function (err, ret) {
    if (err) {
        console.log(err);
    } else {
        console.log(ret);
        console.log('删除成功');
    }
});*/

// 修改数据
User.findByIdAndUpdate('5b0fa4d14cf51a2564e222b0', {
    username: 'update'
}, function (err, ret) {
    if (err) {
        console.log('更新失败');
    } else {
        console.log('更新成功');
    }
})