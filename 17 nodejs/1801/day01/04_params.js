
//获取五个参数
//对象：向外公开导出数据
console.log(exports); //{}
//函数: 引入其它的模块，并且创建模块对象
console.log(require); //Function:require
//路径
console.log(__filename);  //当前文件绝对路径
console.log(__dirname);   //当前文件所在目录绝对路径