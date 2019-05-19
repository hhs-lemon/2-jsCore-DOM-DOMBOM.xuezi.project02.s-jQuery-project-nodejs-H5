//16:22~16:30
//http:/ /www.jd.com:8080/ad/index?uname=tom&no=3
function resolve(str){
    var result = {};
    //1:获取协议名 http    查找://位置
    var i1 = str.indexOf("://");
    result.protocol = str.substring(0,i1);
    //2:获取主机名 www.jd.com   最后:位置
    var i2 = str.lastIndexOf(":");
    result.hostname = str.substring(i1+3,i2)
    //3:获取端口号 8080   :号后/位置
    var i3 = str.indexOf("/",i2);
    result.port = str.substring(i2+1,i3);
    //4:获取路径   /ad/index
    var i4 = str.indexOf("?");
    result.path = str.substring(i3,i4);
    //5:获取参数   uname=tom&no=3
    var list = str.substring(i4+1).split("&");
    var obj = {};
    for(var item of list){
        var arr = item.split("=");
        obj[arr[0]] = arr[1];
    }
    result.query = obj;
    return result;
}
module.exports.resolve = resolve;