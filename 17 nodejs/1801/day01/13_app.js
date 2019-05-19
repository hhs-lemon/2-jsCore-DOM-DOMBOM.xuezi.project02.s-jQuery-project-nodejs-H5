var m = require("./12_myurl");
var str = "http://www.jd.com:8080/ad/index?uname=tom&no=3";
var rs = m.resolve(str);
console.log(rs);