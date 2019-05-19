//(function(exports,require,module,__filename,__dirname){
//06.js
//console.log(__filename);
//console.log(__dirname);
//console.log(require);//Function
//console.log(exports);
//console.log(module);
//C:\xampp\htdocs\h5\nodejs\day01\06.js
//C:\xampp\htdocs\h5\nodejs\day01
//})
var userCount = 998;
var userLogin = function(){
    console.log("用户正在登录...");
}
var userLogout = function(){
    console.log("用户退出....");
}
exports.userCount = userCount;
exports.userLogin = userLogin;