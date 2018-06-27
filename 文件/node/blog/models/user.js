var mongoose = require('mongoose');
var schem = mongoose.Schema;
// 连接数据库
mongoose.connect('mongodb://localhost/userInfo', { useMongoClient: true });


// 设计表结构
var userSchema = new schem({
  email: {
    type: String,
    require: true
  },
  nickname: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  create_time: {
    type: Date,
    // 注意这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了个 方法 Date.now
    // 当我们直接 new Model 的时候，mongoose会调用 default的指定的 Date.now方法，使用其返回值为当前值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: 'avatar-max-img.png'
  },
  // 介绍
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    // 0 没有权限设置
    // 1 不可以评论
    // 2 不可以登录
    // 是否可以评论
    // 是否可以登录使用
    enum: [0, 1, 2],
    default: 0
  }
});

// 导出数据表，前面是表的名称，后面是架构名称
module.exports = mongoose.model('User', userSchema);