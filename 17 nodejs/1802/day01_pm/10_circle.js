const PI = 3.14;

//圆形计算面积
function getSize(r){
    return PI * r * r;
}
//圆形计算周长
function getPerimeter(r){
   return PI * r * 2;
}

//导出1:当前模块内部成员，供其它的模块使用
//exports.size = getSize;
//exports.perimiter = getPerimeter;
//导出2:当前模块内部成员，供其它的模块使用
//module.exports.size = getSize;
//module.exports.perimiter = getPerimeter;
//exports = {
//    size:getSize,
//    perimiter:getPerimeter
//};
module.exports = {
    size:getSize,
    perimiter:getPerimeter
};











