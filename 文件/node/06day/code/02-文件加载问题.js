
// 就算是加载的别的模块，如果里面使用了相对路径，则相对路径相对的是当前执行 node命令的路径
// C:\Users\Administrator\Desktop\文件\node\06day\code   就是这个
var foo = require('./fs/index');

// 