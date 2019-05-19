const PI = 3.14;
//参数半径，返回面积
function getSize(r){
  return PI * r * r;
}
//参数半径，返回周长
function getPerimiter(r){
  return PI * r * 2;
}
//向外公共导出
exports.size = getSize;
exports.perimiter = getPerimiter;

//导出当前模块的内部成员，供其它模块使用
//module.exports.size = getSize;
//module.exports.perimiter = getPerimiter;
//真正外向能导出对象 module.exports

//Node.js底层   exports  = module.exports;
//所以:
//    exports.age = 20;        完全等价
//    module.exports.age = 20; 完全等价
//但是:
//    exports = {}          导出对象失败
//    module.exports = {};  成功
